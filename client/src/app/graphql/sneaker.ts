import {  gql } from '@apollo/client';
export const GET_SNEAKER = gql`
 query {
    sneakers {
        _id
        name
        price: formatNumber
        image
    }
}
`;
