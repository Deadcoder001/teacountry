import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: white;
`;

const EmbedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 30px;
  
  iframe {
    max-width: 100%;
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  
  @media (max-width: 520px) {
    iframe {
      width: 100% !important;
      height: auto !important;
      min-height: 300px;
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  
  &::after {
    content: "";
    width: 30px;
    height: 30px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4267B2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #c94141;
`;

const SectionTitle = styled.h3`
  color: #2c6a3f;
  margin: 2rem 0 1rem;
  text-align: center;
  font-size: 1.3rem;
`;

const ViewMoreLink = styled.div`
  text-align: center;
  margin: 20px 0;
  
  a {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4267B2;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #365899;
    }
  }
`;

const FacebookFeed = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadFacebookSDK = () => {
    try {
      // Create a Facebook root element if it doesn't exist
      if (!document.getElementById('fb-root')) {
        const fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';
        document.body.appendChild(fbRoot);
      }
      
      // Check if FB SDK is already loaded
      if (window.FB) {
        window.FB.XFBML.parse();
        setLoading(false);
        return;
      }
      
      // Add the Facebook SDK
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      
      script.onload = () => {
        if (window.FB) {
          setTimeout(() => {
            window.FB.XFBML.parse();
            setLoading(false);
          }, 1000); // Additional delay to ensure SDK is fully initialized
        } else {
          console.error("Facebook SDK loaded but FB object not available");
          setError("Could not initialize Facebook embeds");
        }
      };
      
      script.onerror = () => {
        console.error("Failed to load Facebook SDK");
        setError("Failed to load Facebook embeds");
      };
      
      document.body.appendChild(script);
    } catch (err) {
      console.error('Error loading Facebook SDK:', err);
      setError('Could not load Facebook embeds. Please try again later.');
    }
  };
  
  useEffect(() => {
    // Load the Facebook SDK with a delay to ensure component is mounted
    const timer = setTimeout(() => {
      loadFacebookSDK();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  
  return (
    <FeedContainer>
      {loading && <LoadingSpinner />}
      
      <SectionTitle>Updates from Facebook</SectionTitle>
      
      {/* First Facebook Post */}
      <EmbedContainer>
        <iframe 
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fteacountryindia%2Fposts%2F1141382264668230&show_text=true&width=500" 
          width="500" 
          height="590" 
          style={{ border: 'none', overflow: 'hidden' }} 
          scrolling="no" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Tea Country Facebook post 1"
          loading="lazy"
        ></iframe>
      </EmbedContainer>
      
      {/* Second Facebook Post */}
      <EmbedContainer>
        <iframe 
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fteacountryindia%2Fposts%2F1102537371886053&show_text=true&width=500" 
          width="500" 
          height="672" 
          style={{ border: 'none', overflow: 'hidden' }} 
          scrolling="no" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Tea Country Facebook post 2"
          loading="lazy"
        ></iframe>
      </EmbedContainer>
      
      {/* Third Facebook Post */}
      <EmbedContainer>
        <iframe 
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fteacountryindia%2Fposts%2F976722034467588&show_text=true&width=500" 
          width="500" 
          height="672" 
          style={{ border: 'none', overflow: 'hidden' }} 
          scrolling="no" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Tea Country Facebook post 3"
          loading="lazy"
        ></iframe>
      </EmbedContainer>
      
      {/* Fourth Facebook Post */}
      <EmbedContainer>
        <iframe 
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fteacountryindia%2Fposts%2F951150640358061&show_text=true&width=500" 
          width="500" 
          height="250" 
          style={{ border: 'none', overflow: 'hidden' }} 
          scrolling="no" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Tea Country Facebook post 4"
          loading="lazy"
        ></iframe>
      </EmbedContainer>
      
      {/* View more link */}
      <ViewMoreLink>
        <a 
          href="https://www.facebook.com/teacountryindia" 
          target="_blank" 
          rel="noreferrer"
        >
          Visit our Facebook Page
        </a>
      </ViewMoreLink>
    </FeedContainer>
  );
};

export default FacebookFeed;