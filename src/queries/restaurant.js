import gql from 'graphql-tag';

export const GET_RESTAURANT_DETAILS_FOR_USER = gql`
    query GET_RESTAURANT_DETAILS_FOR_USER($userId: Int!) { 
        user(where: {id: {_eq: $userId}}) {
            id
            type
            restaurant {
              description
              address
              name
              id
            }
          }
    }
`;
