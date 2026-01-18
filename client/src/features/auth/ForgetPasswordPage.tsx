/* eslint-disable @typescript-eslint/no-explicit-any */
import { emailSchema } from "@/common/types/schema/auth";
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
import { useForgetEmailMutation } from "@/store/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import type z from "zod";

type formInputs = z.infer<typeof emailSchema>;

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgetEmailMutation, { isLoading }] = useForgetEmailMutation();

  const form = useForm<formInputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (val: formInputs) => {
    try {
      await forgetEmailMutation(val).unwrap();
      setIsSubmitted(true);
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Email sending failed. Please try again.",
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="glass-card rounded-2xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="mb-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="bg-primary/10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                  >
                    <Mail className="text-primary size-6 md:size-7" />
                  </motion.div>
                  <h1 className="text-foreground mb-2 text-xl font-semibold md:text-2xl">
                    Forgot password?
                  </h1>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    No worries, we'll send you reset instructions.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-1"> Email</FormLabel>
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

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full cursor-pointer rounded-full"
                    >
                      {isLoading ? (
                        <Loader2 className="size-5 animate-spin" />
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </form>
                </Form>

                {/* Back to login */}
                <div className="mt-8 text-center">
                  <Link
                    to="/login"
                    className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-sm transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to login
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="py-4 text-center"
              >
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="bg-success/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                >
                  <CheckCircle2 className="text-success h-8 w-8" />
                </motion.div>

                <h2 className="text-foreground mb-2 text-2xl font-semibold">
                  Check your email
                </h2>
                <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
                  We sent a password reset link to
                </p>
                <p className="text-foreground mb-8 font-medium">
                  {form.getValues("email")}
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() =>
                      window.open("https://mail.google.com", "_blank")
                    }
                    className="w-full cursor-pointer rounded-full"
                  >
                    Open email app
                  </Button>

                  <p className="text-muted-foreground text-sm">
                    Didn't receive the email?{" "}
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                      }}
                      variant={"link"}
                      className="text-primary hover:text-primary/80 cursor-pointer p-0 font-medium transition-colors"
                    >
                      Click to resend
                    </Button>
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    to={"/login"}
                    className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-sm transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back to login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default ForgotPasswordPage;
