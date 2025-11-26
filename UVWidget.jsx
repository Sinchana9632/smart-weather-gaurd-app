import React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const UVBarContainer = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${props => props.theme.background};
  border-radius: 15px;
  margin: 1.5rem 0;
  overflow: hidden;
  position: relative;
`;

const UVBar = styled.div`
  height: 100%;
  width: ${props => Math.min(props.uvIndex * 10, 100)}%;
  background: linear-gradient(90deg, #50E3C2, #FFD700, #FF6B6B);
  border-radius: 15px;
`;

const UVValue = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 700;
  color: ${props => props.theme.textPrimary};
`;

const UVLevel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.uvIndex > 7 ? props.theme.alert : props.theme.primaryAccent};
  margin: 0.5rem 0;
`;

const SafetyTip = styled.div`
  background-color: ${props => props.theme.tooltipBackground};
  border-left: 4px solid ${props => props.theme.primaryAccent};
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  margin-top: 1.5rem;
  text-align: left;
`;

const TipTitle = styled.h4`
  margin-top: 0;
  color: ${props => props.theme.primaryAccent};
`;

const getUVLevel = (uvIndex) => {
  if (uvIndex <= 2) return { level: 'Low', tip: 'No protection needed. You can safely stay outside.' };
  if (uvIndex <= 5) return { level: 'Moderate', tip: 'Take precautions, such as covering up and applying sunscreen, if you will be outside.' };
  if (uvIndex <= 7) return { level: 'High', tip: 'Protection needed. Seek shade during midday hours, wear a hat and sunglasses, and apply sunscreen.' };
  if (uvIndex <= 10) return { level: 'Very High', tip: 'Extra protection needed. Unprotected skin can burn in minutes. Avoid being outside during midday hours.' };
  return { level: 'Extreme', tip: 'Extra protection needed. Take all precautions, including wearing a hat, sunglasses, and shirt, and applying sunscreen.' };
};

const UVWidget = ({ uvIndex }) => {
  // Use real UV index data if available, otherwise fallback to mock data
  const uvData = uvIndex?.value !== undefined 
    ? uvIndex 
    : { value: 5 };

  const { level, tip } = getUVLevel(uvData.value);

  return (
    <WidgetContainer>
      <h3>UV Index</h3>
      <UVBarContainer>
        <UVBar uvIndex={uvData.value} />
        <UVValue>{uvData.value}</UVValue>
      </UVBarContainer>
      <UVLevel uvIndex={uvData.value}>{level}</UVLevel>
      <SafetyTip>
        <TipTitle>Safety Tip</TipTitle>
        <p>{tip}</p>
      </SafetyTip>
    </WidgetContainer>
  );
};

export default UVWidget;