import User from "@/models/User";
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(){
    const users = await User.find({});
    return NextResponse.json(users);
    
}