import React from 'react';
import styled from 'styled-components';
import WeatherCard from './WeatherCard';
import HourlyForecast from './HourlyForecast';
import DailyCalendar from './DailyCalendar';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
`;

const Panel = styled.div`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PanelTitle = styled.h2`
  color: ${props => props.theme.primaryAccent};
  margin-top: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.textSecondary};
`;

const Dashboard = ({ location, weatherData, hourlyForecast, dailyForecast }) => {
  return (
    <DashboardContainer>
      <Panel>
        <PanelTitle>Current Weather</PanelTitle>
        <WeatherCard location={location} weatherData={weatherData} />
      </Panel>
      
      <Panel>
        <PanelTitle>Hourly Forecast</PanelTitle>
        <HourlyForecast forecastData={hourlyForecast} />
      </Panel>
      
      <Panel>
        <PanelTitle>Daily Forecast</PanelTitle>
        <DailyCalendar forecastData={dailyForecast} />
      </Panel>
    </DashboardContainer>
  );
};

export default Dashboard;