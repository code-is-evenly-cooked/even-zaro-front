import React from "react";
import PlaceCard from "@/components/map/PlaceCard";

export default function PlaceModal() {

  const dummyData = [
    {
      "placeName" : "갓덴 스시 강남점",
      "description" : "진짜 한강 이남 스시 제일 맛있음.",
      "favoriteCount" : 10
    },
    {
      "placeName" : "신동궁 감자탕 역삼직영",
      "description" : "소주 땡길 때 친구들이랑 자주 가서 먹음. 가격이 착하지는 않음",
      "favoriteCount" : 5
    },{
      "placeName" : "장인 닭갈비 강남점",
      "description" : "닭갈비 야미야미",
      "favoriteCount" : 12
    },{
      "placeName" : "장소1",
      "description" : "설명1",
      "favoriteCount" : 11
    }
  ]


  return (
    <div className="flex flex-col absolute -bottom-4 left-4 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="p-4">
        <span className="text-2xl font-extrabold block mb-2">서울시 &gt; 강남구</span>
        <div className="flex justify-end">
          <span className="text-sm text-gray-600">즐겨찾기 많은 순</span>
        </div>
      </div>

      {/* 장소 카드 리스트 */}
      <div className="flex flex-col gap-3 px-4 overflow-y-auto">
        {dummyData.map((place) => (
          <PlaceCard
            key={place.placeName} // 실제로는 place.id 같은 고유값 추천
            placeName={place.placeName}
            description={place.description}
            favoriteCount={place.favoriteCount}
          />
        ))}
      </div>
    </div>
  );
}
