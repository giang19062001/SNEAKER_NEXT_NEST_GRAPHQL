
export const CreateOrderDtoInitial = {
  user: "",
  amount: "",
  ship: "0",
  phone: "",
  address: "",
  cart: [],
};


export type cartDto = {
  _id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}


export type ExecuteOrderDto = {
  paymentID: string;
  payerID: string;
  orderPaypalID: string
}

export type CreateOrderDto = {
  user: string,
  amount: string,
  ship: string,
  phone: string,
  address: string,
  cart: cartDto[],
}