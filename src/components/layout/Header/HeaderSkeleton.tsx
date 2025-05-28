import IconButton from "@/components/common/Button/IconButton";
import { LogoLineIcon } from "@/components/common/Icons";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const HeaderSkeleton = () => {
  return (
    <div className="h-12 min-h-12 flex items-center justify-start">
      <div className="flex items-center text-violet800 font-bold text-lg gap-2">
        <IconButton icon={<MenuIcon />} isTransparent label="메뉴" />
        <Link href="/" className="flex items-center gap-2">
          <LogoLineIcon />
          ZARO
        </Link>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
