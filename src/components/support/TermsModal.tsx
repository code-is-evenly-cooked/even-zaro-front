"use client";

import { LogoIcon } from "@/components/common/Icons";
import BaseModal from "../common/Modal/BaseModal";
import dynamic from "next/dynamic";

// @toast-ui/react-editor의 Viewer는 SSR 지원하지 않음
const ToastViewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  { ssr: false },
);

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const TermsModal = ({ open, onClose, title, content }: TermsModalProps) => {
  if (!open) return null;

  return (
    <BaseModal isOpen={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-2">
        <div className="flex justify-center items-center gap-2 text-2xl font-bold text-violet800">
          <LogoIcon />
          <h1>ZARO</h1>
        </div>
        <h2 className="text-2xl font-bold text-violet800">{title}</h2>
        <div className="p-8">
          <ToastViewer initialValue={content} />
        </div>
      </div>
    </BaseModal>
  );
};

export default TermsModal;
