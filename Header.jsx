import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import CitySearch from './CitySearch';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.cardBackground};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    align-items: stretch;
  }
`;

const Logo = styled.h1`
  color: ${props => props.theme.primaryAccent};
  font-size: 1.8rem;
  margin: 0;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const DateTimeDisplay = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  text-align: center;
  
  @media (max-width: 768px) {
    order: -1;
  }
`;

const ThemeToggle = styled.button`
  background-color: ${props => props.theme.primaryAccent};
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Header = ({ location, onLocationChange, onToggleTheme, themeMode, onCitySelect }) => {
  const [currentLocation, setCurrentLocation] = useState(location);
  
  const handleCitySelect = (city) => {
    const locationString = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`;
    setCurrentLocation(locationString);
    onLocationChange(locationString);
    
    // Pass the city data to the parent component
    if (onCitySelect) {
      onCitySelect(city);
    }
  };
  
  const now = new Date();
  const dateTimeString = format(now, "EEEE, MMMM d, yyyy 'at' h:mm a");

  return (
    <HeaderContainer>
      <Logo>Smart Weather Guard</Logo>
      <DateTimeDisplay>{dateTimeString}</DateTimeDisplay>
      <Controls>
        <CitySearch 
          onCitySelect={handleCitySelect} 
          currentCity={currentLocation} 
        />
        <ThemeToggle onClick={onToggleTheme}>
          {themeMode === 'light' ? '🌙' : '☀️'}
        </ThemeToggle>
      </Controls>
    </HeaderContainer>
  );
};

export default Header;