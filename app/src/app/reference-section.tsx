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
        <div class="h-full flex-none justify-center items-center">
            <div class="flex">
                <div class="items-start  flex flex-wrap  justify-between mx-auto p-4">
                    <div class="flex-auto w-10 m-auto">
                        <button type="button">
                            <Image width={30} height={30} src="arrowLeft.svg"/>
                        </button>
                    </div>
                <div class="flex-initial w-100">
                    <h1 class=" bg-clip-text text-transparent bg-gradient-to-r sm:text-2xl md:text-4xl pl-16 from-[#7A2180] to-[#E40276] font-bold">
                    Website References
                    </h1>
                    </div>
                </div>
            </div>
            <div class="flex-none">
            <div class="flex bg-[#D9D9D9] w-2/5 h-12 m-auto rounded-xl">
                            <button  
                            onClick={() => setShowInput(true)}
                             class="m-auto " type="button">
                                <Image src="addButton.svg" width={30} height={30}/>
                            </button>
                            {showInput && ( 
                                <div className="flex space-x-2"> 
                                <input
                                    type="text"
                                    value={newLink}
                                    onChange={(e) => setNewLink(e.target.value)}
                                    className="border rounded px-2 py-1"
                                />
                                <Button onClick={addLink}>Submit</Button>
                                </div>
                            )}
                            <div className="flex space-y-2"> 
                                {links.map((link, index) => (
                                <Button key={index} asChild>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                                    {link}
                                    </a>
                                </Button>
                                ))}
                            </div>
                </div>
                </div>
        </div>
    );
    }


export {
    Reference
}