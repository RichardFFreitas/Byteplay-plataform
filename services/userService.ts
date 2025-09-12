'use server'

import dbConnect from "@/lib/db/mongodb";
import { PlansName } from "@/models/enums/plansName";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function createUser(data: {
  name: string;
  email: string;
  phone: string;
  taxId: string;
  password: string;
  plan: PlansName;
}) {
  await dbConnect();
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Email já cadastrado");

  const taxIdHash = await bcrypt.hash(data.taxId, 10);
  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    taxIdHash,
    passwordHash,
    lastPayment: null,
  });

  return user;
}
