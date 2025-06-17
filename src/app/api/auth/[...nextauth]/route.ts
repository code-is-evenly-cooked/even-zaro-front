import { saveAuthCookies } from "@/lib/auth/cookie";
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        console.log("account", account);

        // 백엔드에 소셜 로그인 요청
        const response = await fetch(`${API_BASE_URL}/auth/signin/kakao`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken: account.access_token }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.log("KAKAO LOGIN FAIL");
        }
        token.accessToken = result.data.accessToken;
        token.refreshToken = result.data.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;

        await saveAuthCookies({
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
        });
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
