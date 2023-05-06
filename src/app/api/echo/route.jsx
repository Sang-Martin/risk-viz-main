import { NextResponse, NextRequest } from "next/server";
import { datas } from "@/app/data/data";


export async function GET(req) {
    const {searchParams} = new URL(req.url)
    const year = searchParams.get('year')
    const d = datas.filter(p => p.Year === Number(year))
    return NextResponse.json(d)
}