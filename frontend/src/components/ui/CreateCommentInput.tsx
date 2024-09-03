import useAuth from "@/hooks/useAuth";
import { CreateCommentSchema } from "@/schema";
import { createCommentAPI } from "@/service/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Button } from "./button";
import { SendHorizontal } from "lucide-react";

type CreateCommentInputProps = {
  postId: string;
};

const CreateCommentInput: React.FC<CreateCommentInputProps> = ({ postId }) => {
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-page"] });
      toast.success("Posted Successfully!");
      form.reset();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Server error occurred");
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateCommentSchema>) => {
    mutate({
      postId,
      authorId: user!.id,
      ...data,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-between gap-2 rounded-lg border p-3"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} type="content" placeholder="Add comment..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="ghost" size="icon" type="submit">
          <SendHorizontal />
        </Button>
      </form>
    </Form>
  );
};

export default CreateCommentInput;
