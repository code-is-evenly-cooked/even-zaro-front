import { MehIcon } from "lucide-react";
import clsx from "clsx";

interface FallbackMessageProps {
  message?: string;
  className?: string;
}

const FallbackMessage = ({
  message = "아직 게시글이 없습니다.",
  className,
}: FallbackMessageProps) => {
  return (
    <div
      className={clsx(
        "w-full flex flex-col items-center justify-center gap-2 text-gray600 py-10",
        className,
      )}
    >
      <MehIcon className="w-8 h-8" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default FallbackMessage;
