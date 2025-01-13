import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Video from "@/models/Video";

export async function POST(req, { params }) {
  const { videoId } = await params;
  const { user, text } = await req.json();

  // Validate input
  if (!text) {
    return NextResponse.json(
      { error: "Text is required for comments" },
      { status: 400 }
    );
  }

  await connectToDatabase();

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Add comment to the video
    video.comments.push({
      user: user || "Anonymous", // Use "Anonymous" if user is not provided
      text,
    });

    await video.save();

    return NextResponse.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
