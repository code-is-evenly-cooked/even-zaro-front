import BookmarkGroup from "./BookmarkGroup";

export default function BookmarkList() {
  const groups = [  // 임시 목업 데이터
    {
      id: 1,
      title: "강남 나만 갈꺼야 맛집",
      placeCount: 4,
    },
    {
      id: 2,
      title: "연남동 분위기 카페",
      placeCount: 2,
    },
  ];

  return (
    <div className="space-y-1">
      {groups.map((group) => (
        <BookmarkGroup key={group.id} group={group} />
      ))}
    </div>
  );
}
