"use client";

import { Input, Button, Card } from "@nextui-org/react";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });

  const handleSubmit = async () => {
    if (!form.videoUrl) {
      alert("Please upload a video before submitting.");
      return;
    }

    const res = await fetch("/api/videos/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Video uploaded successfully");
      setForm({
        title: "",
        description: "",
        videoUrl: "",
      });
    } else {
      alert("Error uploading video. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-5">
      <Card className="max-sm:w-full w-64 p-5 gap-4">
        <h1 className="text-3xl font-bold">Upload a Video</h1>
        <Input
          label="Title"
          placeholder="Enter video title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          label="Description"
          placeholder="Enter video description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {form.videoUrl === "" && (
          <UploadButton
            endpoint="videoUploader"
            onClientUploadComplete={(res) => {
              if (res && res[0] && res[0].url) {
                const videoUrl = res[0].url; // Extracting 'url' from the response
                setForm({ ...form, videoUrl });
                alert("Video uploaded successfully.");
              } else {
                alert("Video upload failed. Please try again.");
              }
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
        {form.videoUrl && (
          <div className="mt-4">
            <video src={form.videoUrl} controls className="w-full h-32" />
          </div>
        )}
        <Button color="primary" className="mt-4" onClick={handleSubmit}>
          Submit
        </Button>
      </Card>
    </div>
  );
}
