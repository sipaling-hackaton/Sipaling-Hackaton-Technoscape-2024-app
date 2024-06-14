"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Reference = () => {
  const [links, setLinks] = useState<string[]>([]);

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const onChangeInput = (e: any, index: number) => {
    setLinks((prev) => {
      const removedLink = [...prev];
      removedLink[index] = e.target.value;
      return removedLink;
    });
  };

  const saveLinks = () => {};

  useEffect(() => {
    console.log(links);
  }, [links]);

  return (
    <div className="flex flex-col items-center p-5">
      <div className="mb-5 relative flex justify-center items-center min-w-[100vw]">
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
      <div className="flex flex-col gap-5 mb-5">
        {links.map((data, index) => {
          return (
            <div className="relative">
              <Input
                onChange={(e: any) => onChangeInput(e, index)}
                value={data}
                className="font-bold h-[5rem] bg-[#d9d9d9] w-[80vw]"></Input>
              <Image
                onClick={() => removeLink(index)}
                className="absolute right-[2rem] top-[50%] translate-y-[-50%]"
                width={30}
                height={30}
                alt="button-back"
                src="cancle.svg"></Image>
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => setLinks((prev) => [...prev, ""])}
        className=" flex p-10 items-center justify-center w-[80vw] rounded-lg bg-[#d9d9d9]">
        <Image
          width={30}
          height={30}
          alt="button-back"
          src="addButton.svg"></Image>
      </Button>
      {links && (
        <Button
          onClick={() => saveLinks()}
          className=" flex p-10 items-center justify-center w-[80vw] rounded-lg bg-[#14ae5c]">
          Save
        </Button>
      )}
    </div>
  );
};

export default Reference;
