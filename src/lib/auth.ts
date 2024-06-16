import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      //@ts-ignore
      async authorize(credentials) {
        if( !credentials?.password ) return null;
        try {
          const response = await db.select({id: users.id, name: users.name, pass: users.password, email: users.email}).from(users);
          if(response.length > 0) {
            const hash = response[0].pass;
            if( bcryptjs.compareSync(credentials?.password, hash) ) {
              return {
                id : response[0].id,
                name : response[0].name,
                email : response[0].email
              }
            } else {
              return null;
            }
            
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login"
  }
};