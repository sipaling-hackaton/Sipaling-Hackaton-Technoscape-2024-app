"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col items-center p-5">
      <div className="relative flex justify-center items-center min-w-[100vw]">
        <Image
          className="absolute left-[10vw]"
          onClick={() => window.history.back()}
          width={30}
          height={30}
          alt="button-back"
          src="Group (1).svg"></Image>

        <p className="self-center bg-clip-text text-transparent bg-gradient-to-r sm:text-2xl md:text-4xl from-[#7A2180] to-[#E40276] font-bold">
          Website Reference
        </p>
      </div>
      <div>
        <div className="flex p-10 items-center justify-center w-[80vw] rounded-lg bg-[#d9d9d9]">
          <Image
            onClick={() => window.history.back()}
            width={30}
            height={30}
            alt="button-back"
            src="addButton.svg"></Image>
        </div>
      </div>
    </div>
  );
};

export default Reference;
