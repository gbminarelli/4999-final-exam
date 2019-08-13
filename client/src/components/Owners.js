import React from "react";
import { Query } from "react-apollo";

import { GET_OWNERS } from "../queries";
import Owner from "./Owner";

import { List, Container } from "@material-ui/core";

const Owners = () => (
  <Query query={GET_OWNERS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      return (
        <ul>
          {data.owners.map(({ id, firstName, lastName }) => (
            <Container key={id}>
              <List>
                <Owner
                  key={id}
                  id={id}
                  firstName={firstName}
                  lastName={lastName}
                />
              </List>
            </Container>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default Owners;
