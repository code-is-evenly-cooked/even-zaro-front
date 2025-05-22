import React from "react";

const HomeComponent = () => {
  // TODO: 배경색 빼기
  return (
    <div className="min-h-full flex pt-20 items-start justify-center bg-red-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md px-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          같이쓰자
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          자취일상
        </div>
        <div className="col-span-1 sm:col-span-2 bg-white shadow rounded-xl p-4 text-center">
          아무거나샀어요
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
