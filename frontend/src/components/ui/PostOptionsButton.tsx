import { Post } from "@/interfaces/Post";
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
import DeletePostDialog from "./DeletePostDialog";
import { useState } from "react";

type PostOptionsButtonProps = {
  post: Post;
};

const PostOptionsButton: React.FC<PostOptionsButtonProps> = ({ post }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
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
      <DeletePostDialog
        open={openDialog}
        post={post}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
};

export default PostOptionsButton;
