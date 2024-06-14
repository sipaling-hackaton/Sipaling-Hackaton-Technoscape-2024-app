import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const chats = [
    {
      input: 'Hello, how can I help you today?',
      response: 'I am looking for a new laptop.',
      sentiment: 'positive',
      createdAt: new Date()
    },
    {
      message: 'I am looking for a new laptop.',
      response: 'Sure, what is your budget?',
      sentiment: 'neutral',
      createdAt: new Date()
    }
  ]

  for (const chat of chats) {
    await prisma.chat.create({
      // @ts-ignore
      data: chat
    })
  }

  console.log('Seed data created successfully')
}

main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
