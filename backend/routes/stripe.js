require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const express = require('express');
const router = express.Router();
const storeItems = require('../items.json');
const baseUrl=process.env.SERVER_URL
router.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  const line_items = cartItems.map(cartItem => {
    const foundItem = storeItems.find(storeItem => storeItem.id === cartItem.id);
    console.log(foundItem)
    const imageUrl = `../react-ts-shopping-cart_test/public${foundItem.pic}`;
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: foundItem.name,
          images:[imageUrl],
          description: foundItem.description,
          metadata: {
            itemId: foundItem.id,
          },
        },
        unit_amount: foundItem.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });
 try{
  const session = await stripe.checkout.sessions.create({
     payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 799,
            currency: "usd",
          },
          display_name: "Ground shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}Store`,
  });

  res.send({ url: session.url });
}catch(error){
  console.log(error);
  res.status(500).send('Error occurred')
}
})

module.exports = router;
