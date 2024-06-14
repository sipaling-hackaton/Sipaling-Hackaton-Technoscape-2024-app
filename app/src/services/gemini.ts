"use server";

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {GoogleGenerativeAI} from "@google/generative-ai";
import {Chat, PrismaClient} from "@prisma/client";

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
  questions: Question[]
  advice: string
  sentiment: "NEUTRAL" | "POSITIVE" | "NEGATIVE"
}

interface Question {
  index: string
  question: string
  summary: string
}


async function chatGemini(prevState: any, formData: FormData) {
  const parts = [
    {text: "input: you are not good enough"},
    {text: "output: ```json { \"questions\": [], \"advice\": \"Mohon maaf, saya akan segera menindaklanjuti laporan tersebut.\", \"sentiment\": \"NEGATIVE\" } ```"},
  ];

  const input = formData.get("input") as string;
  const language = formData.get("language") as string;
  const style = formData.get("style") as string;
  const prompt = input.concat(". \n (" +
      "user will send chat from other platform" +
      "chatbot will analyze the sentiment (NEUTRAL, POSITIVE, NEGATIVE), " +
      " and the chatbot will analyze the chat, " +
      "and return the response based on the schema." +
      "chatbot will only generate response based on the language given in prompt" +
      "advice is the response that can be copied and pasted to the user (you will act as customer service" + "with" + style + "style language)" +
      "questions is the summary of question from given chat (return empty array of none)" +
      "" +
      "[schema]: \n" +
      ":\n" +
      "interface Response {\n" +
      "  questions: Question[]\n" +
      "  advice: string\n" +
      "  sentiment: \"NEUTRAL\" | \"POSITIVE\" | \"NEGATIVE\"\n" +
      "}\n" +
      "\n" +
      "interface Question {\n" +
      "  index: string\n" +
      "  question: string\n" +
      "  summary: string\n" +
      "}" +
      ")" +
      "\n" +
      "input: " + input + "\n" +
      "[language]: " + language + "\n"
  );

  const res = await model.generateContent([prompt]);
  const sanitizedResponse: Response = JSON.parse(
      JSON.stringify(
          res,
          (key, value) => (
              typeof value === "function" ? undefined : value)
      )
  );

  const data: Chat = {
    input: input,
    // @ts-ignore
    response: sanitizedResponse,
    createdAt: new Date(),
    language: "en",
  }

  // await prisma.chat.create({
  //   data: data
  // });

  return data

}

export {
  chatGemini
}