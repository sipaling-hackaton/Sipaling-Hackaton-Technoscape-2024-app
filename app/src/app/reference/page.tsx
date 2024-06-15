"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllReference, referenceType } from "@/services/database-query";
import Image from "next/image";
import React, { ReactElement, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { bouncy } from "ldrs";

bouncy.register();

const DeleteAlert = ({ children, ...props }: any) => {
  const handleDelete = async () => {
    props.removeFn(props.referenceId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove selected reference from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Reference = () => {
  const [links, setLinks] = useState<referenceType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const removeLink = async (index: number) => {
    if (!links[index].id) {
      return setLinks((prev) => prev.filter((link, linkIndex) => index !== linkIndex));
    }
    try {
      setIsLoading(true);
      const req = await fetch(`/api/reference?id=${links[index].id}`, {
        method: "DELETE",
      });
      if (req.status === 200) setLinks((prev) => prev.filter((link) => link.id !== links[index].id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeInput = (e: any, index: number) => {
    setLinks((prev) => {
      prev[index].url = e.target.value;
      return prev;
    });
  };

  const onChangeInputFile = async (e: any, index: number) => {
    try {
      setIsLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/pdf-reference", {
        method: "POST",
        body: formData,
      });
      if (res.status === 201) {
        fetchReference();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReference = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/reference", {
        method: "GET",
      });
      let references = (await res.json()) as referenceType[];
      if (references.length > 0) {
        references = references.map((reference) => {
          return { ...reference, exists: true };
        });
      }
      setLinks(references);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReference();
  }, []);

  const initializeReferenceVector = async () => {
    try {
      const res = await fetch("https://llm-engine-nqhvy3qceq-uc.a.run.app/init", {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const saveLinks = async () => {
    try {
      setIsLoading(true);
      const data = links.filter((link) => link.id === undefined);
      const res = await fetch("/api/reference", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        fetchReference();
      }
      await initializeReferenceVector();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-5 px-[15rem]">
      {isLoading && (
        <div className="w-screen h-screen fixed inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm z-[100] flex flex-col gap-5 items-center justify-center align-center">
          <h3 className="text-xl font-medium text-white">Please wait, inserting data into our servers</h3>
          <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
        </div>
      )}
      <div className="mb-5 relative flex justify-center items-center min-w-[100vw]">
        <Image
          className="absolute left-[10vw] hover:cursor-pointer"
          onClick={() => window.history.back()}
          width={30}
          height={30}
          alt="button-back"
          src="Group (1).svg"
        ></Image>

        <p className="self-center bg-clip-text text-transparent bg-gradient-to-r sm:text-2xl md:text-4xl from-[#7A2180] to-[#E40276] font-bold">
          Website Reference
        </p>
      </div>
      <div className="flex flex-col mb-5 gap-5 w-full">
        {links.length > 0 &&
          links.map((link, index) => {
            return (
              <div
                className="p-5 pr-5 bg-[#d9d9d9] flex rounded gap-5 items-center"
                key={`web-ref-${link?.url}-${index}`}
              >
                {link.id ? (
                  <>
                    <div className="w-20 text-center bg-red-200 font-normal p-2 rounded text-small">
                      {link.datatype}
                    </div>
                    <p className="font-bold w-full bg-transparent outline-none border-none truncate  text-gray-600 h-full">
                      {link?.url}
                    </p>
                  </>
                ) : (
                  <div className="w-full flex items-center">
                    <Input
                      onChange={(e: any) => onChangeInput(e, index)}
                      defaultValue={link?.url}
                      className="w-full font-bold w-full bg-transparent outline-none border-none text-wrap focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-offset-0"
                      disabled={link?.id ? true : false}
                      placeholder="Enter the reference website link here"
                    />
                    <p className="mx-5">or</p>
                    <Input
                      type="file"
                      onChange={(e: any) => onChangeInputFile(e, index)}
                      className="w-fit bg-gray-400 outline-none border-none text-wrap focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-offset-0 hover:cursor-pointer"
                      disabled={link?.id ? true : false}
                      placeholder="Upload a file"
                    />
                  </div>
                )}
                <DeleteAlert referenceId={index} removeFn={removeLink}>
                  <Image
                    // onClick={() => removeLink(index)}
                    className="hover:cursor-pointer"
                    width={30}
                    height={30}
                    alt="button-back"
                    src="cancle.svg"
                  />
                </DeleteAlert>
              </div>
            );
          })}
      </div>

      {links.length > 0 ? (
        <>
          <Button
            onClick={() => setLinks((prev) => [...prev, { url: "", datatype: "website" }])}
            className="flex p-10 items-center justify-center w-full rounded-lg bg-[#d9d9d9]"
          >
            <Image width={30} height={30} alt="add-button" src="addButton.svg"></Image>
          </Button>
          <Button
            onClick={() => saveLinks()}
            className="mt-4 flex p-10 items-center justify-center w-full rounded-lg bg-[#14ae5c]"
          >
            Save
          </Button>
        </>
      ) : isLoading ? (
        <div className="space-y-5 w-full">
          <Skeleton className="h-[3rem] w-full" />
          <Skeleton className="h-[3rem] w-full" />
          <Skeleton className="h-[3rem] w-full" />
        </div>
      ) : (
        <div className="p-10 bg-[#d9d9d9] rounded w-full text-center flex flex-col items-center">
          <h1 className="text-5xl font-bold text-gray-500">Oopss Sorry, No Reference Found</h1>
          <h3 className="mt-4 w-[60%] text-gray-600">
            To get a personalized AI experience according to your needs, please enter reference information via the
            following button.
          </h3>
          <Button
            onClick={() => setLinks((prev) => [...prev, { url: "", datatype: "website" }])}
            className="mt-8 flex p-10 items-center justify-center w-full rounded-lg bg-[#14ae5c]"
          >
            Add Reference
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reference;
