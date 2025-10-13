import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.1.118", // or true to listen on all addresses, including LAN and public
    port: 5173, // Optional: specify a port, default is 5173
  },
});
