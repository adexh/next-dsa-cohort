import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse  } from "next";
import { db } from "@/lib/db";
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  const token = await getToken({ req })

  if(!token){
    return Response.json({error: 'Unauthorized Access!'}, { status: 400 })
  }

  if( !token.email ) {
    return Response.json({error: 'Please logout and signIn again!'}, {status : 401})
  }

  const [data] = await db.select({name: users.name, email: users.email, contact: users.contact})
  .from(users)
  .where(eq(users.email, token.email))
  .limit(1);

  const userData = {
    name: data.name,
    contact: data.contact,
    email: data.email
  }

  return Response.json(userData);
}