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
}

type formInputs = z.infer<typeof updateUserInfoSchema>;

const UserInfoSection = ({ name, email }: UserInfoSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateUserMutation, { isLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const form = useForm<formInputs>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      name,
      email,
    },
  });

  const onSubmit = async (val: formInputs) => {
    try {
      const { message, user } = await updateUserMutation(val).unwrap();
      toast.success(message);
      dispatch(setUserInfo(user));
      setIsEditing(false);

      //you must reset form when props change
      form.reset({
        name: user.name,
        email: user.email,
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
                        disabled
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
