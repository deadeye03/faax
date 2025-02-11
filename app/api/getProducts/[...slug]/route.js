import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";


// Create a single instance of PrismaClient to be used across requests


export async function GET(request, { params }) {
    console.log(params);
    const slugs = params.slug
    const category = slugs[0]
    const id = slugs[1]

    if (id) {
        // This part handles single product requests
        const product = await prisma.product.findUnique({
            where: { category, id }
        })
        return NextResponse.json(product, { status: 200 })
    } else {
        // This part handles category-based requests
        const products = await prisma.product.findMany({
            where: { category }
        })
        return NextResponse.json(products, { status: 200 })
    }
}