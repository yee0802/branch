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
import { EditProfileSchema } from "@/schema";
import { z } from "zod";
import { updateUserProfileByIdAPI } from "@/service/apiClient";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Textarea } from "./textarea";
import { convertFileToBase64 } from "@/lib/utils";
import { Label } from "./label";
import defaultAvatar from "@/assets/Default_pfp.jpg";
import AvatarInput from "./AvatarInput";
import "cropperjs/dist/cropper.css";

type EditProfileButtonProps = {
  id: string;
  avatarURL: string | undefined;
};

const EditProfileButton: React.FC<EditProfileButtonProps> = ({
  id,
  avatarURL,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateUserProfileByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success("Updated Successfully!");
      form.reset();
    },
    onError: () => {
      toast.error("Server error occurred");
    },
  });

  const onSubmit = async (data: z.infer<typeof EditProfileSchema>) => {
    const newAvatarFile = croppedAvatar
      ? new File([croppedAvatar], "image.webp", {
          type: "image/webp",
        })
      : undefined;

    const base64avatar = await convertFileToBase64(newAvatarFile);

    mutate(
      { id, data, avatar: base64avatar ?? undefined },
      {
        onSuccess: () => {
          setCroppedAvatar(null);
        },
      },
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label>Avatar</Label>
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : avatarURL ?? defaultAvatar
            }
            onImageCropped={setCroppedAvatar}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid items-center gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="firstName" placeholder="John" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid items-center gap-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="lastName" placeholder="Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid items-center gap-4">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="bio">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none"
                        placeholder="Describe yourself"
                      />
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;
