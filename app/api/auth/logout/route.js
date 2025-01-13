import connectToDatabase from "@/lib/db";
import Session from "@/models/Session";
import { cookies } from "next/headers";

export async function POST(req) {
  await connectToDatabase();

  // Get session token from cookies
  const cookieStore = await cookies();
  const sessionToken = await cookieStore.get("token");

  // Check if the user is logged in
  if (!sessionToken) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
    });
  }

  await cookieStore.set("token", "", { maxAge: 0 });

  // Clear the cookie
  return new Response(JSON.stringify({ message: "Logout successful" }), {
    status: 200,
    headers: {
      "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
    },
  });
}
