"user server"

import User from "@/models/User";
import bcrypt from "bcrypt";
import { signJwt } from "@/lib/jwt";
import dbConnect from "@/lib/db/mongodb";

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
