"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { chatGemini } from "@/services/gemini";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { bouncy } from "ldrs";

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

const Chat = ({ Customer }: any) => {
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
    console.log(chatHistory);
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log(chatHistory.length);
    console.log(chatCount);
  }, [chatCount]);

  const copyClipboard = (value: string) => {
    navigator.clipboard.writeText(value);

    // Alert the copied text
    alert("Copied the text");
  };

  return (
    <form
      className="py-5 flex flex-col items-center relative min-h-screen w-full max-w-[100vw] overflow-x-hidden"
      action={formAction}>
      <div
        className={
          "px-5 max-w-[100vw] flex-col md:flex-row  flex self-start items-center justify-center gap-4"
        }>
        <div className="w-[90vw] md:w-[50vw] flex justify-between items-center gap-4 ">
          <Link href="/user-list">
            <Image
              width={50}
              height={50}
              alt="back-button"
              src="Group (1).svg"></Image>
          </Link>
          <Input
            className="border border-[#a9117b] border-2"
            name={"customer"}
            placeholder={"Name"}
            required
            defaultValue={"User"}
          />
        </div>

        <div className="w-[90vw] md:w-[50vw] flex justify-between items-center gap-2">
          <Input
            className="rounded-full text-[white] text-center font-bold bg-gradient-to-r from-[#7a2180] to-[#e40276]"
            name={"language"}
            placeholder={"Language"}
            required
            defaultValue={"indonesia"}
          />
          <select
            className=" p-2 rounded-full text-[white] text-center font-bold bg-gradient-to-r from-[#7a2180] to-[#e40276]"
            name={"style"}
            required
            defaultValue={"Formal"}>
            <option className="text-[black] font-bold" value="Formal">
              Formal
            </option>
            <option className="text-[black] font-bold" value="Semi Formal">
              Semi Formal
            </option>
            <option className="text-[black] font-bold" value="Relax">
              Relax
            </option>
          </select>
          <Link href={"setting"}>
            <Image width={70} height={70} alt="setting" src="Group 9.svg" />
          </Link>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 min-h-[65vh] md:min-h-[80vh] max-h-[65vh] md:max-h-[80vh] overflow-y-scroll w-[80vw]">
        {/*Mapping user history*/}
        {chatHistory.map((chat: Chat) => {
          const content =
            chat.response.response.candidates[0].content?.parts[0].text;
          if (!content) {
            return;
          }

          const parsedContent = parseResponse(content);
          return (
            <div
              className={"flex flex-col gap-4  rounded-md max-w-[80vw]"}
              key={chat.message}>
              <div className="flex justify-between self-end max-w-[50vw] min-w-[30vw] bg-[#d9d9d9] rounded-lg p-5">
                <p>{chat.input}</p>
                <div className="self-end flex gap-1">
                  <p className="text-[0.7rem] max-[80%]">
                    {parsedContent.sentiment === "NEGATIVE"
                      ? "Negative"
                      : parsedContent.sentiment === "POSITIVE"
                      ? "Positive"
                      : "Netral"}
                  </p>
                  <div
                    className="rounded-full w-[1rem] h-[1rem] "
                    style={{
                      backgroundColor:
                        parsedContent.sentiment === "NEGATIVE"
                          ? "red"
                          : parsedContent.sentiment === "POSITIVE"
                          ? "green"
                          : "gray",
                    }}></div>
                </div>
              </div>
              <div className="flex justify-between w-[100%] bg-[#d9d9d9] rounded-lg p-5">
                <div className="w-[80%]">
                  <div>{parsedContent.input}</div>
                  <ul className={"flex flex-col gap-4 list-disc"}>
                    {parsedContent.questions.map((question: any) => {
                      return (
                        <li
                          key={question.index}
                          className={
                            "flex flex-col gap-4 bg-gray-200 p-4 rounded-md max-w-md"
                          }>
                          <p>{question.question}</p>
                          <p>{question.summary}</p>
                        </li>
                      );
                    })}
                  </ul>

                  <p>{parsedContent.advice}</p>
                </div>
                <div
                  className="flex "
                  onClick={() => copyClipboard(parsedContent.advice)}>
                  <p className="self-end text-[0.8rem]">copy</p>
                  <Image
                    className="pl-3 self-end"
                    width={30}
                    height={30}
                    src="copy.svg"
                    alt="button"></Image>
                </div>
              </div>
            </div>
          );
        })}
        {chatCount > chatHistory.length && (
          <div className="ml-[2rem] mt-[1rem]">
            <l-bouncy size="45" speed="1.75" color="#a9117b"></l-bouncy>
          </div>
        )}
      </div>

      <div className="w-full pt-2 sticky justify-center flex align-center bottom-0 left-0">
        <section className="relative h-[60px]">
          <Textarea
            ref={textAreaRef}
            id="input"
            name="input"
            placeholder="Message"
            required
            disabled={chatCount > chatHistory.length ? true : false}
          />
          <SubmitButton setChatCount={setChatCount} textAreaRef={textAreaRef} />
        </section>
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
    }
    console.log(status.pending);
  }, [status.pending]);

  return (
    <section className="absolute right-5 top-[50%] transform translate-y-[-50%]">
      <button type={"submit"} disabled={status.pending}>
        <Image width={30} height={30} src="Group.svg" alt="button"></Image>
      </button>
    </section>
  );
};

export { Chat };
