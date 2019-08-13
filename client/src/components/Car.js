import React, { Component } from "react";
// import UpdateOwner from "./UpdateOwner";
import { Button, ListItem, ListItemText } from "@material-ui/core";
// import RemoveOwner from "./RemoveOwner";

class Car extends Component {
  state = {
    editMode: false,
    id: this.props.id || "",
    make: this.props.make || "",
    model: this.props.model || "",
    year: this.props.year || "",
    price: this.props.price || "",
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
      // editMode: !this.state.editMode
    });
  };

  render() {
    const { editMode, id, make, model, price, year } = this.state;
    const fullName = `${year} ${make} ${model}`;

    return (
      <div>
        {editMode ? (
          // <UpdateOwner
          //   editMode={editMode}
          //   id={id}
          //   firstName={firstName}
          //   lastName={lastName}
          //   onButtonClick={this.handleButtonClick}
          //   onInputChange={this.handleInputChange}
          // />
          <div></div>
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
            {/* <RemoveOwner id={id} firstName={firstName} lastName={lastName} /> */}
          </ListItem>
        )
        
        }
      </div>
    );
  }
}

export default Car;
