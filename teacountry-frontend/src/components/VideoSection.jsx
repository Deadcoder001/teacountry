import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const VideoContainer = styled.section`
  width: 100%;
  height: 80vh;
  position: relative;
  overflow: hidden;
  background: #000;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%);
  z-index: 5;
`;

const HeadingContainer = styled.div`
  width: 100%;
  padding: 60px 20px 30px;
  background: #fff;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #2c6a3f;
  margin: 0 auto;
  max-width: 800px;
  line-height: 1.2;
`;

const AudioToggleButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  &:focus {
    outline: none;
  }
`;

// SVG Icons for mute/unmute
const SoundOnIcon = () => (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.016 3.234C14.016 2.85 13.875 2.484 13.617 2.226C13.125 1.734 12.336 1.734 11.844 2.226L6.938 7.172H4.031C2.953 7.172 2.016 8.062 2.016 9.188V14.812C2.016 15.891 2.953 16.828 4.031 16.828H6.938L11.859 21.75C12.094 21.984 12.422 22.125 12.75 22.125C13.078 22.125 13.406 21.984 13.641 21.75C13.891 21.492 14.031 21.117 14.031 20.734V3.234H14.016Z" fill="white"/>
    <path d="M22.5 12C22.5 9.3 21 6.9 18.6 5.7C18 5.4 17.4 6 17.7 6.6C19.4 9.1 19.4 14.8 17.7 17.3C17.4 17.9 18 18.5 18.6 18.2C21 17.1 22.5 14.7 22.5 12Z" fill="white"/>
    <path d="M19 12C19 10.4 18.2 9 16.9 8.2C16.3 7.9 15.7 8.5 16 9.1C16.7 10.3 16.7 13.7 16 14.9C15.7 15.5 16.3 16.1 16.9 15.8C18.2 15 19 13.6 19 12Z" fill="white"/>
  </svg>
);

const SoundOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.016 3.234C14.016 2.85 13.875 2.484 13.617 2.226C13.125 1.734 12.336 1.734 11.844 2.226L6.938 7.172H4.031C2.953 7.172 2.016 8.062 2.016 9.188V14.812C2.016 15.891 2.953 16.828 4.031 16.828H6.938L11.859 21.75C12.094 21.984 12.422 22.125 12.75 22.125C13.078 22.125 13.406 21.984 13.641 21.75C13.891 21.492 14.031 21.117 14.031 20.734V3.234H14.016Z" fill="white"/>
    <path d="M19.36 4.64C19.0327 4.31274 18.509 4.31274 18.1818 4.64C17.8545 4.96726 17.8545 5.49097 18.1818 5.81824L20.3636 8L18.1818 10.1818C17.8545 10.509 17.8545 11.0327 18.1818 11.36C18.509 11.6873 19.0327 11.6873 19.36 11.36L21.5418 9.17824L23.7236 11.36C24.0509 11.6873 24.5746 11.6873 24.9018 11.36C25.2291 11.0327 25.2291 10.509 24.9018 10.1818L22.72 8L24.9018 5.81824C25.2291 5.49097 25.2291 4.96726 24.9018 4.64C24.5746 4.31274 24.0509 4.31274 23.7236 4.64L21.5418 6.82176L19.36 4.64Z" fill="white"/>
  </svg>
);

export default function VideoSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  
  useEffect(() => {
    const video = videoRef.current;
    const heading = headingRef.current;
    
    // Create ScrollTrigger for video playback and zoom effect
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%", // Start when top of section hits 80% down the viewport
      end: "bottom 20%", // End when bottom of section hits 20% up the viewport
      markers: false, // Set to true during development to see trigger points
      onEnter: () => {
        // Reset video to beginning if it was paused before
        if (video.paused) {
          video.currentTime = 0;
        }
        video.play();
        // Zoom in effect
        gsap.to(video, {
          scale: 1.3,
          duration: 2,
          ease: "power2.out"
        });
        // Animate heading
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.5,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        video.pause();
        // Reset zoom
        gsap.to(video, {
          scale: 1,
          duration: 0.8
        });
        // Hide heading
        gsap.to(heading, {
          opacity: 0,
          y: 20,
          duration: 0.5
        });
      },
      onEnterBack: () => {
        // Ensure video plays from beginning when scrolling back up
        video.currentTime = 0;
        video.play();
        // Zoom in effect again when scrolling back up
        gsap.to(video, {
          scale: 1.3, // Consistent zoom level with onEnter
          duration: 2,
          ease: "power2.out"
        });
        // Show heading again
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.5,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        video.pause();
        // Reset zoom
        gsap.to(video, {
          scale: 1,
          duration: 0.8
        });
        // Hide heading
        gsap.to(heading, {
          opacity: 0,
          y: 20,
          duration: 0.5
        });
      }
    });
    
    // Initial state - start at scale 1
    gsap.set(video, { scale: 1, transformOrigin: "center center" });
    // Initial state for heading - hidden and shifted down slightly
    gsap.set(heading, { opacity: 0, y: 20 });
    
    // Clean up
    return () => {
      scrollTrigger.kill();
    };
  }, []);
  
  return (
    <div>
      {/* Section heading at the top */}
      <HeadingContainer>
        <Heading ref={headingRef}>
          Experience the Natural Beauty of Northeast India
        </Heading>
      </HeadingContainer>
      
      {/* Video section */}
      <VideoContainer ref={sectionRef}>
        <VideoElement
          ref={videoRef}
          muted={isMuted}
          loop={false}
          playsInline
          preload="auto"
        >
          <source src="/videos/northeast-landscapes.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </VideoElement>
        
        {/* Gradient overlay to improve visual appearance */}
        <GradientOverlay />
        
        {/* Audio toggle button */}
        <AudioToggleButton onClick={toggleAudio} aria-label={isMuted ? "Unmute video" : "Mute video"}>
          {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
        </AudioToggleButton>
      </VideoContainer>
    </div>
  );
}