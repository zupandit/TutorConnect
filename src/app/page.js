import Image from "next/image";
import Student from "../../public/landingStudent.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-25 flex items-center justify-between px-10 py-6">
      {/* Left side */}
      <div className="max-w-lg">
        <h1 className="text-6xl font-bold text-gray-900">
          The Easiest Way to Manage Your Students
        </h1>
        <p className="mt-6 text-gray-600 text-xl">
          Simplify online lessons with your existing tutors. 
          Manage your schedule, get auto-email reminders, and review past lessons—all in one place.
          <br/> Run your independent tutoring buisness like a PRO!
        </p>
        <Link href="/signup" className="inline-block mt-4 px-10 py-4 bg-green-500 rounded-2xl font-bold text-white text-lg hover:shadow-lg">Sign Up Today</Link>
      </div>

      {/* Right side */}
      <div className="w-1/2">
        <Image src={Student} alt="Student on laptop" width={500} height={500} className="object-cover" />
      </div>
    </div>
  );
}
