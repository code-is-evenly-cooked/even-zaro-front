import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingSpinnerBoundary = () => {
  return (
    <div className="flex justify-center mt-10">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingSpinnerBoundary;
