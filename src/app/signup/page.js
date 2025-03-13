"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Adjust these imports to match your project's component locations.
// For example, you might have shadcn components in your project.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    bio: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
        console.log("Here")
        console.log('Form data: ' + JSON.stringify(formData))
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        // On successful signup, redirect to login page or dashboard
        router.push("api/auth/signin");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name" className="mb-1 block">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="mb-1 block">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="mb-1 block">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="role" className="mb-1 block">I am a</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>
          <div className="mb-6">
            <Label htmlFor="bio" className="mb-1 block">Bio (optional)</Label>
            <Input
              id="bio"
              name="bio"
              type="text"
              placeholder="Tell us a little about yourself"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full hover:shadow-xl hover:cursor-pointer border-2">Sign Up</Button>
        </form>
      </div>
    </div>
  );
}
