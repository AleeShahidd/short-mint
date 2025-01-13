import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Video from "@/models/Video";

export async function POST(req) {
  try {
    const { title, description, videoUrl } = await req.json();

    if (!title || !description || !videoUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newVideo = await Video.create({
      title,
      description,
      videoUrl,
    });

    return NextResponse.json(
      { success: true, video: newVideo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/videos/upload:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find();
    return NextResponse.json({ videos }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/videos/upload:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
