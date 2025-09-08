export interface Product {
  externalId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  taxId: string;
}

export interface BillingResponse {
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
      };
    };
  };
}