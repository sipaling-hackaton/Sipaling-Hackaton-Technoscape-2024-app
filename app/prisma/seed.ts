import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const chats = [
    {
      message: 'Hello, how can I help you today?',
      sentiment: 'positive',
      createdAt: new Date()
    },
    {
      message: 'I am looking for a new laptop.',
      sentiment: 'neutral',
      createdAt: new Date()
    },
    {
      message: 'The service was terrible!',
      sentiment: 'negative',
      createdAt: new Date()
    },
    {
      message: 'I am very satisfied with my purchase.',
      sentiment: 'positive',
      createdAt: new Date()
    },
    {
      message: 'Can you provide more details about your return policy?',
      sentiment: 'neutral',
      createdAt: new Date()
    }
  ]

  for (const chat of chats) {
    await prisma.chat.create({
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
