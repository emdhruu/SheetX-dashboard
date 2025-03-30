"use client";
import { useAuth } from "../context/AuthContext.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image.js";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    }
  }, [user, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-full bg-slate-200 p-4">
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center ">
          <Image src="/dashboard.png" width="30" height="8" alt="icon" />
          <p className="text-xl font-serif">SheetX-Dashboard</p>
        </div>
        <div className="flex items-center gap-x-2">
          <h1 className="text-xl">Welcome , {user?.name}</h1>
          <button
            onClick={logout}
            className="px-4 py-2 items-center flex gap-x-1 bg-white text-rose-600 rounded-md cursor-pointer"
          >
            <LogOut size={20}/>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
