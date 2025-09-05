"use server"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📩 Webhook InfinitePay recebido:", body);

    if (!body.order_nsu) {
      return NextResponse.json(
        { success: false, message: "order_nsu ausente" },
        { status: 400 },
      );
    }

    console.log(`✅ Pedido ${body.order_nsu} confirmado como pago.`);
    return NextResponse.json({ success: true, message: null }, { status: 200 });
  } catch (err) {
    console.error("❌ Erro no webhook InfinitePay:", err);

    return NextResponse.json(
      { success: false, message: "Erro ao processar webhook" },
      { status: 400 },
    );
  }
}
