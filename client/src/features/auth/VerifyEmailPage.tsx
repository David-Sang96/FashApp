import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch } from "@/store/hooks";
import { baseUrl } from "@/store/slices/api";
import { setUserInfo } from "@/store/slices/auth";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hasVerified = useRef(false);

  const token = searchParams.get("token");

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verify = async () => {
      if (!token) {
        setMessage("Verification token missing.");
        setStatus("error");
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/auth/verify-email?token=${token}`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          setMessage(data.message || "Token invalid or expired.");
          setStatus("error");
          setEmail(data?.email || "");
          return;
        }

        dispatch(setUserInfo(data.user));
        setMessage(data.message || "Email verified and logged in!");
        setStatus("success");

        setTimeout(() => navigate("/"), 1500);
      } catch {
        setMessage("Something went wrong.");
        setStatus("error");
      }
    };

    verify();
  }, [token, navigate, dispatch]);

  const handleResendEmail = async () => {
    if (!email)
      return toast.error("No email available to resend verification.");

    setResendLoading(true);
    setResendSuccess(false);

    try {
      const res = await fetch(`${baseUrl}/auth/resend`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "verify" }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.message || "Failed to resend email.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "A new verification email has been sent!");
    } catch {
      setMessage("Failed to resend email.");
    } finally {
      setResendLoading(false);
    }
  };

  const iconMap = {
    loading: <Loader2 className="text-primary h-10 w-10 animate-spin" />,
    success: <CheckCircle2 className="text-success h-10 w-10" />,
    error: <XCircle className="text-destructive h-10 w-10" />,
  };

  const titleMap = {
    loading: "Verifying your email...",
    success: "Verification email has been sent!",
    error: "Verification Failed",
  };

  return (
    <section className="flex items-center justify-center p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/5 absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Card className="border-0 bg-transparent shadow-xl">
          <CardContent className="space-y-6 px-8 pt-12 pb-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={status}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-3 flex justify-center"
              >
                {iconMap[status]}
              </motion.div>
            </AnimatePresence>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-foreground text-2xl font-semibold"
            >
              {titleMap[status]}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-muted-foreground text-sm"
            >
              {message}
            </motion.p>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground text-xs"
              >
                <Button
                  onClick={() =>
                    window.open("https://mail.google.com", "_blank")
                  }
                  className="w-full cursor-pointer rounded-full"
                >
                  <Mail /> Open email app
                </Button>
              </motion.p>
            )}

            {status === "error" && (
              <motion.div className="mt-4 space-y-3">
                {resendSuccess ? (
                  <div className="text-success flex items-center justify-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Email sent! Check your inbox.</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleResendEmail}
                    disabled={resendLoading}
                    className="w-full cursor-pointer rounded-full"
                  >
                    {resendLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>
                )}

                <Button
                  variant="link"
                  onClick={() => navigate("/login")}
                  className="w-full cursor-pointer"
                >
                  Back to login
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default VerifyEmailPage;
