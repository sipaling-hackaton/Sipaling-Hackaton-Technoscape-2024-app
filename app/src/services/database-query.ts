"use server";

export type referenceType = {
  message?: string;
  createdAt?: string;
  id?: string;
  url: string;
  datatype: string;
};

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function getAllChat() {
  const allUsers = await prisma.chat.findMany();
  return allUsers as [];
}

export async function getAllReference() {
  const allReference = await prisma.reference.findMany();
  return allReference as [];
}

export async function createReference(data: referenceType[]) {
  const reference = await prisma.reference.createMany({
    data: data,
  });
  return reference;
}

export async function createSingleReference(data: referenceType) {
  const reference = await prisma.reference.create({
    data: data,
  });
  return reference;
}

export async function deleteReference(id: string) {
  const reference = await prisma.reference.delete({
    where: {
      id: id,
    },
  });
  return reference;
}

export {getAllChat};
