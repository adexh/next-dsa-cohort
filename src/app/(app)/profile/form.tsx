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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";

const profileFormSchema = z.object({
  email: z.string().min(2).max(250).email('This is not a valid email'),
  name: z.string().min(4).max(250),
  contact: z.string().min(10,'Minimum 10 digits').max(10, 'Max 10 digits')
})

type propsType = {
  setLoading : React.Dispatch<React.SetStateAction<any>>,
  loading : boolean,
  profileData : UserProfile
}

export default function ProfileUpdateForm({setLoading, loading, profileData} : propsType) {

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues : {
      name : profileData.name,
      contact : profileData.contact,
      email : profileData.email
    }
  })

  const reset = profileForm.reset;

  useEffect(()=>{
    reset({
      name : profileData.name,
      email : profileData.email,
      contact : profileData.contact
    })
  },[profileData, reset])

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    setLoading(true);
    fetch('/api/user/updateUserProfile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then( res => {
      setLoading(false);
      if(res.ok){
        toast.success("Update Sucessfully!");
      } else {
        toast.error("Update Failed!");
      }
    })
  }

  return (
    <>
      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onSubmit)} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>)}
          />
          <FormField
            control={profileForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>)}
          />
          <FormField
            control={profileForm.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
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
              <p><span className="flex justify-center items-center">Update</span></p>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}