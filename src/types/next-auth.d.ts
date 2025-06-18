import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      image?: string;
      name?: string;
      kakaoAccessToken?: string;
    };
  }

  interface User {
    accessToken?: string;
    kakaoAccessToken?: string;
  }
}
