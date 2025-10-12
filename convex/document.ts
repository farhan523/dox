import { query } from "./_generated/server";

export const listDocuments = query({
  handler: async (ctx) => {
    const tasks = await ctx.db.query("document").collect();
    return tasks;
    // do something with `tasks`
  },
});