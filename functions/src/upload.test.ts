import { expect, test } from "vitest";
import request from "supertest";
import { getStorage } from "firebase-admin/storage";
import { app } from "./upload.js";

test("returns signed URLs for a new hash", async () => {
  // *** Arrange ***
  const hash = "34ce5bc8";
  const bucket = getStorage().bucket();

  // *** Act ***
  const res = await request(app)
    .post(`/${hash}`)
    .send({
      inFilenames: ["index.rst", "conf.py"],
    });

  // *** Assert ***
  expect(res.status).toBe(201);
  expect(res.headers["content-type"]).toMatch("application/json");
  expect(res.body).toEqual({
    inFilenames: {
      "index.rst": `https://.../${hash}/in/index.rst?some=signing`,
      "conf.py": `https://.../${hash}/in/conf.py?some=signing`,
    },
  });

  // This will fail in emulators, but works anyway
  const [files] = await bucket.getFiles();
  const fileNames = files.map((file) => file.name);
  expect(fileNames).toEqual(
    expect.arrayContaining([
      `${hash}/snippets.json`,
      `${hash}/in/index.rst`,
      `${hash}/in/conf.py`,
    ]),
  );
});

test("fail if hash already exists", async () => {
  // Arrange
  const hash = "34ce5bc8";
  const bucket = getStorage().bucket();
  await bucket.file(`${hash}/snippets.json`).save(""); // Create a folder-like object in GCS

  // Act
  const res = await request(app)
    .post(`/${hash}`)
    .send({
      filenames: ["index.rst", "conf.py"],
    });

  // Assert
  expect(res.status).toBe(400);
  expect(res.text).toBe(`The hash '${hash}' already exists`);
});

test("forbid GET", async () => {
  const resp = await request(app).get("/");
  expect(resp.status).toBe(404);
});
