import React from 'react';
import Hero from '../components/Hero';
import LogoMarquee from '../components/LogoMarquee';
import ImageGridScroll from '../components/ImageGridScroll';
import VideoSection from '../components/VideoSection';
import GalleryMarquee from '../components/GalleryMarquee';
import TopDestinations from '../components/TopDestinations';
import AboutUs from '../components/AboutUs';

const HomePage = () => {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ImageGridScroll />
      <VideoSection />
      <GalleryMarquee />
      <TopDestinations />
      <AboutUs />
    </>
  );
};

export default HomePage;