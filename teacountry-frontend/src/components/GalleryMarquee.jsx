import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';

// Import images
import teaEstates from '../assets/images/teaestates.jpg';
import livingRoot from '../assets/images/livingroot.jpg';
import dzukoValley from '../assets/images/DzukoValley.jpg';
import umiamLake from '../assets/images/Umiam_Lake_Shillong_Meghalaya.jpg';
import kaziranga from '../assets/images/kaziranga.jpg';
import hornbillFestival from '../assets/images/hornbill-festival.jpg';
import tawangMonastery from '../assets/images/tawang-monastery.jpg';
import majuliIsland from '../assets/images/majuli-island.jpg';
import cherrapunjiFalls from '../assets/images/cherrapunji-falls.jpg';
import loktakLake from '../assets/images/loktak-lake.jpg';
import tsomgoLake from '../assets/images/tsomgo-lake.jpg';
import ziroValley from '../assets/images/ziro-valley.jpg';

// Styled components
const MarqueeContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 3rem 0;
  background-color: #f8f9fa;
`;

const MarqueeTitle = styled.h2`
  text-align: center;
  color: #2c6a3f;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #2c6a3f;
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: fit-content;
  cursor: pointer;
`;

const MarqueeRow = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const MarqueeWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
  
  &:hover ${MarqueeTrack} {
    animation-play-state: paused;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin: 0 10px;
  width: 300px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    
    img {
      transform: scale(1.05);
    }
    
    .image-details {
      opacity: 1;
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const ImageDetails = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  padding: 20px 15px 15px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const LocationTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const LocationState = styled.p`
  margin: 5px 0 0;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const GalleryMarquee = () => {
  const navigate = useNavigate();
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Animation contexts to control them
  const animation1 = useRef(null);
  const animation2 = useRef(null);
  
  // Define location data for our images
  const locations = [
    { id: 1, image: teaEstates, name: "Tea Gardens", state: "Assam" },
    { id: 2, image: livingRoot, name: "Living Root Bridges", state: "Meghalaya" },
    { id: 3, image: dzukoValley, name: "Dzüko Valley", state: "Nagaland" },
    { id: 4, image: umiamLake, name: "Umiam Lake", state: "Meghalaya" },
    { id: 5, image: kaziranga, name: "Kaziranga National Park", state: "Assam" },
    { id: 6, image: hornbillFestival, name: "Hornbill Festival", state: "Nagaland" },
    { id: 7, image: tawangMonastery, name: "Tawang Monastery", state: "Arunachal Pradesh" },
    { id: 8, image: majuliIsland, name: "Majuli Island", state: "Assam" },
    { id: 9, image: cherrapunjiFalls, name: "Cherrapunji", state: "Meghalaya" },
    { id: 10, image: loktakLake, name: "Loktak Lake", state: "Manipur" },
    { id: 11, image: tsomgoLake, name: "Tsomgo Lake", state: "Sikkim" },
    { id: 12, image: ziroValley, name: "Ziro Valley", state: "Arunachal Pradesh" }
  ];

  // Reverse order for second row to create opposite movement
  const locationsReverse = [...locations].reverse();
  
  // Navigate to gallery page when clicking on the marquee
  const handleMarqueeClick = () => {
    navigate('/gallery');
  };
  
  useEffect(() => {
    // Animation for first row (left to right)
    animation1.current = gsap.to(marquee1Ref.current, {
      x: "-50%",
      duration: 30,
      ease: "none",
      repeat: -1,
      paused: isPaused
    });
    
    // Animation for second row (right to left)
    animation2.current = gsap.to(marquee2Ref.current, {
      x: "50%",
      duration: 30,
      ease: "none",
      repeat: -1,
      paused: isPaused
    });
    
    return () => {
      // Clean up animations when component unmounts
      if (animation1.current) animation1.current.kill();
      if (animation2.current) animation2.current.kill();
    };
  }, []);
  
  // Handle mouse enter/leave for pausing the animations
  const handleMouseEnter = () => {
    if (animation1.current) animation1.current.pause();
    if (animation2.current) animation2.current.pause();
  };
  
  const handleMouseLeave = () => {
    if (animation1.current) animation1.current.play();
    if (animation2.current) animation2.current.play();
  };

  return (
    <MarqueeContainer>
      <MarqueeTitle>Explore Northeast India</MarqueeTitle>
      
      {/* First Marquee Row */}
      <MarqueeWrapper 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMarqueeClick}
      >
        <MarqueeTrack ref={marquee1Ref}>
          {/* First set of images */}
          <MarqueeRow>
            {locations.map((location) => (
              <ImageContainer key={location.id}>
                <img src={location.image} alt={location.name} />
                <ImageDetails className="image-details">
                  <LocationTitle>{location.name}</LocationTitle>
                  <LocationState>{location.state}</LocationState>
                </ImageDetails>
              </ImageContainer>
            ))}
          </MarqueeRow>
          
          {/* Duplicate set for seamless loop */}
          <MarqueeRow>
            {locations.map((location) => (
              <ImageContainer key={`dup-${location.id}`}>
                <img src={location.image} alt={location.name} />
                <ImageDetails className="image-details">
                  <LocationTitle>{location.name}</LocationTitle>
                  <LocationState>{location.state}</LocationState>
                </ImageDetails>
              </ImageContainer>
            ))}
          </MarqueeRow>
        </MarqueeTrack>
      </MarqueeWrapper>
      
      {/* Second Marquee Row */}
      <MarqueeWrapper 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMarqueeClick}
      >
        <MarqueeTrack ref={marquee2Ref}>
          {/* First set of images (reversed) */}
          <MarqueeRow>
            {locationsReverse.map((location) => (
              <ImageContainer key={`rev-${location.id}`}>
                <img src={location.image} alt={location.name} />
                <ImageDetails className="image-details">
                  <LocationTitle>{location.name}</LocationTitle>
                  <LocationState>{location.state}</LocationState>
                </ImageDetails>
              </ImageContainer>
            ))}
          </MarqueeRow>
          
          {/* Duplicate set for seamless loop */}
          <MarqueeRow>
            {locationsReverse.map((location) => (
              <ImageContainer key={`rev-dup-${location.id}`}>
                <img src={location.image} alt={location.name} />
                <ImageDetails className="image-details">
                  <LocationTitle>{location.name}</LocationTitle>
                  <LocationState>{location.state}</LocationState>
                </ImageDetails>
              </ImageContainer>
            ))}
          </MarqueeRow>
        </MarqueeTrack>
      </MarqueeWrapper>
    </MarqueeContainer>
  );
};

export default GalleryMarquee;