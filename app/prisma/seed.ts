import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
import {Customer} from '@prisma/client'

async function main() {
  // @ts-ignore
  const chats: Customer = [
    {
      phone: '6281234567890',
      name: 'Aurelius Ivan Wijaya',
      email: 'aureliusivanwijaya@gmail.com',
      createdAt: new Date(),
    },
    {
      phone: '62812345678912',
      name: 'Clara',
      email: 'clara@gmail.com',
      createdAt: new Date(),
    }
  ]

  // @ts-ignore
  for (const chat of chats) {
    await prisma.customer.create({
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
