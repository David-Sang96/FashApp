/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginSchema } from "@/common/types/schema/auth";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { baseUrl } from "@/store/slices/api";
import { setUserInfo } from "@/store/slices/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

type formInputs = z.infer<typeof loginSchema>;

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const hasVerified = useRef(false);
  const form = useForm<formInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    //Prevent double request in StrictMode (stops the second request )
    if (hasVerified.current) return;
    hasVerified.current = true;

    const params = new URLSearchParams(location.search);
    const error = params.get("error");

    if (error === "google_email_exists") {
      toast.error(
        "This email is already registered. Please login with email/password.",
      );
    }

    if (error === "account_deactive") {
      toast.error("This account has been deactivated.");
    }
  }, [location]);

  const onSubmit = async (val: formInputs) => {
    try {
      const { message, user } = await loginMutation(val).unwrap();
      toast.success(message);
      dispatch(setUserInfo(user));
      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <section>
      {/* Floating orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/20 absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl" />
        <div className="bg-accent/20 absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full blur-3xl delay-1000" />
      </div>
      <div className="space-y-3 pb-4 text-center">
        <h2 className="text-xl md:text-2xl">FASH.COM</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Enter your email below to login to your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1">Email</FormLabel>
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
                  <div className="group relative mt-1">
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
              <Button variant={"link"} asChild type="button" className="p-0">
                <Link to={"/forget-password"}>Forget password?</Link>
              </Button>
              <Button variant={"link"} asChild type="button" className="p-0">
                <Link to={"/register"}>Don't have an account?</Link>
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
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="py-5">
              <FieldSeparator>Or continue with</FieldSeparator>
            </div>
            <Button
              type="button"
              variant={"outline"}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full"
              onClick={() => {
                window.location.href = `${baseUrl}/auth/google`;
              }}
              disabled={isLoading}
            >
              Login with Google
              <FcGoogle />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default RegisterPage;
