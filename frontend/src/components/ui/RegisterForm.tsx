import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { RegisterSchema } from "@/schema";
import { z } from "zod";
import { handleError } from "@/service/errorHandler";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

const RegisterForm = () => {
  const { registerUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    try {
      registerUser(data.username, data.password, data.email);
      form.reset();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 pb-2">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="user@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input {...field} type="username" placeholder="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2 pt-5">
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <Link to="/login" className={buttonVariants({ variant: "link" })}>
            Already have an account? Sign in!
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
