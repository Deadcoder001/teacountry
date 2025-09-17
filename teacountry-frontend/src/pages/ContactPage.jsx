import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaWhatsapp, FaClock } from 'react-icons/fa';
import teaLandscape from '../assets/images/Untitled-design-4-1.png';

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
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.form)`
  background-color: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h2`
  color: #2c6a3f;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #2c6a3f;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #2c6a3f;
  }
`;

const FormSubmit = styled.button`
  background-color: #2c6a3f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #1e4e2c;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled(motion.div)`
  background-color: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const InfoTitle = styled.h2`
  color: #2c6a3f;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const InfoIcon = styled.div`
  color: #2c6a3f;
  font-size: 1.5rem;
  margin-right: 1rem;
  margin-top: 0.25rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const InfoText = styled.p`
  margin: 0;
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
`;

const MapContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  height: 450px;
  margin-top: 4rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    height: 350px;
    margin-top: 3rem;
  }
`;

const Map = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: #2c6a3f;
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
  transition: transform 0.3s, background-color 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    background-color: #1e4e2c;
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled(motion.div)`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: null
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('Name', formData.name);
      formData.append('Email', formData.email);
      formData.append('Phone', formData.phone || 'Not provided');
      formData.append('Subject', formData.subject);
      formData.append('Message', formData.message);
      
      // Send form data using FormSubmit.co
      await fetch('https://formsubmit.co/sajid@teacountry.in', {
        method: 'POST',
        body: formData,
      });
      
      setFormStatus({
        submitted: true,
        success: true,
        error: null
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        error: "There was an error submitting your form. Please try again later."
      });
    }
    
    setLoading(false);
  };
  
  return (
    <PageContainer>
      <Hero>
        <HeroContent>
          <HeroTitle>Contact Us</HeroTitle>
          <HeroSubtitle>
            Get in touch with our team to plan your next adventure in Northeast India
          </HeroSubtitle>
        </HeroContent>
      </Hero>
      
      <ContentSection>
        <ContactGrid>
          <ContactForm 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormTitle>Send us a message</FormTitle>
            
            {formStatus.submitted && formStatus.success && (
              <SuccessMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                Thank you for your message! We'll get back to you as soon as possible.
              </SuccessMessage>
            )}
            
            {formStatus.submitted && !formStatus.success && (
              <ErrorMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                {formStatus.error}
              </ErrorMessage>
            )}
            
            <FormGroup>
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <FormInput 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <FormInput 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormInput 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="message">Your Message</FormLabel>
              <FormTextarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormSubmit type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </FormSubmit>
          </ContactForm>
          
          <ContactInfo
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoTitle>Contact Information</InfoTitle>
            
            <InfoItem>
              <InfoIcon>
                <FaPhone />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Phone</InfoLabel>
                <InfoText>+91 98541 33713</InfoText>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <FaEnvelope />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoText>sajid@teacountry.in</InfoText>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <FaMapMarkerAlt />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Registered Office (Shillong)</InfoLabel>
                <InfoText>
                  Lower Lumparing, Laban<br />
                  Shillong : 793004<br />
                  Meghalaya, India
                </InfoText>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <FaClock />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Business Hours</InfoLabel>
                <InfoText>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </InfoText>
              </InfoContent>
            </InfoItem>
            
            <SocialLinks>
              <SocialLink href="https://instagram.com/teacountry" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="https://facebook.com/teacountry" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="https://wa.me/919854133713" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
        </ContactGrid>
        
        <MapContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Map 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57182.58098329236!2d91.84835610556443!3d25.57927252492729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37507e8f34e953e9%3A0xc1ebb178b70022f2!2sLaban%2C%20Shillong%2C%20Meghalaya!5e0!3m2!1sen!2sin!4v1695048023977!5m2!1sen!2sin" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </MapContainer>
      </ContentSection>
    </PageContainer>
  );
};

export default ContactPage;