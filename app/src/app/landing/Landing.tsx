"use client";

import { Navbar } from "../navbar";
import Lottie from "lottie-react";
import animationOrang from "../../../public/Animation - 1718388032288.json";
import Example from "@/components/ui/piechart";

interface ILanding {
  chat: number;
  exp: number;
}

const Landing = ({ chat, exp }: ILanding) => {
  console.log("exp", exp);
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap mb-24">
        <div className="md:px-12 flex flex-col lg:flex-row m-auto gap-8 lg:gap-80">
          <div className="text-center  lg:text-left pt-16 lg:pt-64 ">
            <p className="font-bold text-2xl  lg:text-5xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text">
              Mathew John Doe
            </p>
            <p className="text-xl lg:text-3xl font-bold pb-2">
              Your Experience
            </p>
            <div className="m-auto w-11/12 lg:w-full bg-gray-300 rounded-full h-5 dark:bg-gray-700 overflow-x-hidden">
              <div
                className="bg-[#7A2180] h-5 rounded-full"
                style={{ width: (exp % 100) + 1 + "%" }}></div>
            </div>
          </div>
          <div className="pt-16 lg:pt-36">
            <Lottie
              className="max-w-72 lg:max-w-96"
              animationData={animationOrang}
            />
          </div>
        </div>
      </div>
      <div className="mb-12 text-center h-16 text-white font-bold w-11/12 lg:w-4/5 m-auto flex flex-wrap lg:flex-nowrap bg-gradient-to-r from-[#7a2180] to-[#e40276] rounded-md">
        <h1 className="pt-4 pl-4 text-xl lg:text-2xl">Analytics</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-56 m-auto lg:justify-center px-4 ">
        <div className="bg-[#F0E2E9] lg:w-[20rem] h-[13rem] flex flex-col justify-center items-center rounded-xl">
          <h1 className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text">
            {chat}
          </h1>
          <h2 className="text-center fit-content font-bold text-lg lg:text-xl bg-gradient-to-r from-[#7a2180] to-[#e40276] text-transparent bg-clip-text">
            Question Answered
          </h2>
        </div>
        <div className=" bg-[#F0E2E9] w-full lg:w-[20rem] h-[13rem] flex flex-col justify-center items-center rounded-xl">
          <p className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text">
            {((chat * 10) / 3600).toFixed(2)}
          </p>
          <h2 className="font-bold text-lg lg:text-xl bg-gradient-to-r from-[#7a2180] to-[#e40276] text-transparent bg-clip-text">
            Active Hours
          </h2>
        </div>
      </div>
      <div className="lg:w-[20rem] h-[13rem] flex flex-col justify-center items-center rounded-xl m-auto pt-[8rem]">
        <p className="font-bold text-2xl  lg:text-2xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text mt-20">
          Chart
        </p>
        <Example />
      </div>
    </div>
  );
};

export default Landing;
export { Landing };
