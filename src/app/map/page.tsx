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
import { useMapStore } from "@/stores/map/useMapStore";
import { useRef } from "react";

const MapPage = () => {
  const { favoriteAddModal } = useMapFavoriteStore();
  const { page } = useMapPageStore();
  const { setMyLocation } = useMapStore();

  const mapRef = useRef<HTMLDivElement>(null);

  function onClickMyLocationIcon() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setMyLocation({ lat, lng });

        if (window.kakao && window.kakao.maps && mapRef.current) {
          const map = window.kakao.maps.Map ? useMapStore.getState().map : null;
          if (map) {
            const center = new window.kakao.maps.LatLng(lat, lng);
            map.setCenter(center);
          }
        }
      },
      (error) => {
        console.error("GPS 위치를 가져오지 못했습니다", error);
      }
    );
  }

  return (
    <div className="w-full h-full">
      <KakaoMap mapRef={mapRef} />
      <SideMenu />

      <div className="flex flex-col absolute bottom-0 left-0 z-10 w-96 h-fit  rounded-t-2xl">
        <div className="flex flex-col relative">
          <div className="flex flex-row justify-between p-2 items-center border-b-2">
            <button onClick={onClickMyLocationIcon}
              className="flex flex-shrink-0">
              <MyLocationIcon />
            </button>
            {/* 카테고리 탭 */}
            <div className="flex flex-row gap-2 p-1">
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

          <div className="flex flex-col h-96 bg-white">
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
