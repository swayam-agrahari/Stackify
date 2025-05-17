import inquirer from "inquirer";
import { serializeStacks } from "./serializer";

// Contracts
import { ReactContract } from "../contracts/react";
import { ExpressContract } from "../contracts/express";
import { PostgresPrismaContract } from "../contracts/postgres-prisma";

// Define the structure of your contracts
type FrontendContract = keyof typeof ALL_CONTRACTS.frontend;
type BackendContract = keyof typeof ALL_CONTRACTS.backend;
type DatabaseContract = keyof typeof ALL_CONTRACTS.database;

// Define the selectedContracts array type
type SelectedContracts = [
  (typeof ALL_CONTRACTS.frontend)[FrontendContract],
  (typeof ALL_CONTRACTS.backend)[BackendContract],
  (typeof ALL_CONTRACTS.database)[DatabaseContract]
];

// Map choices to contracts
const ALL_CONTRACTS = {
  frontend: {
    React: ReactContract,
    // Vue: VueContract (future)
  },
  backend: {
    "Express + Node": ExpressContract,
    // "Fastify": FastifyContract (future)
  },
  database: {
    "PostgreSQL + Prisma": PostgresPrismaContract,
    // MongoDB: MongoContract (future)
  },
};

// Main function
async function main() {
  console.log("🧱 Welcome to Stakify - Fullstack Starter Generator!");

  // Add types to `answers` here
  const answers = (await inquirer.prompt([
    {
      name: "frontend",
      type: "list",
      message: "Pick a frontend framework:",
      choices: Object.keys(ALL_CONTRACTS.frontend),
    },
    {
      name: "backend",
      type: "list",
      message: "Pick a backend framework:",
      choices: Object.keys(ALL_CONTRACTS.backend),
    },
    {
      name: "database",
      type: "list",
      message: "Pick a database:",
      choices: Object.keys(ALL_CONTRACTS.database),
    },
  ])) as {
    frontend: FrontendContract;
    backend: BackendContract;
    database: DatabaseContract;
  }; // Type assertion

  const selectedContracts: SelectedContracts = [
    ALL_CONTRACTS.frontend[answers.frontend],
    ALL_CONTRACTS.backend[answers.backend],
    ALL_CONTRACTS.database[answers.database],
  ];

  await serializeStacks(selectedContracts, "output");

  console.log("✅ Project generated in the `output/` folder!");
}

main();
