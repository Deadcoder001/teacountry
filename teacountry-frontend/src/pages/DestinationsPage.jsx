import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Import images for destinations
import teaGarden from '../assets/images/307854703_508778997928563_2050649504796643182_n-e1753080453472.png';
import umiamLake from '../assets/images/Umiam_Lake_Shillong_Meghalaya.jpg';
import teaLandscape from '../assets/images/Untitled-design-4-1.png';
import teaImage from '../assets/images/image_2025-07-22_12-10-02-1.png';

// Styled components
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

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const FiltersSection = styled.section`
  background-color: white;
  padding: 2rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FiltersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  padding: 0 1rem;
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  color: #333;
`;

const SearchButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #2c6a3f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #224e30;
  }
`;

const ContentSection = styled.section`
  padding: 3rem 1rem;
`;

const StateTabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const StateTab = styled.button`
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.active ? '#2c6a3f' : 'transparent'};
  background-color: ${props => props.active ? '#e6f3eb' : '#e9ecef'};
  color: ${props => props.active ? '#2c6a3f' : '#495057'};
  border-radius: 30px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    background-color: ${props => props.active ? '#e6f3eb' : '#dee2e6'};
  }
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DestinationCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const DestinationImage = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 107, 107, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 1;
`;

const DestinationContent = styled.div`
  padding: 1.5rem;
`;

const DestinationTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const DestinationLocation = styled.p`
  display: flex;
  align-items: center;
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const LocationIconSvg = styled.svg`
  margin-right: 0.5rem;
  color: #2c6a3f;
`;

const DestinationDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DestinationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c6a3f;
`;

const BookButton = styled.button`
  background-color: #2c6a3f;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #224e30;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  width: 100%;
  grid-column: 1 / -1;
  
  h3 {
    color: #6c757d;
    margin-bottom: 1rem;
  }
  
  p {
    color: #adb5bd;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#2c6a3f' : '#dee2e6'};
  background-color: ${props => props.active ? '#2c6a3f' : 'white'};
  color: ${props => props.active ? 'white' : '#495057'};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#2c6a3f' : '#e9ecef'};
  }
`;

// Styled components for the modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c6a3f;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const DestinationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageGallery = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  max-height: 400px;
  position: relative;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`;

const GalleryNav = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 5;
`;

const GalleryDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: white;
  }
`;

const GalleryButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
  z-index: 5;
  
  &:hover {
    opacity: 1;
  }
  
  ${props => props.position === 'left' ? 'left: 10px;' : 'right: 10px;'}
`;

const DetailContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;
`;

const DetailTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const DetailText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

const HighlightsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const HighlightItem = styled.li`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  
  &:before {
    content: "✓";
    color: #2c6a3f;
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

const PriceHighlight = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #2c6a3f;
`;

const BookingButton = styled.button`
  width: 100%;
  background-color: #2c6a3f;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #224e30;
  }
`;

// Form styled components
const BookingForm = styled.form`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  border: 1px solid #ddd;
`;

const FormTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.3rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 250px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2c6a3f;
    box-shadow: 0 0 0 1px #2c6a3f;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #2c6a3f;
    box-shadow: 0 0 0 1px #2c6a3f;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #2c6a3f;
    box-shadow: 0 0 0 1px #2c6a3f;
  }
`;

const SubmitButton = styled.button`
  background-color: #2c6a3f;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background-color: #224e30;
  }
`;

// Location pin icon component
const LocationIcon = () => (
  <LocationIconSvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </LocationIconSvg>
);

const DestinationsPage = () => {
  const [activeState, setActiveState] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState("all");
  const [duration, setDuration] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Form state
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    travelDate: '',
    specialRequests: ''
  });
  
  // Add this new state for the image carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const destinationsPerPage = 9;
  
  // Define all Northeast states
  const northeastStates = [
    { id: "all", name: "All States" },
    { id: "assam", name: "Assam" },
    { id: "meghalaya", name: "Meghalaya" },
    { id: "arunachal", name: "Arunachal Pradesh" },
    { id: "sikkim", name: "Sikkim" },
    { id: "manipur", name: "Manipur" },
    { id: "nagaland", name: "Nagaland" },
    { id: "mizoram", name: "Mizoram" },
    { id: "tripura", name: "Tripura" }
  ];
  
  // Define destinations by state with additional details for modal
  const allDestinations = [
    {
      id: 1,
      name: "Kaziranga Tea Estate",
      location: "Assam",
      description: "Experience the lush greenery of Assam's finest tea gardens and learn about the art of tea production.",
      image: teaGarden,
      price: 15000,
      priceDisplay: "₹15,000",
      badge: "Popular",
      state: "assam",
      duration: "3 days",
      longDescription: "Nestled in the heart of Assam, Kaziranga Tea Estate offers a serene retreat among sprawling tea gardens. Visitors can experience the complete journey of tea making, from plucking fresh leaves to processing and tasting. The estate provides guided tours where guests can learn about different tea varieties and traditional production methods that have been passed down through generations.",
      highlights: [
        "Guided tour of tea processing facilities",
        "Tea tasting sessions with expert tea sommeliers",
        "Stay in colonial-era bungalows with modern amenities",
        "Cultural performances showcasing local traditions",
        "Bird watching and nature walks through the estate"
      ],
      includes: "Accommodation, meals, guided tours, tea tasting sessions, and cultural activities",
      additionalImages: [teaGarden, teaLandscape]
    },
    
    // MEGHALAYA DESTINATIONS
    {
      id: 16,
      name: "Shillong - Scotland of the East",
      location: "East Khasi Hills, Meghalaya",
      description: "Explore the capital of Meghalaya known for its pleasant climate, beautiful waterfalls, and vibrant culture.",
      image: umiamLake,
      price: 12000,
      priceDisplay: "₹12,000",
      state: "meghalaya",
      duration: "3 days",
      longDescription: "Shillong, the capital of Meghalaya, is often called the 'Scotland of the East' for its rolling hills, picturesque landscapes, and pleasant climate. The city offers a blend of modern amenities with natural beauty. Visitors can explore attractions like Ward's Lake, Lady Hydari Park, Shillong Peak, and Don Bosco Museum while enjoying the unique Khasi culture and cuisine.",
      highlights: [
        "Panoramic views from Shillong Peak",
        "Boating at Ward's Lake",
        "Northeast's largest museum at Don Bosco Centre",
        "Shopping at Police Bazaar for local handicrafts",
        "Golf at one of Asia's oldest golf courses"
      ],
      includes: "Accommodation, breakfast, local sightseeing, and cultural experiences"
    },
    {
      id: 17,
      name: "Cherrapunjee (Sohra)",
      location: "East Khasi Hills, Meghalaya",
      description: "Visit one of the wettest places on Earth with breathtaking waterfalls and living root bridges.",
      image: umiamLake,
      price: 14000,
      priceDisplay: "₹14,000",
      badge: "Natural Wonder",
      state: "meghalaya",
      duration: "3 days",
      longDescription: "Cherrapunjee (locally known as Sohra) is famous for being one of the wettest places on Earth. The lush landscapes feature spectacular waterfalls like Nohkalikai (India's tallest plunge waterfall), Seven Sisters Falls, and Dainthlen Falls. The region is also home to incredible living root bridges, where Khasi tribes have trained tree roots to form natural bridges across streams.",
      highlights: [
        "Nohkalikai Falls - India's highest plunge waterfall",
        "Mawsmai Cave exploration",
        "Visit to living root bridges",
        "Eco Park with panoramic canyon views",
        "Arwah Cave with ancient fossils"
      ]
    },
    {
      id: 18,
      name: "Mawlynnong - Asia's Cleanest Village",
      location: "East Khasi Hills, Meghalaya",
      description: "Experience the cleanest village in Asia with its unique living root bridges and sky view platforms.",
      image: umiamLake,
      price: 11000,
      priceDisplay: "₹11,000",
      state: "meghalaya",
      duration: "2 days",
      longDescription: "Mawlynnong has earned the distinction of being the cleanest village in Asia. This picturesque village showcases the sustainable lifestyle of the Khasi people with bamboo dustbins lining the streets, and a strong community-based approach to cleanliness. The village is also famous for its living root bridge and a unique 'Sky View' bamboo platform offering stunning views of the Bangladesh plains."
    },
    {
      id: 19,
      name: "Dawki & Shnongpdeng",
      location: "West Jaintia Hills, Meghalaya",
      description: "Enjoy crystal clear waters of the Umngot River, perfect for boating, swimming and riverside camping.",
      image: umiamLake,
      price: 13000,
      priceDisplay: "₹13,000",
      badge: "Instagram Favorite",
      state: "meghalaya",
      duration: "2 days"
    },
    {
      id: 20,
      name: "Jowai & Wari Chora",
      location: "West Jaintia Hills, Meghalaya",
      description: "Discover the cultural heart of Jaintia Hills with traditional villages and stunning landscapes.",
      image: umiamLake,
      price: 12500,
      priceDisplay: "₹12,500",
      state: "meghalaya",
      duration: "3 days"
    },
    {
      id: 21,
      name: "Siju Cave Adventure",
      location: "South Garo Hills, Meghalaya",
      description: "Explore one of India's longest caves with magnificent limestone formations and underground river.",
      image: umiamLake,
      price: 15000,
      priceDisplay: "₹15,000",
      state: "meghalaya",
      duration: "3 days"
    },
    {
      id: 22,
      name: "Khongthong - Whistling Village",
      location: "East Khasi Hills, Meghalaya",
      description: "Visit the unique village where residents communicate through distinctive whistles instead of names.",
      image: umiamLake,
      price: 12000,
      priceDisplay: "₹12,000",
      state: "meghalaya",
      duration: "2 days"
    },
    {
      id: 23,
      name: "Nongriat Double Decker Root Bridge",
      location: "East Khasi Hills, Meghalaya",
      description: "Trek to see the magnificent double-decker living root bridge, a marvel of bio-engineering.",
      image: umiamLake,
      price: 14000,
      priceDisplay: "₹14,000",
      badge: "Adventure",
      state: "meghalaya",
      duration: "3 days"
    },
    
    // ASSAM DESTINATIONS
    {
      id: 24,
      name: "Guwahati City Tour",
      location: "Kamrup Metro, Assam",
      description: "Discover the gateway to Northeast with Kamakhya Temple, river cruises, and vibrant markets.",
      image: teaGarden,
      price: 10000,
      priceDisplay: "₹10,000",
      state: "assam",
      duration: "2 days"
    },
    {
      id: 25,
      name: "Kaziranga National Park",
      location: "Golaghat, Assam",
      description: "Experience UNESCO World Heritage site known for one-horned rhinos and tiger reserve.",
      image: teaGarden,
      price: 15000,
      priceDisplay: "₹15,000",
      badge: "Wildlife",
      state: "assam",
      duration: "3 days",
      longDescription: "Kaziranga National Park is a UNESCO World Heritage site and home to two-thirds of the world's one-horned rhinoceros population. This vast protected area spans across floodplains, forests, and grasslands, providing the perfect habitat for diverse wildlife. Visitors can enjoy jeep safaris and elephant rides to spot rhinos, tigers, elephants, wild buffaloes, and over 400 species of birds."
    },
    {
      id: 26,
      name: "Pobitora Wildlife Sanctuary",
      location: "Morigaon, Assam",
      description: "Visit the sanctuary with the highest density of one-horned rhinos in the world.",
      image: teaGarden,
      price: 12000,
      priceDisplay: "₹12,000",
      state: "assam",
      duration: "2 days"
    },
    {
      id: 27,
      name: "Sualkuchi - Silk Village",
      location: "Kamrup, Assam",
      description: "Explore the largest silk village in India known as the 'Manchester of Assam'.",
      image: teaGarden,
      price: 9000,
      priceDisplay: "₹9,000",
      state: "assam",
      duration: "1 day"
    },
    {
      id: 28,
      name: "Hajo Pilgrimage Tour",
      location: "Kamrup, Assam",
      description: "Discover this ancient pilgrimage center for Hindus, Muslims, and Buddhists.",
      image: teaGarden,
      price: 9500,
      priceDisplay: "₹9,500",
      state: "assam",
      duration: "2 days"
    },
    {
      id: 29,
      name: "Sivasagar Heritage Tour",
      location: "Sivasagar, Assam",
      description: "Explore the former capital of the Ahom Kingdom with ancient monuments and temples.",
      image: teaGarden,
      price: 11000,
      priceDisplay: "₹11,000",
      state: "assam",
      duration: "3 days"
    },
    {
      id: 30,
      name: "Jorhat & Majuli Island",
      location: "Jorhat, Assam",
      description: "Visit the cultural capital of Assam and the world's largest river island.",
      image: teaGarden,
      price: 13500,
      priceDisplay: "₹13,500",
      badge: "Cultural",
      state: "assam",
      duration: "4 days"
    },
    {
      id: 31,
      name: "Dibrugarh Tea Tour",
      location: "Dibrugarh, Assam",
      description: "Experience the 'Tea City of India' with visits to historical tea estates and factories.",
      image: teaGarden,
      price: 12500,
      priceDisplay: "₹12,500",
      state: "assam",
      duration: "3 days"
    },
    {
      id: 32,
      name: "Digboi - First Oil Town",
      location: "Tinsukia, Assam",
      description: "Visit Asia's first oil refinery and learn about the history of oil industry in India.",
      image: teaGarden,
      price: 11000,
      priceDisplay: "₹11,000",
      state: "assam",
      duration: "2 days"
    },
    {
      id: 33,
      name: "Manas National Park",
      location: "Baksa, Assam",
      description: "Explore this UNESCO World Heritage site with remarkable biodiversity and scenic beauty.",
      image: teaGarden,
      price: 14500,
      priceDisplay: "₹14,500",
      badge: "Wildlife",
      state: "assam",
      duration: "3 days"
    },
    {
      id: 34,
      name: "Nameri National Park",
      location: "Sonitpur, Assam",
      description: "Enjoy bird watching, river rafting, and wildlife experiences in this pristine forest.",
      image: teaGarden,
      price: 12000,
      priceDisplay: "₹12,000",
      state: "assam",
      duration: "2 days"
    },
    {
      id: 35,
      name: "Chandubi Lake Tour",
      location: "Kamrup, Assam",
      description: "Visit this beautiful natural lake formed after an earthquake with rich biodiversity.",
      image: teaGarden,
      price: 9500,
      priceDisplay: "₹9,500",
      state: "assam",
      duration: "2 days"
    },
    {
      id: 36,
      name: "Dibru Saikhowa National Park",
      location: "Dibrugarh & Tinsukia, Assam",
      description: "Discover rare wildlife including feral horses in this vibrant floodplain ecosystem.",
      image: teaGarden,
      price: 14000,
      priceDisplay: "₹14,000",
      state: "assam",
      duration: "3 days"
    },
    
    // ARUNACHAL PRADESH DESTINATIONS
    {
      id: 37,
      name: "Dirang Valley",
      location: "West Kameng, Arunachal Pradesh",
      description: "Visit this beautiful valley with hot springs, ancient monastery, and traditional Monpa villages.",
      image: teaLandscape,
      price: 16000,
      priceDisplay: "₹16,000",
      state: "arunachal",
      duration: "3 days"
    },
    {
      id: 38,
      name: "Shergaon Village Experience",
      location: "West Kameng, Arunachal Pradesh",
      description: "Immerse in the traditional lifestyle of the Sherdukpen tribe in this picturesque valley.",
      image: teaLandscape,
      price: 15000,
      priceDisplay: "₹15,000",
      badge: "Cultural",
      state: "arunachal",
      duration: "3 days"
    },
    {
      id: 39,
      name: "Bomdila Monastery Tour",
      location: "West Kameng, Arunachal Pradesh",
      description: "Visit important Buddhist center with stunning views of Himalayan ranges and valleys.",
      image: teaLandscape,
      price: 14500,
      priceDisplay: "₹14,500",
      state: "arunachal",
      duration: "2 days"
    },
    {
      id: 40,
      name: "Tawang Monastery",
      location: "Tawang, Arunachal Pradesh",
      description: "Experience the largest monastery in India with spectacular mountain views and Buddhist culture.",
      image: teaLandscape,
      price: 18000,
      priceDisplay: "₹18,000",
      badge: "Must Visit",
      state: "arunachal",
      duration: "5 days",
      longDescription: "Perched at an altitude of over 10,000 feet, Tawang Monastery is the largest monastery in India and second largest in the world. This 400-year-old monastery holds immense spiritual significance for Buddhists and offers breathtaking views of the surrounding snow-capped mountains. Visitors can experience the daily life of monks, witness prayer ceremonies, and explore the vast library of ancient scriptures and thangkas (Tibetan Buddhist paintings)."
    },
    {
      id: 41,
      name: "Ziro Valley Festival",
      location: "Lower Subansiri, Arunachal Pradesh",
      description: "Experience the UNESCO World Heritage site with unique paddy cultivation and vibrant music festival.",
      image: teaLandscape,
      price: 16000,
      priceDisplay: "₹16,000",
      state: "arunachal",
      duration: "4 days"
    },
    {
      id: 42,
      name: "Itanagar Cultural Tour",
      location: "Papum Pare, Arunachal Pradesh",
      description: "Visit the capital city with its rich cultural heritage, museum and Buddhist temple.",
      image: teaLandscape,
      price: 12000,
      priceDisplay: "₹12,000",
      state: "arunachal",
      duration: "3 days"
    },
    {
      id: 43,
      name: "Anini Adventure",
      location: "Dibang Valley, Arunachal Pradesh",
      description: "Explore one of India's most remote regions with pristine forests and Idu Mishmi tribal culture.",
      image: teaLandscape,
      price: 22000,
      priceDisplay: "₹22,000",
      badge: "Remote",
      state: "arunachal",
      duration: "6 days"
    },
    {
      id: 44,
      name: "Namsai Buddhist Circuit",
      location: "Namsai, Arunachal Pradesh",
      description: "Visit Golden Pagoda and other Buddhist temples in this spiritually significant region.",
      image: teaLandscape,
      price: 14000,
      priceDisplay: "₹14,000",
      state: "arunachal",
      duration: "3 days"
    },
    
    // NAGALAND DESTINATIONS
    {
      id: 45,
      name: "Kohima War Cemetery",
      location: "Kohima, Nagaland",
      description: "Visit this historic WWII cemetery commemorating the Battle of Kohima with Japanese forces.",
      image: teaLandscape,
      price: 13000,
      priceDisplay: "₹13,000",
      state: "nagaland",
      duration: "2 days"
    },
    {
      id: 46,
      name: "Khonoma Green Village",
      location: "Kohima, Nagaland",
      description: "Explore India's first green village with traditional Angami houses and terraced fields.",
      image: teaLandscape,
      price: 14000,
      priceDisplay: "₹14,000",
      badge: "Eco-Tourism",
      state: "nagaland",
      duration: "3 days"
    },
    {
      id: 47,
      name: "Hornbill Festival Experience",
      location: "Kisama, Nagaland",
      description: "Witness the 'Festival of Festivals' showcasing Nagaland's rich cultural heritage and traditions.",
      image: teaLandscape,
      price: 20000,
      priceDisplay: "₹20,000",
      badge: "Festival",
      state: "nagaland",
      duration: "5 days",
      longDescription: "The Hornbill Festival, celebrated annually in December, is Nagaland's most famous cultural extravaganza. Held at Kisama Heritage Village, it brings together all 17 major tribes of Nagaland to showcase their traditions, dances, music, food, and handicrafts. Visitors can experience warrior displays, indigenous games, folk songs, religious ceremonies, and sample traditional rice beer and delicacies in this colorful celebration of Naga heritage."
    },
    {
      id: 48,
      name: "Kigwema Village Tour",
      location: "Kohima, Nagaland",
      description: "Visit this traditional Angami village with historical significance in Nagaland's freedom movement.",
      image: teaLandscape,
      price: 12500,
      priceDisplay: "₹12,500",
      state: "nagaland",
      duration: "2 days"
    },
    {
      id: 49,
      name: "Dimapur Historical Tour",
      location: "Dimapur, Nagaland",
      description: "Explore ancient Dimasa kingdom ruins and experience urban Nagaland culture.",
      image: teaLandscape,
      price: 11000,
      priceDisplay: "₹11,000",
      state: "nagaland",
      duration: "2 days"
    },
    {
      id: 50,
      name: "Mon Tribal Experience",
      location: "Mon, Nagaland",
      description: "Meet the Konyak tribe, former headhunters, known for their facial tattoos and traditional lifestyle.",
      image: teaLandscape,
      price: 16000,
      priceDisplay: "₹16,000",
      badge: "Cultural",
      state: "nagaland",
      duration: "4 days"
    },
    {
      id: 51,
      name: "Dzükou Valley Trek",
      location: "Kohima, Nagaland",
      description: "Trek through the Valley of Flowers of the Northeast with its unique terrain and seasonal blooms.",
      image: teaLandscape,
      price: 15500,
      priceDisplay: "₹15,500",
      state: "nagaland",
      duration: "4 days"
    },
    {
      id: 52,
      name: "Longwa Village Border Experience",
      location: "Mon, Nagaland",
      description: "Visit the unique village where the chief's house is half in India and half in Myanmar.",
      image: teaLandscape,
      price: 17000,
      priceDisplay: "₹17,000",
      badge: "Unique",
      state: "nagaland",
      duration: "4 days"
    },
    
    // MANIPUR DESTINATIONS
    {
      id: 53,
      name: "Imphal City Tour",
      location: "Imphal, Manipur",
      description: "Explore the capital with its war cemetery, historic Kangla Fort and vibrant markets.",
      image: teaImage,
      price: 12000,
      priceDisplay: "₹12,000",
      state: "manipur",
      duration: "2 days"
    },
    {
      id: 54,
      name: "Moreh Border Town",
      location: "Tengnoupal, Manipur",
      description: "Visit this trading town on Indo-Myanmar border with diverse cultures and customs.",
      image: teaImage,
      price: 14500,
      priceDisplay: "₹14,500",
      state: "manipur",
      duration: "3 days"
    },
    {
      id: 55,
      name: "Loktak Lake Experience",
      location: "Moirang, Manipur",
      description: "Explore the largest freshwater lake in Northeast India with unique floating phumdis.",
      image: teaImage,
      price: 13000,
      priceDisplay: "₹13,000",
      badge: "Natural Wonder",
      state: "manipur",
      duration: "3 days",
      longDescription: "Loktak Lake is the largest freshwater lake in Northeast India and famous for its unique floating islands called 'phumdis'. These are heterogeneous masses of soil, vegetation, and organic matter that float on the lake surface. The Keibul Lamjao National Park, the only floating national park in the world, is situated on the phumdis of this lake. Visitors can enjoy boat rides, witness the traditional fishing methods, and stay in stilt houses overlooking this ecological wonder."
    },
    {
      id: 56,
      name: "Keibul Lamjao National Park",
      location: "Bishnupur, Manipur",
      description: "Visit the world's only floating national park, home to endangered Sangai deer.",
      image: teaImage,
      price: 14000,
      priceDisplay: "₹14,000",
      badge: "Wildlife",
      state: "manipur",
      duration: "3 days"
    },
    
    // MIZORAM DESTINATIONS
    {
      id: 57,
      name: "Aizawl City Experience",
      location: "Aizawl, Mizoram",
      description: "Discover the hilly capital with its vibrant markets, museums and panoramic viewpoints.",
      image: teaImage,
      price: 13500,
      priceDisplay: "₹13,500",
      state: "mizoram",
      duration: "3 days"
    },
    {
      id: 58,
      name: "Vantawng Falls Adventure",
      location: "Serchhip, Mizoram",
      description: "Visit Mizoram's highest waterfall cascading from a height of 750 feet through lush forests.",
      image: teaImage,
      price: 15000,
      priceDisplay: "₹15,000",
      state: "mizoram",
      duration: "3 days"
    },
    {
      id: 59,
      name: "Reiek Heritage Village",
      location: "Mamit, Mizoram",
      description: "Experience traditional Mizo life in this model village with stunning mountain views.",
      image: teaImage,
      price: 14000,
      priceDisplay: "₹14,000",
      badge: "Cultural",
      state: "mizoram",
      duration: "3 days"
    },
    
    // TRIPURA DESTINATIONS
    {
      id: 60,
      name: "Agartala Royal Heritage",
      location: "West Tripura, Tripura",
      description: "Explore the former princely state with its royal palace, temples and Indo-Bangla heritage.",
      image: teaImage,
      price: 11000,
      priceDisplay: "₹11,000",
      state: "tripura",
      duration: "3 days"
    },
    {
      id: 61,
      name: "Unakoti Rock Carvings",
      location: "Unakoti, Tripura",
      description: "Discover ancient rock sculptures and carvings dating back to the 7th-9th centuries.",
      image: teaImage,
      price: 13000,
      priceDisplay: "₹13,000",
      badge: "Historical",
      state: "tripura",
      duration: "3 days"
    },
    {
      id: 62,
      name: "Neermahal Palace",
      location: "Sepahijala, Tripura",
      description: "Visit the stunning white water palace built in the middle of Rudrasagar Lake.",
      image: teaImage,
      price: 12000,
      priceDisplay: "₹12,000",
      state: "tripura",
      duration: "2 days"
    },
    {
      id: 63,
      name: "Udaipur Temple Tour",
      location: "Gomati, Tripura",
      description: "Explore the ancient temples of Tripura's former capital including the famous Tripura Sundari Temple.",
      image: teaImage,
      price: 10500,
      priceDisplay: "₹10,500",
      state: "tripura",
      duration: "2 days"
    }
  ];
  
  // Filter and paginate destinations
  useEffect(() => {
    let filtered = [...allDestinations];
    
    // Filter by state
    if (activeState !== "all") {
      filtered = filtered.filter(dest => dest.state === activeState);
    }
    
    setSearchResults(filtered);
    setCurrentPage(1);
    setIsFiltered(false);
  }, [activeState]);
  
  // Handle search with filters
  const handleSearch = () => {
    let filtered = [...allDestinations];
    
    // Filter by state
    if (activeState !== "all") {
      filtered = filtered.filter(dest => dest.state === activeState);
    }
    
    // Filter by price range
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(dest => {
        if (max) {
          return dest.price >= min && dest.price <= max;
        } else {
          return dest.price >= min;
        }
      });
    }
    
    // Filter by duration
    if (duration !== "all") {
      const [min, max] = duration.split("-").map(Number);
      const getDurationDays = (durationStr) => parseInt(durationStr.split(" ")[0]);
      
      filtered = filtered.filter(dest => {
        const days = getDurationDays(dest.duration);
        if (max) {
          return days >= min && days <= max;
        } else {
          return days >= min;
        }
      });
    }
    
    setSearchResults(filtered);
    setCurrentPage(1);
    setIsFiltered(true);
  };
  
  // Calculate pagination
  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = searchResults.slice(indexOfFirstDestination, indexOfLastDestination);
  const totalPages = Math.ceil(searchResults.length / destinationsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Modal handlers
  const openModal = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
    setShowBookingForm(false);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
    setShowBookingForm(false);
  };
  
  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };
  
  // Form handlers
  const handleInputChange = (e, field = null, value = null) => {
    if (field && value !== null) {
      // For date picker
      setBookingData(prev => ({ ...prev, [field]: value }));
    } else {
      // For regular inputs
      const { name, value } = e.target;
      setBookingData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the date if it exists
    const formattedDate = bookingData.travelDate 
      ? bookingData.travelDate.toLocaleDateString('en-IN')
      : '';
    
    // Show immediate thank you message
    alert("Thank you for your booking request! We'll contact you shortly to confirm your reservation.");
    
    // Close the modal immediately to improve UX
    closeModal();
    
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('Destination', selectedDestination.name);
      formData.append('Duration', selectedDestination.duration);
      formData.append('Price', selectedDestination.priceDisplay);
      formData.append('Customer Name', bookingData.name);
      formData.append('Email', bookingData.email);
      formData.append('Phone', bookingData.phone);
      formData.append('Number of Guests', bookingData.guests);
      formData.append('Travel Date', formattedDate);
      formData.append('Special Requests', bookingData.specialRequests || 'None');
      
      // Send the form data to the email
      fetch('https://formsubmit.co/sajid@teacountry.in', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Reset the image index when a new destination is selected
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedDestination]);
  
  // Function to handle image navigation
  const nextImage = () => {
    if (selectedDestination && selectedDestination.additionalImages) {
      const images = [selectedDestination.image, ...selectedDestination.additionalImages];
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };
  
  const prevImage = () => {
    if (selectedDestination && selectedDestination.additionalImages) {
      const images = [selectedDestination.image, ...selectedDestination.additionalImages];
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  // Function to handle calendar date change
  const handleCalendarChange = (date) => {
    setBookingData(prev => ({ ...prev, travelDate: format(date, 'yyyy-MM-dd') }));
  };

  return (
    <PageContainer>
      <Hero>
        <HeroContent>
          <PageTitle>Discover Northeast India</PageTitle>
          <PageDescription>
            Explore the hidden gems of India's Northeast - from lush tea gardens to ancient monasteries and breathtaking landscapes
          </PageDescription>
        </HeroContent>
      </Hero>
      
      <FiltersSection>
        <FiltersContainer>
          <FilterGroup>
            <FilterLabel>Price Range</FilterLabel>
            <FilterSelect 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="0-10000">Below ₹10,000</option>
              <option value="10000-15000">₹10,000 - ₹15,000</option>
              <option value="15000-20000">₹15,000 - ₹20,000</option>
              <option value="20000">Above ₹20,000</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Duration</FilterLabel>
            <FilterSelect 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="all">Any Duration</option>
              <option value="1-2">1-2 Days</option>
              <option value="3-4">3-4 Days</option>
              <option value="5">5+ Days</option>
            </FilterSelect>
          </FilterGroup>
          
          <SearchButton onClick={handleSearch}>
            Apply Filters
          </SearchButton>
        </FiltersContainer>
      </FiltersSection>
      
      <ContentSection>
        <StateTabsContainer>
          {northeastStates.map(state => (
            <StateTab 
              key={state.id} 
              active={activeState === state.id}
              onClick={() => setActiveState(state.id)}
            >
              {state.name}
            </StateTab>
          ))}
        </StateTabsContainer>
        
        <DestinationsGrid>
          {currentDestinations.length > 0 ? (
            currentDestinations.map(destination => (
              <DestinationCard key={destination.id}>
                <DestinationImage>
                  <img src={destination.image} alt={destination.name} />
                  {destination.badge && <Badge>{destination.badge}</Badge>}
                </DestinationImage>
                <DestinationContent>
                  <DestinationTitle>{destination.name}</DestinationTitle>
                  <DestinationLocation>
                    <LocationIcon /> {destination.location}
                  </DestinationLocation>
                  <DestinationDescription>{destination.description}</DestinationDescription>
                  <DestinationFooter>
                    <Price>From {destination.priceDisplay}</Price>
                    <BookButton onClick={() => openModal(destination)}>Book Now</BookButton>
                  </DestinationFooter>
                </DestinationContent>
              </DestinationCard>
            ))
          ) : (
            <NoResults>
              <h3>No destinations found</h3>
              <p>Try adjusting your filters to see more results</p>
            </NoResults>
          )}
        </DestinationsGrid>
        
        {totalPages > 1 && (
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <PageButton
                key={index}
                active={currentPage === index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
          </Pagination>
        )}
      </ContentSection>
      
      {/* Modal */}
      {selectedDestination && (
        <ModalOverlay isOpen={isModalOpen} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedDestination.name}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <DestinationDetails>
                <ImageGallery>
                  {selectedDestination.additionalImages ? (
                    <>
                      <GalleryImage 
                        src={currentImageIndex === 0 
                          ? selectedDestination.image 
                          : selectedDestination.additionalImages[currentImageIndex - 1]} 
                        alt={`${selectedDestination.name} - Image ${currentImageIndex + 1}`} 
                      />
                      
                      {/* Only show navigation if there's more than one image */}
                      {selectedDestination.additionalImages.length > 0 && (
                        <>
                          <GalleryButton position="left" onClick={prevImage}>
                            &#10094;
                          </GalleryButton>
                          <GalleryButton position="right" onClick={nextImage}>
                            &#10095;
                          </GalleryButton>
                          
                          <GalleryNav>
                            {[selectedDestination.image, ...selectedDestination.additionalImages].map((_, index) => (
                              <GalleryDot 
                                key={index} 
                                active={currentImageIndex === index}
                                onClick={() => setCurrentImageIndex(index)}
                              />
                            ))}
                          </GalleryNav>
                        </>
                      )}
                    </>
                  ) : (
                    <GalleryImage src={selectedDestination.image} alt={selectedDestination.name} />
                  )}
                </ImageGallery>

                <DetailContent>
                  <DetailSection>
                    <DetailTitle>About this destination</DetailTitle>
                    <DetailText>{selectedDestination.longDescription || selectedDestination.description}</DetailText>
                  </DetailSection>
                  
                  <DetailSection>
                    <DetailTitle>Experience highlights</DetailTitle>
                    <HighlightsList>
                      {selectedDestination.highlights && selectedDestination.highlights.map((highlight, index) => (
                        <HighlightItem key={index}>{highlight}</HighlightItem>
                      ))}
                    </HighlightsList>
                  </DetailSection>
                  
                  <PriceHighlight>
                    <DetailTitle>Duration: {selectedDestination.duration}</DetailTitle>
                    <DetailTitle>Price: {selectedDestination.priceDisplay}</DetailTitle>
                    <DetailText>Package includes: {selectedDestination.includes || "Accommodation, guided tours, and select meals"}</DetailText>
                  </PriceHighlight>
                  
                  {!showBookingForm && (
                    <BookingButton onClick={handleBookNowClick}>Book Now</BookingButton>
                  )}
                </DetailContent>
              </DestinationDetails>
              
              {showBookingForm && (
                <BookingForm onSubmit={handleSubmit}>
                  <FormTitle>Complete your booking for {selectedDestination.name}</FormTitle>
                  
                  <FormRow>
                    <FormGroup>
                      <FormLabel>Your Name*</FormLabel>
                      <FormInput 
                        type="text" 
                        name="name" 
                        value={bookingData.name} 
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel>Email Address*</FormLabel>
                      <FormInput 
                        type="email" 
                        name="email" 
                        value={bookingData.email} 
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email address"
                      />
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormInput 
                        type="tel" 
                        name="phone" 
                        value={bookingData.phone} 
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your phone number"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel>Number of Guests*</FormLabel>
                      <FormSelect 
                        name="guests" 
                        value={bookingData.guests} 
                        onChange={handleInputChange}
                        required
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i+1}>{i+1} {i === 0 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </FormSelect>
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <FormLabel>Preferred Travel Date*</FormLabel>
                      <CalendarContainer>
                        <Calendar 
                          onChange={handleCalendarChange}
                          value={bookingData.travelDate ? new Date(bookingData.travelDate) : new Date()}
                          minDate={new Date()}
                        />
                      </CalendarContainer>
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <FormLabel>Special Requests</FormLabel>
                      <FormTextarea 
                        name="specialRequests" 
                        value={bookingData.specialRequests} 
                        onChange={handleInputChange}
                        placeholder="Any special requests or questions about this tour?"
                      />
                    </FormGroup>
                  </FormRow>
                  
                  <SubmitButton type="submit">
                    Book Now
                  </SubmitButton>
                </BookingForm>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default DestinationsPage;

// Add these styled components with your other styled components
const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker {
    font-family: 'Inter', sans-serif;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .react-datepicker__header {
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding-top: 12px;
  }
  
  .react-datepicker__current-month {
    font-weight: 600;
    font-size: 14px;
    color: #333;
    padding-bottom: 8px;
  }
  
  .react-datepicker__day-name {
    color: #999;
    margin: 6px;
    font-size: 12px;
  }
  
  .react-datepicker__day {
    margin: 6px;
    border-radius: 50%;
    transition: all 0.2s ease;
    color: #555;
  }
  
  .react-datepicker__day:hover {
    background-color: #f0f7ee;
  }
  
  .react-datepicker__day--selected {
    background-color: #2c6a3f !important;
    color: white !important;
  }
  
  .react-datepicker__day--keyboard-selected {
    background-color: rgba(44, 106, 63, 0.2);
    color: #2c6a3f;
  }
  
  .react-datepicker__navigation {
    top: 13px;
  }
  
  .react-datepicker__triangle {
    display: none;
  }
`;

const DateInputField = styled.div`
  position: relative;
  width: 100%;
  
  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: #2c6a3f;
      box-shadow: 0 0 0 1px #2c6a3f;
    }
  }
  
  &::after {
    content: "📅";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 16px;
    color: #aaa;
  }
`;

const CalendarContainer = styled.div`
  margin-bottom: 1rem;
  
  .react-calendar {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: inherit;
  }
  
  .react-calendar__tile--active {
    background: #2c6a3f;
    color: white;
  }
  
  .react-calendar__tile--now {
    background: #e6f3eb;
  }
`;