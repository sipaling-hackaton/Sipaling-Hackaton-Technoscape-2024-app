import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
import {Customer, User} from '@prisma/client'

async function main() {
  // @ts-ignore
  prisma.customer.deleteMany({
    where: {}
  })

  // @ts-ignore
  const chats: Customer = [
    {
      phone: '6281234567890',
      name: 'Aurelius Ivan Wijaya',
      email: 'aureliusivanwijaya3@gmail.com',
      address: "random address",
      createdAt: new Date(),
    },
    {
      phone: '62812345678912',
      name: 'Clara',
      email: 'clara4@gmail.com',
      address: "random address",
      createdAt: new Date(),
    }
  ]

  // @ts-ignore
  const user: User = [{
    name: "USER",
    email: "user@gmail.com",
    exp: 0,
    role: "USER",
    password: "password",
    createdAt: new Date()
  }]

  // @ts-ignore
  for (const chat of chats) {
    await prisma.customer.create({
      // @ts-ignore
      data: chat
    })
  }

  // @ts-ignore
  for (const i of user) {
    await prisma.user.create({
      // @ts-ignore
      data: i
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
