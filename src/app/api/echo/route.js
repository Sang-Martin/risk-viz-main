import { NextResponse } from "next/server";
import { datas } from "@/app/data/data";

// export async function GET(request) {
//     const {searchParams} = new URL(request.url)
//     const name = searchParams.get('name')
    
//     return NextResponse.json(name)
// }

export async function GET(req) {
    // const body = await req.json()
    return new Response({datas})
}