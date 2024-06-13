import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function queryTest() {
  const allUsers = await prisma.chat.findMany()
  return allUsers as []
}


export {
  queryTest
}