"user server"

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { createUser } from "@/services/userService";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  try {
    const user = await createUser(body);
    return NextResponse.json({ id: user._id, email: user.email });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
