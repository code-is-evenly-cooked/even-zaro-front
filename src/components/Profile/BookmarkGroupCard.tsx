import { MoreVerticalIcon } from "lucide-react";
import type { BookmarkGroupType } from "@/types/bookmark";

interface BookmarkGroupProps {
  group: BookmarkGroupType;
}

export default function BookmarkGroupCard({ group }: BookmarkGroupProps) {
  return (
    <div className="bg-gray100 rounded-lg px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="w-6 h-6 bg-violet600 rounded-full text-white flex items-center justify-center text-sm font-bold">
          ★
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{group.name}</span>
          <span className="text-sm text-gray-500">장소 4</span>
        </div>
      </div>

      <button className="text-gray600 hover:text-black">
        <MoreVerticalIcon width={20} height={20} />
      </button>
    </div>
  );
}
