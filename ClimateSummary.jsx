import React from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  background-color: ${props => props.theme.background};
  border-radius: 12px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const ItemLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.textPrimary};
`;

const ItemValue = styled.span`
  font-weight: 600;
  color: ${props => props.theme.primaryAccent};
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const ClimateSummary = () => {
  // Mock data for demonstration
  const climateData = [
    { label: 'Hottest Month', value: 'July (88°F)', icon: '🌡️' },
    { label: 'Coldest Month', value: 'January (32°F)', icon: '🧊' },
    { label: 'Wettest Month', value: 'April (4.2")', icon: '🌧️' },
    { label: 'Windiest Month', value: 'February (12 mph)', icon: '💨' },
  ];

  return (
    <SummaryContainer>
      {climateData.map((item, index) => (
        <SummaryItem key={index}>
          <ItemLabel>
            <Icon>{item.icon}</Icon>
            {item.label}
          </ItemLabel>
          <ItemValue>{item.value}</ItemValue>
        </SummaryItem>
      ))}
    </SummaryContainer>
  );
};

export default ClimateSummary;