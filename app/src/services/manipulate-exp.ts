"use server";

import { Chat, PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const addingExp = async () => {
  const user = await prismaClient.user.findFirst();

  if (user) {
    await prismaClient.user.update({
      where: { id: user.id },
      data: { exp: user.exp++ },
    });
  }
};

const getExp = async () => {
  try {
    const user = await prismaClient.user.findFirst();
    if (!user) {
      return 0;
    }

    return user.exp;
  } catch (e) {
    throw e;
  }
};

export { addingExp, getExp };
