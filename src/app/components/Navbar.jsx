'use client'

import React from 'react';
import Image from 'next/image';
import Logo from '../../../public/student.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="relative flex items-center justify-between p-6 bg-white shadow-md rounded-lg">
            {/* Left Section: Logo & Links */}
            <div className="flex items-center space-x-8">
                <Image src={Logo} alt="User using a laptop. Logo" className="h-8 w-8" />
                <div className="flex space-x-6 text-gray-600">
                    <Link href="/" className={`hover:text-black ${pathname === '/' ? 'text-black border-b-2 border-blue-500' : ''}`}>Home</Link>
                    <Link href="/dashboard" className={`hover:text-black ${pathname === '/dashboard' ? 'text-black border-b-2 border-blue-500' : ''}`}>Dashboard</Link>
                    <Link href="/api/auth/signin" className={`hover:text-black ${pathname === '/api/auth/signin' ? 'text-black border-b-2 border-blue-500' : ''}`}>Signin</Link>
                    <Link href="/about" className={`hover:text-black ${pathname === '/about' ? 'text-black border-b-2 border-blue-500' : ''}`}>About</Link>
                </div>
            </div>

            {/* Centered Title */}
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-5xl font-semibold">
                TutorConnect
            </h1>
        </nav>
    );
}
