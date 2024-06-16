import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

const reqSchema = z.object({
  password: z.string().min(2).max(50),
  email: z.string().min(2).email()
})

export async function POST(req : NextRequest) {
  const token = await getToken({ req })

  if(!token){
    return NextResponse.json({error: 'Unauthorized Access!'}, {status: 401});
  }

  const bodyJson = await req.json();

  const response = reqSchema.safeParse(bodyJson);
  if (!response.success) {
    const { errors } = response.error;
  
    return NextResponse.json( { error: { message: "Invalid request", errors } }, { status : 400 } );
  }

  try {
    const pwHash = bcrypt.hashSync(response.data.password);

    await db.update(users).set({ password : pwHash }).where(eq(users.email, response.data.email));
    return NextResponse.json({message : "Updated successfully"}, {status: 200});

  } catch (error) {
    console.error(error);
    return NextResponse.json({message : "Update Failed", error : error}, {status : 500})
  }
}