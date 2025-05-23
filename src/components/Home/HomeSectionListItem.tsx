interface HomeSectionListItemProps {
  title: string;
  timeAge: string;
}

const HomeSectionListItem = ({ title, timeAge }: HomeSectionListItemProps) => {
  return (
    <li className="flex justify-between text-sm">
      <span className="text-gray900">{title}</span>
      <span className="text-gray600">{timeAge}</span>
    </li>
  );
};

export default HomeSectionListItem;
