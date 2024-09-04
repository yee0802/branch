import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Comment from "@/interfaces/Comment";
import { deleteCommentByIdAPI } from "@/service/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type DeletePostDialogProps = {
  comment: Comment;
  open: boolean;
  onClose: () => void;
};

const DeleteCommentDialog: React.FC<DeletePostDialogProps> = ({
  comment,
  open,
  onClose,
}) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteCommentByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-page"],
      });
      toast.success("Deleted Successfully!");
    },
    onError: () => {
      toast.error("Server error occurred");
    },
  });

  const onSubmit = (id: string) => {
    mutate(id);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            comment from this post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit(comment.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCommentDialog;
