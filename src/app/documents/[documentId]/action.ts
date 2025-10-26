"use server"

import {auth, clerkClient} from "@clerk/nextjs/server";

export async function getUsers(){
    const {sessionClaims} = await auth();
    const clerk = await clerkClient()
   
    const response = await clerk.users.getUserList({
        organizationId: [sessionClaims?.o.id],
    });
    
   
    const users = response.data.map((user)=>({
        id:user.id,
        name:user.firstName || "Anonymous",
        avatar:user.imageUrl
    }));

    return users;
}