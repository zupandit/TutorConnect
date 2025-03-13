"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUser } from "@/contexts/UserContext";

import { useState } from "react";

export default function AddUserComponent() {
  const [loading, setLoading] = useState(false);
  const {user, error} = useUser()
  const student = user.role === 'student'
  const [otherUserEmail, setotherUserEmail] = useState("")

  const handleAddUser = async (e) => {
    const userEmail = user.email;
    // e.preventDefault()
    console.log(otherUserEmail)
    setLoading(true);
    try {
      // Call your API endpoint to add the user
      const res = await fetch(`/api/add${student?'Tutor':'Student'}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail ,otherUserEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("User added successfully!");
      } else {
        alert("Error: " + (data.error || "Failed to add user"));
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user.");
    } finally {
      setLoading(false);
    }
  };

  const AddUserCard = (<Card className="w-1/2">
    <CardHeader>
      <CardTitle>Add {student? "tutor": "student"}</CardTitle>
      <CardDescription>Please enter the email</CardDescription>
    </CardHeader>
    <form onSubmit={handleAddUser}>
        <CardContent>
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="otherUserEmail" placeholder="Email of user"  value={otherUserEmail}
                    onChange={(e) => setotherUserEmail(e.target.value)}/>
            </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-center">
        <Button type="submit">Add</Button>
        </CardFooter>
    </form>
  </Card>)

  
  return loading?  <div>...adding user</div> : AddUserCard
}
