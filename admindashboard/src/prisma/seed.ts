import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('medina123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'medinasekiraqa02@gmail.com' },
    update: {},
    create: {
      email: 'medinasekiraqa02@gmail.com',
      name: 'Medina',
      password,
      role: 'ADMIN'
    }
  })
 
  console.log({ user })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })