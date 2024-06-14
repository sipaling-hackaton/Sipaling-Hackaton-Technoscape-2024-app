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

type referenceTypeUI = referenceType & { exists: boolean };

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
            This action cannot be undone. This will permanently remove selected
            reference from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Reference = () => {
  const [links, setLinks] = useState<referenceTypeUI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const removeLink = async (index: number) => {
    if (!links[index].id) {
      return setLinks((prev) =>
        prev.filter((link, linkIndex) => index !== linkIndex)
      );
    }
    try {
      setIsLoading(true);
      const req = await fetch(`/api/reference?id=${links[index].id}`, {
        method: "DELETE",
      });
      if (req.status === 200)
        setLinks((prev) => prev.filter((link) => link.id !== links[index].id));
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

  const fetchReference = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/reference", {
        method: "GET",
      });
      let references = (await res.json()) as referenceTypeUI[];
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

  const saveLinks = async () => {
    try {
      setIsLoading(true);
      const data = links.filter((link) => link.exists === false);
      const prepData = data.map((link) => {
        return { url: link.url };
      }) as referenceType[];
      const res = await fetch("/api/reference", {
        method: "POST",
        body: JSON.stringify(prepData),
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

  return (
    <div className="flex flex-col items-center p-5">
      <div className="mb-5 relative flex justify-center items-center min-w-[100vw]">
        <Image
          className="absolute left-[10vw] hover:cursor-pointer"
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
        {links.map((link, index) => {
          return (
            <div className="relative" key={`web-ref-${link?.url}-${index}`}>
              <Input
                onChange={(e: any) => onChangeInput(e, index)}
                defaultValue={link?.url}
                className="font-bold h-[5rem] bg-[#d9d9d9] w-[80vw]"
                disabled={link.exists}
                placeholder="Enter the reference website link here"></Input>
              <DeleteAlert referenceId={index} removeFn={removeLink}>
                <Image
                  // onClick={() => removeLink(index)}
                  className="absolute right-[2rem] top-[50%] translate-y-[-100%] hover:cursor-pointer"
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

      <Button
        onClick={() =>
          setLinks((prev) => [...prev, { url: "", exists: false }])
        }
        className=" flex p-10 items-center justify-center w-[80vw] rounded-lg bg-[#d9d9d9]">
        <Image
          width={30}
          height={30}
          alt="add-button"
          src="addButton.svg"></Image>
      </Button>
      {links && (
        <Button
          onClick={() => saveLinks()}
          className="mt-4 flex p-10 items-center justify-center w-[80vw] rounded-lg bg-[#14ae5c]">
          Save
        </Button>
      )}
    </div>
  );
};

export default Reference;
