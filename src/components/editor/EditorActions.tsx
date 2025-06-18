import { RefObject } from "react";
import { Editor } from "@toast-ui/react-editor";
import { saveDraft } from "@/utils/editorStorage";
import BaseButton from "@/components/common/Button/BaseButton";

interface EditorActionsProps {
  editorRef: RefObject<Editor | null>;
  title: string;
  onSubmit: () => void;
  showToastMessage: (args: {
    message: string;
    type: "info" | "error" | "success";
  }) => void;
}

export default function EditorActions({
  editorRef,
  title,
  onSubmit,
  showToastMessage,
}: EditorActionsProps) {
  const handleSaveDraft = () => {
    const instance = editorRef.current?.getInstance();
    if (!instance) {
      showToastMessage({
        message: "에디터 사용 중 문제가 발생했습니다.",
        type: "error",
      });
      return;
    }
    const content = instance.getMarkdown();
    saveDraft({ title, content });
    showToastMessage({ message: "임시 저장 완료", type: "info" });
  };

  return (
    <div className="flex gap-2 items-center justify-end">
      <BaseButton
        type="button"
        size="md"
        variant="outlined"
        color="skyblue300"
        className="h-[44px] w-[120px] text-nowrap mt-4"
        onClick={handleSaveDraft}
      >
        임시 저장
      </BaseButton>
      <BaseButton
        type="button"
        color="violet800"
        onClick={onSubmit}
        className="h-[44px] w-[120px] text-nowrap mt-4"
      >
        등록
      </BaseButton>
    </div>
  );
}
