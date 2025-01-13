import jwt from "jsonwebtoken";

export function validateSession(req) {
  // Retrieve the token from cookies
  const token = req.cookies.get("token")?.value; // Use `.value` to extract the cookie value

  if (!token) return null;

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Return the user ID or any other required data from the decoded token
    return decoded.id; // Assuming the payload includes `id`
  } catch (error) {
    console.error("Token validation error:", error.message);
    return null;
  }
}
