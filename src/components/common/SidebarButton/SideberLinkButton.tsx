import Link from 'next/link'

interface SidebarLinkButtonProps {
  icon: React.ReactNode
  title: string
  href: string
  onClick?: () => void
}

const SidebarLinkButton = ({ icon, title, href, onClick }: SidebarLinkButtonProps) => {
  const handleClick = () => {
    onClick?.()
  }

  return (
    <li>
      <Link
        href={href}
        onClick={handleClick}
        className="flex w-full px-2 py-2 items-center round-2xl gap-2 hover:bg-gray100"
        aria-label={title}
      >
        <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
        <span className="text-sm font-semibold text-gray900">{title}</span>
      </Link>
    </li>
  )
}

export default SidebarLinkButton