import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode,
          country: "USA"
        },
        email: this.state.email
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        console.log(res);
        this.setState({
          loading: false
        });
        console.log("props", this.props);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    let form = (
      <form onSubmit={this.orderHandler}>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="text" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Your Street" />
        <input type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success">Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
