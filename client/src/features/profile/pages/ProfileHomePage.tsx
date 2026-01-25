import { useAppSelector } from "@/store/hooks";
import DeleteAccountSection from "../components/AccountDeleteSection";
import PasswordSection from "../components/PasswordSection";
import ProfileHeader from "../components/ProfileHeader";
import UserInfoSection from "../components/UserInfoSection";

const ProfileHomePage = () => {
  const user = useAppSelector((store) => store.auth.userInfo);
  if (!user) return null;

  const { name, email, provider, role } = user;

  return (
    <section className="mx-auto max-w-7xl">
      <ProfileHeader name={name} email={email} />
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
