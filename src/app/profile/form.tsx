"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/ui/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        signIn("email", {
          redirect: false,
          email: e.currentTarget.email.value,
          // @ts-ignore
        }).then(({ error }) => {
          if (error) {
            setLoading(false);
            toast.error(error);
          } else {
            toast.success("Check your email for the Login/Sign-up link",{duration:36000});
          }
        });
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-md text-gray-600"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue="hiphen@nexthrm.co"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-md text-gray-600"
        >
          Name
        </label>
        <input
          id="email"
          name="email"
          type="text"
          defaultValue="Adesh Tamrakar"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-md text-gray-600"
        >
          Contact
        </label>
        <input
          id="email"
          name="email"
          type="number"
          defaultValue='99947499123'
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <button
        disabled={loading}
        className={`${loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p><span className="flex justify-center items-center">Update</span></p>
        )}
      </button>
    </form>
  );
}