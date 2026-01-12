import { useAppDispatch } from "@/store/hooks";
import { baseUrl } from "@/store/slices/api";
import { setUserInfo } from "@/store/slices/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hasVerified = useRef(false);

  const token = searchParams.get("token");

  useEffect(() => {
    //Prevent double request in StrictMode (stops the second request )
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verify = async () => {
      if (!token) {
        setMessage("Verification token missing.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/auth/verify-email?token=${token}`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          // Show error, no redirect
          setMessage(data.message || "Token invalid or expired");
          setLoading(false);
          return;
        }

        // Success
        dispatch(setUserInfo(data.user));
        setMessage(data.message);
        setLoading(false);

        // Only redirect after a short delay
        setTimeout(() => navigate("/"), 1500);
      } catch {
        setMessage("Something went wrong.");
        setLoading(false);
      }
    };

    verify();
  }, [token, navigate, dispatch]);

  return (
    <div className="mt-24 text-center">
      {loading ? <p>Verifying your email...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyEmailPage;
