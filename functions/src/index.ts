import { onRequest } from "firebase-functions/https";
import { app as uploadApp } from "./upload.js";

export const upload = onRequest(
  {
    cors: [
      "https://snippets.documatt.com",
      "https://snippets-dev.documatt.com",
      "https://snippets-d9ae2.web.app",
      "http://localhost:3000",
    ],
  },
  uploadApp,
);
