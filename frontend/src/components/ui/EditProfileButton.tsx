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
import { handleError } from "@/service/errorHandler";
import { z } from "zod";
import { updateUserProfileByIdAPI } from "@/service/apiClient";
import { toast } from "sonner";

type EditProfileButtonProps = {
  id: string;
  setRefresh: (boolean: boolean) => void;
};

const EditProfileButton = ({ id, setRefresh }: EditProfileButtonProps) => {
  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: z.infer<typeof EditProfileSchema>) => {
    try {
      updateUserProfileByIdAPI(id, data)
        .then((res) => res && toast.success("Update Successful!"))
        .catch((err) => {
          console.log(err);
          toast.error("Server error occured");
        })
        .finally(() => setRefresh(true));
      form.reset();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog>
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
