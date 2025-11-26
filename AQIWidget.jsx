import React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AQICircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #50E3C2 0% 25%,
    #4A90E2 25% 50%,
    #FFD700 50% 75%,
    #FF6B6B 75% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const AQIValue = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${props => props.theme.cardBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const AQILabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  margin-top: 0.5rem;
`;

const SafetyTip = styled.div`
  background-color: ${props => props.theme.tooltipBackground};
  border-left: 4px solid ${props => props.theme.secondaryAccent};
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  margin-top: 1.5rem;
  text-align: left;
`;

const TipTitle = styled.h4`
  margin-top: 0;
  color: ${props => props.theme.primaryAccent};
`;

const getAQILevel = (aqi) => {
  if (aqi <= 50) return { level: 'Good', tip: 'Air quality is satisfactory, and air pollution poses little or no risk.' };
  if (aqi <= 100) return { level: 'Moderate', tip: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people.' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', tip: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' };
  if (aqi <= 200) return { level: 'Unhealthy', tip: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' };
  if (aqi <= 300) return { level: 'Very Unhealthy', tip: 'Health alert: everyone may experience more serious health effects.' };
  return { level: 'Hazardous', tip: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' };
};

const AQIWidget = ({ airQuality }) => {
  // Use real air quality data if available, otherwise fallback to mock data
  const aqiData = airQuality?.list?.[0]?.main?.aqi !== undefined 
    ? airQuality.list[0].main 
    : { aqi: 2 };

  const { level, tip } = getAQILevel(aqiData.aqi * 50); // Convert AQI level (1-5) to actual AQI value

  return (
    <WidgetContainer>
      <h3>Air Quality Index</h3>
      <AQICircle>
        <AQIValue>{aqiData.aqi * 50}</AQIValue>
      </AQICircle>
      <AQILabel>{level}</AQILabel>
      <SafetyTip>
        <TipTitle>Safety Tip</TipTitle>
        <p>{tip}</p>
      </SafetyTip>
    </WidgetContainer>
  );
};

export default AQIWidget;