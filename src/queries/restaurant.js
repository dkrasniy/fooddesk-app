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
          feedcount
          comments
          userclaimer {
            id
          }
        }
        allEvents: events(order_by: {date: desc}) {
          restaurant_id
          id
          date
          comments
          feedcount
          userclaimer {
            id
          }
          restauranteventid {
            name
            address
          }
        }
        myClaimed: events(where: {claimer_id: {_eq: $userId}}) {
          restaurant_id
          id
          date
          comments
          feedcount
          userclaimer {
            id
          }
          restauranteventid {
            name
            address
          }
        }
    }
`;


export const CREATE_EVENT = gql`
  mutation CreateEvent($comments: String!, $feedCount: Int!, $restaurant_id: Int!, $user_id: Int!) {
    insert_events(objects: {comments: $comments, feedcount:$feedCount, restaurant_id: $restaurant_id, user_id:  $user_id}) {
      returning {
        id
      }
    }
  }
`;


export const UPDATE_EVENT = gql`
  mutation updateEventWithClaimer($eventId: Int!, $claimerId: Int) {
    update_events(where: {id: {_eq: $eventId}}, _set: {claimer_id: $claimerId}) {
      returning {
        id
      }
    }
  }
`;
 