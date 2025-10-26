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
    const organizationId = user.organization_id as string | undefined;

    
    const document = await ctx.db.insert("document",{
      title:args.title ?? "Untitled",
      ownerId:user.subject, 
      organizationId:organizationId,
      initialContent:args.initialContent
      
    });
    return document;
  },
})


export const listDocuments = query({
  args: {paginationOpts:paginationOptsValidator,search:v.optional(v.string())},
  handler: async (ctx,{paginationOpts,search}) => {
    const user = await ctx.auth.getUserIdentity();
    console.log({user});
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    console.log({organizationId:user.organization_id});
    const organizationId = user.organization_id as string | undefined;
    if( search && organizationId){
      const tasks = await ctx.db.query("document").withSearchIndex('search_title',(q)=>q.search('title',search).eq('organizationId',organizationId)).paginate(paginationOpts);
      return tasks;
    } 

    if(organizationId){
      const tasks = await ctx.db.query("document").withIndex("by_organization_id",(q)=>q.eq("organizationId",organizationId)).paginate(paginationOpts);
      return tasks;
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

export const getById = query({
  args: {id:v.id("document")},
  handler: async (ctx, { id }) => {
    const document = await ctx.db.get(id);
    return document;
  },
});

export const getByIds = query({
  args: {ids:v.array(v.id("document"))},
  handler: async (ctx, { ids }) => {
    const document = [];
    for(const id of ids){
      const doc = await ctx.db.get(id);
      if(doc){
        document.push({id:doc._id,name:doc.title});
      }else{
        document.push({id, name:"Deleted Document"});
      }
    }
    return document;
  },
});