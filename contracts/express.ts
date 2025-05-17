import type { StackContract, GeneratedFile } from "./StackContract";

export const ExpressContract: StackContract = {
  name: "Express",

  async generate(): Promise<GeneratedFile[]> {
    return [
      {
        path: "backend/src/index.ts",
        content: `
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from Express API 🚀");
});

app.listen(port, () => {
  console.log(\`🚀 Server running on http://localhost:\${port}\`);
});
`.trim(),
      },
      {
        path: "backend/tsconfig.json",
        content: `
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
`.trim(),
      },
      {
        path: "backend/package.json",
        content: `
{
  "name": "backend",
  "version": "0.1.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
`.trim(),
      },
      {
        path: "backend/.gitignore",
        content: `
node_modules
dist
.env
`.trim(),
      },
    ];
  },

  dependencies() {
    return {
      regular: ["express"],
      dev: ["typescript", "ts-node-dev", "@types/express", "@types/node"],
    };
  },
};
