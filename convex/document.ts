import { query,mutation } from "./_generated/server";

import {ConvexError, v} from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const createDocument = mutation({
  args: {
    title:v.optional(v.string()),
    initialContent:v.optional(v.string())
  },
  handler: async (ctx,args) => {
    // do something
    const user = await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    const document = await ctx.db.insert("document",{
      title:args.title ?? "Untitled",
      ownerId:user.subject, 
      initialContent:args.initialContent
      
    });
    return document;
  },
})


export const listDocuments = query({
  args: {paginationOpts:paginationOptsValidator},
  handler: async (ctx,args) => {
    const tasks = await ctx.db.query("document").paginate(args.paginationOpts);
    return tasks;
    // do something with `tasks`
  },
});

export const removeById = mutation({
  args: {id:v.id("document")},
  handler: async (ctx, { id }) => {
     const user = await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    const document = await ctx.db.get(id);
    if(!document){
      throw new ConvexError("Document not found")
    }
    if(document.ownerId !== user.subject){
      throw new ConvexError("Unauthorized")
    }
    await ctx.db.delete(id);
  },
});

export const updateById = mutation({
  args: {id:v.id("document"),title:v.string()},
  handler: async (ctx, { id,title }) => {
     const user = await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    const document = await ctx.db.get(id);
    if(!document){
      throw new ConvexError("Document not found")
    }
    if(document.ownerId !== user.subject){
      throw new ConvexError("Unauthorized")
    }
    await ctx.db.patch(id,{title});
  },
});