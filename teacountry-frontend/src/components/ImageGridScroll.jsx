import React, { useRef } from 'react';
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
  height: 120vh;
  position: relative;
  background-color: white;
  overflow: hidden;
  margin-bottom: -5rem;
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
  padding-bottom: 2rem;
`;

const Title = styled.h2`
  color: #2c6a3f;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  z-index: 20;
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 1.1rem;
  max-width: 600px;
  text-align: center;
  margin-bottom: 3rem;
  z-index: 20;
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 85%;
  max-width: 1200px;
  z-index: 10;
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
  }
  
  &:nth-child(3n) {
    grid-column: span 1;
    margin-top: 2rem;
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
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ImageWrapper}:hover & {
    transform: translateY(0);
  }
`;

const ImageTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.25rem 0;
`;

const ImageLocation = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
`;

const ImageGridScroll = () => {
  const containerRef = useRef(null);
  
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
  
  // Slice to show only 6 images to maintain your original grid
  const displayedImages = images.slice(0, 6);
  
  // Reduced transform values for less extreme movement
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  
  return (
    <Container ref={containerRef}>
      <StickyContainer>
        <Title>Discover Northeast India</Title>
        <Subtitle>
          Immerse yourself in breathtaking landscapes and vibrant cultures across the Eight Sister States
        </Subtitle>
        
        <ImagesContainer>
          {displayedImages.map((image, index) => {
            // Apply different y transform based on column position
            let yTransform;
            if (index % 3 === 0) yTransform = y1;
            else if (index % 3 === 1) yTransform = y2;
            else yTransform = y3;
            
            return (
              <ImageWrapper 
                key={index}
                style={{ y: yTransform }}
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