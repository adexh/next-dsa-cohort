import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { jsonData } from "@/lib/schema";

export async function GET(req : NextRequest) {
  const token = await getToken({ req })

  if(!token){
    return Response.json({error: 'Unauthorized Access!'}, { status: 400 })
  }

  const [result] = await db.select().from(jsonData).where(eq(jsonData.data_type,'problems')).limit(1);

  const respData = result.data

  return Response.json(respData,{status:200});
}