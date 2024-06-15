"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Lottie from "lottie-react";
import animationCS from "../../../public/csAnimate.json";

const LoginPage = async () => {
  return (
    <div className="pt-[6rem] flex flex-col lg:flex-row w-full h-full justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-56 w-full max-w-6xl">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className=" font-bold text-2xl">Login</p>
          <div className="pt-8 w-72 lg:w-96 pb-8">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              className="text-sm rounded-3xl shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight"
              id="username"
              type="text"
              placeholder="sipalinghackaton@ymail.com"
              required
            />
          </div>
          <div className="w-72 lg:w-96">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              className="text-sm rounded-3xl shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight"
              id="password"
              type="password"
              placeholder="*************"
              required
            />
          </div>
          <div className="m-auto w-3/5 flex justify-center lg:justify-start mt-[3rem]">
            <Link href="/">
              <Button
                className="w-full bg-gradient-to-r from-[#7a2180] to-[#e40276] cursor-pointer hover:opacity-75 rounded-full px-8 py-2"
                type={"submit"}
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start pt-8 lg:pt-0">
          <Lottie
            className="max-w-xs lg:max-w-lg"
            animationData={animationCS}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
