"use server"
// ./actions/user.js


import { auth, currentUser, getAuth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient();

export async function syncUser() {
    const { userId } = auth()
    if (!userId) {
        console.log("Not authenticated");
        return null;
    }

    const user = await currentUser();
    if (!user) {
        console.log("User not found");
        return null;
    }
    const name = `${user.firstName} ${user.lastName}`.trim();
    const emails = user.emailAddresses[0].emailAddress;
    const phoneNumbers = user.phoneNumbers[0].phoneNumber;
    console.log('emails aare ',emails)
    const users = await prisma.user.upsert({
        where: { clerkId: userId },
        update: {
            name: name,
            email: emails,
            phoneNumber: phoneNumbers,
        },
        create: {
            clerkId: userId,
            name: name,
            phoneNumber: phoneNumbers,
            email: emails,
        },
    });
    console.log('my users',users)
    return users;
}

export async function getUserId(){
    const { userId } = auth()
    if (!userId) {
        console.log("Not authenticated");
        return null;
    }
    try {
        const user = await prisma.user.findFirst({
            where:{
               clerkId: userId
            }
        })
        // console.log(user)
        return user.id
        
    } catch (error) {
        console.log('unabel to get id',error);
        throw new Error('unable to get id',error)
    }
}