import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET() {
  const users = await User.find({});
  return NextResponse.json(users);
}
// delete user
export async function DELETE({ params }) {
  const { id } = await params;
  await User.findByIdAndDelete(id);
  return NextResponse.ok();
}
