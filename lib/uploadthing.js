import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const uploadVideo = f({
  image: { maxFileSize: "1024MB", accept: ["video/mp4"] },
});

export const { getUploadthingServer, getUploadthingClient } = uploadVideo;
