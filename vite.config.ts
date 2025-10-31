import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// Fix: Import `process` from `node:process` to provide correct type definitions
// for `process.cwd()` and resolve the "Property 'cwd' does not exist on type 'Process'" error.
import process from 'node:process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from the root of your project.
  // Vercel will provide these during the build process.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Expose the API_KEY to your client-side code as process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})