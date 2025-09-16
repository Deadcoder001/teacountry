import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import '../styles/Hero.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import local images
import teaGarden from '../assets/images/image_2025-07-22_12-10-02-1.png';
import umiamLake from '../assets/images/Umiam_Lake_Shillong_Meghalaya.jpg';
import teaCountryLandscape from '../assets/images/Untitled-design-4-1.png';

const Hero = () => {
  // Reference to swiper instance
  const swiperRef = useRef(null);

  // Array of background images using local files
  const backgroundImages = [
    {
      url: teaGarden,
      title: "Tea Gardens",
      description: "Experience the beauty of lush tea plantations"
    },
    {
      url: umiamLake,
      title: "Umiam Lake, Shillong",
      description: "Discover the serene waters of Meghalaya"
    },
    {
      url: teaCountryLandscape,
      title: "Tea Country Landscapes",
      description: "Explore the picturesque hills and valleys"
    }
  ];

  return (
    <div className="hero-container">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="bg-swiper"
      >
        {backgroundImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="hero-bg-slide" 
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.url})` }}
            >
              <div className="hero-content">
                <h1>Explore Tea Country</h1>
                <div className="hero-caption">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <button className="explore-btn">Explore Now</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;