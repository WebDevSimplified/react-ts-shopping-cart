import axios from "axios";
// import { url } from "../slices/api";
import { Button } from "react-bootstrap";
import React from 'react';
import storeItems from "../data/items.json";
type CartItem = {
    id: number;
    quantity: number;
};

type PayButtonProps = {
  cartItems: CartItem[];
};



const PayButton = ({ cartItems }: PayButtonProps) => {
  
    const handleCheckout = () => {

    console.log(cartItems);
    cartItems.forEach((cartItem) => {
        const item = storeItems.find((item) => item.id === cartItem.id);
        if (item) {
          console.log("Item Details:");
          console.log("ID:", item.id);
          console.log("Name:", item.name);
          console.log("Price:", item.price);
          console.log("description:", item.description);
          console.log("pic:", item.pic);
          console.log(cartItem.quantity);
          axios.post("http://localhost:1000/api/stripe/create-checkout-session", {
            itemId: item.id,
            itemName: item.name,
            itemPrice: item.price,
            itemDescription: item.description,
            itemPic: item.pic,
            quantity: cartItem.quantity,
            cartItems,
          })
            .then((response) => {
              console.log("Checkout response:", response.data);
              if(response.data.url){
                window.location.href=response.data.url;
              }
            })
            .catch((error) => {
              console.error("Checkout error:", error);
              // Handle any errors that occurred during the checkout process
            });
        
        }
        
      });
  };

  return (
    <>
      <Button onClick={handleCheckout}>Checkout</Button>
    </>
  );
};

export default PayButton;