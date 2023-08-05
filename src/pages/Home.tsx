import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../index.css';

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    
    <div className='row justify-content-center mt-3'>
      <div className='col-lg-8'>
        <div className='carousel-container'>
          <Carousel activeIndex={index} onSelect={handleSelect} fade>
            <Carousel.Item>
              <img className="carousel-image" src='../dist/imgs/ca20.jpg' alt="First slide" />
             
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image" src="../dist/imgs/ca21.jpg" alt="Second slide" />
              
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image" src="../dist/imgs/ca22.jpeg" alt="Third slide" />
             
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
   
  );
};

export default Home;