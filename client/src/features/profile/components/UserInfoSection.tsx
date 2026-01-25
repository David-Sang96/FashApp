/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateUserInfoSchema } from "@/common/types/schema/auth";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUserMutation } from "@/store/api/userApi";
import { useAppDispatch } from "@/store/hooks";
import { setUserInfo } from "@/store/slices/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Save, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import type z from "zod";

interface UserInfoSectionProps {
  name: string;
  email: string;
  role: "user" | "admin";
  provider: "local" | "google";
}

type formInputs = z.infer<typeof updateUserInfoSchema>;

const UserInfoSection = ({
  name,
  email,
  provider,
  role,
}: UserInfoSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateUserMutation, { isLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const form = useForm<formInputs>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      name,
      email,
      provider,
      role,
    },
  });

  const onSubmit = async (val: formInputs) => {
    try {
      const { message, user } = await updateUserMutation(val).unwrap();
      toast.success(message);
      dispatch(setUserInfo(user));
      setIsEditing(false);

      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed. Please try again.");
    }
  };

  return (
    <Card className="animate-fade-in border-border/50 my-5 shadow-md transition-shadow hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <User className="text-primary size-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </div>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              className="cursor-pointer rounded-full"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative mt-1">
                      <User className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                      <Input
                        placeholder="Enter your full name"
                        className="rounded-full ps-10 text-sm"
                        {...field}
                        type="text"
                        disabled={!isEditing}
                      />
                    </div>
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative mt-1">
                      <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                      <Input
                        placeholder="Enter your email"
                        className="rounded-full ps-10 text-sm"
                        {...field}
                        type="email"
                        disabled={provider === "google" || !isEditing}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEditing ? (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="user" className="mb-1 rounded-full">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium">User</div>
                              <div className="text-muted-foreground text-xs">
                                Standard access
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="admin" className="rounded-full">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium">Admin</div>
                              <div className="text-muted-foreground text-xs">
                                Full permissions
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <div className="relative mt-1">
                        <User className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          className="rounded-full ps-10 text-sm"
                          {...field}
                          type="text"
                          disabled={!isEditing}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {isEditing && (
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex cursor-pointer items-center gap-2 rounded-full"
                  disabled={!form.formState.isDirty || isLoading}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="size-5 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}

                  {isLoading ? "Saving..." : "    Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    form.reset();
                  }}
                  type="button"
                  className="cursor-pointer rounded-full"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserInfoSection;
