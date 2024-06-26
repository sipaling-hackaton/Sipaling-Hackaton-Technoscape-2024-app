"use server";
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat, PrismaClient } from "@prisma/client";
import axios from "axios";
import { addingExp } from "./manipulate-exp";

const prisma = new PrismaClient();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Please set the GEMINI_API_KEY environment variable.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  // json
  responseMimeType: "text/plain",
};

interface Response {
  questions: Question[];
  advice: string;
  sentiment: "NEUTRAL" | "POSITIVE" | "NEGATIVE";
}

interface Question {
  index: string;
  question: string;
  summary: string;
}

async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise(async (resolve) => {
    const reader = file.stream().getReader();
    const imageDataU8: number[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // @ts-ignore
      imageDataU8.push(...value);
    }

    const base64EncodedData = btoa(String.fromCharCode(...imageDataU8));

    resolve(base64EncodedData);
  });

  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  } as any;
}

async function chatGemini(prevState: any, formData: FormData) {
  // generate history for train
  const parts = [
    { text: "input: you are not good enough" },
    {
      text: 'output: ```json { "questions": [], "advice": "Mohon maaf, saya akan segera menindaklanjuti laporan tersebut.", "sentiment": "NEGATIVE" } ```',
    },
  ];

  const input = formData.get("input") as string;
  const language = formData.get("language") as string;
  console.log("language", language);
  const style = formData.get("style") as string;
  console.log("style", style);
  const image = formData.get("image") as File;

  if (image) {
    parts.push(await fileToGenerativePart(image));
  }

  const langchain = await fetch(
    "https://llm-engine-nqhvy3qceq-uc.a.run.app/ask",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        question: input,
      }),
    }
  )
    .then((response) => response.json())
    .catch((e) => {
      console.log("error", e);
      return {};
    });

  console.log("langchain", langchain);

  // prompt
  const prompt = input.concat(
    ". \n (" +
      "user (customer service) will send chat from other platform" +
      "and chatbot will analyze the sentiment (NEUTRAL, POSITIVE, NEGATIVE), " +
      "and the chatbot will analyze the chat, " +
      "and return the response based on the schema." +
      "chatbot will only generate response based on the language given in prompt" +
      "advice is the response that can be copied and pasted to the user (you will act as customer service" +
      "with" +
      style +
      "style language)" +
      "`questions` is the summary of input in case there is a question like statement (return empty array of none)" +
      "chatbot also have to consider langchain as it primary reference results to improve accuracy in case langchain is exist (if it returns question answer, consider to also return it in `question`)" +
      // "in case of error, chatbot will return the default response" +
      // "```json" +
      // "{ \"questions\": [], \"advice\": \"Mohon maaf, saya akan segera menindaklanjuti laporan tersebut.\", \"sentiment\": \"NEGATIVE\" }" +
      // "```" +
      "" +
      "[schema]: \n" +
      ":\n" +
      "interface Response {\n" +
      "  questions: Question[]\n" +
      "  advice: string\n" +
      '  sentiment: "NEUTRAL" | "POSITIVE" | "NEGATIVE"\n' +
      "}\n" +
      "\n" +
      "interface Question {\n" +
      "  index: string\n" +
      "  question: string\n" +
      "  summary: string\n" +
      "}" +
      ")" +
      "\n" +
      "[input]:\n " +
      input +
      "\n" +
      "[language  ]: " +
      language +
      "\n" +
      "[langchain]: " +
      langchain.results
  );

  const res = await model.generateContent([prompt, ...parts]);
  const sanitizedResponse: Response = JSON.parse(
    JSON.stringify(res, (key, value) =>
      typeof value === "function" ? undefined : value
    )
  );

  await addingExp();

  const data: Chat = {
    input: input,
    // @ts-ignore
    response: sanitizedResponse,
    createdAt: new Date(),
    language: "en",
  };

  // await prisma.chat.create({
  //   data: data
  // });

  return data;
}

export { chatGemini };
