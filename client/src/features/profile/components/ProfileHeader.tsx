import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

const ProfileHeader = ({ name, email, avatarUrl }: ProfileHeaderProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="animate-fade-in flex items-center gap-6">
      <div className="group relative">
        <Avatar className="border-card size-24 border-4 shadow-lg">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <button className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-black/60">
          <Camera className="size-6 text-white" />
        </button>
      </div>
      <div>
        <h1 className="text-foreground text-2xl font-bold">{name}</h1>
        <p className="text-muted-foreground">{email}</p>
      </div>
    </section>
  );
};

export default ProfileHeader;
