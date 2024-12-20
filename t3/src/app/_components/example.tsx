'use client';

import {api} from "@/trpc/react";

export function Example() {
  const {data, isLoading}= api.example.getTests.useQuery();

  return (
      <div className={"w-screen h-screen flex flex-col items-center justify-center"}>
        <h1>Data from table</h1>
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
  )
}