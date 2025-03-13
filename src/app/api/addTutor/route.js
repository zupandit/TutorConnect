import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(request) {
  try {
    await connectToDB();

    const { userEmail, otherUserEmail } = await request.json();
    console.log('Student ' + userEmail)
    console.log('Tutor' + otherUserEmail)

    const student = await User.findOne({ email: userEmail });
    if (!student || student.role.toLowerCase() !== "student") {
      return NextResponse.json(
        { error: "No such student" },
        { status: 400 }
      );
    }

    // Find the tutor and verify role is 'tutor'
    const tutor = await User.findOne({ email: otherUserEmail });
    if (!tutor || tutor.role.toLowerCase() !== "tutor") {
      return NextResponse.json(
        { error: "No such tutor" },
        { status: 400 }
      );
    }

    // Check if the tutor is already added to the student's teachers array
    if (student.teachers.includes(tutor._id)) {
      return NextResponse.json(
        { error: "Tutor already added to this student" },
        { status: 400 }
      );
    }

    // Add the tutor to the student's teachers array
    student.teachers.push(tutor._id);
    await student.save();

    return NextResponse.json(
      { message: "Tutor added successfully", student },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating student's tutors:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
