"use client";

import Link from "next/link";

const Navbar = () => {
    return (
        <div className="h-16 w-full bg-gradient-to-r from-[#7A2180] to-[#E40276]">
            <div className="py-4 px-4 md:px-20 flex flex-wrap gap-4 md:gap-14 justify-center md:justify-start">
                <div className="text-white font-bold text-center md:text-left">
                    <Link href="/home">Home</Link>
                </div>
                <div className="text-white font-bold text-center md:text-left">
                    <Link href="/listuser">List User</Link>
                </div>
                <div className="text-white font-bold text-center md:text-left">
                    <Link href="/analytics">Analytics</Link>
                </div>
            </div>
        </div>
    );
}

export {
    Navbar
}
