"use client"
import Form from "@/app/(app)/profile/form";
import PasswordUpdateForm from "./password-form";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [ loading, setLoading ] = useState(true);
  const [ userProfile, setUserProfile ] = useState<UserProfile>({
    name: '',
    email : '',
    contact : ''
  });

  useEffect(()=>{
    const fetchProfileData = async () => {
      setLoading(true);
      const data = await fetch('/api/user/getUserProfile')
      if( !data.ok ) {
        toast.error('Please logout signin again!');
      } else {
        const profileData : UserProfile = await data.json();
        setUserProfile(profileData)
        setLoading(false);
      }
    }
    fetchProfileData();
  },[])

  return (<>
    <Header />
    <div className="h-full bg-gray-200 flex justify-center">
      <div className="w-5/6 my-20 overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Profile</h3>
        </div>
        <Form setLoading={setLoading} loading={loading} profileData={userProfile}/>
        <div className="border-2 border-gray-200" />
        <div className="bg-gray-50 pt-5 text-md px-16 text-black underline underline-offset-2">Change Password</div>
        <PasswordUpdateForm setLoading={setLoading} loading={loading} profileData={userProfile} />
      </div>
    </div>
  </>
  );
}