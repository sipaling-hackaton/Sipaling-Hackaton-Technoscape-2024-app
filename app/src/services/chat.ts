"use server";

import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getChatCount = async () => {
  try {
    const count = await prismaClient.chat.count();
    return count;
  } catch (e) {
    return 0;
  }
};

export const sentimentCount = async () => {
  try {
    const negativeCount = await prismaClient.chatResponse.count({
      where: {
        sentiment: "NEUTRAL",
      },
    });

    const positiveCount = await prismaClient.chatResponse.count({
      where: {
        sentiment: "POSITIVE",
      },
    });

    const neutralCount = await prismaClient.chatResponse.count({
      where: {
        sentiment: "NEGATIVE",
      },
    });

    return [
      ["Negative", negativeCount],
      ["Positive", positiveCount],
      ["Neutral", neutralCount],
    ];
  } catch (e) {
    return [["Negative", 0],["Positive", 0],["Neutral", 0]];
  }
};
