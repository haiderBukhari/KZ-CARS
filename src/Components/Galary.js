import React, { useEffect, useState } from 'react'; // Import useState
import img4 from '../Assets/gallary/img-4.jpeg';
import img5 from '../Assets/gallary/img-5.jpeg';
import img6 from '../Assets/gallary/img-6.jpeg';
import './Galary.css';
import Header from './Header'
import Footer from './Footer'
export function Galary() {
  const images = [img4, img5, img6];
  const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the current index

  useEffect(() => {
    const updateIndex = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    const interval = setInterval(updateIndex, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header/>
      <h1 className='gallery-h1'>GALLERY</h1>
      <section className="container0101">
        <div className="slider-wrapper">
          <div className="slider">
            {images.map((arr, length) => (
              <img
              key={length} // Adding a key to the images
              id={`slide-${length + 1}`}
              src={arr}
              alt="KZ CARS BEST CAR SERVICE"
              style={{ display: length === currentIndex ? 'block' : 'none' }} // Show only the current image
              />
              ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
