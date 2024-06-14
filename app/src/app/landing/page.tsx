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
        <div className="flex m-auto gap-36">
          <div className="text-left pt-36">
            <h1>Matthew John Doe</h1>
            <h3>Your perfomance this month</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#7A2180] h-2.5 rounded-full"
                style={{ width: "50%" }}></div>
            </div>
          </div>
          <div className="pt-36">
            <Lottie animationData={animationOrang} />
          </div>
        </div>
      </div>
      <div className="text-center h-10 text-white font-bold w-3/4 m-auto flex flex-nowarp bg-gradient-to-r from-[#7a2180] to-[#e40276] rounded-md">
        <h1 className="pt-2 pl-4">Analytics</h1>
      </div>
    </div>
  );
};

export default Landing;
