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
				const res = await fetch("/terms/privacy-policy.md");
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
				<h1 className="text-2xl font-bold text-violet800 mb-5">개인정보처리방침</h1>
				<p className="text-sm leading-relaxed text-gray-700">
          ZARO는 이용자의 개인정보를 소중히 여기며, 관련 법령에 따라 안전하게 보호하고 있습니다.
          <br />
          아래 내용을 통해 수집 항목, 이용 목적, 보관 기간 등에 대해 안내드립니다.
        </p>
      </div>
			<div className="toast-ui-viewer mt-10">
				{termsText && <ToastViewer initialValue={termsText} />}
			</div>
			<div className="space-y-2 mt-10">
				<p className="text-sm leading-relaxed text-gray-700">
          본 방침은 이용자의 권리 보호를 위한 최소한의 약속입니다.
          <br />
          ZARO는 항상 투명하고 신뢰할 수 있는 서비스 운영을 위해 노력하겠습니다. 감사합니다!
        </p>
			</div>
			<div className="toast-ui-viewer mt-5"></div>

			

		</div>
	);
};

export default TermsPage;
