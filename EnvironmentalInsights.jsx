import React from 'react';
import styled from 'styled-components';
import AQIWidget from './AQIWidget';
import UVWidget from './UVWidget';
import ClimateSummary from './ClimateSummary';

const InsightsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1.5rem 1.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem 1rem;
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

const EnvironmentalInsights = ({ uvIndex, airQuality }) => {
  return (
    <InsightsContainer>
      <Panel>
        <PanelTitle>Air Quality</PanelTitle>
        <AQIWidget airQuality={airQuality} />
      </Panel>
      
      <Panel>
        <PanelTitle>UV Index</PanelTitle>
        <UVWidget uvIndex={uvIndex} />
      </Panel>
      
      <Panel>
        <PanelTitle>Climate Summary</PanelTitle>
        <ClimateSummary />
      </Panel>
    </InsightsContainer>
  );
};

export default EnvironmentalInsights;