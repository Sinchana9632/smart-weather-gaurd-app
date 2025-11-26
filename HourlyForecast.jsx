import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const HourlyForecastContainer = styled.div`
  overflow-x: auto;
  padding: 0.5rem 0;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primaryAccent};
    border-radius: 3px;
  }
`;

const HourlyList = styled.div`
  display: flex;
  gap: 1rem;
  min-width: fit-content;
`;

const HourItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.theme.background};
  border-radius: 12px;
  min-width: 80px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const HourTime = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const HourIcon = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const HourTemp = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
`;

// Map OpenWeatherMap icons to emojis
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

const HourlyForecast = ({ forecastData }) => {
  // Use real forecast data if available, otherwise fallback to mock data
  const hourlyData = forecastData?.list || [
    { dt: Date.now() / 1000, main: { temp: 72 }, weather: [{ icon: '☀️' }] },
    { dt: Date.now() / 1000 + 3600, main: { temp: 74 }, weather: [{ icon: '☀️' }] },
    { dt: Date.now() / 1000 + 7200, main: { temp: 73 }, weather: [{ icon: '⛅' }] },
    { dt: Date.now() / 1000 + 10800, main: { temp: 72 }, weather: [{ icon: '⛅' }] },
    { dt: Date.now() / 1000 + 14400, main: { temp: 70 }, weather: [{ icon: '☁️' }] },
    { dt: Date.now() / 1000 + 18000, main: { temp: 69 }, weather: [{ icon: '☁️' }] },
    { dt: Date.now() / 1000 + 21600, main: { temp: 68 }, weather: [{ icon: '🌧️' }] },
    { dt: Date.now() / 1000 + 25200, main: { temp: 67 }, weather: [{ icon: '🌧️' }] },
    { dt: Date.now() / 1000 + 28800, main: { temp: 66 }, weather: [{ icon: '🌧️' }] },
    { dt: Date.now() / 1000 + 32400, main: { temp: 65 }, weather: [{ icon: '🌧️' }] },
    { dt: Date.now() / 1000 + 36000, main: { temp: 64 }, weather: [{ icon: '🌧️' }] },
    { dt: Date.now() / 1000 + 39600, main: { temp: 63 }, weather: [{ icon: '🌧️' }] },
  ];

  return (
    <HourlyForecastContainer>
      <HourlyList>
        {hourlyData.slice(0, 12).map((hour, index) => {
          const date = new Date(hour.dt * 1000);
          const timeString = format(date, index === 0 ? "'Now'" : 'h a');
          const temp = Math.round(hour.main.temp);
          const icon = getWeatherIcon(hour.weather[0].icon);
          
          return (
            <HourItem key={index}>
              <HourTime>{timeString}</HourTime>
              <HourIcon>{icon}</HourIcon>
              <HourTemp>{temp}°</HourTemp>
            </HourItem>
          );
        })}
      </HourlyList>
    </HourlyForecastContainer>
  );
};

export default HourlyForecast;