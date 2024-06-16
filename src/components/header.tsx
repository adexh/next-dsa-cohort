import { ProfileDropDown } from "./profile-dropdown";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between ml-2 mr-2 md:mr-24 md:ml-24 h-16">
      <Link href={'/'} className="text-2xl mt-4 md:text-4xl font-mono font-medium">
        DSA Cohort<span className="text-sm md:text-lg">By Adesh</span>
      </Link>
      <ProfileDropDown className="" >
        <Image src={"/undraw_profile.svg"} alt="profile-icon" width={60} height={60} className="transition-transform hover:scale-105" />
      </ProfileDropDown>
    </div>
  )
}