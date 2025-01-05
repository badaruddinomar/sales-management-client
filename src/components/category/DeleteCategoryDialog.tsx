import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { Button } from "../ui/button";
import LoadingSpinner from "../reusable/LoadingSpinner";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/redux/apiClient/categoryApi";

interface IProps {
  categoryId: string;
  hideDialogHandler: () => void;
  isDialogOpen: boolean;
}

const DeleteCategoryDialog = ({
  categoryId,
  hideDialogHandler,
  isDialogOpen,
}: IProps) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const { data: category } = useGetCategoryQuery({ categoryId });
  const deleteCategoryHandler = async () => {
    try {
      const response = await deleteCategory(categoryId).unwrap();
      const successMessage =
        response?.message || "Category deleted successfully.";
      toast.success(successMessage);
      hideDialogHandler();
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={hideDialogHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-primary text-lg">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="font-primary text-base my-3 leading-[1.5]">
            {`This action cannot be undone. ${category?.meta?.productsCount} product's in this category will be deleted.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={hideDialogHandler} variant={"outline"}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={deleteCategoryHandler}
            variant={"default"}
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
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
