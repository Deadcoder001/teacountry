import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    {
      id: 2,
      name: "Majuli Island",
      location: "Assam",
      description: "Visit the world's largest river island and experience unique Assamese culture and traditions.",
      image: teaGarden,
      price: 10000,
      priceDisplay: "₹10,000",
      state: "assam",
      duration: "2 days",
      longDescription: "Majuli Island, the world's largest river island, is a cultural treasure of Assam. This vibrant island on the Brahmaputra River is home to many Satras (Vaishnavite monasteries) and is known for its rich cultural heritage. Visitors can explore traditional mask-making workshops, witness centuries-old performing arts, and enjoy the pristine natural beauty of this unique ecosystem.",
      highlights: [
        "Visit ancient Vaishnavite monasteries dating back to the 16th century",
        "Experience traditional mask-making craft demonstrations",
        "Boat rides on the mighty Brahmaputra River",
        "Stay with local families in traditional homes",
        "Witness Sattriya dance performances"
      ],
      includes: "Accommodation in homestays, meals, ferry transfers, guided tours, and cultural performances",
      additionalImages: [teaGarden, umiamLake]
    },
    {
      id: 3,
      name: "Umiam Lake",
      location: "Shillong, Meghalaya",
      description: "Enjoy breathtaking views of this man-made reservoir surrounded by hills and lush green forests.",
      image: umiamLake,
      price: 12500,
      priceDisplay: "₹12,500",
      badge: "Featured",
      state: "meghalaya",
      duration: "2 days",
      longDescription: "Umiam Lake, also known as Barapani, is a stunning man-made reservoir located near Shillong. Surrounded by lush green East Khasi Hills, this picturesque lake offers panoramic views and a tranquil environment perfect for nature lovers. Visitors can enjoy various water sports, hiking trails along the shores, and mesmerizing sunsets that paint the water with golden hues.",
      highlights: [
        "Water sports including kayaking, water cycling, and boating",
        "Lakeside resorts with panoramic views",
        "Photography opportunities with stunning landscapes",
        "Hiking trails through pine forests",
        "Sunset views across the shimmering waters"
      ],
      includes: "Accommodation, breakfast, guided nature walks, and one water sport activity",
      additionalImages: [umiamLake, teaLandscape]
    },
    {
      id: 4,
      name: "Living Root Bridges",
      location: "Cherrapunji, Meghalaya",
      description: "Marvel at these natural wonders - bridges made from living tree roots that grow stronger over time.",
      image: umiamLake,
      price: 14000,
      priceDisplay: "₹14,000",
      state: "meghalaya",
      duration: "3 days"
    },
    {
      id: 5,
      name: "Tawang Monastery",
      location: "Tawang, Arunachal Pradesh",
      description: "Visit the largest monastery in India and second largest in the world with stunning mountain views.",
      image: teaLandscape,
      price: 18000,
      priceDisplay: "₹18,000",
      state: "arunachal",
      duration: "5 days"
    },
    {
      id: 6,
      name: "Ziro Valley",
      location: "Lower Subansiri, Arunachal Pradesh",
      description: "Explore this UNESCO World Heritage site known for its unique paddy cultivation and tribal culture.",
      image: teaLandscape,
      price: 16000,
      priceDisplay: "₹16,000",
      state: "arunachal",
      duration: "4 days"
    },
    {
      id: 7,
      name: "Tsomgo Lake",
      location: "East Sikkim",
      description: "Visit this high-altitude glacial lake surrounded by snow-capped mountains and scenic beauty.",
      image: teaImage,
      price: 16500,
      priceDisplay: "₹16,500",
      badge: "Best Seller",
      state: "sikkim",
      duration: "3 days"
    },
    {
      id: 8,
      name: "Nathula Pass",
      location: "East Sikkim",
      description: "Experience the historic Silk Route border pass between India and China at an altitude of 14,140 ft.",
      image: teaImage,
      price: 19000,
      priceDisplay: "₹19,000",
      state: "sikkim",
      duration: "4 days"
    },
    {
      id: 9,
      name: "Loktak Lake",
      location: "Moirang, Manipur",
      description: "Discover the only floating lake in the world with unique phumdis (floating islands).",
      image: teaGarden,
      price: 13000,
      priceDisplay: "₹13,000",
      state: "manipur",
      duration: "3 days"
    },
    {
      id: 10,
      name: "Dzukou Valley",
      location: "Nagaland/Manipur Border",
      description: "Trek through one of the most beautiful valleys famous for its seasonal flowers and lush landscapes.",
      image: teaLandscape,
      price: 15500,
      priceDisplay: "₹15,500",
      state: "nagaland",
      duration: "4 days"
    },
    {
      id: 11,
      name: "Blue Mountain",
      location: "Phawngpui, Mizoram",
      description: "Climb the highest peak in Mizoram offering panoramic views and rich biodiversity.",
      image: umiamLake,
      price: 14500,
      priceDisplay: "₹14,500",
      state: "mizoram",
      duration: "5 days"
    },
    {
      id: 12,
      name: "Neermahal Palace",
      location: "Tripura",
      description: "Visit the stunning white palace built in the middle of Rudrasagar Lake combining Hindu and Muslim architectural styles.",
      image: teaImage,
      price: 11000,
      priceDisplay: "₹11,000",
      state: "tripura",
      duration: "2 days"
    },
    {
      id: 13,
      name: "Kohima War Cemetery",
      location: "Kohima, Nagaland",
      description: "Visit this historical site commemorating soldiers who died in WWII during the Battle of Kohima.",
      image: teaGarden,
      price: 12000,
      priceDisplay: "₹12,000",
      state: "nagaland",
      duration: "2 days"
    },
    {
      id: 14,
      name: "Hornbill Festival",
      location: "Kisama, Nagaland",
      description: "Experience the colorful festival celebrating the diverse tribal culture and traditions of Nagaland.",
      image: teaLandscape,
      price: 20000,
      priceDisplay: "₹20,000",
      badge: "Special",
      state: "nagaland",
      duration: "7 days"
    },
    {
      id: 15,
      name: "Nameri National Park",
      location: "Sonitpur, Assam",
      description: "Explore this tiger reserve and elephant habitat with opportunities for bird watching and river rafting.",
      image: teaGarden,
      price: 13500,
      priceDisplay: "₹13,500",
      state: "assam",
      duration: "3 days"
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare WhatsApp message
    const message = `
Hello! I would like to book the following tour:

*Destination:* ${selectedDestination.name}
*Duration:* ${selectedDestination.duration}
*Price:* ${selectedDestination.priceDisplay}

*My Details:*
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Number of guests: ${bookingData.guests}
Preferred travel date: ${bookingData.travelDate}

${bookingData.specialRequests ? `Special requests: ${bookingData.specialRequests}` : ''}

Please contact me with availability and booking information. Thank you!
    `;
    
    // Replace with your actual admin WhatsApp number
    const adminWhatsApp = "9198541 33713"; // Format: country code + number without +
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${adminWhatsApp}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Close the modal
    closeModal();
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
                  <img src={selectedDestination.image} alt={selectedDestination.name} />
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
                      <FormInput 
                        type="date" 
                        name="travelDate" 
                        value={bookingData.travelDate} 
                        onChange={handleInputChange}
                        required
                      />
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
                    Complete Booking via WhatsApp
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