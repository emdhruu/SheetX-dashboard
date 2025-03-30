"use client";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect to dashboard if user is already logged in
    }
  }, [user, router]);

  const handleLogin = async () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <>
      <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center">
        <div className="mb-20 flex items-center flex-col sm:flex-row gap-2">
          <Image src="/dashboard.png" width="35" height="20" alt="icon" />
          <p className="text-4xl font-serif">SheetX-Dashboard</p>
        </div>
        <div className="bg-white rounded-3xl p-3 flex h-[250px]  w-full max-w-sm sm:mx-3.5 items-center">
          <div className="flex  items-center w-full flex-col space-y-2.5">
            <h1 className="text-xl font-medium tracking-tight flex flex-col items-center">
              <span>Holla,</span>
              <span>Welcome to your trust app</span>
            </h1>
            <span className="text-sm text-gray-500 font-light">
              Real-time Google Sheets management.
            </span>
            <div className="mt-2 p-2 w-full max-w-xs border rounded-2xl border-slate-200">
              <button
                className="flex w-full justify-evenly"
                onClick={handleLogin}
              >
                <span>Login with Google.</span>
                <Image
                  src="/google.png"
                  width={23}
                  height={2}
                  alt="google-img"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-4 text-center">
          <p>All copyrights are reserved by dhruti thakkar ❤️.</p>
        </div>
      </div>
    </>
  );
}
