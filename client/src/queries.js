import { gql } from 'apollo-boost'

export const GET_OWNERS = gql`
  {
    owners {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`

export const ADD_OWNER = gql`
  mutation AddOwner($id: ID!, $firstName: String!, $lastName: String!) {
    addOwner(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_OWNER = gql`
  mutation RemoveOwner($id: ID!) {
    removeOwner(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_OWNER = gql`
  mutation UpdateOwner($id: ID!, $firstName: String!, $lastName: String!) {
    updateOwner(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`