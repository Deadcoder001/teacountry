import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Import images for states and destinations
import teaGarden from '../assets/images/307854703_508778997928563_2050649504796643182_n-e1753080453472.png';
import umiamLake from '../assets/images/Umiam_Lake_Shillong_Meghalaya.jpg';
import teaLandscape from '../assets/images/Untitled-design-4-1.png';
import teaImage from '../assets/images/image_2025-07-22_12-10-02-1.png';

// Additional images for variety
import majuliImage from '../assets/images/majuli-island.jpg';
import rootBridgeImage from '../assets/images/livingroot.jpg';
import tawangImage from '../assets/images/tawang-monastery.jpg';
import kaziranga from '../assets/images/kaziranga.jpg';
import hornbill from '../assets/images/hornbill-festival.jpg';
import ziroImage from '../assets/images/ziro-valley.jpg';
import loktak from '../assets/images/loktak-lake.jpg';
import tsomgo from '../assets/images/tsomgo-lake.jpg';

// Styled components
const SectionContainer = styled.section`
  padding: 5rem 0;
  background-color: #f8f9fa;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2c6a3f;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
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
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
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
  padding: 0 1rem;
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

const NoDestinations = styled.div`
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

const ViewMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const ViewMoreButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #2c6a3f;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(44, 106, 63, 0.3);
  
  &:hover {
    background-color: #224e30;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(44, 106, 63, 0.4);
  }
`;

// New styled components for the modal
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
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

// Location pin icon component
const LocationIcon = () => (
  <LocationIconSvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </LocationIconSvg>
);

const TopDestinations = () => {
  const [activeState, setActiveState] = useState("all");
  
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
    travelDate: new Date(),
    specialRequests: ''
  });
  
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
  
  // Define destinations by state with unique images and extended details
  const allDestinations = [
    {
      id: 1,
      name: "Kaziranga Tea Estate",
      location: "Assam",
      description: "Experience the lush greenery of Assam's finest tea gardens and learn about the art of tea production.",
      image: teaGarden,
      price: "₹15,000",
      badge: "Popular",
      state: "assam",
      duration: "3 days",
      longDescription: "Nestled in the heart of Assam, Kaziranga Tea Estate offers a serene retreat among sprawling tea gardens. Visitors can experience the complete journey of tea making, from plucking fresh leaves to processing and tasting.",
      highlights: [
        "Guided tour of tea processing facilities",
        "Tea tasting sessions with expert tea sommeliers",
        "Stay in colonial-era bungalows with modern amenities",
        "Cultural performances showcasing local traditions"
      ]
    },
    {
      id: 2,
      name: "Majuli Island",
      location: "Assam",
      description: "Visit the world's largest river island and experience unique Assamese culture and traditions.",
      image: majuliImage || teaGarden, // Using different image
      price: "₹10,000",
      state: "assam",
      duration: "2 days",
      longDescription: "Majuli Island, the world's largest river island, is a cultural treasure of Assam. This vibrant island on the Brahmaputra River is home to many Satras (Vaishnavite monasteries) and is known for its rich cultural heritage.",
      highlights: [
        "Visit ancient Vaishnavite monasteries dating back to the 16th century",
        "Experience traditional mask-making craft demonstrations",
        "Boat rides on the mighty Brahmaputra River",
        "Stay with local families in traditional homes"
      ]
    },
    {
      id: 3,
      name: "Umiam Lake",
      location: "Shillong, Meghalaya",
      description: "Enjoy breathtaking views of this man-made reservoir surrounded by hills and lush green forests.",
      image: umiamLake,
      price: "₹12,500",
      badge: "Featured",
      state: "meghalaya",
      duration: "2 days",
      longDescription: "Umiam Lake, also known as Barapani, is a stunning man-made reservoir located near Shillong. Surrounded by lush green East Khasi Hills, this picturesque lake offers panoramic views and a tranquil environment perfect for nature lovers.",
      highlights: [
        "Water sports including kayaking, water cycling, and boating",
        "Lakeside resorts with panoramic views",
        "Photography opportunities with stunning landscapes",
        "Hiking trails through pine forests"
      ]
    },
    {
      id: 4,
      name: "Living Root Bridges",
      location: "Cherrapunji, Meghalaya",
      description: "Marvel at these natural wonders - bridges made from living tree roots that grow stronger over time.",
      image: rootBridgeImage || umiamLake, // Using different image
      price: "₹14,000",
      state: "meghalaya",
      duration: "3 days",
      longDescription: "The living root bridges of Meghalaya are an extraordinary example of bio-engineering by the Khasi and Jaintia people. These functional bridges are made from the roots of rubber fig trees guided across rivers, growing stronger over time.",
      highlights: [
        "Trek to the famous double-decker root bridge",
        "Swim in crystal clear natural pools",
        "Experience homestays in remote villages",
        "Photograph some of the most unique natural structures in the world"
      ]
    },
    {
      id: 5,
      name: "Tawang Monastery",
      location: "Tawang, Arunachal Pradesh",
      description: "Visit the largest monastery in India and second largest in the world with stunning mountain views.",
      image: tawangImage || teaLandscape, // Using different image
      price: "₹18,000",
      state: "arunachal",
      duration: "5 days",
      longDescription: "Perched at an elevation of about 10,000 feet, Tawang Monastery is a spiritual haven with breathtaking views of the surrounding valleys. Founded in the 17th century, it's the largest monastery in India and houses invaluable Buddhist artifacts.",
      highlights: [
        "Explore the massive three-story monastery complex",
        "Witness Buddhist prayer ceremonies and rituals",
        "Visit the birthplace of the 6th Dalai Lama",
        "Enjoy panoramic views of snow-capped Himalayan peaks"
      ]
    },
    {
      id: 6,
      name: "Ziro Valley",
      location: "Lower Subansiri, Arunachal Pradesh",
      description: "Explore this UNESCO World Heritage site known for its unique paddy cultivation and tribal culture.",
      image: ziroImage || teaLandscape, // Using different image
      price: "₹16,000",
      state: "arunachal",
      duration: "4 days",
      longDescription: "Ziro Valley, home to the Apatani tribe, is renowned for its unique sustainable farming practices and rich cultural heritage. The picturesque landscape features pine hills, rice fields, and bamboo groves creating a serene atmosphere.",
      highlights: [
        "Learn about the unique Apatani tribe and their distinctive culture",
        "Witness sustainable paddy-cum-fish cultivation techniques",
        "Attend local festivals if your visit coincides with celebrations",
        "Trek through pristine forests and enjoy breathtaking valley views"
      ]
    },
    {
      id: 7,
      name: "Tsomgo Lake",
      location: "East Sikkim",
      description: "Visit this high-altitude glacial lake surrounded by snow-capped mountains and scenic beauty.",
      image: tsomgo || teaImage, // Using different image
      price: "₹16,500",
      badge: "Best Seller",
      state: "sikkim",
      duration: "3 days",
      longDescription: "Tsomgo Lake, also known as Changu Lake, is a glacial lake situated at an altitude of 12,400 ft. The oval-shaped lake is considered sacred by locals and changes color with the seasons, reflecting the surrounding landscape.",
      highlights: [
        "Experience yak rides along the scenic lakeshore",
        "Visit the nearby Baba Mandir, a sacred shrine",
        "Enjoy snow activities during winter months",
        "Photograph the changing colors of this magical lake"
      ]
    },
    {
      id: 8,
      name: "Nathula Pass",
      location: "East Sikkim",
      description: "Experience the historic Silk Route border pass between India and China at an altitude of 14,140 ft.",
      image: teaImage,
      price: "₹19,000",
      state: "sikkim",
      duration: "4 days",
      longDescription: "Nathula Pass, one of the highest motorable roads in the world, is a mountain pass in the Himalayas that served as a trade link between India and Tibet. Today, it stands as an important border post between India and China.",
      highlights: [
        "Visit the historic Indo-China border and interact with army personnel",
        "Experience breathtaking views of the Himalayan range",
        "Explore the historical significance of the ancient Silk Route",
        "Witness the extreme mountain climate at high altitude"
      ]
    },
    {
      id: 9,
      name: "Loktak Lake",
      location: "Moirang, Manipur",
      description: "Discover the only floating lake in the world with unique phumdis (floating islands).",
      image: loktak || teaGarden, // Using different image
      price: "₹13,000",
      state: "manipur",
      duration: "3 days",
      longDescription: "Loktak Lake is the largest freshwater lake in Northeast India, famous for its circular floating swamps called 'phumdis'. The lake is home to Keibul Lamjao National Park, the only floating national park in the world.",
      highlights: [
        "Boat ride to explore the unique floating islands",
        "Visit the Keibul Lamjao National Park, home to the endangered Sangai deer",
        "Stay in waterfront cottages with panoramic views",
        "Experience local fishing techniques and village life"
      ]
    },
    {
      id: 10,
      name: "Dzukou Valley",
      location: "Nagaland/Manipur Border",
      description: "Trek through one of the most beautiful valleys famous for its seasonal flowers and lush landscapes.",
      image: teaLandscape,
      price: "₹15,500",
      state: "nagaland",
      duration: "4 days",
      longDescription: "Dzükou Valley, often referred to as 'the valley of flowers of the Northeast', is known for its pristine environment, seasonal blooms and gentle rolling hills. The valley is especially famous for its unique Dzükou lily found nowhere else in the world.",
      highlights: [
        "Trek through picturesque trails with breathtaking vistas",
        "Camp under the stars in one of India's most beautiful valleys",
        "Photograph rare wildflowers (seasonal, especially in summer)",
        "Experience the pristine natural environment of the Eastern Himalayas"
      ]
    },
    {
      id: 11,
      name: "Blue Mountain",
      location: "Phawngpui, Mizoram",
      description: "Climb the highest peak in Mizoram offering panoramic views and rich biodiversity.",
      image: umiamLake,
      price: "₹14,500",
      state: "mizoram",
      duration: "5 days",
      longDescription: "Phawngpui, also known as Blue Mountain, is the highest mountain peak in Mizoram. The national park surrounding it is rich in flora and fauna with several rare species. The summit offers spectacular panoramic views of the surrounding landscapes.",
      highlights: [
        "Trek to the summit for breathtaking views across Mizoram and into Myanmar",
        "Spot rare bird species in this important bird area",
        "Explore diverse flora including rare orchids and rhododendrons",
        "Experience camping in pristine wilderness"
      ]
    },
    {
      id: 12,
      name: "Neermahal Palace",
      location: "Tripura",
      description: "Visit the stunning white palace built in the middle of Rudrasagar Lake combining Hindu and Muslim architectural styles.",
      image: teaImage,
      price: "₹11,000",
      state: "tripura",
      duration: "2 days",
      longDescription: "Neermahal, meaning 'Water Palace', is the former royal palace built in the middle of Rudrasagar Lake. This architectural marvel combines Hindu and Muslim design elements, creating a unique structure that seems to float on water.",
      highlights: [
        "Boat ride to this magnificent palace in the middle of the lake",
        "Learn about the history of the Tripura royal family",
        "Enjoy water sports activities in Rudrasagar Lake",
        "Witness the annual Neermahal Water Festival if timing permits"
      ]
    }
  ];
  
  // Filter destinations based on selected state
  let filteredDestinations = activeState === "all" 
    ? allDestinations 
    : allDestinations.filter(dest => dest.state === activeState);
    
  // If viewing all states, limit to only 6 destinations
  if (activeState === "all") {
    filteredDestinations = filteredDestinations.slice(0, 6);
  }

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCalendarChange = (date) => {
    setBookingData(prev => ({ ...prev, travelDate: date }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the date
    const formattedDate = bookingData.travelDate.toLocaleDateString('en-IN');
    
    // Show immediate thank you message instead of loading message
    alert("Thank you for your booking request! We'll contact you shortly to confirm your reservation.");
    
    // Close the modal immediately to improve UX
    closeModal();
    
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('Destination', selectedDestination.name);
      formData.append('Duration', selectedDestination.duration);
      formData.append('Price', selectedDestination.price);
      formData.append('Customer Name', bookingData.name);
      formData.append('Email', bookingData.email);
      formData.append('Phone', bookingData.phone);
      formData.append('Number of Guests', bookingData.guests);
      formData.append('Travel Date', formattedDate);
      formData.append('Special Requests', bookingData.specialRequests || 'None');
      
      // Send the form data in the background without waiting
      fetch('https://formsubmit.co/kalicodes4444@gmail.com', {
        method: 'POST',
        body: formData,
      });
      
      // No additional alert here since we already showed the thank you message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Log error but don't show another alert since modal is already closed
    }
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <Title>Destinations You Shouldn't Miss</Title>
        <Subtitle>
          Explore the breathtaking beauty of Northeast India with our handpicked destinations across all eight states
        </Subtitle>
      </SectionHeader>
      
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
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map(destination => (
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
                  <Price>From {destination.price}</Price>
                  <BookButton onClick={() => openModal(destination)}>Book Now</BookButton>
                </DestinationFooter>
              </DestinationContent>
            </DestinationCard>
          ))
        ) : (
          <NoDestinations>
            <h3>Coming Soon!</h3>
            <p>We're currently adding exciting destinations in this state.</p>
          </NoDestinations>
        )}
      </DestinationsGrid>
      
      {activeState === "all" && (
        <ViewMoreContainer>
          <ViewMoreButton to="/destinations">
            View All Destinations
          </ViewMoreButton>
        </ViewMoreContainer>
      )}
      
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
                  <img src={selectedDestination.image} alt={selectedDestination.name} />
                </ImageGallery>
                
                <DetailContent>
                  <DetailSection>
                    <DetailTitle>About this destination</DetailTitle>
                    <DetailText>{selectedDestination.longDescription || selectedDestination.description}</DetailText>
                  </DetailSection>
                  
                  {selectedDestination.highlights && (
                    <DetailSection>
                      <DetailTitle>Experience highlights</DetailTitle>
                      <HighlightsList>
                        {selectedDestination.highlights.map((highlight, index) => (
                          <HighlightItem key={index}>{highlight}</HighlightItem>
                        ))}
                      </HighlightsList>
                    </DetailSection>
                  )}
                  
                  <PriceHighlight>
                    <DetailTitle>Duration: {selectedDestination.duration}</DetailTitle>
                    <DetailTitle>Price: {selectedDestination.price}</DetailTitle>
                    <DetailText>Package includes: Accommodation, guided tours, and select meals</DetailText>
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
                          value={bookingData.travelDate}
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
    </SectionContainer>
  );
};

export default TopDestinations;