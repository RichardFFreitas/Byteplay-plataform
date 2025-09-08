"use server";

import { ClientInfo, Product, BillingResponse } from "@/models/Payment";
import { pixelPlan, turboPlan, ultraPlan } from "@/models/Plans";

const BASE_URL = process.env.BASE_URL;
const ABACATEPAY_API_KEY = process.env.ABACATEPAY_API_KEY;

const ABACATE_PAY_URL = process.env.ABACATE_PAY_URL;

export type ProductType = typeof pixelPlan | typeof turboPlan | typeof ultraPlan;

function getProductByType(pType: ProductType): Product {
  const product = {
    externalId: pType.externalId,
    name: pType.name,
    description: pType.description,
    quantity: pType.quantity,
    price: pType.price,
  };

  return product;
}

export async function createPixPayment(
  productType: ProductType,
  clientInfo: ClientInfo
) {
  try {
    const product = getProductByType(productType);

    if (product.price < 100) {
      throw new Error("O valor mínimo para pagamento via Pix é R$1,00");
    }

    const formattedPhone = clientInfo.phone
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d+)/, "+55$1$2");

    const formattedTaxId = clientInfo.taxId.replace(/\D/g, "");

    const body = JSON.stringify({
      frequency: "ONE_TIME",
      methods: ["PIX"],
      products: [product],
      returnUrl: `${BASE_URL}/#pricing`,
      completionUrl: `${BASE_URL}/dashboard`,
      customer: {
        name: clientInfo.name,
        email: clientInfo.email,
        cellphone: formattedPhone,
        taxId: formattedTaxId,
      },
    });
    const response = await fetch(`${ABACATE_PAY_URL}/billing/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ABACATEPAY_API_KEY}`,
        Accept: "application/json",
      },
      body,
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(`Erro ao criar cobrança: ${errorResponse}`);
    }

    const billingRes: BillingResponse = await response.json();
    return billingRes;
  } catch (error) {
    console.error("Erro ao criar pagamento via Pix:", error);
    throw error;
  }
}
