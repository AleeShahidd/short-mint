import connectToDatabase from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

// Toggle like on a video
export async function POST(req, { params }) {
  const { videoId } = await params; // Extract video ID from params
  const { user } = await req.json(); // Extract user ID from request body

  await connectToDatabase();

  try {
    if (!user) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Check if the user has already liked the video
    const hasLiked = video.likes.includes(user);

    if (hasLiked) {
      // Remove the like
      video.likes = video.likes.filter((like) => like !== user);
    } else {
      // Add the like
      video.likes.push(user);
    }

    await video.save();

    return NextResponse.json({
      message: hasLiked
        ? "Like removed successfully"
        : "Like added successfully",
      videoId,
      likes: video.likes,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
