"use server"

const BASE_URL = process.env.BASE_URL;
const ABACATEPAY_API_KEY = process.env.ABACATEPAY_API_KEY;

const ABACATE_PAY_URL = "https://api.abacatepay.com/v1/";

interface Product {
  externalId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  taxId: string;
}

interface BillingResponse {
  error: null | string;
  data: {
    id: string;
    products: Array<{
      id: string;
      externalId: string;
      quantity: number;
    }>;
    amount: number;
    status: string;
    devMode: boolean;
    methods: string[];
    url: string;
    customer?: {
      id: string;
      metadata: {
        name: string;
        cellphone: string;
        taxId: string;
        email: string;
      }
    }
  }
}

interface PixelPlan {
  externalId: "pixel-plan";
  name: "Pixel";
  description: "Perfeito para começar sua jornada retrô";
  quantity: 1;
  price: 499;
}

interface TurboPlan {
  externalId: "turbo-plan";
  name: "Turbo";
  description: "A escolha mais popular dos gamers";
  quantity: 1;
  price: 999;
}

interface UltraPlan {
  externalId: "ultra-plan";
  name: "Ultra";
  description: "Experiência completa sem limites";
  quantity: 1;
  price: 1499;
}

export type ProductType = PixelPlan | TurboPlan | UltraPlan;

function getProductByType(pType: ProductType): Product {
  const product = {
    externalId: pType.externalId,
    name: pType.name,
    description: pType.description,
    quantity: pType.quantity,
    price: pType.price,
  }

  return product;
}

export async function createPixPayment(productType: ProductType, clientInfo: ClientInfo) {
  try {
    const product = getProductByType(productType);

    if (product.price < 100) {
      throw new Error("O valor mínimo para pagamento via Pix é R$1,00");
    }

    const formattedPhone = clientInfo.phone
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d+)/, '+55$1$2');

    const formattedTaxId = clientInfo.taxId.replace(/\D/g, '');

    const body = JSON.stringify({
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [product],
      returnUrl: `${BASE_URL}/#pricing`,
      completionUrl: `${BASE_URL}/dashboard`,
      customer: {
        name: clientInfo.name,
        email: clientInfo.email,
        cellphone: formattedPhone,
        taxId: formattedTaxId,
      }
    });

    const response = await fetch(`${ABACATE_PAY_URL}billing/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ABACATEPAY_API_KEY}`,
        'Accept': 'application/json',
      },
      body
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(`Erro ao criar cobrança: ${errorResponse}`);
    }

    const data: BillingResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar pagamento via Pix:", error);
    throw error;
  }
}