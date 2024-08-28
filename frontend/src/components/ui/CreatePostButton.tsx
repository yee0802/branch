import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "./form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from "@/schema";
import { z } from "zod";
import { createPostAPI } from "@/service/apiClient";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Textarea } from "./textarea";
import useAuth from "@/hooks/useAuth";

const CreatePostButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPostAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-list"] });
      toast.success("Post Successful!");
      form.reset();
    },
    onError: () => {
      toast.error("Server error occurred");
    },
  });

  const onSubmit = (data: z.infer<typeof CreatePostSchema>) => {
    mutate({ authorId: user!.id, data });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-md mb-4 w-full p-6">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Branch Out🌿</DialogTitle>
          <DialogDescription>
            Create your own post here. Click publish when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid items-center gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="title"
                        placeholder="Enter title here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid items-center gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="description"
                        placeholder="Enter description here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid items-center gap-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="content">Body</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter body here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Publish</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
