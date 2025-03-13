// scripts/seedUser.js
import mongoose from "mongoose";
import argon2 from "argon2";
import User from "../src/models/User.js"
import { connectToDB } from "../src/lib/mongodb.js";

async function seedUser() {
  await connectToDB();

  const username = "testuser";
  const email = "test@example.com";
  const plainPassword = "password123";

  // Hash the password using Argon2
  const hashedPassword = await argon2.hash(plainPassword);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();
  console.log("User seeded successfully");
  process.exit(0);
}

seedUser().catch((error) => {
  console.error("Error seeding user:", error);
  process.exit(1);
});
