import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import {Example} from "@/app/_components/example";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className={"min-h-screen bg-black text-white"}>
        <div>
          <Example />
        </div>
      </main>
    </HydrateClient>
  );
}
