/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUploadAvatarMutation } from "@/store/api/authApi";
import { Camera, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

const ProfileHeader = ({ name, email, avatarUrl }: ProfileHeaderProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 150);

    try {
      const res = await uploadAvatar(formData).unwrap();
      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        toast.success(res.message);
        setUploadProgress(0);
      }, 300);
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      toast.error(err.message || "Failed to upload avatar");
      setUploadProgress(0);
    }
  };

  return (
    <section className="animate-fade-in flex items-center gap-6">
      <div className="group relative h-24 w-24">
        <Avatar className="border-card h-full w-full border-4 shadow-lg">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
            <Loader2 className="mb-1 h-6 w-6 animate-spin text-white" />
            <span className="text-xs font-medium text-white">
              {Math.round(uploadProgress)}%
            </span>
          </div>
        )}

        {/* Camera overlay */}
        {!isLoading && (
          <button
            type="button"
            onClick={handleClick}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Camera className="h-6 w-6 text-white" />
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <h1 className="text-foreground text-2xl font-bold">{name}</h1>
        <p className="text-muted-foreground">{email}</p>
      </div>
    </section>
  );
};

export default ProfileHeader;
