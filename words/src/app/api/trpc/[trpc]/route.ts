import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createContext } from "@/server/trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createContext,
  });

export { handler as GET, handler as POST };

// export async function GET(req: Request) {
//   return fetchRequestHandler({
//     endpoint: '/api/trpc',
//     req,
//     router: appRouter,
//     createContext: () => ({}),
//   });
// }
