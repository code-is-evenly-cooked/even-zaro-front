import AppErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";
import LoadingSpinnerBoundary from "@/components/common/LoadingSpinner/LoadingSpinnerBoundary";

import SearchResult from "@/components/Search/SearchResult";
import Searchbar from "@/components/Searchbar/Searchbar";
import { MainCategory, SubCategoryValue } from "@/types/category";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    keyword: string;
    category?: MainCategory;
    tag?: SubCategoryValue;
    onlyTag?: boolean;
  }>;
}

const SearchPage = async ({ searchParams }: PageProps) => {
  const { keyword, category, tag, onlyTag } = await searchParams;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto mt-10">
      <Searchbar
        inputKeyword={keyword}
        mainCategory={category}
        onlyTag={onlyTag}
      />
      <AppErrorBoundary
        fallbackMessage="검색 결과가 없습니다."
        key={`${keyword}-${category ?? "all"}-${tag ?? "all"}`}
      >
        <Suspense fallback={<LoadingSpinnerBoundary />}>
          <SearchResult keyword={keyword} />
        </Suspense>
      </AppErrorBoundary>
    </div>
  );
};

export default SearchPage;
