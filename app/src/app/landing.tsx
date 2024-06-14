"use client";

import { Navbar } from "./navbar";
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import anim1 from '@/static/anim1.json'

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
                            <div className="bg-[#7A2180] h-2.5 rounded-full" 
                            style={{width: "50%"}}></div>
                        </div>
                    </div>
                    <div className="pt-36">
                        <DotLottieReact
                        src={anim1}
                        loop
                        autoplay
                        />
                    </div>
                </div>
            </div>
            <div className="text-center h-10 text-white font-bold w-3/4 m-auto flex flex-nowarp bg-gradient-to-r from-[#7a2180] to-[#e40276] rounded-md"> 
                <h1 className="pt-2 pl-4">Analytics</h1>
            </div>
            
        </div>
    );
    }


export {
    Landing
}