import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const chats = [
    {
      url: 'https://id.wikipedia.org/wiki/Halaman_Utama',
    },
    {
      url: 'https://id.wikipedia.org/wiki/Josef_Stalin',
    }
  ]

  for (const chat of chats) {
    await prisma.reference.create({
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
