import { gql } from "@apollo/client";

export const GET_ORDER_BY_USER = gql`
  query ($userId: String!) {
    findOrderByUser(userId: $userId) {
      _id
      amount
      ship
      phone
      address
      status
      createdAt
      updatedAt
      cart {
        _id
        name
        price
        image
        quantity
      }
    }
  }
`;
