/* eslint-disable @typescript-eslint/no-explicit-any */
import { updatePasswordSchema } from "@/common/types/schema/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePasswordMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { clearUserInfo } from "@/store/slices/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

type formInputs = z.infer<typeof updatePasswordSchema>;

const PasswordSection = () => {
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isNewConfrimPasswordVisible, setIsConfrimNewPasswordVisible] =
    useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [updatePasswordMutation, { isLoading }] = useUpdatePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<formInputs>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (val: formInputs) => {
    try {
      const { message } = await updatePasswordMutation(val).unwrap();
      toast.success(message);
      dispatch(clearUserInfo());
      navigate("/login", { replace: true });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Password update failed. Please try again.",
      );
    }
  };

  return (
    <Card className="animate-fade-in border-border/50 mb-5 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="md:pb-4">
        <div className="flex flex-col max-md:gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <Shield className="text-primary size-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Password & Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </div>
          </div>
          {!isChanging && (
            <Button
              variant="outline"
              className="cursor-pointer rounded-full"
              onClick={() => setIsChanging(true)}
            >
              Change Password
            </Button>
          )}
        </div>
      </CardHeader>

      {isChanging && (
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <div className="relative mt-1">
                        <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          placeholder="Enter your current password"
                          {...field}
                          type={isCurrentPasswordVisible ? "text" : "password"}
                          className="rounded-full ps-9 pr-12 text-sm transition-all duration-300 focus:ring-2"
                        />

                        <div
                          className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out active:scale-90 ${
                            field.value
                              ? "visible translate-x-0 scale-100 opacity-100"
                              : "invisible translate-x-4 scale-75 opacity-0"
                          }`}
                          onClick={() =>
                            setIsCurrentPasswordVisible((prev) => !prev)
                          }
                        >
                          {isCurrentPasswordVisible ? (
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
                          type={isNewPasswordVisible ? "text" : "password"}
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
                            isNewConfrimPasswordVisible ? "text" : "password"
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
                            setIsConfrimNewPasswordVisible((prev) => !prev)
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

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex cursor-pointer items-center gap-2 rounded-full"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <AiOutlineLoading3Quarters className="size-4 animate-spin" />
                  )}
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsChanging(false);
                    form.reset();
                  }}
                  type="button"
                  className="cursor-pointer rounded-full"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
};

export default PasswordSection;
