import Link from "next/link";

interface SidebarButtonProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  onClick?: () => void;
}

const SidebarButton = ({ icon, title, href, onClick }: SidebarButtonProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <li>
      <Link
        href={href}
        onClick={handleClick}
        className="flex px-2 py-2 items-center round-2xl gap-2 hover:bg-gray100"
        aria-label={title}
      >
        <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
        <span className="text-sm font-semibold text-gray900">{title}</span>
      </Link>
    </li>
  );
};

export default SidebarButton;
