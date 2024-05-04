import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    accessToken?: string;
    user: {
      email: string;
    };
    error?: string;
  }

  interface User {
    id: string;
    access_token: string;
    expired_at: string;
    renewal_token: string;
    user: {
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    expiredAt: string;
    accessToken?: string;
    refreshToken: string;
    user: {
      email: string;
    };
    error?: string;
  }
}
