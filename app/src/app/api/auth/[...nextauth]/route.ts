import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = await NextAuth(authOptions);

export { handler as GET, handler as POST };
