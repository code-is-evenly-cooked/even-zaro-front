export const shareToKakao = ({
  title,
  description,
  imageUrl,
  link,
}: {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}) => {
  if (!window.Kakao) {
    console.warn("Kakao SDK가 아직 로드되지 않았습니다.");
    return;
  }

  if (!window.Kakao.isInitialized()) {
    try {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!);
      console.log("공유 시점에 Kakao SDK 초기화");
    } catch (e) {
      console.error("Kakao.init() 실패", e);
      return;
    }
  }

  try {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
      ],
    });
    console.log("✅ Kakao 공유창 실행");
  } catch (error) {
    console.error("❌ Kakao 공유 실패", error);
  }
};
