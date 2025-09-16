import React from 'react';
import styled from 'styled-components';
import GalleryMarquee from '../components/GalleryMarquee';
import teaLandscape from '../assets/images/Untitled-design-4-1.png';

// Import images directly
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

const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 0px; // Allow space for fixed navbar
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
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryCard = styled.div`
  position: relative;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    
    img {
      transform: scale(1.1);
    }
    
    .card-details {
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

const CardDetails = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
`;

const CardLocation = styled.p`
  margin: 5px 0 0;
  opacity: 0.8;
`;

const GalleryPage = () => {
  // Define gallery images with direct imports
  const galleryImages = [
    { id: 1, src: teaEstates, title: "Tea Gardens", location: "Assam" },
    { id: 2, src: livingRoot, title: "Living Root Bridges", location: "Meghalaya" },
    { id: 3, src: dzukoValley, title: "Dzüko Valley", location: "Nagaland" },
    { id: 4, src: umiamLake, title: "Umiam Lake", location: "Meghalaya" },
    { id: 5, src: kaziranga, title: "Kaziranga National Park", location: "Assam" },
    { id: 6, src: hornbillFestival, title: "Hornbill Festival", location: "Nagaland" },
    { id: 7, src: tawangMonastery, title: "Tawang Monastery", location: "Arunachal Pradesh" },
    { id: 8, src: majuliIsland, title: "Majuli Island", location: "Assam" },
    { id: 9, src: cherrapunjiFalls, title: "Cherrapunji", location: "Meghalaya" },
    { id: 10, src: loktakLake, title: "Loktak Lake", location: "Manipur" },
    { id: 11, src: tsomgoLake, title: "Tsomgo Lake", location: "Sikkim" },
    { id: 12, src: ziroValley, title: "Ziro Valley", location: "Arunachal Pradesh" }
  ];

  return (
    <PageContainer>
      <Hero>
        <HeroContent>
          <HeroTitle>Our Gallery</HeroTitle>
          <HeroSubtitle>
            Discover the breathtaking landscapes and cultural richness of Northeast India through our lens
          </HeroSubtitle>
        </HeroContent>
      </Hero>
      
      <GalleryGrid>
        {galleryImages.map((image) => (
          <GalleryCard key={image.id}>
            <img src={image.src} alt={image.title} />
            <CardDetails className="card-details">
              <CardTitle>{image.title}</CardTitle>
              <CardLocation>{image.location}</CardLocation>
            </CardDetails>
          </GalleryCard>
        ))}
      </GalleryGrid>
    </PageContainer>
  );
};

export default GalleryPage;