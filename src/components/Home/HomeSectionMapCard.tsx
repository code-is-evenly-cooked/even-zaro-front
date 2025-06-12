import MapBox from "./Map/MapBox";
import HotPlaceList from "./Map/HotPlaceList";
import ExploreButton from "./Map/ExploreButton";

export default function HomeSectionMapCard() {
  return (
    <div className="flex">
      <MapBox />
      <div className="flex flex-col">
        <HotPlaceList />
        <ExploreButton />
      </div>
    </div>
  );
}