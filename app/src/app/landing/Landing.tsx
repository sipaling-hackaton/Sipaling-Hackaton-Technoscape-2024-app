"use client";

import { Navbar } from "../navbar";
import Lottie from "lottie-react";
import animationOrang from "../../../public/Animation - 1718388032288.json";
import Example from "@/components/ui/piechart";
import badge1 from "../../../public/Animation - 1718449578725.json";
import badge2 from "../../../public/Animation - 1718451815098.json";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ILanding {
  sentiment: any;
  chat: number;
  exp: number;
}

const Landing = ({ sentiment, chat, exp }: ILanding) => {
  console.log("exp", exp);
  return (
    <TooltipProvider>
      <div className="flex flex-col items-center min-w-[100vw] max-w-[100vw] overflow-x-hidden">
        <Navbar />
        <div className="min-w-[100vw] flex flex-col lg:flex-row flex-wrap justify-center lg:justify-around items-center lg:items-center mb-24 min-h-[70vh]">
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left ">
            <p className="font-bold w-full text-center lg:text-start text-2xl  lg:text-5xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text">
              Mathew John Doe
            </p>
            <p className="text-center lg:text-start w-full mt-10 text-xl lg:text-3xl font-bold pb-2">
              Your Exp
            </p>
            <div className="w-11/12 lg:w-full bg-gray-300 rounded-full h-5 dark:bg-gray-700 overflow-x-hidden">
              <div
                className="bg-[#7A2180] h-5 rounded-full"
                style={{ width: (exp % 100) + 1 + "%" }}></div>
            </div>
            <p className="text-[#6f7174] mt-5">
              Let’s do this! Just 30 more to snag that shiny new badge!
            </p>

            <div className="w-full flex mt-10 items-center justify-center lg:justify-start">
              <div className="flex flex-col min-w-[10rem] jusitfy-center items-center">
                <Tooltip>
                  <TooltipTrigger>
                    <Lottie className="w-[5rem]" animationData={badge1} />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p>handled 100 user a day</p>
                  </TooltipContent>
                </Tooltip>

                <p className="text-center">Good Start</p>
              </div>
              <div className="flex flex-col min-w-[10rem] jusitfy-center items-center">
                <Tooltip>
                  <TooltipTrigger>
                    <Lottie className="w-[5rem]" animationData={badge2} />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p>handled 100.000 user</p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-center">Fly High</p>
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <Lottie
              className="max-w-72 lg:max-w-96"
              animationData={animationOrang}
            />
          </div>
        </div>
        <div className="text-center h-16 text-white font-bold w-11/12 lg:w-4/5 flex flex-wrap lg:flex-nowrap bg-gradient-to-r from-[#7a2180] to-[#e40276] rounded-md">
          <h1 className="pt-4 pl-4 text-xl lg:text-2xl">Analytics</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-56 lg:justify-center px-4 ">
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
        <div className="mb-10 lg:w-[20rem] h-[30rem] flex flex-col justify-center items-center rounded-xl pt-[8rem]">
          <p className="font-bold text-2xl  lg:text-2xl bg-gradient-to-r from-[#7a2180] to-[#e40276] inline-block text-transparent bg-clip-text mt-20">
            Chart
          </p>
          <Example />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Landing;
export { Landing };
