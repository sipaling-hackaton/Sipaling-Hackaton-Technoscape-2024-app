"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    // outer layer
    <div className="h-16 w-[100vw] max-w-[100vw] overflow-x-hidden  bg-gradient-to-r from-[#7A2180] to-[#E40276]">
      <div className="px-4 py-2 md:px-20 flex flex-wrap justify-center md:justify-start md:gap-14">
        <section className="flex flex-row gap-4 justify-between w-full max-w-[100vw] items-center">
          <div className="flex flex-row gap-4 justify-between w-[15rem]">
            <div className="text-white font-bold text-center md:text-left">
              <Link href="/">Home</Link>
            </div>
            <div className="text-white font-bold text-center md:text-left">
              <Link href="/crm">CRM</Link>
            </div>
            <div className="text-white font-bold text-center md:text-left">
              <Link href="/reference">Reference</Link>
            </div>
          </div>
          <Input
            className="max-w-[10rem] bg-transparent placeholder:text-white"
            readOnly
            alt=""
            placeholder="Ctrl + k to search"
          />
        </section>
      </div>
    </div>
  );
};

export { Navbar };
