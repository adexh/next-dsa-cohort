"use client";

import LoadingDots from "@/components/ui/loading-dots";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const pswdFormSchema = z.object({
  password: z.string().min(6, 'Must be min 6 characters').max(50)
  .regex(/(?=.*[a-z])/,'Atleast one lower case')
  .regex(/(?=.*[A-Z])/,'Atleast one upper case')
  .regex(/(?=.*\d)/, 'Atleast one digit')
  .refine(s => !s.includes(' '), 'No Spaces!')
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

type propsType = {
  setLoading : React.Dispatch<React.SetStateAction<any>>,
  loading : boolean,
  profileData : UserProfile
}

export default function PasswordUpdateForm({setLoading, loading, profileData} : propsType) {

  const pswdForm = useForm<z.infer<typeof pswdFormSchema>>({
    resolver: zodResolver(pswdFormSchema),
    defaultValues : {
      password : '',
      cnfm_password : ''
    }
  })

  const reset = pswdForm.reset;

  function onSubmit(values: z.infer<typeof pswdFormSchema>) {
    setLoading(true);
    const reqJson = {
      "password" : values.password,
      "email" : profileData.email
    }
    fetch('/api/user/userChangePswd', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqJson)
    })
    .then( res => {
      setLoading(false);
      if(res.ok){
        toast.success("Password updated Sucessfully!");
        reset();
      } else {
        toast.error("Update Failed!");
      }
    })
  }

  return (
    <>
      <Form {...pswdForm}>
        <form onSubmit={pswdForm.handleSubmit(onSubmit)} className="flex flex-col space-y-4 bg-gray-50 px-4 pt-4 pb-8 sm:px-16">
          <FormField
            control={pswdForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="New Password"
                    type="password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>)}
          />
          <FormField
            control={pswdForm.control}
            name="cnfm_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirm New Password"
                    type="password"
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