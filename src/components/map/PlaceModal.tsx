import React from "react";
import PlaceCard from "@/components/map/PlaceCard";

export default function PlaceModal() {

  const dummyData = [
    {
      "placeId" : 1,
      "placeName" : "갓덴 스시 강남점",
      "address" : "서울의 어딘가 123",
      "favoriteCount" : 10
    },
    {
      "placeId" : 2,
      "placeName" : "신동궁 감자탕 역삼직영",
      "address" : "서울의 어딘가 1234",
      "favoriteCount" : 5
    },{
      "placeId" : 3,
      "placeName" : "장인 닭갈비 강남점",
      "address" : "서울의 어딘가 123 345",
      "favoriteCount" : 12
    },{
      "placeId" : 4,
      "placeName" : "장소1",
      "address" : "서울의 어딘가 123 3211",
      "favoriteCount" : 11
    }
  ]


  return (
    <div className="flex flex-col absolute -bottom-4 left-4 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="px-4 pt-4">
        <span className="text-2xl font-extrabold block ">서울시 &gt; 강남구</span>
        <div className="flex justify-end">
          <span className="text-sm text-gray-400">즐겨찾기 많은 순</span>
        </div>
      </div>

      {/* 장소 카드 리스트 */}
      <div className="flex flex-col gap-3 px-4 py-4 overflow-y-auto">
        {dummyData.map((place) => (
          <PlaceCard
            key={place.placeId}
            placeName={place.placeName}
            address={place.address}
            favoriteCount={place.favoriteCount}
          />
        ))}
      </div>
    </div>
  );
}
