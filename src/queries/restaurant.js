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
        events(where: { user_id: {_eq: $userId}}, order_by: {date: desc}) {
          restaurant_id
          id
          date
          comments
        }
        allEvents: events(order_by: {date: desc}) {
          restaurant_id
          id
          date
          comments
          restauranteventid {
            name
            address
          }
        }
    }
`;


export const CREATE_EVENT = gql`
  mutation CreateEvent($comments: String!, $restaurant_id: Int!, $user_id: Int!) {
    insert_events(objects: {comments: $comments, restaurant_id: $restaurant_id, user_id:  $user_id}) {
      returning {
        id
      }
    }
  }
`;
 