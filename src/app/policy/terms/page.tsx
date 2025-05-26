"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ToastViewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  { ssr: false },
);

const TermsPage = () => {
  const [termsText, setTermsText] = useState("");

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const res = await fetch("/terms/terms-of-service.md");
        const text = await res.text();
        setTermsText(text);
      } catch (err) {
        console.error("약관 불러오기 실패:", err);
      }
    };

    loadMarkdown();
  }, []);

  return (
    <div className="max-w-3xl px-4 mx-auto py-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-violet800 mb-5">이용약관</h1>
        <p className="text-sm leading-relaxed text-gray-700">
          안녕하세요?
          <br />
          ZARO 서비스를 이용해 주셔서 감사합니다.
          <br />
          ZARO는 자취 생활을 더 쉽고 즐겁게 만들기 위해 다양한 커뮤니티 기능과
          정보를 제공하는 플랫폼입니다.
          <br />
          아래는 서비스 이용과 관련된 약속(이용약관)입니다. 잠시만 시간을 내어
          읽어주시면 감사하겠습니다.
        </p>
      </div>
      <div className="toast-ui-viewer mt-10">
        {termsText && <ToastViewer initialValue={termsText} />}
      </div>
			<div className="space-y-2 mt-10">
        <p className="text-sm leading-relaxed text-gray-700">
          이 약관은 여러분의 편리하고 안전한 이용을 위한 최소한의 약속입니다.  
          <br />
          더 나은 서비스를 위해 항상 노력하겠습니다. 감사합니다!
        </p>
      </div>
      <div className="toast-ui-viewer mt-5"></div>

			

    </div>
  );
};

export default TermsPage;
