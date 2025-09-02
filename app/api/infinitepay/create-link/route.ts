import { NextResponse } from "next/server";
import { InfinitePayReq } from "../../../../lib/types";
import { randomUUID } from "crypto";

// Coloque aqui sua API Key da InfinitePay
// const INFINITEPAY_API_KEY = process.env.INFINITEPAY_API_KEY;


export async function POST(req: Request) {
  try {
    const { name, email, phone_number, quantity, price, description } = await req.json();

    const body = {
      handle: "richard-felipe-freitas",
      redirect_url: "http://localhost:3000/dashboard",
      order_nsu: randomUUID(),
      webhook_url: "http://localhost:3000/api/infinitepay/webhook",
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

    const res = await fetch(
      "https://api.infinitepay.io/invoices/public/checkout/links",
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${INFINITEPAY_API_KEY}`,
        // },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    // retorna URL do checkout pro frontend
    return NextResponse.json({ checkoutUrl: data.url || data.slug });
  } catch (err) {
    console.error("Erro criando link InfinitePay:", err);
    return NextResponse.json(
      { error: "Erro criando link de pagamento" },
      { status: 500 },
    );
  }
}
