import { connectToDB } from "@/lib/mongodb"
import User from "@/models/User"
import argon2 from "argon2"
import { NextResponse } from "next/server"

export async function POST(request){

    try{
        await connectToDB()

        const {name, email, password, role, bio} = await request.json()

        if (!name || !email || !password || !role){
            return NextResponse.json(
                {error: "Missing fields"},
                {status: 400}
            )
        }

        //check if no duplicate user 
        const existingUser = await User.findOne({email});
        if (existingUser){
            return NextResponse.json(
                {error: "User with this email already exists"},
                {status: 400}
            )
        }

        const hashedPW = await argon2.hash(password)

        const newUser = new User({
            name,
            email,
            password: hashedPW,
            role,
            bio
        })

        await newUser.save();

        return NextResponse.json(
            {message: "User save success", user: newUser},
            {status: 201}
        )

    } catch (error){
        console.error('Error In sign up API: ', error)
        return NextResponse.json(
            {error: "Internal Server error"},
            {status: 500}
        )
    }
}