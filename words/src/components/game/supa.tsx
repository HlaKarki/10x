"use client";
import { trpc } from "@/utils/trpc";

export function Supabase() {
  const { data, isLoading } = trpc.test.getTests.useQuery();

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-2">
          {data?.map((item) => (
            <div key={item.id} className="text-white">
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
