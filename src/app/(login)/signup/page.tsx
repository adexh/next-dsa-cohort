import Form from "@/app/(login)/signup/form";

export default function signup() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-5/6 md:w-full md:max-w-xl overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Register</h3>
        </div>
        <Form />
      </div>
    </div>
  );
}