import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import ImageGridScroll from './components/ImageGridScroll';
import VideoSection from './components/VideoSection';
import TopDestinations from './components/TopDestinations';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import DestinationsPage from './pages/DestinationsPage';
import GalleryPage from './pages/GalleryPage';
import GalleryMarquee from './components/GalleryMarquee';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <LogoMarquee />
            <ImageGridScroll />
            <VideoSection />
            <GalleryMarquee />
            <TopDestinations />
            <AboutUs />
          </>
        } />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        {/* Add more routes here as you develop the app */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;