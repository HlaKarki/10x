import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

// Create context type
export async function createContext() {
  const supabase = await createClient();
  return {
    supabase,
  };
}

type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC with context
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Example router
export const helloRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional().default("World") }))
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),
});

// Example: Supabase query
export const testRouter = router({
  getTests: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from("test").select("*");

    if (error) throw error;
    return data;
  }),

  addTest: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("test")
        .insert([{ name: input.name }])
        .select()
        .single();

      if (error) throw error;
      return data;
    }),
});

// Combine routers
export const appRouter = router({
  hello: helloRouter.hello,
  test: testRouter,
});

export type AppRouter = typeof appRouter;
