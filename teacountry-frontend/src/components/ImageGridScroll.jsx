import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

// Import images - using a wider variety of images from your assets
import teaGarden from '../assets/images/teaestates.jpg';
import umiamLake from '../assets/images/Umiam_Lake_Shillong_Meghalaya.jpg';
import dzukoValley from '../assets/images/DzukoValley.jpg';
import teaImage from '../assets/images/image_2025-07-22_12-10-02-1.png';
// Import additional images - you'll need to add these to your assets folder
import cherrapunjiFalls from '../assets/images/livingroot.jpg';
import kaziranga from '../assets/images/kaziranga.jpg';
import majuli from '../assets/images/majuli-island.jpg';
import tawang from '../assets/images/tawang-monastery.jpg';
import hornbill from '../assets/images/hornbill-festival.jpg';

const Container = styled.div`
  height: auto;
  min-height: 120vh;
  position: relative;
  background-color: white;
  overflow: hidden;
  margin-bottom: -5rem;
  
  @media (max-width: 768px) {
    min-height: 100vh;
    margin-bottom: -3rem;
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 100px;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-bottom: 2rem;
  
  @media (max-width: 768px) {
    top: 70px;
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    top: 60px;
    padding: 1rem;
  }
`;

const Title = styled.h2`
  color: #2c6a3f;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  z-index: 20;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 1.1rem;
  max-width: 600px;
  text-align: center;
  margin-bottom: 3rem;
  z-index: 20;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 85%;
  max-width: 1200px;
  z-index: 10;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
    gap: 1.5rem;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 400px;
    gap: 1.25rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 400px; /* Fixed height for all image containers */
  
  &:nth-child(3n+1) {
    grid-column: span 1;
  }
  
  &:nth-child(3n+2) {
    grid-column: span 1;
    margin-top: 4rem;
    
    @media (max-width: 1024px) {
      margin-top: 2rem;
    }
    
    @media (max-width: 600px) {
      margin-top: 0;
    }
  }
  
  &:nth-child(3n) {
    grid-column: span 1;
    margin-top: 2rem;
    
    @media (max-width: 1024px) {
      margin-top: 0;
    }
  }
  
  @media (max-width: 768px) {
    height: 350px;
  }
  
  @media (max-width: 480px) {
    height: 300px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures images cover the container without distortion */
  display: block;
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
  
  @media (min-width: 769px) {
    transform: translateY(100%);
    transition: transform 0.3s ease;
    
    ${ImageWrapper}:hover & {
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    /* Always show caption on mobile */
    transform: translateY(0);
    padding: 0.75rem;
  }
`;

const ImageTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.25rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ImageLocation = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ImageGridScroll = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Updated with different images for each container
  const images = [
    { 
      src: teaGarden,
      title: "Tea Gardens",
      location: "Assam"
    },
    { 
      src: umiamLake,
      title: "Umiam Lake",
      location: "Shillong, Meghalaya"
    },
    { 
      src: dzukoValley,
      title: "Dzüko Valley",
      location: "Nagaland"
    },
    { 
      src: cherrapunjiFalls || teaImage, // Fallback to teaImage if not available
      title: "Living Root Bridges",
      location: "Cherrapunji, Meghalaya"
    },
    { 
      src: kaziranga || teaGarden, // Fallback to teaGarden if not available
      title: "Kaziranga National Park",
      location: "Assam"
    },
    { 
      src: tawang || umiamLake, // Fallback to umiamLake if not available
      title: "Tawang Monastery",
      location: "Arunachal Pradesh"
    },
    { 
      src: majuli || dzukoValley, // Fallback to dzukoValley if not available
      title: "Majuli Island",
      location: "Assam"
    },
    { 
      src: hornbill || teaImage, // Fallback to teaImage if not available
      title: "Hornbill Festival",
      location: "Nagaland"
    },
    { 
      src: teaImage,
      title: "Tea Culture",
      location: "Assam"
    }
  ];
  
  // Show fewer images on mobile
  const displayedImages = isMobile ? images.slice(0, 4) : images.slice(0, 6);
  
  // Reduced transform values for less extreme movement
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  
  // Disable transform on mobile for better performance
  const getYTransform = (index) => {
    if (isMobile) return 0;
    
    if (index % 3 === 0) return y1;
    if (index % 3 === 1) return y2;
    return y3;
  };
  
  return (
    <Container ref={containerRef}>
      <StickyContainer>
        <Title>Discover Northeast India</Title>
        <Subtitle>
          Immerse yourself in breathtaking landscapes and vibrant cultures across the Eight Sister States
        </Subtitle>
        
        <ImagesContainer>
          {displayedImages.map((image, index) => {
            return (
              <ImageWrapper 
                key={index}
                style={{ y: getYTransform(index) }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
              >
                <StyledImage 
                  src={image.src} 
                  alt={image.title}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = teaGarden;
                  }}
                />
                <ImageCaption>
                  <ImageTitle>{image.title}</ImageTitle>
                  <ImageLocation>{image.location}</ImageLocation>
                </ImageCaption>
              </ImageWrapper>
            );
          })}
        </ImagesContainer>
      </StickyContainer>
    </Container>
  );
};

export default ImageGridScroll;