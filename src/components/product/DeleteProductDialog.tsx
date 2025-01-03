import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteProductMutation } from "@/redux/apiClient/productApi";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { Button } from "../ui/button";
import LoadingSpinner from "../reusable/LoadingSpinner";

interface IProps {
  productId: string;
  hideDialogHandler: () => void;
  isDialogOpen: boolean;
  description: string;
}

const DeleteProductDialog = ({
  productId,
  hideDialogHandler,
  isDialogOpen,
  description,
}: IProps) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const deleteProductHandler = async () => {
    try {
      await deleteProduct({ productId }).unwrap();
      const successMessage = "Product deleted successfully.";
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
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={hideDialogHandler} variant={"outline"}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={deleteProductHandler}
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

export default DeleteProductDialog;
