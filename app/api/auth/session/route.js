import { validateSession } from "@/lib/authMiddleware";
import User from "@/models/User";
import connectToDatabase from "@/lib/db";

export async function GET(req) {
  await connectToDatabase();

  // Validate session and get the user ID
  const userId = await validateSession(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    // Fetch user data excluding the password
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
