import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function getAllChat() {
  const allUsers = await prisma.chat.findMany()
  return allUsers as []
}


export {
  getAllChat
}