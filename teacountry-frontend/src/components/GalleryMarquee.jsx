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

  @media screen and (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 1.2rem;
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
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 80px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(248, 249, 250, 0.9), rgba(248, 249, 250, 0));
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(248, 249, 250, 0.9), rgba(248, 249, 250, 0));
  }
  
  @media screen and (max-width: 768px) {
    &::before, &::after {
      width: 50px;
    }
  }
  
  @media screen and (max-width: 480px) {
    &::before, &::after {
      width: 30px;
    }
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
  
  @media screen and (max-width: 768px) {
    width: 240px;
    height: 160px;
  }

  @media screen and (max-width: 480px) {
    width: 180px;
    height: 120px;
    margin: 0 6px;
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
  
  @media screen and (max-width: 768px) {
    padding: 15px 12px 12px;
  }
  
  @media screen and (max-width: 480px) {
    padding: 12px 10px 10px;
  }
`;

const LocationTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const LocationState = styled.p`
  margin: 5px 0 0;
  font-size: 0.9rem;
  opacity: 0.8;
  
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    margin: 3px 0 0;
  }
  
  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
    margin: 2px 0 0;
  }
`;

const GalleryMarquee = () => {
  const navigate = useNavigate();
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const marquee3Ref = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const track3Ref = useRef(null);
  
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

  // Reverse order for middle row to create opposite movement
  const locationsReverse = [...locations].reverse();
  
  // Shuffle the array for third row to have a different order
  const locationsShuffle = [...locations].sort(() => Math.random() - 0.5);
  
  // Navigate to gallery page when clicking on the marquee
  const handleMarqueeClick = () => {
    navigate('/gallery');
  };
  
  useEffect(() => {
    // Get the width of a single row for each track
    const setupAnimations = () => {
      if (!marquee1Ref.current || !marquee2Ref.current || !marquee3Ref.current) return;
      
      const track1 = marquee1Ref.current;
      const track2 = marquee2Ref.current;
      const track3 = marquee3Ref.current;
      
      // Get the width of a single row
      const rowWidth1 = track1.children[0].offsetWidth;
      const rowWidth2 = track2.children[0].offsetWidth;
      const rowWidth3 = track3.children[0].offsetWidth;
      
      // Create seamless infinite animations
      const tl1 = gsap.timeline({ repeat: -1, paused: false });
      tl1.to(track1, {
        x: -rowWidth1,
        duration: 30,
        ease: "none",
      });
      
      const tl2 = gsap.timeline({ repeat: -1, paused: false });
      tl2.to(track2, {
        x: -rowWidth2,
        duration: 25, // Slightly faster for visual interest
        ease: "none",
      });
      
      const tl3 = gsap.timeline({ repeat: -1, paused: false });
      tl3.to(track3, {
        x: -rowWidth3,
        duration: 35, // Slightly slower for visual interest
        ease: "none",
      });
      
      // Store timelines for pause/play control
      track1Ref.current = tl1;
      track2Ref.current = tl2;
      track3Ref.current = tl3;
    };
    
    // Setup initial animations
    setupAnimations();
    
    // Handle window resize to reset animations if needed
    const handleResize = () => {
      if (track1Ref.current) track1Ref.current.kill();
      if (track2Ref.current) track2Ref.current.kill();
      if (track3Ref.current) track3Ref.current.kill();
      setupAnimations();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Clean up animations and event listeners
      window.removeEventListener('resize', handleResize);
      if (track1Ref.current) track1Ref.current.kill();
      if (track2Ref.current) track2Ref.current.kill();
      if (track3Ref.current) track3Ref.current.kill();
    };
  }, []);
  
  // Handle mouse enter/leave for pausing the animations
  const handleMouseEnter = () => {
    if (track1Ref.current) track1Ref.current.pause();
    if (track2Ref.current) track2Ref.current.pause();
    if (track3Ref.current) track3Ref.current.pause();
  };
  
  const handleMouseLeave = () => {
    if (track1Ref.current) track1Ref.current.play();
    if (track2Ref.current) track2Ref.current.play();
    if (track3Ref.current) track3Ref.current.play();
  };

  // Handle touch events for mobile devices
  const handleTouchStart = () => {
    handleMouseEnter();
  };
  
  const handleTouchEnd = () => {
    handleMouseLeave();
  };

  return (
    <MarqueeContainer>
      <MarqueeTitle>Explore Northeast India</MarqueeTitle>
      
      {/* First Marquee Row */}
      <MarqueeWrapper 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
              <ImageContainer key={`dup1-${location.id}`}>
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
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
      
      {/* Third Marquee Row */}
      <MarqueeWrapper 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleMarqueeClick}
      >
        <MarqueeTrack ref={marquee3Ref}>
          {/* First set of shuffled images */}
          <MarqueeRow>
            {locationsShuffle.map((location) => (
              <ImageContainer key={`shuffle-${location.id}`}>
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
            {locationsShuffle.map((location) => (
              <ImageContainer key={`shuffle-dup-${location.id}`}>
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