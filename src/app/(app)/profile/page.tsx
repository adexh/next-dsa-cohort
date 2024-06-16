import Image from "next/image";
import Form from "@/app/(app)/profile/form";
import Link from "next/link";

export default function Login() {
  return (<>
    <div className="flex justify-between mt-4 mr-24"><Link href='/'className="text-4xl font-mono font-medium ml-24">DSA Cohort<span className="text-lg">By Adesh</span></Link><Link href={"/profile"}><Image src={"/undraw_profile.svg"} alt="profile-icon" width={60} height={60} className="transition-transform hover:scale-105" /></Link></div>
    <div className="flex w-screen items-center justify-center">
      <div className="z-10 w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Profile</h3>
        </div>
        <Form />
      </div>
    </div>
  </>
  );
}