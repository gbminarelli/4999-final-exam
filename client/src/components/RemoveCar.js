import React from 'react'
import { Mutation } from 'react-apollo'
import { Button } from '@material-ui/core'
import { GET_CARS, REMOVE_CAR } from '../queries'
import { filter } from 'lodash'

const RemoveCar = ({ id, firstName, lastName }) => {
  return (
    <Mutation
      mutation={REMOVE_CAR}
      update={(store, { data: { RemoveCar } }) => {
        const { owners } = store.readQuery({ query: GET_CARS })
        store.writeQuery({
          query: GET_CARS,
          data: { owners: filter(owners, c => { return c.id !== RemoveCar.id }) }
        })
      }}
    >
      {RemoveCar => (
        <Button onClick={e => {
          e.preventDefault()
          RemoveCar({
            variables: {
              id
            },
            optimisticResponse: {
              __typename: 'Mutation',
              RemoveCar: {
                __typename: 'Car',
                id,
                firstName,
                lastName
              }
            }
          })
        }}
          variant='contained'
          color='secondary'
          style={{ margin: '5px' }}
        >
          Delete
        </Button>
      )}
    </Mutation>
  )
}

export default RemoveCar