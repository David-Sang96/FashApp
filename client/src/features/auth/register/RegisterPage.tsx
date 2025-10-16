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
import { registerSchema } from "@/features/common/types/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import type z from "zod";

type formInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const form = useForm<formInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      usename: "",
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
            name="usename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="rounded-full text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                    className="rounded-full text-sm"
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
                    {...field}
                    type="password"
                    className="rounded-full text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-primary text-sm">
                Already have an account?
              </div>
              <Button variant={"link"} asChild type="button">
                <Link to={"/login"}>Login here</Link>
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-full"
            >
              Register
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default RegisterPage;
