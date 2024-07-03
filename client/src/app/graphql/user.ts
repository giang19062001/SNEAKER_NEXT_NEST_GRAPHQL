import { gql } from '@apollo/client';

export const ADD_USERS = gql`
    mutation ($name: String!, $email: String!, $provider: String!) {
            addUser(input : {name: $name, email: $email,  provider: $provider}) {
                _id
            }
          }
`;
export const GET_USER = gql`
 query ($email: String!)  {
    findUser(email: $email){
      _id
    }
  }
`;


  
    