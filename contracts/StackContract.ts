export interface StackContract {
  name: string;

  // Called to generate file paths and contents
  generate(): Promise<GeneratedFile[]>;

  // Called to return dependencies to be installed
  dependencies(): {
    regular: string[];
    dev: string[];
  };
}

export interface GeneratedFile {
  path: string; // Relative path (e.g., frontend/src/App.tsx)
  content: string; // File content
}
