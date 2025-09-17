import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import teaLandscape from '../assets/images/Untitled-design-4-1.png';
import InstagramFeed from '../components/InstagramFeed';
import FacebookFeed from '../components/FacebookFeed';
import { FaStar } from 'react-icons/fa';
import gsap from 'gsap';

// Styled components
const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 0px;
`;

const Hero = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${teaLandscape});
  background-size: cover;
  background-position: center;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 0 1rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
`;

const SectionTitle = styled.h2`
  color: #2c6a3f;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const PhoneContainer = styled(motion.div)`
  position: relative;
  width: 375px;
  height: 750px;
  background-color: #1e1e1e;
  border-radius: 40px;
  padding: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: 0 auto 5rem;
  
  @media (max-width: 480px) {
    width: 320px;
    height: 650px;
    border-radius: 30px;
  }
`;

const PhoneNotch = styled.div`
  position: absolute;
  width: 150px;
  height: 30px;
  background-color: #1e1e1e;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  z-index: 3;
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 32px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 480px) {
    border-radius: 24px;
  }
`;

const AppHeader = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #dbdbdb;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const AppTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: #2c6a3f;
`;

const AppContent = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar but allow scrolling */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-scrolling: touch;
  scrollbar-width: none;
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #262626;
  font-size: 1.2rem;
`;

const StarIcon = styled(FaStar)`
  color: #F6AD55;
  margin-right: 2px;
`;

// New Multi-row Marquee components
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
  font-size: 2.2rem;
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

const MarqueeTrack = styled.div`
  display: flex;
  width: fit-content;
`;

const MarqueeRow = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const TestimonialCard = styled.div`
  width: 320px;
  margin: 0 15px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  @media screen and (max-width: 768px) {
    width: 260px;
    padding: 15px;
  }

  @media screen and (max-width: 480px) {
    width: 220px;
    padding: 12px;
    margin: 0 10px;
  }
`;

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  
  @media screen and (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #333;
  
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const Username = styled.div`
  font-size: 14px;
  color: #777;
  
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const TestimonialBody = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #444;
  margin: 0;
  
  @media screen and (max-width: 480px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  margin-top: 12px;
`;

const PhoneMockupsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 5rem;
  
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TestimonialPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Instagram username
  const instagramUsername = 'tea_country_holidays';
  
  // Refs for GSAP animations
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const marquee3Ref = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const track3Ref = useRef(null);
  
  useEffect(() => {
    // Simulate loading Instagram content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Testimonial data for marquees
  const testimonials1 = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "Assam Tea Trail Tour",
      body: "The tea gardens in Assam were absolutely breathtaking. Best tour ever!",
      img: "https://ui-avatars.com/api/?name=S+J&background=2c6a3f&color=fff",
      rating: 5
    },
    {
      id: 2,
      name: "Mike Chen",
      username: "Wildlife Safari",
      body: "Kaziranga's wildlife safari was incredible. Saw so many rhinos!",
      img: "https://ui-avatars.com/api/?name=M+C&background=bf953f&color=fff",
      rating: 5
    },
    {
      id: 3,
      name: "Priya Sharma",
      username: "Cultural Immersion",
      body: "Majuli Island's culture and people were so welcoming. Unforgettable!",
      img: "https://ui-avatars.com/api/?name=P+S&background=2c6a3f&color=fff",
      rating: 5
    },
    {
      id: 4,
      name: "Tom Wilson",
      username: "Adventure Trek",
      body: "The living root bridges in Meghalaya were worth every step of the trek.",
      img: "https://ui-avatars.com/api/?name=T+W&background=bf953f&color=fff",
      rating: 5
    },
  ];
  
  const testimonials2 = [
    {
      id: 5,
      name: "Lisa Rodriguez",
      username: "Nagaland Explorer",
      body: "Hornbill Festival was amazing! Perfect arrangements by Tea Country.",
      img: "https://ui-avatars.com/api/?name=L+R&background=2c6a3f&color=fff",
      rating: 5
    },
    {
      id: 6,
      name: "Rajiv Mehta",
      username: "Meghalaya Tour",
      body: "The guides were so knowledgeable about the local culture and history.",
      img: "https://ui-avatars.com/api/?name=R+M&background=bf953f&color=fff",
      rating: 5
    },
    {
      id: 7,
      name: "Emma Taylor",
      username: "Food & Culture Tour",
      body: "Food tour through Assam was incredible. So many new flavors!",
      img: "https://ui-avatars.com/api/?name=E+T&background=2c6a3f&color=fff",
      rating: 5
    },
    {
      id: 8,
      name: "David Brown",
      username: "Spiritual Journey",
      body: "Tawang monastery was peaceful and spiritual. Perfect arrangements.",
      img: "https://ui-avatars.com/api/?name=D+B&background=bf953f&color=fff",
      rating: 5
    },
  ];
  
  const testimonials3 = [
    {
      id: 9,
      name: "Jennifer Adams",
      username: "Family Adventure",
      body: "Our kids loved the elephant safari and the tea garden visit. Great family experience!",
      img: "https://ui-avatars.com/api/?name=J+A&background=2c6a3f&color=fff",
      rating: 5
    },
    {
      id: 10,
      name: "Robert Singh",
      username: "Photography Tour",
      body: "The northeast landscapes are a photographer's dream. Tea Country took us to the best spots!",
      img: "https://ui-avatars.com/api/?name=R+S&background=bf953f&color=fff",
      rating: 5
    },
    {
      id: 11,
      name: "Maria Lopez",
      username: "Cultural Discovery",
      body: "Learning about the diverse tribal cultures was fascinating. Great local experiences!",
      img: "https://ui-avatars.com/api/?name=M+L&background=2c6a3f&color=fff",
      rating: 5
    },
    {
      id: 12,
      name: "James Wilson",
      username: "Adventure Seeker",
      body: "The river rafting in Arunachal Pradesh was exhilarating! Highly recommend!",
      img: "https://ui-avatars.com/api/?name=J+W&background=bf953f&color=fff",
      rating: 5
    },
  ];
  
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
  }, [isLoading]); // Add isLoading dependency to ensure setup after content loads
  
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
    <PageContainer>
      <Hero>
        <HeroContent>
          <HeroTitle>Client Testimonials</HeroTitle>
          <HeroSubtitle>
            Hear what our happy travelers say about their experiences with Tea Country
          </HeroSubtitle>
        </HeroContent>
      </Hero>
      
      <ContentSection>

        
        {/* Phone Mockups Section - Moved to appear first */}
        <SectionTitle>Follow Us on Social Media</SectionTitle>
        <SectionSubtitle>
          Stay updated with our latest news, offers, and traveler stories.
        </SectionSubtitle>

        <PhoneMockupsContainer>
          {/* Instagram Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PhoneContainer
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -3, 3, -2, 2, 0] }}
              transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
            >
              <PhoneNotch />
              <PhoneScreen>
                <AppHeader>
                  <AppTitle>Instagram</AppTitle>
                </AppHeader>
                <AppContent>
                  {isLoading ? (
                    <LoadingMessage>Loading Instagram feed...</LoadingMessage>
                  ) : (
                    <InstagramFeed username={instagramUsername} />
                  )}
                </AppContent>
              </PhoneScreen>
            </PhoneContainer>
          </motion.div>

          {/* Facebook Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <PhoneContainer
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 3, -3, 2, -2, 0] }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              style={{ backgroundColor: "#4267B2" }} // Facebook blue color
            >
              <PhoneNotch />
              <PhoneScreen>
                <AppHeader style={{ backgroundColor: "#4267B2", color: "white" }}>
                  <AppTitle style={{ color: "white" }}>Facebook</AppTitle>
                </AppHeader>
                <AppContent>
                  {isLoading ? (
                    <LoadingMessage>Loading Facebook posts...</LoadingMessage>
                  ) : (
                    <FacebookFeed />
                  )}
                </AppContent>
              </PhoneScreen>
            </PhoneContainer>
          </motion.div>
        </PhoneMockupsContainer>
        
        {/* Multi-row Marquee Section - Now appears after phone mockups */}
        <MarqueeContainer>
          <MarqueeTitle>Experience The Journey</MarqueeTitle>
          
          {/* First Marquee Row */}
          <MarqueeWrapper 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <MarqueeTrack ref={marquee1Ref}>
              {/* First set of testimonials */}
              <MarqueeRow>
                {testimonials1.map((testimonial) => (
                  <TestimonialCard key={testimonial.id}>
                    <TestimonialHeader>
                      <Avatar src={testimonial.img} alt={testimonial.name} />
                      <UserInfo>
                        <UserName>{testimonial.name}</UserName>
                        <Username>{testimonial.username}</Username>
                      </UserInfo>
                    </TestimonialHeader>
                    <TestimonialBody>"{testimonial.body}"</TestimonialBody>
                    <RatingContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} size={14} />
                      ))}
                    </RatingContainer>
                  </TestimonialCard>
                ))}
              </MarqueeRow>
              
              {/* Duplicate set for seamless loop */}
              <MarqueeRow>
                {testimonials1.map((testimonial) => (
                  <TestimonialCard key={`dup1-${testimonial.id}`}>
                    <TestimonialHeader>
                      <Avatar src={testimonial.img} alt={testimonial.name} />
                      <UserInfo>
                        <UserName>{testimonial.name}</UserName>
                        <Username>{testimonial.username}</Username>
                      </UserInfo>
                    </TestimonialHeader>
                    <TestimonialBody>"{testimonial.body}"</TestimonialBody>
                    <RatingContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} size={14} />
                      ))}
                    </RatingContainer>
                  </TestimonialCard>
                ))}
              </MarqueeRow>
            </MarqueeTrack>
          </MarqueeWrapper>
          
          {/* Second Marquee Row - Reversed direction */}
          <MarqueeWrapper 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <MarqueeTrack ref={marquee2Ref}>
              {/* First set of testimonials */}
              <MarqueeRow>
                {testimonials2.map((testimonial) => (
                  <TestimonialCard key={testimonial.id}>
                    <TestimonialHeader>
                      <Avatar src={testimonial.img} alt={testimonial.name} />
                      <UserInfo>
                        <UserName>{testimonial.name}</UserName>
                        <Username>{testimonial.username}</Username>
                      </UserInfo>
                    </TestimonialHeader>
                    <TestimonialBody>"{testimonial.body}"</TestimonialBody>
                    <RatingContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} size={14} />
                      ))}
                    </RatingContainer>
                  </TestimonialCard>
                ))}
              </MarqueeRow>
              
              {/* Duplicate set for seamless loop */}
              <MarqueeRow>
                {testimonials2.map((testimonial) => (
                  <TestimonialCard key={`dup2-${testimonial.id}`}>
                    <TestimonialHeader>
                      <Avatar src={testimonial.img} alt={testimonial.name} />
                      <UserInfo>
                        <UserName>{testimonial.name}</UserName>
                        <Username>{testimonial.username}</Username>
                      </UserInfo>
                    </TestimonialHeader>
                    <TestimonialBody>"{testimonial.body}"</TestimonialBody>
                    <RatingContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} size={14} />
                      ))}
                    </RatingContainer>
                  </TestimonialCard>
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
          >
            <MarqueeTrack ref={marquee3Ref}>
              {/* First set of testimonials */}
              <MarqueeRow>
                {testimonials3.map((testimonial) => (
                  <TestimonialCard key={testimonial.id}>
                    <TestimonialHeader>
                      <Avatar src={testimonial.img} alt={testimonial.name} />
                      <UserInfo>
                        <UserName>{testimonial.name}</UserName>
                        <Username>{testimonial.username}</Username>
                      </UserInfo>
                    </TestimonialHeader>
                    <TestimonialBody>"{testimonial.body}"</TestimonialBody>
                    <RatingContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} size={14} />
                      ))}
                    </RatingContainer>
                  </TestimonialCard>
                ))}
              </MarqueeRow>
              
              {/* Duplicate set for seamless loop */}
              <MarqueeRow>
                {testimonials3.map((testimonial) => (
                  <TestimonialCard key={`dup3-${testimonial.id}`}>
                    <TestimonialHeader>
                      <Avatar src={testimonial.img} alt={testimonial.name} />
                      <UserInfo>
                        <UserName>{testimonial.name}</UserName>
                        <Username>{testimonial.username}</Username>
                      </UserInfo>
                    </TestimonialHeader>
                    <TestimonialBody>"{testimonial.body}"</TestimonialBody>
                    <RatingContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} size={14} />
                      ))}
                    </RatingContainer>
                  </TestimonialCard>
                ))}
              </MarqueeRow>
            </MarqueeTrack>
          </MarqueeWrapper>
        </MarqueeContainer>
      </ContentSection>
    </PageContainer>
  );
};

export default TestimonialPage;