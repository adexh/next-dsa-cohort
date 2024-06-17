"use client";

import { useEffect, useState } from "react";
import LoadingDots from "@/components/ui/loading-dots";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";
import { error } from "console";

const signupSchema = z.object({
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

export default function ProfileUpdateForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema)
  })

  function onSubmit(values: z.infer<typeof signupSchema>) {
    setLoading(true);
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.ok) {
          signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password
            //@ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              toast.error("Account created Login Failed!");
            } else {
              toast.success("Account created! Redirecting");
              router.push('/')
            }
          });
        } else {
          res.json().then(json => {
            setLoading(false);
            toast.error(json.message);
          })
        }
      })
  }

  return (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSubmit)} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
        <FormField
          control={signupForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormDescription>Use the same email filled in the MS form shared</FormDescription>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="example@email.com"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>)}
        />
        <FormField
          control={signupForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Your Name"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>)}
        />
        <FormField
          control={signupForm.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="9998887776"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>)}
        />
        <FormField
          control={signupForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>
                Minimum 6 characters <br/>
                Atleast one lowercase, uppercase and number
              </FormDescription>
              <FormControl>
                <Input
                  disabled={loading}
                  type="password"
                  placeholder="*****"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>)}
        />
        <FormField
          control={signupForm.control}
          name="cnfm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="password"
                  placeholder="*****"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>)}
        />
        <Button
          type="submit"
          disabled={loading}
          className={loading ? "cursor-not-allowed border-gray-200 bg-gray-100" : ""}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <p><span className="flex justify-center items-center">Create Account</span></p>
          )}
        </Button>
      </form>
    </Form>
  );
}