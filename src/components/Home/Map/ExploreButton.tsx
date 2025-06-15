"use client";

import Link from "next/link";

export default function ExploreButton() {
  return (
    <Link
      href="/map"
      className="w-full h-[72px] m-2 flex items-center justify-center rounded-2xl bg-violet800 text-white text-xl font-bold shadow-md"
    >
      🏡 동네 탐방
    </Link>
  );
}
