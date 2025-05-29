const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-2xl font-bold text-gray900">
        존재하지 않는 카테고리입니다.
      </h1>
      <p className="mt-4 text-gray600">
        카테고리 주소가 올바른지 다시 확인해주세요.
      </p>
    </div>
  );
};

export default NotFoundPage;
