// FIX: Replaced "vite/client" reference to fix resolution error and added type definitions for process.env
// to support using process.env.API_KEY for the Gemini API key as per guidelines.
declare var process: {
  env: {
    API_KEY?: string;
  }
};
