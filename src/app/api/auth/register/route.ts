import { db } from "@/lib/db";
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { allowedEmails } from "@/lib/schema";
import bcrypt from "bcryptjs"

const reqSchema = z.object({
  email: z.string().min(2).max(250).email('This is not a valid email').transform(val=>val.trim()),
  name: z.string().min(4).max(250).transform(val=>val.trim()),
  contact: z.string().min(10, 'Minimum 10 digits').max(10, 'Max 10 digits').transform(val=>val.trim()),
  password: z.string().min(6, 'Must be min 6 characters').max(50)
    .regex(/(?=.*[a-z])/, 'Atleast one lower case')
    .regex(/(?=.*[A-Z])/, 'Atleast one upper case')
    .regex(/(?=.*\d)/, 'Atleast one digit')
    .regex(/^\S*$/, 'No Spaces!')
  ,
  cnfm_password: z.string(),
}).superRefine(({ cnfm_password, password }, ctx) => {
  if (cnfm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['cnfm_password']
    });
  }
});

export async function POST(req : NextRequest) {
  const bodyJson = await req.json();
  
  const response = reqSchema.safeParse(bodyJson);
  if (!response.success) {
    const { errors } = response.error;
  
    return NextResponse.json( { error: { message: "Invalid request", errors } }, { status : 400 } );
  }

  try {

    const [result] = await db.select({email : allowedEmails.email}).from(allowedEmails).where(eq(allowedEmails.email, response.data.email));

    if( !result ) {
      return NextResponse.json({message: "Email not registered"}, {status: 400});
    }

    const [existingEmail] = await db.select({}).from(users).where(eq(users.email, response.data.email));
    if ( existingEmail ) {
      return NextResponse.json({message : "User exists!"}, {status: 402});
    }

    const pwHash = bcrypt.hashSync(response.data.password);

    await db.insert(users).values({name: response.data.name, email: response.data.email, contact: response.data.contact, password: pwHash});

    return NextResponse.json({message : "Created successfully"}, {status: 200});

  } catch (error) {
    console.error(error);
    return NextResponse.json({message : "Update Failed", error : error}, {status : 500})
  }
}