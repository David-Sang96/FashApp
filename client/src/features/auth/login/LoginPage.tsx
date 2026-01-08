import { loginSchema } from "@/common/types/schema/auth";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router";
import { toast } from "sonner";
import type z from "zod";

type formInputs = z.infer<typeof loginSchema>;

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<formInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (val: formInputs) => {
    toast.success("hi");
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
                  <div className="group relative">
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type={isVisible ? "text" : "password"}
                      className="rounded-full pr-12 text-sm transition-all duration-300 focus:ring-2"
                    />

                    <div
                      className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out active:scale-90 ${
                        field.value
                          ? "visible translate-x-0 scale-100 opacity-100"
                          : "invisible translate-x-4 scale-75 opacity-0"
                      }`}
                      onClick={() => setIsVisible((prev) => !prev)}
                    >
                      {isVisible ? (
                        <AiOutlineEyeInvisible className="size-5" />
                      ) : (
                        <AiOutlineEye className="size-5" />
                      )}
                    </div>
                  </div>
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
