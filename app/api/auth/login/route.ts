"use server"

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { loginUser } from "@/services/authService";

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();

  try {
    const { user, token } = await loginUser(email, password);

    // Set cookie HTTPOnly
    const res = NextResponse.json({
      id: user._id,
      token: token,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
