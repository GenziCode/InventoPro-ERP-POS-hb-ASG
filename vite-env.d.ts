// Fix: The original reference directive `/// <reference types="vite/client" />` was causing a
// "Cannot find type definition file" error. It has been removed. Manual type definitions
// for Vite's `import.meta.env` and Node's `process.env` are provided below to ensure
// type-safety throughout the application and to support the Gemini API service.

interface ImportMetaEnv {
  // This provides types for Vite's env variables (e.g., import.meta.env.VITE_SOME_KEY)
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Provides types for `process.env` as required by the Gemini API guidelines for API key access.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
  }
}
