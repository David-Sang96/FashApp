import Loader from "@/common/components/Loader";
import { useMeQuery } from "@/store/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import DeleteAccountSection from "../components/AccountDeleteSection";
import PasswordSection from "../components/PasswordSection";
import ProfileHeader from "../components/ProfileHeader";
import UserInfoSection from "../components/UserInfoSection";

const ProfileHomePage = () => {
  const { data, isLoading, isError } = useMeQuery();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load user info");
    }
  }, [isError]);

  if (isLoading) return <Loader />;
  if (!data) return null;

  const { name, email, provider, role, avatarUrl } = data.user;

  return (
    <section className="mx-auto max-w-7xl pt-4">
      <ProfileHeader name={name} email={email} avatarUrl={avatarUrl} />
      <UserInfoSection
        email={email}
        name={name}
        provider={provider}
        role={role}
      />
      {provider === "local" && <PasswordSection />}
      <DeleteAccountSection />
    </section>
  );
};

export default ProfileHomePage;
