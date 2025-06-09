interface SidebarActionButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const SidebarButton = ({ icon, title, onClick }: SidebarActionButtonProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full px-2 py-2 items-center round-2xl gap-2 hover:bg-gray100"
        aria-label={title}
      >
        <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
        <span className="text-sm font-semibold text-gray900">{title}</span>
      </button>
    </li>
  );
};

export default SidebarButton;