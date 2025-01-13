import { hash } from "bcryptjs";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  const { name, email, password, role } = await req.json();
  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return new Response(JSON.stringify({ error: "Email already exists" }), {
      status: 400,
    });

  const hashedPassword = await hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  console.log(newUser);
  return new Response(JSON.stringify({ success: true, user: newUser }), {
    status: 201,
  });
}
