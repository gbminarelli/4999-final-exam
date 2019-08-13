import React, { Component } from "react";
import UpdateOwner from "./UpdateOwner";
import { Button, ListItem, ListItemText } from "@material-ui/core";
import RemoveOwner from "./RemoveOwner";
import Cars from "./Cars";

class Owner extends Component {
  state = {
    editMode: false,
    id: this.props.id || "",
    firstName: this.props.firstName || "",
    lastName: this.props.lastName || ""
  };

  handleEditButtonClick = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleButtonClick = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  render() {
    const { editMode, id, firstName, lastName } = this.state;
    const fullName = `${firstName} ${lastName}`;

    return (
      <div>
        {editMode ? (
          <UpdateOwner
            editMode={editMode}
            id={id}
            firstName={firstName}
            lastName={lastName}
            onButtonClick={this.handleButtonClick}
            onInputChange={this.handleInputChange}
          />
        ) : (
          <ListItem>
            <ListItemText primary={fullName} />
            <Button
              onClick={e => this.handleButtonClick()}
              variant="contained"
              style={{ margin: "5px" }}
            >
              Edit
            </Button>
            <RemoveOwner id={id} firstName={firstName} lastName={lastName} />
          </ListItem>
        )
        }
        <Cars />
      </div>
    );
  }
}

export default Owner;
