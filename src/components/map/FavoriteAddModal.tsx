import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMapStore } from "@/stores/mapStore";
import { FavoriteAddRequest, GroupListResponse } from "@/types/map";
import { fetchGroupList, fetchPlaceList, postAddFavorite, postAddGroup } from "@/lib/api/map";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { getErrorMessage } from "@/lib/error/getErrorMessage";

export function FavoriteAddModal() {
  const favoriteAddModal = useMapStore((status) => status.favoriteAddModal);
  const myUserId = useAuthStore((state) => state.user?.userId);
  const { showToastMessage } = useToastMessageContext();
  const { setFavoriteAddModal, selectPlaceDetail, myLocation, setPlaceList } = useMapStore();

  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [myGroup, setMyGroup] = useState<GroupListResponse[] | null>(null);
  const [memo, setMemo] = useState<string>(""); // 사용자가 입력한 메모 내용 관리

  const [selectGroupId, setSelectGroupId] = useState<number | null>(null);
  const loadGroupList = async () => {
    if (myUserId != null) {
      const data: GroupListResponse[] = await fetchGroupList(myUserId);
      setMyGroup(data);
    }
  };

  useEffect(() => {
    loadGroupList();
  }, [myUserId]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedGroup(selectedName);

    const selected = myGroup?.find((group) => group.name === selectedName);
    if (selected) {
      setSelectGroupId(selected.groupId);
    } else {
      setSelectGroupId(null);
    }
  };

  // 그룹 추가 핸들러
  const handleAddGroupBtn = async () => {
    try {
      await postAddGroup(newGroupName); // 그룹 추가 비동기 통신
      setNewGroupName(""); // 입력 값 초기화
      showToastMessage({ type: "success", message: "그룹 추가가 완료되었습니다."});
      await loadGroupList(); // 그룹 다시 불러오기
    } catch (error) {
      if (error instanceof Error) {
        showToastMessage({ type : "error", message: error.message})

      } else {
        showToastMessage({ type : "error", message: getErrorMessage(error, "알 수 없는 오류가 발생했습니다.")});
      }
    }
  };

  // 그룹에 즐겨찾기 추가 버튼
  const handleAddFavoriteBtn = async () => {
    if (!selectedGroup) {
      showToastMessage({ type: "error", message: "그룹을 선택해주세요."});
    }

    if (!selectPlaceDetail || !selectGroupId) return;

    const favoriteAddRequest: FavoriteAddRequest = {
      kakaoPlaceId: selectPlaceDetail.id,
      memo: memo,
      placeName: selectPlaceDetail.place_name,
      address: selectPlaceDetail.address_name,
      lat: selectPlaceDetail.y,
      lng: selectPlaceDetail.x,
      category: selectPlaceDetail.category_group_code,
    };

    try {
      await postAddFavorite(selectGroupId, favoriteAddRequest);
      showToastMessage({ type : "success", message: "즐겨찾기 추가 성공"})
    } catch (error) {
      if (error instanceof Error) {
        showToastMessage({ type : "error", message: error.message})
      } else {
        showToastMessage({ type : "error", message: getErrorMessage(error, "알 수 없는 오류가 발생했습니다.")});
      }
    } finally {
      // 즐겨찾기 후 다시 현재 위치 기준으로 즐겨찾기 검색하여 지도 최신화
      if(myLocation) {
        const lat = myLocation.lat;
        const lng = myLocation.lng;
        const distanceKm = 3;
        const response = await fetchPlaceList(lat, lng, distanceKm);
        setPlaceList(response);
      }
    }
  };

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
              <div className="flex flex-row justify-between items-center">
                {/*showToastMessage({ type : "error", message: "장소의 즐겨찾기 상태를 불러오는 데 실패했습니다."})*/}

                {/*<span*/}
                {/*  className={`${groupState.success ? "text-green-400" : "text-red-500"}`}*/}
                {/*>*/}
                {/*  {groupState.message}*/}
                {/*</span>*/}
                <span className="py-2">
                  <button
                    onClick={handleAddGroupBtn}
                    className="px-4 py-2 text-sm rounded-md bg-violet800 text-white hover:bg-violet600"
                  >
                    그룹 추가
                  </button>
                </span>
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
          {/*<span*/}
          {/*  className={`${favState.success ? "text-green-400" : "text-red-500"}`}*/}
          {/*>*/}
          {/*  {favState.message}*/}
          {/*</span>*/}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setFavoriteAddModal(favoriteAddModal)}
            className="px-4 py-2 text-sm rounded-md bg-gray100 text-gray900 hover:bg-gray200"
          >
            Close
          </button>
          <button
            onClick={handleAddFavoriteBtn}
            className="px-4 py-2 text-sm rounded-md bg-violet800 text-white hover:bg-violet600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
