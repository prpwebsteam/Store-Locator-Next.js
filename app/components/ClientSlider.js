// ClientSlider.js
'use client'
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Profile from '../assests/profile.png'

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "block !important",
          backgroundColor: "#fff !important",
          borderRadius: "100% !important",
          padding: "5px !important",
          zIndex: 2
        }}
        onClick={onClick}
      >
        <FaArrowRight size={20} color="#000" />
      </div>
    );
}
  
function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "block !important",
          backgroundColor: "#fff !important",
          borderRadius: "100% !important",
          padding: "5px !important",
          zIndex: 2
        }}
        onClick={onClick}
      >
        <FaArrowLeft size={20} color="#000" />
      </div>
    );
}
  

const sampleClients = [
    {
      image: {Profile}, 
      name: 'Jane Doe',
      title: 'CEO',
      testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      image: {Profile}, 
      name: 'John Smith',
      title: 'Marketing Director',
      testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
  ];

const ClientSlider = ({ clients = sampleClients }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className='page-width md:mx-8 margin-slider flex justify-center' style={styles.sliderContainer}>
      <Slider className='w-[90%] md:w-[80%] rounded-lg shadow-xl' {...settings}>
        {clients.map((client, index) => (
          <div key={index} style={styles.slide}>
            <div style={styles.card}>
              <img src={client.image} alt={client.name} style={styles.clientImage} />
              <p className='text-center flex justify-center md:px-24' style={styles.testimonial}>{client.testimonial}</p>
              <div style={styles.clientInfo}>
                <p style={styles.clientName}>{client.name}</p>
                <p style={styles.clientTitle}>{client.title}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const styles = {
  sliderContainer: {
    width: '100%',
    margin: '0 auto',
  },
  slide: {
    textAlign: 'center',
    padding: 10,
  },
  card: {
    transition: '0.3s',
    padding: '2rem',
    borderRadius: '20px',
    background: '#fff',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  clientImage: {
    borderRadius: '50%',
    marginBottom: '1rem',
    width: '80px',
    height: '80px', 
  },
  testimonial: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
  },
  clientInfo: {
    textAlign: 'center',
  },
  clientName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  clientTitle: {
    fontSize: '1rem',
    color: '#777',
  }
};

export default ClientSlider;