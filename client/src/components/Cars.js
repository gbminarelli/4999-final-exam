import React from "react";
import { Query } from "react-apollo";

import { GET_OWNERS } from "../queries";
import Car from "./Car";

import { List, Container } from "@material-ui/core";

const Cars = () => (
  <Query query={GET_OWNERS}>
    {({ loading, error, data }) => {
      console.log("data", data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      return (
        <ul>
          {data.owners.map(({ cars }) => {
            return cars.map(({ id, year, make, model, price }) => (
              <Container key={id}>
                <List>
                  <Car
                    key={id}
                    id={id}
                    year={year}
                    make={make}
                    price={price}
                    model={model}
                  />
                </List>
              </Container>
            ));
          })}
        </ul>
      );
    }}
  </Query>
);

export default Cars;
