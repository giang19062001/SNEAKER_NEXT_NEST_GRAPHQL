import { gql } from '@apollo/client';

export const GET_USER = gql`
 query ($email: String!)  {
    findUser(email: $email){
      _id
    }
  }
`;


  
    