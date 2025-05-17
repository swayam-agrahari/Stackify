import type { StackContract, GeneratedFile } from "./StackContract";

export const PostgresPrismaContract: StackContract = {
  name: "PostgreSQL + Prisma",

  async generate(): Promise<GeneratedFile[]> {
    return [
      {
        path: "backend/prisma/schema.prisma",
        content: `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
`.trim(),
      },
      {
        path: "backend/src/db.ts",
        content: `
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
`.trim(),
      },
      {
        path: "backend/.env",
        content: `DATABASE_URL="postgresql://user:password@localhost:5432/mydb"`,
      },
      {
        path: "backend/package.json",
        content: "", // This will be merged by serializer if already present
      },
    ];
  },

  dependencies() {
    return {
      regular: ["@prisma/client"],
      dev: ["prisma", "dotenv"],
    };
  },
};
