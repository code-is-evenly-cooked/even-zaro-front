import AppErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";
import LoadingSpinnerBoundary from "@/components/common/LoadingSpinner/LoadingSpinnerBoundary";

import SearchResult from "@/components/Search/SearchResult";
import Searchbar from "@/components/Searchbar/Searchbar";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    keyword: string;
  }>;
}

const SearchPage = async ({ searchParams }: PageProps) => {
  const { keyword } = await searchParams;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto mt-10">
      <Searchbar />
      <AppErrorBoundary fallbackMessage="검색 결과가 없습니다." key={keyword}>
        <Suspense fallback={<LoadingSpinnerBoundary />}>
          <SearchResult keyword={keyword} />
        </Suspense>
      </AppErrorBoundary>
    </div>
  );
};

export default SearchPage;
