import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { IApiError } from "@/types";
import LoadingSpinner from "../reusable/LoadingSpinner";
import FormInputField from "../reusable/FormInputField";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddCategoryMutation } from "@/redux/apiClient/categoryApi";

interface IProps {
  hideDialogHandler: () => void;
  isDialogOpen: boolean;
}

const AddCategoryDialog = ({ hideDialogHandler, isDialogOpen }: IProps) => {
  const [addCategoryHandler, { isLoading }] = useAddCategoryMutation();
  const addCategorySchema = z.object({
    name: z.string().nonempty("Category name is required"),
  });
  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(formData: z.infer<typeof addCategorySchema>) {
    try {
      await addCategoryHandler(formData).unwrap();
      const successMessage = "Category added successfully.";
      toast.success(successMessage);
      form.reset();
      hideDialogHandler();
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={hideDialogHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-primary text-2xl text-center">
            Add Category
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full max-w-[800px] mx-auto py-10"
          >
            {/*  name input field */}
            <FormInputField
              control={form.control}
              name="name"
              label="Category Name"
              placeholder="Category name"
            />
            <div className="flex justify-end">
              <Button
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-400 transition-all duration-300"
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
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
