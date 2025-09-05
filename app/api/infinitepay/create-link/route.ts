import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const BASE_URL = process.env.BASE_URL;
const HANDLE = process.env.INFINITEPAY_HANDLE;

export async function POST(req: Request) {
  try {
    const { name, email, phone_number, quantity, price, description } = await req.json();

    const body = {
      handle: HANDLE,
      redirect_url: `${BASE_URL}/dashboard`,
      order_nsu: randomUUID(),
      webhook_url: `${BASE_URL}/api/infinitepay/webhook`,
      customer: {
        name: name,
        email: email,
        phone_number: phone_number
      },
      items: [
        {
          quantity: quantity,
          price: price,
          description: description
        },
      ],
    };

    const checkoutUrl = "https://api.infinitepay.io/invoices/public/checkout/links"

    const res = await fetch(
      checkoutUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    return NextResponse.json({ checkoutUrl: data.url || data.slug });
  } catch (err) {
    console.error("Erro criando link InfinitePay:", err);
    return NextResponse.json(
      { error: "Erro criando link de pagamento" },
      { status: 500 },
    );
  }
}
