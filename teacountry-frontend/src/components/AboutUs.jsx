import React from 'react';
import { motion } from 'framer-motion';

// Import images from local assets
import teaEstates from '../assets/images/teaestates.jpg';
import livingRoot from '../assets/images/livingroot.jpg';
import kaziranga from '../assets/images/kaziranga.jpg';
import dzukoValley from '../assets/images/DzukoValley.jpg';
import umiamLake from '../assets/images/Umiam_Lake_Shillong_Meghalaya.jpg';
import hornbillFestival from '../assets/images/hornbill-festival.jpg';
import tawangMonastery from '../assets/images/tawang-monastery.jpg';
import majuliIsland from '../assets/images/majuli-island.jpg';

const AboutUs = () => {
  // Define common styles as objects
  const sectionStyle = {
    padding: '4rem 1rem',
  };
  
  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  };
  
  const flexContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  };
  
  const columnStyle = {
    width: '100%',
  };
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
  };
  
  const statCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    marginBottom: '2rem',
  };
  
  const statHeadingStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#2c6a3f', // Tea Country green
  };
  
  const statTextStyle = {
    color: '#4b5563', // gray-600
    marginTop: '0.5rem',
  };
  
  const hrStyle = {
    margin: '1.5rem 0',
    border: 'none',
    borderTop: '1px solid #2c6a3f', // Tea Country green
  };
  
  const avatarContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  };
  
  const avatarStyle = {
    width: '2rem',
    height: '2rem',
    borderRadius: '9999px',
    backgroundColor: '#e5e7eb', // gray-200
    overflow: 'hidden',
  };
  
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
  
  const smallImageStyle = {
    ...imageStyle,
    height: '16rem', // 64
    borderRadius: '0.5rem',
  };
  
  const largeImageStyle = {
    ...imageStyle,
    height: '24rem', // 96
    borderRadius: '0.5rem',
  };
  
  const contentStyle = {
    width: '100%',
  };
  
  const subtitleStyle = {
    color: '#2c6a3f', // Tea Country green
    fontWeight: '500',
    marginBottom: '0.5rem',
  };
  
  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  };
  
  const paragraphStyle = {
    color: '#4b5563', // gray-600
    marginBottom: '2rem',
    lineHeight: '1.625',
  };
  
  const buttonStyle = {
    backgroundColor: '#2c6a3f', // Tea Country green
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };
  
  // Media query styles for larger screens
  const mediaStyles = window.matchMedia('(min-width: 1024px)').matches ? {
    flexContainerStyle: {
      ...flexContainerStyle,
      flexDirection: 'row',
      alignItems: 'center',
    },
    columnStyle: {
      ...columnStyle,
      width: '50%',
    },
  } : {};

  // Merge base styles with media query styles
  const responsiveFlexContainer = { ...flexContainerStyle, ...mediaStyles.flexContainerStyle };
  const responsiveColumn = { ...columnStyle, ...mediaStyles.columnStyle };

  // Array of images from your assets for avatars
  const avatarImages = [
    teaEstates, 
    livingRoot, 
    kaziranga, 
    dzukoValley, 
    umiamLake, 
    hornbillFestival,
    tawangMonastery,
    majuliIsland
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={responsiveFlexContainer}>
          <div style={responsiveColumn}>
            <div style={gridStyle}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ position: 'relative' }}
              >
                <div style={statCardStyle}>
                  <h3 style={statHeadingStyle}>8 States</h3>
                  <p style={statTextStyle}>Exploring the diverse landscapes and cultures of Northeast India's enchanting sister states.</p>
                  <hr style={hrStyle} />
                  <div style={avatarContainerStyle}>
                    {Array(8).fill(0).map((_, i) => (
                      <div key={i} style={avatarStyle}>
                        <img 
                          src={avatarImages[i % avatarImages.length]} 
                          alt={`Northeast India landscape ${i+1}`} 
                          style={imageStyle}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.img 
                  src={teaEstates} 
                  alt="Tea gardens of Assam" 
                  style={smallImageStyle}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.img 
                  src={livingRoot} 
                  alt="Living root bridges of Meghalaya" 
                  style={largeImageStyle}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </div>
          
          <div style={responsiveColumn}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={contentStyle}
            >
              <h4 style={subtitleStyle}>WELCOME TO</h4>
              <h2 style={titleStyle}>THE TEA COUNTRY</h2>
              
              <p style={paragraphStyle}>
                Based in the serene hill station of Shillong, Meghalaya, we specialize in premium, tailor-made travel experiences across the mesmerizing states of Arunachal Pradesh, Meghalaya, and Assam. Our journeys unveil the pristine wilderness, lush valleys, and culturally rich heart of Northeast India.
              </p>
              
              <p style={paragraphStyle}>
                Whether you're a thrill-seeking couple, a family looking for safe adventures, or a group of explorers craving authentic cultural immersion, The Tea Country curates each journey with unmatched attention to detail and comfort. Discover the untouched beauty of Northeast India with us.
              </p>
              
              <button 
                style={buttonStyle} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#224e30'} // Darker green on hover
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2c6a3f'} // Back to Tea Country green
              >
                EXPLORE NORTHEAST
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;