import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
      .input(z.object({ text: z.string() }))
      .query(({ input }) => {
        return {
          greeting: `Hello, ${input.text}`,
        };
      }),

  getTests: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from("test").select("*");

    if (error) throw error;
    return data;
  }),
});
