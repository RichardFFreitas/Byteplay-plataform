"use server"

import AbacatePay from "abacatepay-nodejs-sdk";
import { NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL;
const ABACATEPAY_API_KEY = process.env.ABACATEPAY_API_KEY;
const abacate = AbacatePay(ABACATEPAY_API_KEY || "");

export async function createPixPayment(req: Request) {
  try {
    const { productId, productName, price, userEmail } = await req.json();

    const billing = await abacate.billing.create({
      frequency: "MULTIPLE_PAYMENTS",
      methods: ["PIX"],
      products: [
        {
          externalId: productId,
          name: productName,
          quantity: 1,
          price: price
        }
      ],
      returnUrl: `${BASE_URL}/#pricing`,
      completionUrl: `${BASE_URL}/dashboard`,
      customer: {
        email: userEmail
      }
    });

    return billing
  } catch (err) {
    console.error("Erro criando link AbacatePay:", err);
    return NextResponse.json(
      { error: "Erro criando link de pagamento" },
      { status: 500 },
    );
  }
}