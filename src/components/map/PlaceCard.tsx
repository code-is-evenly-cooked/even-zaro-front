interface PlaceCardProps {
  placeName: string;
  address: string;
  favoriteCount: number;
}

export default function PlaceCard({ placeName, address, favoriteCount }: PlaceCardProps) {
  return (
    <div className="p-3 shadow-sm hover:bg-gray-100 transition">
      <h3 className="font-bold text-base">{placeName}</h3>
      <p className="text-sm text-gray-500">{address}</p>
      <p className="text-sm text-gray-400">즐겨찾기 {favoriteCount}개</p>
    </div>
  );
}