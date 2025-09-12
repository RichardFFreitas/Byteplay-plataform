"use server"

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { registerUser } from "@/services/authService";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const { createdUser, token } = await registerUser(body)
  try {
    const res = NextResponse.json({
      id: createdUser._id,
      token: token,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
