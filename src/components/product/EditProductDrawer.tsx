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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useEditProductMutation,
  useGetProductQuery,
} from "@/redux/apiClient/productApi";
import LoadingSpinner from "../reusable/LoadingSpinner";
import { addProductSchema } from "@/zodSchema/AddProductSchema";
import { toast } from "sonner";
import { IApiError, ICategory, IUnit } from "@/types";
import FormInputField from "../reusable/FormInputField";
import SelectComboBox from "../reusable/SelectComboBox";
import { useGetCategoriesQuery } from "@/redux/apiClient/categoryApi";
import { useGetUnitsQuery } from "@/redux/apiClient/unitApi";
import { stockConstants } from "@/constants";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

interface IProps {
  isDrawerOpen: boolean;
  hideDrawerHandler: () => void;
  productId: string;
}

const EditProductDrawer = ({
  isDrawerOpen,
  hideDrawerHandler,
  productId,
}: IProps) => {
  const { data: product } = useGetProductQuery({ productId });
  const [editProductHandler, { isLoading }] = useEditProductMutation();
  const { data: categories } = useGetCategoriesQuery({});
  const { data: units } = useGetUnitsQuery({});
  const categoriesLabels = categories?.data?.map((category: ICategory) => {
    return {
      label: category.name,
      value: category._id,
    };
  });
  const unitsLabels = units?.data?.map((unit: IUnit) => {
    return {
      label: unit.name,
      value: unit._id,
    };
  });
  const stockLables = stockConstants.map((stock) => {
    return {
      label: stock,
      value: stock,
    };
  });
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      purchasePrice: 0,
      salePrice: 0,
      quantity: 0,
      stock: "in-stock",
      unit: "",
      category: "",
    },
  });
  //   reset the form--
  useEffect(() => {
    if (product?.data) {
      form.reset({
        name: product.data.name,
        purchasePrice: product.data.purchasePrice,
        salePrice: product.data.salePrice,
        quantity: product.data.quantity,
        stock: product.data.stock,
        unit: product.data.unit._id,
        category: product.data.category._id,
      });
    }
  }, [form, product?.data]);

  async function onSubmit(formData: z.infer<typeof addProductSchema>) {
    try {
      await editProductHandler({ bodyData: formData, productId }).unwrap();
      const successMessage = "Product edited successfully.";
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
      <DrawerContent className="px-3">
        <DrawerHeader>
          <DrawerTitle className="text-center font-primary text-2xl font-semibold">
            Edit Product
          </DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full max-w-[800px] mx-auto py-10"
          >
            {/*  name input field */}
            <FormInputField
              control={form.control}
              name="name"
              label="Product Name"
              placeholder="Product name"
            />
            <div className="flex items-center gap-3">
              {/* purchase price input field */}
              <FormInputField
                control={form.control}
                name="purchasePrice"
                label="Purchase Price"
                placeholder="Purchase price"
                type="number"
              />
              {/* sale price input field */}
              <FormInputField
                control={form.control}
                name="salePrice"
                label="Sale Price"
                placeholder="Sale price"
                type="number"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* quantity input field */}
              <div className="w-[calc(50%-12px)]">
                <FormInputField
                  control={form.control}
                  name="quantity"
                  label="Quantity"
                  placeholder="Quantity"
                  type="number"
                />
              </div>
              <div className="w-[calc(50%-12px)] mt-2">
                {/* unit input field-- */}
                <FormField
                  control={form.control}
                  name="unit"
                  render={({}) => (
                    <FormItem className="flex flex-col font-primary">
                      <FormLabel>Unit</FormLabel>
                      <Controller
                        name="unit"
                        control={form.control}
                        render={({ field }) => (
                          <SelectComboBox
                            title="unit"
                            value={field.value}
                            dataArr={unitsLabels}
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
            <div className="flex items-center gap-3">
              <div className="w-[calc(50%-12px)]">
                {/* category input field-- */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({}) => (
                    <FormItem className="flex flex-col font-primary">
                      <FormLabel>Category</FormLabel>
                      <Controller
                        name="category"
                        control={form.control}
                        render={({ field }) => (
                          <SelectComboBox
                            title="category"
                            value={field.value}
                            dataArr={categoriesLabels}
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
                {/* stock input-- */}
                <FormField
                  control={form.control}
                  name="stock"
                  render={({}) => (
                    <FormItem className="flex flex-col font-primary">
                      <FormLabel>Stock</FormLabel>
                      <Controller
                        name="stock"
                        control={form.control}
                        render={({ field }) => (
                          <SelectComboBox
                            title="stock"
                            value={field.value}
                            dataArr={stockLables}
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

export default EditProductDrawer;
