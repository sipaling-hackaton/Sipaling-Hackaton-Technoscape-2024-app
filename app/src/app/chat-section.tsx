"use client";

import { useFormState, useFormStatus } from "react-dom";
import { chatGemini } from "@/services/gemini";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { bouncy } from "ldrs";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { convertSentimentToColor } from "@/helpers/color-helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

bouncy.register();

interface Chat {
  message: string;
  response: Response;
  input: string;
}

interface Response {
  response: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: string;
            }
          ];
        };
      }
    ];
  };
}

const initialFormState: Chat = {
  message: "",
  response: {
    response: {
      candidates: [
        {
          content: {
            parts: [
              {
                text: "",
              },
            ],
          },
        },
      ],
    },
  },
  input: "",
};

// parser to json from string
const parseResponse = (response: string) => {
  try {
    // clean the response
    response = response.replace(/```json/g, "");
    response = response.replace(/```/g, "");
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
};

const Chat = ({ customer }: { customer?: any }) => {
  const [text, setText] = useState<string>("");
  // @ts-ignore
  const [state, formAction] = useFormState(chatGemini, initialFormState);

  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [chatCount, setChatCount] = useState<number>(0);

  const [position, setPosition] = useState("Formal");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {}, [position]);

  useEffect(() => {
    // @ts-ignore
    setChatHistory([...chatHistory, state]);
    setChatCount(chatHistory.length);
  }, [state]);

  useEffect(() => {
    console.log(chatHistory.length);
    console.log(chatCount);
  }, [chatCount]);

  const copyClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!");
  };

  return (
    <form
      className="p-5 flex flex-col items-center relative max-w-[100vw] min-h-[100vh] "
      action={formAction}>
      <div
        className={
          "z-100 bg-[#ffffff] sticky top-[1rem] flex flex-col md:flex-row items-center justify-center gap-5 min-w-[90vw] max-w-[100vw]"
        }>
        <div className="max-w-[100vw] md:max-w-[50vw] flex gap-5 justify-center items-center">
          <Link href="/crm">
            <Image
              width={60}
              height={60}
              alt="back-button"
              src="Group (1).svg"></Image>
          </Link>
          <Input
            readOnly
            className={
              "rounded-full text-[white] text-center font-bold bg-gradient-to-r from-[#7a2180] to-[#e40276]"
            }
            name={"customer"}
            placeholder={"Name"}
            required
            defaultValue={customer?.name}
          />

          <Link className="md:hidden block" href={"reference"}>
            <Image width={60} height={60} alt="setting" src="Group 9.svg" />
          </Link>
        </div>

        <div className="max-w-[90vw] md:max-w-[50vw] gap-5 flex items-center justify-center">
          {/*select language*/}
          <Select defaultValue={"indonesia"} name={"language"}>
            <SelectTrigger className="px-[2rem] w-[20rem] rounded-full text-[white] text-center font-bold bg-gradient-to-r from-[#7a2180] to-[#e40276]">
              <SelectValue placeholder="indonesia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indonesia">Indonesia</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
            </SelectContent>
          </Select>

          <Select name={"style"} defaultValue={"Formal"}>
            <SelectTrigger className="px-[2rem] w-[20rem] rounded-full text-[white] text-center font-bold bg-gradient-to-r from-[#7a2180] to-[#e40276]">
              <SelectValue placeholder="Formal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultChecked value="Formal">
                Formal
              </SelectItem>
              <SelectItem value="Semi Formal">Semi Formal</SelectItem>
              <SelectItem value="Relax">Relax</SelectItem>
            </SelectContent>
          </Select>

          <Link className="hidden md:block" href={"reference"}>
            <Image width={50} height={50} alt="setting" src="Group 9.svg" />
          </Link>
        </div>
      </div>

      <div className="z-[-1] relative mt-5 flex flex-col gap-4 md:min-h-[75vh] min-h-[75vh] max-w-[80vw] w-[80vw] ">
        
        {/*Mapping user history*/}
        {chatHistory.map((chat: Chat) => {
          const content =
            chat.response.response.candidates[0].content?.parts[0].text;

          // opening chat
          if (!content) {
            if (chatCount > 0) {
              return;
            }

            return (
              <div className={"fixed top-[50%] left-[50%]  translate-y-[-50%]"}>
                <Image
                  className={"rounded-full"}
                  width={50}
                  height={50}
                  src="https://github.com/shadcn.png"
                  alt={"avatar"}
                />
              </div>
            );
          }

          const parsedContent = parseResponse(content);

          // Bubble Chat
          return (
            <div
              className={"flex flex-col gap-4  rounded-md max-w-[80vw]"}
              key={chat.message}>
              {/*Bubble chat User*/}
              <div className="flex justify-between self-end max-w-[50vw] min-w-[30vw] bg-[#d9d9d9] rounded-lg p-5">
                <p>{chat.input}</p>

                <div className="self-end flex gap-1">
                  {/*sentiment badge*/}
                  <div
                    className="flex justify-center items-center rounded-lg px-2.5 py-1 text-white font-bold text-[0.8rem]"
                    style={{
                      backgroundColor: convertSentimentToColor(
                        parsedContent.sentiment
                      ),
                    }}>
                    {parsedContent?.sentiment?.toLowerCase()}
                  </div>
                </div>
              </div>

              {/* Bubble chat chatbot */}
              <div className={"relative flex flex-row gap-4 max-w-[80vw]"}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <section className="flex justify-between w-full bg-[#d9d9d9] rounded-lg p-5">
                  <div className="w-[80%] flex flex-col gap-2.5">
                    {/*Questions*/}
                    <ul className="list-disc list-inside space-y-4">
                      {parsedContent.questions.map((question: any) => (
                        <li
                          key={question.index}
                          className="bg-gray-200 p-4 rounded-md max-w-md shadow-md" // Added shadow
                        >
                          <span className="font-semibold">
                            {question.question}
                          </span>
                          <p className={"italic"}>{question.summary}</p>
                        </li>
                      ))}
                    </ul>

                    <h3 className={"text-[#7a2180] font-bold text-lg"}>
                      Advice
                    </h3>
                    <p>{parsedContent.advice}</p>
                  </div>

                  <Button
                    type={"button"}
                    className="flex gap-2.5 w-fit self-end text-white bg-gradient-to-r from-[#7a2180] to-[#e40276] rounded-lg p-2.5"
                    onClick={() => copyClipboard(parsedContent.advice)}>
                    <span className="text-[0.8rem] font-bold text-white">
                      Copy
                    </span>
                    <Image
                      className="invert w-[1rem] h-[1rem]"
                      width={100}
                      height={100}
                      src="copy.svg"
                      alt="button"
                    />
                  </Button>
                </section>
              </div>

              {/*copy button*/}
            </div>
          );
        })}
        {/*for loading animation*/}
        {chatCount > chatHistory.length && (
          <>
            {/*skeleton*/}
            <div className="space-y-2 w-full">
              <Skeleton className="h-[2rem] w-full" />
              <Skeleton className="h-[2rem] w-full" />
              <Skeleton className="h-[2rem] w-full" />
            </div>

            {/*loading*/}
            <span id="loading" className="ml-[2rem] mt-[1rem] flex gap-[2rem]">
              <l-bouncy size="45" speed="1.75" color="#a9117b"></l-bouncy>
              <span className={"text-[#a9117b]"}>Generating response...</span>
            </span>
          </>
        )}
      </div>

      <div className="mt-[3rem] w-full sticky bottom-[2rem] justify-center flex align-center left-0 ">
        <div className="relative h-[60px]">
          <Textarea
            className="max-w-[80vw] "
            ref={textAreaRef}
            id="input"
            name="input"
            placeholder="Message"
            required
            disabled={chatCount > chatHistory.length}
          />
          <SubmitButton setChatCount={setChatCount} textAreaRef={textAreaRef} />
        </div>
      </div>
    </form>
  );
};

const SubmitButton = ({ setChatCount, textAreaRef }: any) => {
  const status = useFormStatus();

  useEffect(() => {
    console.log(textAreaRef.current);
    if (textAreaRef.current && textAreaRef.current.value) {
      setChatCount((prev: any) => prev + 3);
      textAreaRef.current.value = "";
      const loading = window.document.getElementById("loading");
      loading && loading.scrollIntoView({ block: "end" });
    }
  }, [status.pending]);

  return (
    <section
      className="absolute right-5 top-[50%] transform translate-y-[-50%]
          hover:scale-110 transition-transform duration-300 ease-in-out">
      <button type={"submit"} disabled={status.pending}>
        <Image width={30} height={30} src="Group.svg" alt="button" />
      </button>
    </section>
  );
};

export { Chat };
