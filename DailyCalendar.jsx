import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }
`;

const DayItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  background-color: ${props => props.theme.background};
  border-radius: 12px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    background-color: ${props => props.theme.primaryAccent};
    color: white;
    
    div {
      color: white;
    }
  }
`;

const DayName = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const DayDate = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const DayIcon = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const TempRange = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
`;

const HighTemp = styled.span`
  color: ${props => props.theme.textPrimary};
`;

const LowTemp = styled.span`
  color: ${props => props.theme.textSecondary};
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

const DailyCalendar = ({ forecastData }) => {
  // Use real forecast data if available, otherwise fallback to mock data
  const dailyData = forecastData?.list || [
    { dt: Date.now() / 1000, temp: { min: 62, max: 74 }, weather: [{ icon: '☀️' }] },
    { dt: Date.now() / 1000 + 86400, temp: { min: 60, max: 72 }, weather: [{ icon: '⛅' }] },
    { dt: Date.now() / 1000 + 172800, temp: { min: 58, max: 68 }, weather: [{ icon: '🌧️' }] },
    { dt: Date.now() / 1000 + 259200, temp: { min: 56, max: 66 }, weather: [{ icon: '🌧️' }] },
    { dt: Date.now() / 1000 + 345600, temp: { min: 57, max: 69 }, weather: [{ icon: '☁️' }] },
    { dt: Date.now() / 1000 + 432000, temp: { min: 59, max: 71 }, weather: [{ icon: '⛅' }] },
    { dt: Date.now() / 1000 + 518400, temp: { min: 61, max: 73 }, weather: [{ icon: '☀️' }] },
  ];

  return (
    <CalendarContainer>
      {dailyData.slice(0, 7).map((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayName = format(date, 'EEE');
        const dayDate = format(date, 'MMM d');
        const high = Math.round(day.temp.max);
        const low = Math.round(day.temp.min);
        const icon = getWeatherIcon(day.weather[0].icon);
        
        return (
          <DayItem key={index}>
            <DayName>{index === 0 ? 'Today' : dayName}</DayName>
            <DayDate>{dayDate}</DayDate>
            <DayIcon>{icon}</DayIcon>
            <TempRange>
              <HighTemp>{high}°</HighTemp>
              <LowTemp>{low}°</LowTemp>
            </TempRange>
          </DayItem>
        );
      })}
    </CalendarContainer>
  );
};

export default DailyCalendar;