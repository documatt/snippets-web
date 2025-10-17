import { logger } from "firebase-functions";
import express from "express";
import { getStorage } from "firebase-admin/storage";
import { initializeApp } from "firebase-admin/app";
import { File } from "@google-cloud/storage";

initializeApp();

export const app = express();
app.use(express.json());

interface ReqBody {
  inFilenames: string[];
}

interface ResBody {
  inFilenames: {
    [filename: string]: string;
  };
}

interface SnippetsJson10 {
  version: "1.0";
  inFilenames: string[];
}

const SNIPPETS_JSON = "snippets.json";

app.post("/:hash", async (req, res) => {
  const hash = req.params.hash;
  const bucket = getStorage().bucket(); // Default bucket for project

  // Does hash/ folder exist?
  const [exists] = await bucket.file(`${hash}/${SNIPPETS_JSON}`).exists();
  if (exists) {
    res.status(400).send(`The hash '${hash}' already exists`);
    return;
  }

  // Hash not exist
  const reqBody = req.body as ReqBody;
  const resBody: ResBody = { inFilenames: {} };

  //  For each filename, create signed URL
  for (const filename of reqBody.inFilenames) {
    const path = `${hash}/in/${filename}`;
    logger.debug(`Signing '${path}'`);
    const file = bucket.file(path);
    const [signedUrl] = await signUrl(file);
    resBody.inFilenames[filename] = signedUrl;
  }

  // Create snippets.json
  const path = `${hash}/${SNIPPETS_JSON}`;
  logger.debug(`Creating '${path}'`);
  const file = bucket.file(path);
  const snippetsJson: SnippetsJson10 = {
    version: "1.0",
    inFilenames: reqBody.inFilenames,
  };
  await file.save(JSON.stringify(snippetsJson));

  // and return it in response
  res.status(201).json(resBody);
});

/**
 * Returns a signed URL for writing to the specified file.
 *
 * Only wrapper for `getSignedUrl()` for easier replacing with a mock for tests, because this function cannot be tested in emulator (requires full Google Cloud stack).
 *
 * @param file - The Firebase Storage file reference (must have a getSignedUrl method).
 */
async function signUrl(file: File): Promise<[string]> {
  // Run inside Firebase emulator
  if (process.env.FIREBASE_EMULATOR_HUB) {
    return Promise.resolve([`https://.../${file.name}?some=signing`]);
  } else {
    return await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      // contentType intentionally omitted
    });
  }
}
