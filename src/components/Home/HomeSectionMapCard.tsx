import MapBox from "./Map/MapBox";
import HotPlaceList from "./Map/HotPlaceList";
import ExploreButton from "./Map/ExploreButton";

export default function HomeSectionMapCard() {
  return (
    <div className="flex flex-col gap-4 sm:px-4">
      <div className="flex h-10 items-center text-xl font-bold">
        🔥 주변 핫한 장소
      </div>
      <div className="flex lg:flex-row flex-col gap-2">
        <MapBox />
        <div className="flex flex-col lg:m-0 mt-4">
          <HotPlaceList />
          <ExploreButton />
        </div>
      </div>
    </div>
  );
}
