import React from 'react';
import styled, { keyframes } from 'styled-components';

// Import logos from the marquee folder
import logo2019 from '../assets/images/marquee/logo-2019-removebg-preview.png';
import govtIndia from '../assets/images/marquee/png-clipart-government-of-india-ministry-of-micro-small-and-medium-enterprises-small-business-india-text-logo-removebg-preview.png';
import design5 from '../assets/images/marquee/Untitled-design-5.png';
import design6 from '../assets/images/marquee/Untitled-design-6.png';
import design from '../assets/images/marquee/Untitled-design.png';

const MarqueeSection = styled.section`
  padding: 4rem 0;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0;
  }
`;

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeContainer = styled.div`
  display: flex;
  width: 200%;
  animation: ${scrollAnimation} 30s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
  
  @media (max-width: 768px) {
    animation: ${scrollAnimation} 20s linear infinite;
  }
  
  @media (max-width: 480px) {
    animation: ${scrollAnimation} 15s linear infinite;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const LogoImage = styled.img`
  height: 80px;
  max-width: 100%;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    height: 60px;
  }
  
  @media (max-width: 480px) {
    height: 40px;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c6a3f;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #2c6a3f;
  }
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    
    &:after {
      bottom: -8px;
      height: 2px;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
    
    &:after {
      bottom: -6px;
    }
  }
`;

// Touch event handling wrapper for mobile devices
const TouchWrapper = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    &:active ${MarqueeContainer} {
      animation-play-state: paused;
    }
  }
`;

const LogoMarquee = () => {
  // Use the imported logo images from marquee folder
  const logos = [
    { id: 1, name: 'Logo 2019', image: logo2019 },
    { id: 2, name: 'Government of India', image: govtIndia },
    { id: 3, name: 'Certification', image: design5 },
    { id: 4, name: 'Quality Seal', image: design6 },
    { id: 5, name: 'Brand Logo', image: design },
  ];

  return (
    <MarqueeSection>
      <SectionTitle>Our Certifications</SectionTitle>
      <TouchWrapper>
        <MarqueeContainer>
          <LogoWrapper>
            {logos.map(logo => (
              <Logo key={logo.id}>
                <LogoImage src={logo.image} alt={logo.name} />
              </Logo>
            ))}
          </LogoWrapper>
          <LogoWrapper>
            {logos.map(logo => (
              <Logo key={`duplicate-${logo.id}`}>
                <LogoImage src={logo.image} alt={logo.name} />
              </Logo>
            ))}
          </LogoWrapper>
        </MarqueeContainer>
      </TouchWrapper>
    </MarqueeSection>
  );
};

export default LogoMarquee;