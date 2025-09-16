import React from 'react';
import styled, { keyframes } from 'styled-components';

// Import logos from the marquee folder
import logo2019 from '../assets/images/marquee/logo-2019-removebg-preview.png';
import govtIndia from '../assets/images/marquee/png-clipart-government-of-india-ministry-of-micro-small-and-medium-enterprises-small-business-india-text-logo-removebg-preview.png';
import design5 from '../assets/images/marquee/Untitled-design-5.png';
import design6 from '../assets/images/marquee/Untitled-design-6.png';
import design from '../assets/images/marquee/Untitled-design.png';

const MarqueeSection = styled.section`
  padding: 5rem 0;
  overflow: hidden;
  position: relative;
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
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 0 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
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
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(44, 106, 63, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgb(44, 106, 63);
  }
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
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
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #2c6a3f;
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
    </MarqueeSection>
  );
};

export default LogoMarquee;