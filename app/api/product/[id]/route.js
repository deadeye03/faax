import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

//CREATE PRODUCT USING API

// Create a single instance of PrismaClient to be used across requests
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const item = await request.json();

    // Validate the incoming data (basic example, you might want more thorough validation)
    if (!item || typeof item !== 'object') {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    // Create the product using Prisma
    const data = await prisma.product.create({
      data: item
    });

    if (data) {
      return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Product adding failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error adding product:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error adding product', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Error adding product' }, { status: 500 });
  }
} 


// export async function PUT(request) {
//   try {
//     const item = await request.json();

//     // Validate the incoming data (basic example, you might want more thorough validation)
//     if (!item || typeof item !== 'object') {
//       return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
//     }

//     // Create the product using Prisma
//     const data = await prisma.product.findUnique({
//       where:
//       data: item
//     });

//     if (data) {
//       return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
//     } else {
//       return NextResponse.json({ message: 'Product adding failed' }, { status: 400 });
//     }
//   } catch (error) {
//     console.error('Error adding product:', error);
//     if (error instanceof Error) {
//       return NextResponse.json({ message: 'Error adding product', error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ message: 'Error adding product' }, { status: 500 });
//   }
// } 