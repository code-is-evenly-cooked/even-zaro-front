import { CATEGORY_MAP } from "@/constants/category";

interface PostHeaderProps {
  category: keyof typeof CATEGORY_MAP;
  tag: string;
  title: string;
  createdAt: string;
}

export default function PostHeader({
  category,
  tag,
  title,
  createdAt,
}: PostHeaderProps) {
  // 시간 형식 변환
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);

    const datePart = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart} ${timePart}`;
  }

  return (
    <header className="space-y-2">
      <div className="text-sm text-gray-500 font-medium">
        <span className="text-primary">{CATEGORY_MAP[category].label}</span>
        {" > "}
        <span className="text-secondary">
          {" "}
          {CATEGORY_MAP[category].options.find((opt) => opt.tag === tag)
            ?.label ?? "알 수 없음"}
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

      <p className="text-sm text-gray-400">{formatDate(createdAt)}</p>
    </header>
  );
}
