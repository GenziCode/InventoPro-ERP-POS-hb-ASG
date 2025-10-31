/// <reference types="vite/client" />

// Provides types for `process.env` as required by the Gemini API guidelines for API key access.
// This is made available to client-side code via the `define` property in `vite.config.ts`.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
  }
}