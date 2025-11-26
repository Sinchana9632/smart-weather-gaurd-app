import React from 'react';
import styled from 'styled-components';

const WeatherCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Temperature = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.primaryAccent};
  margin: 1rem 0;
`;

const WeatherIcon = styled.div`
  font-size: 4rem;
  margin: 1rem 0;
`;

const WeatherDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  margin: 0.5rem 0;
`;

const FeelsLike = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  margin: 0.5rem 0;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
`;

const DetailValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
`;

const WeatherCard = ({ location, weatherData }) => {
  // Use real weather data if available, otherwise fallback to mock data
  const data = weatherData || {
    name: 'New York',
    main: {
      temp: 72,
      feels_like: 74,
      humidity: 65,
      pressure: 30.15
    },
    weather: [
      {
        main: 'Partly Cloudy',
        description: 'partly cloudy',
        icon: '⛅'
      }
    ],
    wind: {
      speed: 8
    },
    visibility: 10
  };

  // Extract weather information
  const temperature = Math.round(data.main?.temp || data.temperature || 72);
  const feelsLike = Math.round(data.main?.feels_like || data.feelsLike || 74);
  const condition = data.weather?.[0]?.main || data.condition || 'Partly Cloudy';
  const icon = data.weather?.[0]?.icon || data.icon || '⛅';
  const humidity = data.main?.humidity || data.humidity || 65;
  const wind = data.wind?.speed || data.wind || 8;
  const pressure = data.main?.pressure || data.pressure || 30.15;
  const visibility = data.visibility ? data.visibility / 1000 : data.visibility || 10; // Convert to km/mi

  // Map OpenWeatherMap icons to emojis (in a real app, you'd use actual weather icons)
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '⛅',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌦️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '❓';
  };

  return (
    <WeatherCardContainer>
      <h3>{location || data.name}</h3>
      <WeatherIcon>{getWeatherIcon(icon) || icon}</WeatherIcon>
      <Temperature>{temperature}°F</Temperature>
      <WeatherDescription>{condition}</WeatherDescription>
      <FeelsLike>Feels like {feelsLike}°F</FeelsLike>
      
      <DetailsGrid>
        <DetailItem>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{humidity}%</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Wind</DetailLabel>
          <DetailValue>{wind} mph</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Pressure</DetailLabel>
          <DetailValue>{pressure} in</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>Visibility</DetailLabel>
          <DetailValue>{visibility} mi</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>UV Index</DetailLabel>
          <DetailValue>5</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>AQI</DetailLabel>
          <DetailValue>42</DetailValue>
        </DetailItem>
      </DetailsGrid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;