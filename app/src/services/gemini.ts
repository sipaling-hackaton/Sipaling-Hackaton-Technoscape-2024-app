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
  responseMimeType: "application/json",
};

async function testGemini(prevState: any, formData: FormData) {
  const parts = [
    {text: "input: hi"},
    {text: "output: hello"},
  ];

  const input = formData.get("input") as string;
  const prompt = input.concat(". \n (Analyze the mood of the user and send response in the json data titled `mood`)");

  const res = await model.generateContent([prompt]);
  const sanitizedResponse = JSON.parse(
      JSON.stringify(
          res,
          (key, value) => (
              typeof value === "function" ? undefined : value)
      )
  );

  return {
    message: "test",
    response: sanitizedResponse,
  }
}

export {
  testGemini
}