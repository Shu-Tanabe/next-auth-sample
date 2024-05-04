import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Client, cacheExchange, fetchExchange } from "@urql/core";

const URL = process.env.NEXT_PUBLIC_BFF_URL;

const handler = async (req: Request, res: Response) => {
  const { query, variables } = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("no session");
  }

  const client = new Client({
    url: `http://${URL}/graphql`,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions() {
      return {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      };
    },
    requestPolicy: "cache-and-network",
  });

  const { data, error } = await client.query(query, variables || {});

  const resp = Response.json({ data: data || error });

  return resp;
};

export { handler as GET, handler as POST };
