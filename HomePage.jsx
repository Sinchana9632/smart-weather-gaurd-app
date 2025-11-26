import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { lightTheme, darkTheme } from '../theme';

const HomePageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, ${props => props.theme.primaryAccent} 0%, ${props => props.theme.secondaryAccent} 100%);
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;
`;

const AppName = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const GetStartedButton = styled.button`
  background-color: white;
  color: ${props => props.theme.primaryAccent};
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.primaryAccent};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.primaryAccent};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.textPrimary};
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
`;

const EmotionalSupportSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background-color: ${props => props.theme.cardBackground};
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SupportMessage = styled.p`
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.3rem;
  color: ${props => props.theme.textPrimary};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Quote = styled.blockquote`
  max-width: 700px;
  margin: 0 auto;
  font-style: italic;
  color: ${props => props.theme.textSecondary};
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-left: 4px solid ${props => props.theme.primaryAccent};
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
  }
`;

const PreviewSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const PreviewContainer = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.background} 0%, ${props => props.theme.cardBackground} 100%);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const PreviewTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.primaryAccent};

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const WeatherIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const WeatherIcon = styled.div`
  font-size: 3rem;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: ${props => props.delay};
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ExploreButton = styled.button`
  background-color: ${props => props.theme.primaryAccent};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${props => props.theme.secondaryAccent};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FooterSection = styled.footer`
  background-color: ${props => props.theme.cardBackground};
  padding: 3rem 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.primaryAccent};
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const CalmingMessage = styled.p`
  color: ${props => props.theme.textSecondary};
  font-style: italic;
  margin-top: 1rem;
  font-size: 1rem;
`;

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleExploreFeatures = () => {
    navigate('/dashboard');
  };

  const handlePlanDaySession = () => {
    navigate('/plan-my-day');
  };

  return (
    <HomePageContainer>
      <HeroSection>
        <HeroContent>
          <AppName>Smart Weather Guard</AppName>
          <Tagline>Your calm companion for climate clarity</Tagline>
          <GetStartedButton onClick={handleGetStarted}>
            Get Started
          </GetStartedButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Key Features</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🌤️</FeatureIcon>
            <FeatureTitle>Weather Condition</FeatureTitle>
            <FeatureDescription>
              Current weather condition with detailed metrics like temperature, humidity, and wind speed.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📅</FeatureIcon>
            <FeatureTitle>Forecasts</FeatureTitle>
            <FeatureDescription>
              Hourly and daily forecasts to help you plan your activities with confidence.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🌱</FeatureIcon>
            <FeatureTitle>Environmental Insights</FeatureTitle>
            <FeatureDescription>
              Air quality index, UV levels, and moon phase information for a complete environmental picture.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard onClick={handlePlanDaySession} style={{ cursor: 'pointer' }}>
            <FeatureIcon>🗺️</FeatureIcon>
            <FeatureTitle>Day plan Session</FeatureTitle>
            <FeatureDescription>
              Get personalized activity suggestions based on today's weather. Plan your day with confidence and clarity.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <EmotionalSupportSection>
        <SupportMessage>
          We help you plan your day with clarity and care, providing not just weather data but emotional support for your well-being.
        </SupportMessage>
        <Quote>
          "The best way to predict the future is to create it. Take care of your weather today."
        </Quote>
      </EmotionalSupportSection>

      <PreviewSection>
        <PreviewTitle>Experience Our Dashboard</PreviewTitle>
        <PreviewContainer>
          <WeatherIcons>
            <WeatherIcon delay="0.1s">☀️</WeatherIcon>
            <WeatherIcon delay="0.3s">⛅</WeatherIcon>
            <WeatherIcon delay="0.5s">🌧️</WeatherIcon>
            <WeatherIcon delay="0.7s">❄️</WeatherIcon>
          </WeatherIcons>
          <p>Interactive weather dashboard with all the information you need at a glance.</p>
          <ExploreButton onClick={handleExploreFeatures}>
            Explore Features
          </ExploreButton>
        </PreviewContainer>
      </PreviewSection>

      <FooterSection>
        <FooterLinks>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
        <CalmingMessage>
          Stay calm, stay informed, stay prepared.
        </CalmingMessage>
        <Copyright>
          © {new Date().getFullYear()} Smart Weather Guard. All rights reserved.
        </Copyright>
      </FooterSection>
    </HomePageContainer>
  );
};

export default HomePage;