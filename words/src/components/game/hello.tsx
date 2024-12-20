"use client";

import { trpc } from "@/utils/trpc";
import { useState } from "react";

export function HelloWorld() {
  const [name, setName] = useState("");
  const hello = trpc.hello.useQuery(
    { name: name || undefined },
    {
      // Disable automatic querying
      enabled: false,
    }
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border rounded"
      />
      <button
        onClick={() => hello.refetch()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Say Hello
      </button>
      <p className="text-lg">
        {hello.isLoading
          ? "Loading..."
          : hello.error
          ? `Error: ${hello.error.message}`
          : hello.data || "Click the button to say hello"}
      </p>
    </div>
  );
}
