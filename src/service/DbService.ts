import { PrismaClient } from "@prisma/client";

export class DbService {
  private prisma: PrismaClient | null = null;

  protected get prismaClient(): PrismaClient {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
    }
    return this.prisma;
  }
}
