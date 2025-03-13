"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarComp } from "../components/CalendarComp";
import { UserProvider } from "@/contexts/UserContext";
import AddUserComponent from "../components/AddUserComponent";
import User from "@/models/User";

function DashboardContent() {
  const { data: session, status } = useSession();

  if (status === "loading") return (
    <div className="h-screen flex justify-center items-center">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
  if (!session) return <p>You are not logged in.</p>;

  return (
    <div className="flex">
      <div className="w-1/2 p-3  flex-row justify-items-center">       
        <h1>Welcome, {session.user.name}</h1>
        <p>Email: {session.user.email}</p>
        <CalendarComp/>
      </div>
      <div className="w-1/2 p-2 flex justify-center items-center">
        <AddUserComponent/>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <SessionProvider>
      <UserProvider>
        <DashboardContent />
      </UserProvider>
    </SessionProvider>
  );
}
