import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
    };
  }

  interface User {
    accessToken?: string;
  }
}
