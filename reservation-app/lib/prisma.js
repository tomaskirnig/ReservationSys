import { PrismaClient } from '@prisma/client'

let prisma

// Check if we already have a PrismaClient instance
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // In development, prevent multiple instances during hot reloading
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma