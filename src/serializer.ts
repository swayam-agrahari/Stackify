import fs from "fs/promises";
import path from "path";
import { StackContract } from "../contracts/StackContract";

// Ensure a directory exists or create it
async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

// Write a single file to disk
async function writeFile(filePath: string, content: string) {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  await ensureDir(dir);
  await fs.writeFile(fullPath, content, "utf-8");
}

// Main function to serialize selected stacks into a project folder
export async function serializeStacks(
  stacks: StackContract[],
  outputDir = "output"
) {
  const allFiles = await Promise.all(stacks.map((stack) => stack.generate()));
  const flattened = allFiles.flat();

  const deps = {
    regular: new Set<string>(),
    dev: new Set<string>(),
  };

  // Collect dependencies
  stacks.forEach((stack) => {
    const stackDeps = stack.dependencies();
    stackDeps.regular.forEach((dep) => deps.regular.add(dep));
    stackDeps.dev.forEach((dep) => deps.dev.add(dep));
  });

  // Write files
  for (const file of flattened) {
    const fullPath = path.join(outputDir, file.path);
    await writeFile(fullPath, file.content);
  }

  // Write root-level package.json with dependencies
  const packageJsonPath = path.join(outputDir, "package.json");
  const packageJsonContent = {
    name: "stakify-app",
    version: "0.1.0",
    private: true,
    workspaces: ["frontend"], // Expand this when backend/db is added
  };

  await writeFile(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));

  console.log("✅ Project generated at:", path.resolve(outputDir));
  console.log("\n📦 Dependencies:");
  console.log("  Regular:", Array.from(deps.regular).join(" "));
  console.log("  Dev    :", Array.from(deps.dev).join(" "));
}
