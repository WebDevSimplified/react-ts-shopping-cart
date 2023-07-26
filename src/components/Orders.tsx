import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import data from '../data/items.json';

export default function Orders() {
  const { id } = useParams<{ id: string }>();
  const info = data.find((x) => x.id === parseInt(id ?? '10'));

  if (!info) {
    return <div>Sorry, this cake is not found</div>;
  }

  const { getItemQuantity, decreaseCartQuantity, increaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(info.id);
  const getPriceForSize = (size: string) => {
   
    return info.price[size as keyof typeof info.price] || 0;
  };

  return (
    <Card className="h-100">
      <Card.Header>
        <Link to="/store">Back to Order</Link>
      </Card.Header>

      <Card.Body className="d-flex flex-column">
        <Card.Title>
          <Typography align="center" variant="h5">
            {info.name}
          </Typography>
        </Card.Title>
        <Card.Img className="w-50 mx-auto" src={info.pic} alt={info.name} style={{ objectFit: 'cover' }} />
        <Card.Text>
  <span className="fs-2">
    <Typography variant="body1">
      <p>{info.description}</p>
    </Typography>
  </span>

</Card.Text>        <div className="mt-auto">
          {quantity === 0 ? (
             <Button className="w-100" onClick={() => increaseCartQuantity(info.id)}>
             + Add To Cart
           </Button> 
          ) : (
            <div className="d-flex align-items-center flex-column" style={{ gap: '.5rem' }}>
              <div className="d-flex align-items-center justify-content-center" style={{ gap: '.5rem' }}>
                <Button onClick={() => decreaseCartQuantity(info.id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(info.id)}>+</Button>
              </div>
              <div>
                <Button onClick={() => removeFromCart(info.id)} variant="danger" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
