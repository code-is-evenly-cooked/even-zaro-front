"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import IconButton from "../common/Button/IconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PostListPaginationProps {
  currentPage: number;
  totalPage: number;
  visiblePages?: number;
}

const PostListPagination = ({
  currentPage,
  totalPage,
  visiblePages = 5,
}: PostListPaginationProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isFirst = currentPage === 0;
  const isLast = currentPage + 1 >= totalPage;

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (page === 0) {
      newParams.delete("page");
    } else {
      newParams.set("page", page.toString());
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  // 페이지 범위 계산
  const half = Math.floor(visiblePages / 2);
  let start = Math.max(0, currentPage - half);
  const end = Math.min(totalPage, start + visiblePages);

  if (end - start < visiblePages) {
    start = Math.max(0, end - visiblePages);
  }

  const showPrevNext = totalPage > visiblePages;

  return (
    <div className="flex justify-center items-center gap-1 pt-8">
      {/* 이전 버튼 */}
      {showPrevNext && (
        <IconButton
          icon={<ChevronLeft />}
          label="Previous"
          isTransparent
          disabled={isFirst}
          onClick={() => handlePageChange(currentPage - 1)}
        />
      )}
      {/* 페이지 숫자 */}
      {Array.from({ length: end - start }, (_, index) => {
        const page = start + index;
        return (
          <button
            key={page}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-sm",
              currentPage === page
                ? "bg-violet800 text-white"
                : "hover:bg-gray100 font-normal text-gray900",
            )}
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </button>
        );
      })}

      {/* 다음 버튼 */}
      {showPrevNext && (
        <IconButton
          icon={<ChevronRight />}
          label="Next"
          isTransparent
          disabled={isLast}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      )}
    </div>
  );
};

export default PostListPagination;
