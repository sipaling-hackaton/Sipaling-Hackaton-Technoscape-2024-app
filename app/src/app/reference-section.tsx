"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useEffect, useState} from "react";

const Reference = () => {
    const [links, setLinks] = useState<string[]>([]);
    const [newLink, setNewLink] = useState("");
    const [showInput, setShowInput] = useState(false);
  
    const addLink = () => {
      if (newLink.trim() !== "") {
        setLinks([...links, newLink]);
        setNewLink("");
        setShowInput(false);
      }
    };

    return (
        <div className="h-full flex-none justify-center items-center">
            <div className="flex">
                <div className="items-start  flex flex-wrap  justify-between mx-auto p-4">
                    <div className="flex-auto w-10 m-auto">
                        <button type="button">
                            <Image width={30} height={30} src="arrowLeft.svg"
                            alt={"reference"}
                            />
                        </button>
                    </div>
                <div className="flex-initial w-100">
                    <h1 className=" bg-clip-text text-transparent bg-gradient-to-r sm:text-2xl md:text-4xl pl-16 from-[#7A2180] to-[#E40276] font-bold">
                    Website References
                    </h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-[#D9D9D9] w-2/5 items-center h-12 m-auto rounded-xl">
                <button  
                onClick={() => setShowInput(true)}
                    className="m-auto " type="button">
                    <Image src="addButton.svg" width={30} height={30} alt={"reference"}/>
                </button>
                </div>
                <div>
                {showInput && ( 
                    <div className="flex w-2/5 m-auto bg-[#D9D9D9] "> 
                    <input
                        
                        type="text"
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    <Button onClick={addLink}>Submit</Button>
                    </div>
                )}
                </div>
                <div>  
                    {links.map((link, index) => (
                        <div className="pt-9">
                    <Button className="flex flex-col bg-[#D9D9D9] w-2/5 items-center h-12 m-auto rounded-xl" key={index} asChild>
                        <a href={link} target="_blank" className="block">
                        {link}
                        </a>
                    </Button>
          </div>
                    ))}
                </div>
        </div>
    );
    }


export {
    Reference
}