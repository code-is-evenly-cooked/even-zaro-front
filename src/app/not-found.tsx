import { BotIcon } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-2xl font-bold text-gray900 flex flex-col items-center gap-4">
        <span className="text-6xl">
          <BotIcon size={100} />
        </span>
        존재하지 않는 페이지 입니다.
      </h1>
      <p className="mt-4 text-gray600">주소가 올바른지 다시 확인해주세요.</p>
    </div>
  );
};

export default NotFoundPage;
