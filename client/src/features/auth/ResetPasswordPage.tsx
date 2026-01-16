/* eslint-disable @typescript-eslint/no-explicit-any */
import { resetPasswordSchema } from "@/common/types/schema/auth";
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
import { useForgetPasswordMutation } from "@/store/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { Link } from "react-router";
import { toast } from "sonner";
import type z from "zod";

type formInputs = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isNewConfrimPasswordVisible, setIsConfrimNewPasswordVisible] =
    useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgetPasswordMutation, { isLoading }] = useForgetPasswordMutation();
  const form = useForm<formInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (val: formInputs) => {
    try {
      await forgetPasswordMutation(val).unwrap();
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Password update failed. Please try again.",
      );
    }
  };

  return (
    <section>
      {/* Floating orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/20 absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl" />
        <div className="bg-accent/20 absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full blur-3xl delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-2xl shadow-2xl">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="mb-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full"
                  >
                    <Shield className="text-primary h-8 w-8" />
                  </motion.div>
                  <h1 className="text-foreground mb-2 text-xl font-bold md:text-2xl">
                    Create New Password
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Your new password must be different from previous passwords
                  </p>
                </div>

                {/* Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative mt-1">
                              <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                              <Input
                                placeholder="Enter your new password"
                                {...field}
                                type={
                                  isNewPasswordVisible ? "text" : "password"
                                }
                                className="rounded-full ps-9 pr-12 text-sm transition-all duration-300 focus:ring-2"
                              />

                              <div
                                className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out active:scale-90 ${
                                  field.value
                                    ? "visible translate-x-0 scale-100 opacity-100"
                                    : "invisible translate-x-4 scale-75 opacity-0"
                                }`}
                                onClick={() =>
                                  setIsNewPasswordVisible((prev) => !prev)
                                }
                              >
                                {isNewPasswordVisible ? (
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

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <div className="relative mt-1">
                              <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                              <Input
                                placeholder="Confirm new password"
                                {...field}
                                type={
                                  isNewConfrimPasswordVisible
                                    ? "text"
                                    : "password"
                                }
                                className="rounded-full ps-9 pr-12 text-sm transition-all duration-300 focus:ring-2"
                              />

                              <div
                                className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out active:scale-90 ${
                                  field.value
                                    ? "visible translate-x-0 scale-100 opacity-100"
                                    : "invisible translate-x-4 scale-75 opacity-0"
                                }`}
                                onClick={() =>
                                  setIsConfrimNewPasswordVisible(
                                    (prev) => !prev,
                                  )
                                }
                              >
                                {isNewConfrimPasswordVisible ? (
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

                    <Button
                      type="submit"
                      className="flex w-full cursor-pointer items-center gap-2 rounded-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <AiOutlineLoading3Quarters className="size-4 animate-spin" />
                      )}
                      {isLoading ? "Processing..." : "Reset Password"}
                    </Button>
                  </form>
                </Form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
                >
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </motion.div>
                <h2 className="text-foreground mb-3 text-xl font-bold md:text-2xl">
                  Password Reset Successful!
                </h2>
                <p className="text-muted-foreground mb-8 text-sm md:text-base">
                  Your password has been updated. You can now log in with your
                  new password.
                </p>
                <Link to="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full cursor-pointer rounded-full font-medium">
                    Continue to Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default ResetPasswordPage;
