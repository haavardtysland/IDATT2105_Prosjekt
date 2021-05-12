import { gql } from '@apollo/client';

export const GET_USER_NAMES = gql`
  query {
    getUsers {
      username
    }
  }
`;

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(info: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const GET_CARS = gql`
  query {
    getCars {
      id
      code
      picture
      model_name
      year_model
      mileage
      prices {
        sum
        date
      }
    }
  }
`;
