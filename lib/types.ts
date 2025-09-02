import { UUID } from "crypto";

export interface InfinitePayReq {
  handle: "richard-felipe-freitas";
  redirect_url: "http://localhost:3000/dashboard";
  webhook_url: "http://localhost:3000/api/infinitepay/webhook";
  order_nsu: UUID;
  customer: InfinitePayCustomer;
  items: InfinitePayItem[];
}

interface InfinitePayCustomer {
  name: string,
  email: string,
  phone_number: string
}

interface InfinitePayItem {
  quantity: number,
  price: number,
  description: string
}