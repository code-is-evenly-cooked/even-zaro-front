"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { PAGE } from "@/types/map";
import { UserGroupList } from "@/components/map/UserGroupList";
import { FavoriteAddModal } from "@/components/map/FavoriteAddModal";
import { GroupsFavoriteList } from "@/components/map/GroupsFavoriteList";
import { useMapPageStore } from "@/stores/map/useMapPageStore";
import { useMapFavoriteStore } from "@/stores/map/useMapFavoriteStore";
import {
  CloseArrow,
  MyLocationIcon,
  OpenArrow,
} from "@/components/common/Icons";
import { useMapStore } from "@/stores/map/useMapStore";
import { useRef } from "react";

const MapPage = () => {
  const { favoriteAddModal } = useMapFavoriteStore();
  const { page } = useMapPageStore();
  const { setMyLocation, openModal, setOpenModal } = useMapStore();

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
      },
    );
  }

  const onToggleModal = () => setOpenModal(openModal);

  return (
    <div className="w-full h-full">
      <KakaoMap mapRef={mapRef} />
      <SideMenu />

      {/* 모달의 위치와 크기 지정 */}
      <div className="flex flex-col fixed bottom-0 left-0 z-10 w-full sm:w-96 h-fit">
        <div className="flex pl-12 justify-center sm:pl-0 z-50">
          {openModal ? (
            <button onClick={onToggleModal}>
              <CloseArrow className="flex justify-center w-20 h-auto" />
            </button>
          ) : (
            <button onClick={onToggleModal}>
              <OpenArrow className="flex justify-center w-20 h-auto" />
            </button>
          )}
        </div>

        <div
          className={`flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
            openModal ? "h-96" : "max-h-0"
          }`}
        >
          {openModal && (
            <>
              {page === PAGE.PLACELIST && <PlaceModal />}
              {page === PAGE.PLACEDETAIL && <PlaceUserMemos />}
              {page === PAGE.USERGROUPLIST && <UserGroupList />}
              {page === PAGE.FAVORITELIST && <GroupsFavoriteList />}
            </>
          )}
        </div>
      </div>

      {/* 내 위치 이동 버튼 */}
      <button
        onClick={onClickMyLocationIcon}
        className={`${openModal ? "bottom-[400px]" : "bottom-3"} fixed z-50 left-3 w-12 h-12 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-100 transition`}
        aria-label="내 위치로 이동"
      >
        <MyLocationIcon className="w-6 h-6" />
      </button>

      {favoriteAddModal && <FavoriteAddModal />}
    </div>
  );
};

export default MapPage;
