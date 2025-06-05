import { MoreVertical, Star } from "lucide-react";
import { DefaultProfileIcon } from "@/components/common/Icons";

export function UserGroupList() {


  return (
    <>
      <div className="w-[24rem] h-[24rem] rounded-t-2xl shadow-lg overflow-hidden bg-white absolute left-4 bottom-[-1rem] z-10 flex flex-col">

        <div className="flex justify-center pt-2">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* 유저 정보 */}
        <div className="flex flex-col items-center py-4 border-b">
          <DefaultProfileIcon className="w-10 h-10 rounded-full object-cover" />

          <span className="font-semibold text-lg mt-2">이브니</span>
          <span className="text-sm text-gray-500">D+1187</span>
        </div>

        <ul className="flex-1 overflow-y-auto divide-y">
          {[
            { name: "강남 나만 갈꺼야 맛집", count: 4 },
            { name: "갈꺼야 카페", count: 25 },
            { name: "집근처 공부 카페", count: 3 },
          ].map((group, idx) => (
            <li key={idx} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                  <Star size={16} className="text-violet-500" />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900">{group.name}</div>
                  <div className="text-xs text-gray-500">장소 {group.count}</div>
                </div>
              </div>
              <MoreVertical size={20} className="text-gray-400" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}