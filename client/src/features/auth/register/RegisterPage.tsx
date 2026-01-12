/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerSchema } from "@/common/types/schema/auth";
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
import { useRegisterMutation } from "@/store/api/userApi";
import { useAppDispatch } from "@/store/hooks";
// import { setUserInfo } from "@/store/slices/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

type formInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<formInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (val: formInputs) => {
    try {
      const { message, user } = await registerMutation(val).unwrap();
      toast.success(message, {
        description: "Please verify your email",
        action: {
          label: "Open email",
          onClick: () => window.open("https://mail.google.com", "_blank"),
        },
      });

      form.reset();
      // dispatch(setUserInfo(user));

      // DON'T navigate automatically — wait for verification
      // navigate("/", { replace: true }); <-- remove this
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Registration failed. Please try again.",
      );
    }
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
            name="name"
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
              <div className="text-primary text-sm">
                Already have an account?
              </div>
              <Button variant={"link"} asChild type="button">
                <Link to={"/login"}>Login here</Link>
              </Button>
            </div>
            <Button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full"
              disabled={isLoading}
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="size-5 animate-spin" />
              )}
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default RegisterPage;
