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
import LoadingSpinner from "../reusable/LoadingSpinner";
import { addProductSchema } from "@/zodSchema/AddProductSchema";
import { toast } from "sonner";
import { IApiError, IUnit } from "@/types";
import FormInputField from "../reusable/FormInputField";
import SelectComboBox from "../reusable/SelectComboBox";
import { useGetUnitsQuery } from "@/redux/apiClient/unitApi";
import { IoMdClose } from "react-icons/io";
import { useCreateSaleMutation } from "@/redux/apiClient/salesApi";

interface IProps {
  isDrawerOpen: boolean;
  hideDrawerHandler: () => void;
}

const CreateSaleDrawer = ({ isDrawerOpen, hideDrawerHandler }: IProps) => {
  const [createSaleHandler, { isLoading }] = useCreateSaleMutation();
  const { data: units } = useGetUnitsQuery({});

  const unitsLabels = units?.data?.map((unit: IUnit) => {
    return {
      label: unit.name,
      value: unit._id,
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
  async function onSubmit(formData: z.infer<typeof addProductSchema>) {
    try {
      await createSaleHandler(formData).unwrap();
      const successMessage = "Sale created successfully.";
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
            Create Sale
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

export default CreateSaleDrawer;
