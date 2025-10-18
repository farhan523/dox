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
  args: {paginationOpts:paginationOptsValidator,search:v.optional(v.string())},
  handler: async (ctx,{paginationOpts,search}) => {
    const user = await ctx.auth.getUserIdentity();

    if(!user){
      throw new ConvexError("Unauthorized")
    }

    if(search){
      const tasks = await ctx.db.query('document').withSearchIndex('search_title',(q)=>q.search('title',search)).paginate(paginationOpts);
      return tasks;
    }
    const tasks = await ctx.db.query("document").withIndex("by_owner_id",(q)=>q.eq("ownerId",user.subject)).paginate(paginationOpts);
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