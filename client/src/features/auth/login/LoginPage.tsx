import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/features/common/types/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import type z from "zod";

type formInputs = z.infer<typeof loginSchema>;

const RegisterPage = () => {
  const form = useForm<formInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (val: formInputs) => {
    console.log(val);
  };

  return (
    <section className="w-full">
      <div className="space-y-3 pb-4 text-center">
        <h2 className="text-xl md:text-2xl">FASH.COM</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Welcome to the largest store in market
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="rounded-full text-sm"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    className="rounded-full text-sm"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-primary text-sm">Don't have an account?</div>
              <Button variant={"link"} asChild type="button">
                <Link to={"/register"}>Register here</Link>
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-full"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default RegisterPage;
