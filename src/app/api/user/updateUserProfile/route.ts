import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse  } from "next";
import { db } from "@/lib/db";
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const reqSchema = z.object({
  email: z.string().min(2).max(250).email('This is not a valid email'),
  name: z.string().min(4).max(250),
  contact: z.string().min(10,'Minimum 10 digits').max(10, 'Max 10 digits')
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
    await db.update(users).set({ name: response.data.name, contact: response.data.contact, email: response.data.email }).where(eq(users.email, response.data.email));

    return NextResponse.json({message : "Updated successfully"}, {status: 200});

  } catch (error) {
    console.error(error);
    return NextResponse.json({message : "Update Failed", error : error}, {status : 500})
  }
}