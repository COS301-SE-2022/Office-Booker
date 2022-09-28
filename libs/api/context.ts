import { PrismaClient } from "@prisma/client"
import { MockProxy, mockDeep } from "jest-mock-extended"

export type Context = {
    prisma: PrismaClient;
}

export type MockContext = {
    prisma: MockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>()
  }
}

export const ActualPrisma = () : Context => {
  return {
    prisma: new PrismaClient()
  }
}