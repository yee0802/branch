import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { LoginSchema } from "@/schema";
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

const LoginForm = () => {
  const { loginUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    try {
      loginUser(data.email, data.password);
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
                    placeholder="user@example.co.uk"
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
            Sign in
          </Button>
          <Link to="/register" className={buttonVariants({ variant: "link" })}>
            Don't have an account? Sign up!
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
