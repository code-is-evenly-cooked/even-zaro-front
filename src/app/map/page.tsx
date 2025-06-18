"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { Category, PAGE } from "@/types/map";
import { UserGroupList } from "@/components/map/UserGroupList";
import { FavoriteAddModal } from "@/components/map/FavoriteAddModal";
import { GroupsFavoriteList } from "@/components/map/GroupsFavoriteList";
import { useMapPageStore } from "@/stores/map/useMapPageStore";
import { useMapFavoriteStore } from "@/stores/map/useMapFavoriteStore";
import { MyLocationIcon } from "@/components/common/Icons";

const MapPage = () => {
  const { favoriteAddModal } = useMapFavoriteStore();
  const { page } = useMapPageStore();

  return (
    <div className="w-full h-full">
      <KakaoMap />
      <SideMenu />

      <div className="flex flex-col absolute bottom-0 left-0 z-10 w-96 h-fit bg-white rounded-t-2xl">
        <div className="flex flex-col relative">
          <div className="flex flex-row justify-between p-2 items-center border-b-2">
              <MyLocationIcon/>
            {/* 카테고리 탭 */}
            <div className="flex gap-2 overflow-x-scroll overflow-x-hidden">
              {[
                { label: "전체", value: "All" },
                { label: "카페", value: "CE7" },
                { label: "음식점", value: "FD6" },
                { label: "편의점", value: "CS2"},
                { label: "마트", value: "MT1"},
                { label: "기타", value: "Etc" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  // onClick={() =>
                  //   setActiveCategory(tab.value as Category)
                  // }
                  className={`px-3 py-1 rounded-full border text-xs whitespace-nowrap bg-violet800 text-white`}
                  // className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${
                  //   activeCategory === tab.value
                  //     ? "bg-violet800 text-white"
                  //     : "bg-white text-gray700"
                  // }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>


          <div className="flex flex-col h-96">
            {page === PAGE.PLACELIST && <PlaceModal />}
            {page === PAGE.PLACEDETAIL && <PlaceUserMemos />}
            {page === PAGE.USERGROUPLIST && <UserGroupList />}
            {page === PAGE.FAVORITELIST && <GroupsFavoriteList />}
          </div>
        </div>
      </div>

      {favoriteAddModal && <FavoriteAddModal />}
    </div>
  );
};

export default MapPage;
