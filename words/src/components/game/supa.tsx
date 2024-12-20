"use client";
import { trpc } from "@/utils/trpc";
import {useState} from "react";

export function Supabase() {
  const [newName, setNewName] = useState<string>("");
  const { data, isLoading } = trpc.test.getTests.useQuery();

  const utils = trpc.useUtils();

  // mutation
  const addTest = trpc.test.addTest.useMutation({
    onSuccess: () => {
      utils.test.getTests.invalidate().catch(console.error);
      setNewName("");
    }
  })

  return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-4 py-2 border rounded"
              placeholder="Enter name"
          />
          <button
              onClick={() => addTest.mutate({name: newName})}
              className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>

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
