"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Lottie from "lottie-react";
import animationCS from "../../../public/csAnimate.json";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setError("");
      // handle successful form submission here (e.g., API call)
      console.log("Form submitted successfully");
    } else {
      setError("Please fill in all fields correctly");
    }
  };

  return (
    <div className="pt-[6rem] flex flex-col lg:flex-row w-full h-full justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-56 w-full max-w-6xl">
        <form
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          onSubmit={handleSubmit}
        >
          <p className="font-bold text-2xl">Login</p>
          <div className="pt-8 w-72 lg:w-96 pb-8">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              className="text-sm rounded-3xl shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight"
              id="email"
              type="email"
              placeholder="sipalinghackaton@ymail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="m-auto w-3/5 flex justify-center lg:justify-start mt-[3rem]">
            <Link href="/" className="w-full">
              <button
                className="text-white w-full bg-gradient-to-r from-[#7a2180] to-[#e40276] cursor-pointer hover:opacity-75 rounded-full px-8 py-2"
                type="submit"
              >
                Login
              </button>
            </Link>
          </div>
        </form>
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
