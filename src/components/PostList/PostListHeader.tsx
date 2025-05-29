"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { MainCategory } from "@/types/category";
import { getMainCategoryTitle } from "@/utils/category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmailValidateModal from "../common/EmailValidate/EmailValidateModal";

interface PostListHeaderProps {
  category: MainCategory;
}
const PostListHeader = ({ category }: PostListHeaderProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleWritePostClick = () => {
    if (!user || !user.isValidated) {
      setModalOpen(true);
    } else {
      router.push(`/editor?category=${category}`);
    }
  };

  const handleEmailValidateClick = (email?: string) => {
    setModalOpen(false);
    if (email) {
      router.push(`/email-validation?email=${email}`);
    }
  };

  return (
    <div className="flex items-center justify-between pt-10">
      <h1 className="text-3xl font-bold">{getMainCategoryTitle(category)}</h1>

      <button
        className="border border-gray200 hover:bg-gray100 px-3 py-2.5 rounded-md text-gray900 text-md"
        onClick={handleWritePostClick}
      >
        글쓰기
      </button>
      <EmailValidateModal
        isOpen={modalOpen}
        onClose={handleEmailValidateClick}
      />
    </div>
  );
};

export default PostListHeader;
