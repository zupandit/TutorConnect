// In your next-auth configuration
import { connectToDB } from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import argon2 from "argon2";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email", 
          type: "text", 
          placeholder: "Your email"
        },
        password: {
          label: "Password", 
          type: "password", 
          placeholder: "Your password"
        },
      },
      async authorize(credentials) {
        // Connect to DB
        await connectToDB();
        console.log("In Auth");
        // Find user in DB by email
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log("No such user");
          return null;
        }

        // Check password
        const isValid = await argon2.verify(user.password, credentials.password);
        if (!isValid) {
          console.log("Wrong password");
          return null;
        }
        return user;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};
