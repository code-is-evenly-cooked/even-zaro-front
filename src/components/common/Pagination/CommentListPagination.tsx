"use client";

import IconButton from "../Button/IconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface CommentListPaginationProps {
  currentPage: number;
  totalPage: number;
  visiblePages?: number;
  onChangePage: (page: number) => void;
}

const CommentListPagination = ({
  currentPage,
  totalPage,
  visiblePages = 5,
  onChangePage,
}: CommentListPaginationProps) => {
  const isFirst = currentPage === 0;
  const isLast = currentPage + 1 >= totalPage;

  const handlePageChange = (page: number) => {
    onChangePage(page);
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
    <div className="flex justify-center items-center gap-1 py-8">
      {showPrevNext && (
        <IconButton
          icon={<ChevronLeft />}
          label="이전"
          isTransparent
          disabled={isFirst}
          onClick={() => handlePageChange(currentPage - 1)}
        />
      )}
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
      {showPrevNext && (
        <IconButton
          icon={<ChevronRight />}
          label="다음"
          isTransparent
          disabled={isLast}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      )}
    </div>
  );
};

export default CommentListPagination;
