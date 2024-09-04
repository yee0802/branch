import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./dropdown-menu";
import { Button } from "./button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import DeleteCommentDialog from "./DeleteCommentDialog";
import { useState } from "react";
import Comment from "@/interfaces/Comment";

type CommentOptionsButtonProps = {
  comment: Comment;
  className?: string;
};

const CommentOptionsButton: React.FC<CommentOptionsButtonProps> = ({
  comment,
  className,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className={className}>
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            <span className="flex items-center gap-2">
              <Trash2 className="size-4" />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCommentDialog
        open={openDialog}
        comment={comment}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
};

export default CommentOptionsButton;
