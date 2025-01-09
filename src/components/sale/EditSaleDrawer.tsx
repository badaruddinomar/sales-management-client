import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingSpinner from "../reusable/LoadingSpinner";
import { toast } from "sonner";
import { IApiError, IProduct, IUnit } from "@/types";
import FormInputField from "../reusable/FormInputField";
import SelectComboBox from "../reusable/SelectComboBox";
import { useGetUnitsQuery } from "@/redux/apiClient/unitApi";
import { IoMdClose } from "react-icons/io";
import {
  useEditSaleMutation,
  useGetSaleQuery,
} from "@/redux/apiClient/salesApi";
import { createSaleSchema } from "@/zodSchema/createSaleSchema";
import { genderConst, paymentMethodContstants } from "@/constants";
import { useGetProductsQuery } from "@/redux/apiClient/productApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

interface IProps {
  isDrawerOpen: boolean;
  hideDrawerHandler: () => void;
  saleId: string;
}
type TProduct = {
  _id: string;
  product: IProduct;
  salePrice: number;
  unitAmount: number;
  unit: IUnit;
};
const EditSaleDrawer = ({
  isDrawerOpen,
  hideDrawerHandler,
  saleId,
}: IProps) => {
  const [editSaleHandler, { isLoading }] = useEditSaleMutation();
  const { data: units } = useGetUnitsQuery({});
  const { data: products } = useGetProductsQuery({});
  const { data: sale } = useGetSaleQuery({ saleId });

  const unitsLabels = units?.data?.map((unit: IUnit) => {
    return {
      label: unit.name,
      value: unit._id,
    };
  });
  const paymentMethodLabels = paymentMethodContstants.map((method) => {
    return {
      label: method,
      value: method,
    };
  });
  const genderLabels = genderConst.map((gender) => {
    return {
      label: gender.toUpperCase(),
      value: gender,
    };
  });
  const productsLabels = products?.data?.map((product: IProduct) => {
    return {
      label: product?.name,
      value: product?._id,
    };
  });
  const form = useForm<z.infer<typeof createSaleSchema>>({
    resolver: zodResolver(createSaleSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      gender: "male",
      products: [{ product: "", salePrice: 0, unitAmount: 0, unit: "" }],
      totalAmount: 0,
      paymentMethod: "CASH",
      saleDate: new Date(),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  useEffect(() => {
    if (sale?.data) {
      form.reset({
        customerName: sale?.data?.customerName,
        customerPhone: sale?.data?.customerPhone,
        gender: sale?.data?.gender,
        products: sale?.data?.products.map((product: TProduct) => {
          return {
            product: product.product._id,
            salePrice: product.salePrice,
            unitAmount: product.unitAmount,
            unit: product.unit._id,
          };
        }),
        totalAmount: sale?.data?.totalAmount,
        paymentMethod: sale?.data?.paymentMethod,
        saleDate: new Date(sale?.data?.saleDate),
      });
    }
  }, [form, sale?.data]);
  async function onSubmit(formData: z.infer<typeof createSaleSchema>) {
    try {
      const bodyData = {
        ...formData,
        totalAmount: formData.products.reduce(
          (total, product) => Number(total) + Number(product.salePrice),
          0
        ),
      };
      const response = await editSaleHandler({ saleId, bodyData }).unwrap();
      const successMessage = response?.message || "Sale edited successfully.";
      toast.success(successMessage);
      form.reset();
      hideDrawerHandler();
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  }
  return (
    <Drawer open={isDrawerOpen} onOpenChange={hideDrawerHandler}>
      <DrawerContent className="px-3  max-h-screen">
        <DrawerHeader>
          <DrawerTitle className="text-center font-primary text-2xl font-semibold">
            Create Sale
          </DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full max-w-[800px] scrollbar-hide max-h-auto h-[80vh] overflow-y-auto mx-auto py-10"
          >
            <div className="flex items-center  gap-3">
              {/*  name input field */}
              <FormInputField
                control={form.control}
                name="customerName"
                label="Customer Name"
                placeholder="Customer name"
              />
              {/*  phone input field */}
              <FormInputField
                control={form.control}
                name="customerPhone"
                label="Customer Phone"
                placeholder="Customer Phone"
              />
              {/* gender input field-- */}
              <FormField
                control={form.control}
                name={`gender`}
                render={() => (
                  <FormItem className="flex flex-col font-primary mt-2">
                    <FormLabel>Gender</FormLabel>
                    <Controller
                      name={`gender`}
                      control={form.control}
                      render={({ field }) => (
                        <SelectComboBox
                          title="Gender"
                          value={field.value}
                          dataArr={genderLabels}
                          onChange={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* products input field */}
            <div className="w-full">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-3 w-full border p-4 mb-4 rounded-md"
                >
                  <div className="flex items-center flex-wrap w-full gap-3">
                    <div className="w-[calc(50%-12px)]">
                      {/* product input field-- */}
                      <FormField
                        control={form.control}
                        name={`products.${index}.product`}
                        render={() => (
                          <FormItem className="flex flex-col font-primary mt-2 overflow-x-hidden">
                            <FormLabel>Product</FormLabel>
                            <Controller
                              name={`products.${index}.product`}
                              control={form.control}
                              render={({ field }) => (
                                <SelectComboBox
                                  title={`Product ${index + 1}`}
                                  value={field.value}
                                  dataArr={productsLabels} // Replace with your dynamic units
                                  onChange={(value) => field.onChange(value)}
                                />
                              )}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-[calc(50%-12px)]">
                      {/* Sale Price */}
                      <FormInputField
                        control={form.control}
                        name={`products.${index}.salePrice`}
                        label="Sale Price"
                        placeholder="Sale price"
                        type="number"
                      />
                    </div>
                    <div className="w-[calc(50%-12px)]">
                      {/* Unit Amount */}
                      <FormInputField
                        control={form.control}
                        name={`products.${index}.unitAmount`}
                        label="Unit Amount"
                        placeholder="Unit amount"
                        type="number"
                      />
                    </div>
                    <div className="w-[calc(50%-12px)]">
                      {/* unit input field-- */}
                      <FormField
                        control={form.control}
                        name={`products.${index}.unit`}
                        render={() => (
                          <FormItem className="flex flex-col font-primary mt-2">
                            <FormLabel>Unit</FormLabel>
                            <Controller
                              name={`products.${index}.unit`}
                              control={form.control}
                              render={({ field }) => (
                                <SelectComboBox
                                  title="Unit"
                                  value={field.value}
                                  dataArr={unitsLabels} // Replace with your dynamic units
                                  onChange={(value) => field.onChange(value)}
                                />
                              )}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-[#fff] bg-red-400 font-primary rounded-md px-3 py-1 hover:bg-red-200 transition-all duration-300"
                    onClick={() => remove(index)} // Remove current product
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-sm text-[#fff] bg-blue-400 font-primary rounded-md px-3 py-1 hover:bg-blue-200 transition-all duration-300 mx-auto"
                onClick={() =>
                  append({ product: "", salePrice: 0, unitAmount: 0, unit: "" })
                } // Add new product
              >
                Add
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[calc(50%-12px)]">
                {/* payment method input field-- */}
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({}) => (
                    <FormItem className="flex flex-col font-primary">
                      <FormLabel>Payment Method</FormLabel>
                      <Controller
                        name="paymentMethod"
                        control={form.control}
                        render={({ field }) => (
                          <SelectComboBox
                            title=" Method"
                            value={field.value as string}
                            dataArr={paymentMethodLabels}
                            onChange={(value) => field.onChange(value)}
                          />
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[calc(50%-12px)]">
                <FormField
                  control={form.control}
                  name="saleDate"
                  render={({}) => (
                    <FormItem className="flex flex-col font-primary">
                      <FormLabel>Select Date</FormLabel>
                      <Controller
                        name="saleDate"
                        control={form.control}
                        render={({ field }) => (
                          <DatePicker
                            selected={field.value}
                            onChange={(value) => field.onChange(value)}
                            dateFormat="MMMM d, yyyy"
                            className="focus:outline-none border-[1px] border-[#ccc] h-[50px] rounded-md p-5 w-full"
                          />
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* */}
            <Button
              type="submit"
              className="font-semibold text-base font-secondary h-[50px] text-[#fff] bg-blue-primary rounded-lg w-full hover:opacity-[.7] transition-all duration-300 hover:bg-blue-primary"
            >
              {isLoading ? (
                <LoadingSpinner
                  size={25}
                  color="#ffffff"
                  borderWidth="2px"
                  height="100%"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
        <DrawerFooter>
          <DrawerClose>
            <Button
              variant="outline"
              className="rounded-full border-[1px] border-[#eee] h-[30px] w-[30px] flex items-center justify-center absolute top-5 right-5"
            >
              <IoMdClose />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditSaleDrawer;
