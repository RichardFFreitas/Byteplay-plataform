"use server"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📩 Webhook InfinitePay recebido:", body);

    // exemplo de validação básica
    if (!body.order_nsu) {
      return NextResponse.json(
        { success: false, message: "order_nsu ausente" },
        { status: 400 },
      );
    }

    // se a transação foi paga
    if (body.status === "paid") {
      // aqui você atualiza no banco o pedido
      // await db.orders.update({ order_nsu: body.order_nsu }, { status: "paid" });
      console.log(`✅ Pedido ${body.order_nsu} confirmado como pago.`);
    }

    // retorno padrão esperado pela InfinitePay
    return NextResponse.json({ success: true, message: null }, { status: 200 });
  } catch (err) {
    console.error("❌ Erro no webhook InfinitePay:", err);

    return NextResponse.json(
      { success: false, message: "Erro ao processar webhook" },
      { status: 400 },
    );
  }
}
