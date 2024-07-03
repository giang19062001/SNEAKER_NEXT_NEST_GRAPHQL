import { gql } from '@apollo/client';

export const GET_COUPONS = gql`
 query {
  coupons{
    _id
    name
    discount
  }
}
`;


export const ADD_COUPON = gql`
mutation($name: String!, $discount: Float!) {
  addCoupon (input: {name: $name, discount: $discount}){
    _id
  }
}
`;
