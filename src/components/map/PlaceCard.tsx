interface PlaceCardProps {
  placeName: string;
  description: string;
  favoriteCount: number;
}

export default function PlaceCard({ placeName, description, favoriteCount }: PlaceCardProps) {
  return (
    <div className="p-3 shadow-sm hover:bg-gray-100 transition rounded border border-gray-200">
      <h3 className="font-bold text-base">{placeName}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="text-sm text-gray-400">즐겨찾기 {favoriteCount}개</p>
    </div>
  );
}