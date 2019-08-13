import React from 'react'
import { Mutation } from 'react-apollo'
import { UPDATE_OWNER } from '../queries'
import { Button, TextField } from '@material-ui/core'


const UpdateOwner = (props) => {
  const { id, firstName, lastName, onInputChange, onButtonClick } = props
  console.log(firstName, lastName)
  return (
    <Mutation
      mutation={UPDATE_OWNER}
      key={id}
    >
      {(UpdateOwner, { loading, error }) => (
        // I am getting a "Form submission canceled because the form is not connected" error, have to figure our a way to connect the form to the document.
        <form onSubmit={e => {
          e.preventDefault()
          UpdateOwner({ variables: { id, firstName, lastName }})
        }}>
          <TextField
            defaultValue={firstName}
            placeholder='i.e. John'
            onChange={e => onInputChange('firstName', e.target.value)}
            margin='normal'
            varian='outlined'
            style={{ margin: '5px' }}
          />
          <TextField
            defaultValue={lastName}
            placeholder='i.e. Smith'
            onChange={e => onInputChange('lastName', e.target.value)}
            margin='normal'
            varian='outlined'
            style={{ margin: '5px' }}
          />
          <Button
            type='submit'
            onClick={onButtonClick}
            variant='contained'
            color='primary'
            style={{ margin: '5px' }}
          >
            Update Contact
          </Button>
          <Button
            onClick={onButtonClick}
            variant='contained'
            color='secondary'
            style={{ margin: '5px' }}
          >
            Cancel
          </Button>
        </form>
      )}
    </Mutation>
  )
}

export default UpdateOwner