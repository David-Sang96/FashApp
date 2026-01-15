/* eslint-disable @typescript-eslint/no-explicit-any */
import { acccountDeactivateSchema } from "@/common/types/schema/auth";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeactivateMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { clearUserInfo } from "@/store/slices/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

type formInputs = z.infer<typeof acccountDeactivateSchema>;

const DeleteAccountSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deactivateMutation, { isLoading }] = useDeactivateMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<formInputs>({
    resolver: zodResolver(acccountDeactivateSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen]);

  const onSubmit = async (val: formInputs) => {
    try {
      const { message } = await deactivateMutation(val).unwrap();
      toast.success(message);
      dispatch(clearUserInfo());
      navigate("/login", { replace: true });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Account deactivation failed. Please try again.",
      );
    }
  };

  return (
    <Card className="animate-fade-in border-destructive/30 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-destructive/10 rounded-lg p-2">
            <Trash2 className="text-destructive h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-destructive text-lg">
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-destructive/5 border-destructive/20 md flex flex-col items-center rounded-lg border p-4 md:flex-row md:justify-between">
          <div>
            <h4 className="text-foreground font-medium">Deactivate Account</h4>
            <p className="text-muted-foreground text-sm">
              Permanently delete your account and all associated data
            </p>
          </div>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer rounded-full max-md:mt-3.5 max-md:w-full"
              >
                Deactivate Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <AlertDialogHeader>
                    <div className="mb-2 flex items-center gap-3">
                      <div className="bg-destructive/10 rounded-full p-2">
                        <AlertTriangle className="text-destructive h-6 w-6" />
                      </div>
                      <AlertDialogTitle>
                        Deactivate your account?
                      </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="space-y-3">
                      <p>
                        This action is{" "}
                        <strong>permanent and cannot be undone</strong>. All
                        your data, including your profile, settings, and any
                        associated content will be permanently deleted.
                      </p>
                      <div className="space-y-2 pt-2">
                        <Label
                          htmlFor="confirmDelete"
                          className="text-foreground text-sm font-medium"
                        >
                          Type{" "}
                          <span className="bg-muted rounded px-1 font-mono">
                            your password
                          </span>{" "}
                          to confirm
                        </Label>
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="group relative">
                                  <Input
                                    placeholder="password"
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
                                    onClick={() =>
                                      setIsVisible((prev) => !prev)
                                    }
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
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-3">
                    <AlertDialogCancel
                      className="cursor-pointer rounded-full"
                      type="button"
                      disabled={isLoading}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-destructive hover:bg-destructive/90 cursor-pointer rounded-full"
                    >
                      {isLoading && (
                        <AiOutlineLoading3Quarters className="size-5 animate-spin" />
                      )}
                      {isLoading ? "Processing..." : "Deactivate"}
                    </Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteAccountSection;
