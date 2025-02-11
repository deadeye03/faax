"use server"

import {  auth, getAuth } from '@clerk/nextjs/server'
import { getUser, getUserId } from './user';
import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export const addAddress = async (addresses) => {
  const mongoUserId = await getUserId();
  const { userId } = auth()
    if (!userId) {
      console.log('Unauthenticated user tried to add an address');
      return;
    }
    console.log(userId);
    try {
      const address = await prisma.address.create({
        data: {
          ...addresses,
          user: {
            connect: {
              id: mongoUserId, // Connect the address to the existing user via userId
            },
          },
        },
      });
      console.log(address);
      revalidatePath('/')
      return address;
    } catch (error) {
      console.log('Unable to add address', error);
      throw new Error('unable to add data.....')
    }
  };


export const userWithAddress=async()=>{
  const { userId } = auth()
    try {
        const address=await prisma.user.findUnique({
            where:{
                clerkId:userId
            },
            include:{
                address:true
            }
        })
        return address
        
    } catch (error) {
        console.log('unable to get user',error)
        throw new Error('unable to get user with address ',error)
    }
}
  

export const getAllPincodes=async ()=>{
    const pinCodes=await prisma.pinCode.findFirst();
    return pinCodes.pincode;
}