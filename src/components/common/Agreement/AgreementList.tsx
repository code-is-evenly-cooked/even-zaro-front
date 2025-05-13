import React, { useEffect, useState } from "react";
import AgreementItem from "./AgreementItem";
import { AgreementsState, AgreementsType } from "@/types/agreement";
import TermsModal from "../../support/TermsModal";

interface AgreementListProps {
  agreements: AgreementsState;
  onToggle: (key: AgreementsType) => void;
}

const AgreementList = ({ agreements, onToggle }: AgreementListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);
  const [termsText, setTermsText] = useState("");
  const [privacyText, setPrivacyText] = useState("");

  const fetchMarkdownText = async (path: string) => {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch: ${path}`);
    return res.text();
  };

  useEffect(() => {
    const loadMarkdowns = async () => {
      try {
        const [terms, privacy] = await Promise.all([
          fetchMarkdownText("/terms/terms-of-service.md"),
          fetchMarkdownText("/terms/privacy-policy.md"),
        ]);
        setTermsText(terms);
        setPrivacyText(privacy);
      } catch (error) {
        console.error("약관 불러오기 실패:", error);
      }
    };

    loadMarkdowns();
  }, []);

  const handleTermClick = (type: "terms" | "privacy") => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="text-white text-sm w-full">
      <AgreementItem
        type="all"
        label="약관 전체 동의"
        checked={agreements.all}
        onToggle={onToggle}
      />
      <div className="h-px bg-gray500 my-2" />
      <AgreementItem
        type="terms"
        label="even 이용 약관 동의"
        required
        checked={agreements.terms}
        onToggle={onToggle}
        onTermClick={() => handleTermClick("terms")}
      />
      <AgreementItem
        type="privacy"
        label="개인정보처리방침 동의"
        required
        checked={agreements.privacy}
        onToggle={onToggle}
        onTermClick={() => handleTermClick("privacy")}
      />

      <TermsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalType === "terms" ? "이용약관" : "개인정보처리방침"}
        content={modalType === "terms" ? termsText : privacyText}
      />
    </div>
  );
};

export default AgreementList;
