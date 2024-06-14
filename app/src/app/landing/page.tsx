"use client";

import React from "react";
import { Navbar } from "../navbar";
import Lottie from "lottie-react";
import animationOrang from "../../../public/Animation - 1718388032288.json";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-nowarp mb-24">
        <div className="flex m-auto gap-80">
          <div className="text-left pt-64">
            <h1 className="font-bold text-5xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text">Mathew John Doe</h1>
            <h3 className="text-2xl font-bold pb-2">Your perfomance this month</h3>
            <div className="w-full bg-gray-200 rounded-full h-5 dark:bg-gray-700">
              <div
                className="bg-[#7A2180] h-5 rounded-full"
                style={{ width: "50%" }}></div>
            </div>
          </div>
          <div className="pt-36">
            <Lottie className="max-w-96"animationData={animationOrang} />
          </div>
        </div>
      </div>
      <div className="text-center h-16 text-white font-bold w-3/5 m-auto flex flex-nowarp bg-gradient-to-r from-[#7a2180] to-[#e40276] rounded-md">
        <h1 className="pt-4 pl-4 text-2xl">Analytics</h1>
      </div>
      <div className="flex flex-nowarp mt-12 mb-14 ">
        <div className="flex m-auto gap-80 items-center " >
            <div className="w-80 h-52 bg-black items-center">
            <div className="text-center">
              <h1 className="font-bold text-4xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text">10,000</h1>
              <h2 className="font-bold text-xl bg-gradient-to-r from-[#7a2180] to-[#e40276]  text-transparent bg-clip-text">Question Answered</h2>
            </div>
            </div>
            <div className="w-80 h-52 bg-black items-center">
                <div className="bg-black text-center">
                  <h1 className="font-bold text-4xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text">±83.33</h1>
                  <h2 className="font-bold text-xl bg-gradient-to-r from-[#7a2180] to-[#e40276]  text-transparent bg-clip-text">Active Hours</h2>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Landing;
