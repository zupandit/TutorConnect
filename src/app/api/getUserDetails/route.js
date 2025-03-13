// src/app/api/getUserDetails/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request) {
  // Ensure a DB connection is established
  await connectToDB();

  // Get session from NextAuth
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch extended user details from the DB; adjust query as needed.
  const user = await User.findOne({ email: session.user.email }).populate("teachers", "name email").populate("students", "name email").lean();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
