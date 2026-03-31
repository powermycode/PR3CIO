import { createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/types";

const f = createUploadthing();

export const uploadRouter = {
  audioUploader: f({
    audio: {
      maxFileSize: "32MB",
    },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),

  imageUploader: f({
    image: {
      maxFileSize: "4MB",
    },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
};

export type AppRouter = typeof uploadRouter;
