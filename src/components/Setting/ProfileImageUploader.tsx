"use client";

import { updateProfileImage } from "@/lib/api/profile";
import { uploadImageToS3 } from "@/lib/uploadImageToS3";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ProfileImageUploaderProps {
  initialImage: string;
  onUploaded?: (newImageUrl: string) => void;
}

const ProfileImageUploader = ({ initialImage }: ProfileImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(initialImage);
  const { showToastMessage } = useToastMessageContext();
  const { user } = useAuthStore();

  const handleClickEdit = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    console.log(formData);
    try {
      const userId = user?.userId;
      const key = await uploadImageToS3(file, "profile", userId);
      const { profileImage } = await updateProfileImage(key);
      setPreview(profileImage);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "이미지 업로드 실패";
      setPreview(initialImage);
      showToastMessage({ type: "error", message: errorMessage });
    }
  };

  return (
    <div className="relative w-[80px] h-[80px]">
      <Image
        src={getProfileImageUrl(preview)}
        alt="프로필"
        width={80}
        height={80}
        className="rounded-full border"
        priority
      />
      <button
        type="button"
        className="absolute -top-0.5 -right-1 bg-violet600 rounded-full p-1 shadow-md hover:bg-violet-500"
        aria-label="프로필 수정"
        onClick={handleClickEdit}
      >
        <EditIcon className="w-5 h-5 text-violet800 m-0.5" />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUploader;
