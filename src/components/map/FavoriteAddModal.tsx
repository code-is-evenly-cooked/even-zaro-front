import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMapStore } from "@/stores/mapStore";
import { GroupListResponse } from "@/types/map";
import { fetchGroupList } from "@/lib/api/map";
import { useAuthStore } from "@/stores/useAuthStore";

export function FavoriteAddModal() {
  const favoriteAddModal = useMapStore((status) => status.favoriteAddModal);
  const myUserId = useAuthStore((state) => state.user?.userId);
  const { setFavoriteAddModal } = useMapStore();

  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [myGroup, setMyGroup] = useState<GroupListResponse[] | null>(null);
  const [memo, setMemo] = useState<string>(""); // 사용자가 입력한 메모 내용 관리

  // 로그인한 사용자의 그룹 리스트를 불러오고 Form에 세팅
  useEffect(() => {
    (async () => {
      try {
        if (myUserId != null) {
          const data: GroupListResponse[] = await fetchGroupList(myUserId);
          setMyGroup(data);
        }
      } catch (error) {
        // showToastMessage({ type: "error", message: "유저의 그룹 리스트를 불러오는 데 실패했습니다" });
        console.error(".", error);
      }
    })();
  }, [myUserId]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(e.target.value);
  };

  // const handleSumbit = async () => {
  //   if (!myUserId || !selectedGroup || (!newGroupName && selectedGroup === "__new__")) {
  //     alert("필수 정보를 입력해주세요.");
  //
  //     // 추가할 그룹 선택
  //     const groupNameToSend = (selectedGroup === "__new__") ? newGroupName : selectedGroup;
  //
  //     try {
  //       await postAddFavorite({
  //         groupId:
  //       })
  //
  //
  //     }
  //
  //     return;
  //   }
  // }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">즐겨찾기 추가</h2>
          <button onClick={() => setFavoriteAddModal(favoriteAddModal)}>
            <X className="w-5 h-5 text-gray600" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray600 mb-1">
            그룹 선택
          </label>
          <select
            className="w-full border border-gray-300  rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={selectedGroup}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              그룹을 선택해주세요.
            </option>
            <option value="__new__">그룹 추가</option>
            {myGroup?.map((group) => (
              <option key={group.groupId}>{group.name}</option>
            ))}
          </select>

          {selectedGroup === "__new__" && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray600 mb-1">
                새 그룹 이름
              </label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="새 그룹 이름을 입력하세요"
              />
              <div className="flex justify-end py-2">
                <button
                  onClick={}
                  className="px-4 py-2 text-sm rounded-md bg-violet800 text-white hover:bg-violet600"
                >
                  그룹 추가
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray600 mb-1">
            메모 <span className="text-gray600 text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="메모를 작성해주세요."
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setFavoriteAddModal(favoriteAddModal)}
            className="px-4 py-2 text-sm rounded-md bg-gray100 text-gray900 hover:bg-gray200"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm rounded-md bg-violet800 text-white hover:bg-violet600">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
