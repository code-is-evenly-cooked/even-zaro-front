import { Suspense } from "react";
import PasswordResetPageClient from "./PasswordResetPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">로딩 중...</div>}>
      <PasswordResetPageClient />
    </Suspense>
  );
}
