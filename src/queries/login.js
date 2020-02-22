import gql from 'graphql-tag';

export const GETUSER=gql`
    query { 
        user {
            id
          }
    }
`;
