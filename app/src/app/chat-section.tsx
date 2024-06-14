"use client";

import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { chatGemini } from "@/services/gemini";
import { useEffect, useState } from "react";
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
    console.log(response);
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
};

const Chat = () => {
  const [text, setText] = useState<string>("");
  // @ts-ignore
  const [state, formAction] = useFormState(chatGemini, initialFormState);

  const [chatHistory, setChatHistory] = useState<Chat[]>([]);

  const [position, setPosition] = useState("Formal");

  useEffect(() => {}, [position]);

  useEffect(() => {
    // @ts-ignore
    setChatHistory([...chatHistory, state]);
    console.log(chatHistory);
  }, [state]);

  return (
    <form
      className="p-5 flex flex-col items-center relative min-h-screen w-full max-w-[100vw]"
      action={formAction}>
      <section className={"flex self-start items-center justify-center gap-4"}>
        <Link href="/user-list">
          <Image
            width={70}
            height={70}
            alt="back-button"
            src="Group (1).svg"></Image>
        </Link>
        <Input
          className="rounded-full text-[white] text-center font-bold bg-gradient-to-r from-[#7a2180] to-[#e40276]"
          name={"language"}
          placeholder={"Language"}
          required
          defaultValue={"indonesia"}
        />

        {/* <Input
          name={"style"}
          placeholder={"Style"}
          required
          defaultValue={"Formal"}
        /> */}
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
      </section>

      <div className="flex flex-col gap-4 min-h-[80vh] w-[80vw]">
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
                  <p className="text-[0.7rem]">
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
              <div className="w-[100%] bg-[#d9d9d9] rounded-lg p-5">
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
            </div>
          );
        })}
      </div>

      <div className="w-full sticky justify-center flex align-center fixed bottom-0 left-0">
        <section className="relative h-[60px]">
          <Textarea id="input" name="input" placeholder="Message" required />
          <section className="absolute right-5 top-[50%] transform translate-y-[-50%]">
            <button type={"submit"}>
              <Image
                width={30}
                height={30}
                src="Group.svg"
                alt="button"></Image>
            </button>
          </section>
        </section>
      </div>
    </form>
  );
};

export { Chat };
