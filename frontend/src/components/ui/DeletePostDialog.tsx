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
import { Post } from "@/interfaces/Post";
import { deletePostByIdAPI } from "@/service/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type DeletePostDialogProps = {
  post: Post;
  open: boolean;
  onClose: () => void;
};

const DeletePostDialog: React.FC<DeletePostDialogProps> = ({
  post,
  open,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePostByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-list", "user-profile"],
      });
      toast.success("Deleted Successfully!");
      navigate("/");
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
            This action cannot be undone. This will permanently delete this post
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit(post.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostDialog;
