"use server"

import User from "@/models/User";
import bcrypt from "bcrypt";
import { signJwt } from "@/lib/jwt";
import dbConnect from "@/lib/db/mongodb";
import { createUser } from "./userService";
import { PlansName } from "@/models/enums/plansName";
import { NextResponse } from "next/server";

export async function loginUser(email: string, password: string) {
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuário não encontrado");

  const isMatch = await bcrypt.compare(password, user.taxIdHash);
  if (!isMatch) throw new Error("Senha inválida");

  // payload leve no token
  const token = signJwt({
    sub: user._id.toString(),
    email: user.email,
    plan: user.plan,
  });

  return { user, token };
}

export async function registerUser(userData: {
  name: string;
  email: string;
  phone: string;
  taxId: string;
  plan: PlansName;
}) {
  await dbConnect();

  const createdUser = await createUser(userData);

  const token = signJwt({
    sub: createdUser._id.toString(),
    email: createdUser.email,
    plan: createdUser.plan,
  });
  return { createdUser, token }
}