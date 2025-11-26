import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getCurrentWeather } from '../services/weatherService';
import Header from './Header';

// Animations
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

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const PlanContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.primaryAccent};
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  animation: ${slideUp} 0.6s ease-out;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.primaryAccent};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const WeatherCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.tooltipBackground}, ${props => props.theme.background});
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const CityName = styled.h3`
  color: ${props => props.theme.primaryAccent};
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const WeatherCondition = styled.p`
  margin: 0.25rem 0;
  color: ${props => props.theme.textPrimary};
  font-size: 1.1rem;
`;

const WeatherDetail = styled.p`
  margin: 0.25rem 0;
  color: ${props => props.theme.textSecondary};
  font-size: 0.95rem;
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityCard = styled.div`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ActivityIcon = styled.span`
  font-size: 2rem;
  text-align: center;
`;

const ActivityTitle = styled.h3`
  color: ${props => props.theme.textPrimary};
  margin: 0;
  text-align: center;
  font-size: 1.1rem;
`;

const ActivityDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  margin: 0;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const TimeSlotSelector = styled.div`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const TimeSlotOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TimeSlotButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.selected ? props.theme.primaryAccent : props.theme.background};
  color: ${props => props.selected ? 'white' : props.theme.textPrimary};
  font-weight: ${props => props.selected ? '600' : '400'};
  border: 2px solid ${props => props.selected ? props.theme.primaryAccent : props.theme.background};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryAccent};
    color: white;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MoodSection = styled.div`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const MoodOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MoodButton = styled.button`
  flex: 1;
  min-width: 200px;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.selected ? props.theme.primaryAccent : props.theme.background};
  color: ${props => props.selected ? 'white' : props.theme.textPrimary};
  font-weight: ${props => props.selected ? '600' : '400'};
  border: 2px solid ${props => props.selected ? props.theme.primaryAccent : props.theme.background};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.primaryAccent};
    color: white;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  background-color: ${props => props.theme.primaryAccent};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  margin-top: 1rem;
  animation: ${fadeIn} 0.8s ease-out;
  
  &:hover {
    background-color: #3a7bc8;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.textPrimary};
  border: 1px solid ${props => props.theme.textSecondary};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.textSecondary};
    color: white;
  }
`;

// Helper function to get activity suggestions based on weather
const getActivitySuggestions = (weatherData) => {
  if (!weatherData) return [];
  
  const { main, weather, wind } = weatherData;
  const activities = [];
  
  // Temperature-based activities
  if (main.temp > 30) {
    activities.push({
      icon: '🏖️',
      title: 'Beach Day',
      description: 'Perfect weather for a beach visit. Stay hydrated!'
    });
    activities.push({
      icon: '🏊',
      title: 'Swimming',
      description: 'Cool off in the pool or ocean'
    });
  } else if (main.temp > 20 && main.temp <= 30) {
    activities.push({
      icon: '🚶',
      title: 'Outdoor Walk',
      description: 'Ideal temperature for a refreshing walk'
    });
    activities.push({
      icon: '🚴',
      title: 'Cycling',
      description: 'Great conditions for a bike ride'
    });
  } else if (main.temp > 10 && main.temp <= 20) {
    activities.push({
      icon: '🍂',
      title: 'Nature Hike',
      description: 'Perfect autumn weather for a scenic hike'
    });
    activities.push({
      icon: '☕',
      title: 'Coffee Shop Visit',
      description: 'Enjoy a warm drink in comfortable weather'
    });
  } else {
    activities.push({
      icon: '🏠',
      title: 'Indoor Activities',
      description: 'Cozy day for indoor hobbies and relaxation'
    });
    activities.push({
      icon: '🍲',
      title: 'Cooking',
      description: 'Try a new recipe while staying warm indoors'
    });
  }
  
  // Weather condition-based activities
  if (weather[0].main === 'Rain') {
    activities.push({
      icon: '📚',
      title: 'Reading Day',
      description: 'Perfect weather for curling up with a good book'
    });
    activities.push({
      icon: '🎬',
      title: 'Movie Marathon',
      description: 'Enjoy indoor entertainment on a rainy day'
    });
  } else if (weather[0].main === 'Clear') {
    activities.push({
      icon: '📸',
      title: 'Photography',
      description: 'Clear skies create perfect conditions for photography'
    });
    activities.push({
      icon: '🌤️',
      title: 'Garden Time',
      description: 'Spend time outdoors in the pleasant weather'
    });
  } else if (weather[0].main === 'Clouds') {
    activities.push({
      icon: '🎨',
      title: 'Creative Work',
      description: 'Soft lighting is ideal for artistic activities'
    });
    activities.push({
      icon: '🧘',
      title: 'Meditation',
      description: 'Calm cloudy weather is perfect for mindfulness'
    });
  }
  
  // Wind-based activities
  if (wind.speed > 7) {
    activities.push({
      icon: '🪁',
      title: 'Kite Flying',
      description: 'Windy conditions are perfect for flying kites'
    });
  } else if (wind.speed < 3) {
    activities.push({
      icon: '🎈',
      title: 'Balloon Fun',
      description: 'Calm winds make balloon activities enjoyable'
    });
  }
  
  // Humidity-based activities
  if (main.humidity > 80) {
    activities.push({
      icon: '💧',
      title: 'Hydration Focus',
      description: 'High humidity - focus on staying hydrated'
    });
  }
  
  return activities.slice(0, 4); // Return only the first 4 activities
};

const PlanMyDay = ({ location, coordinates, themeMode, onToggleTheme }) => {
  const navigate = useNavigate();
  const [cityWeather, setCityWeather] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('afternoon');
  const [selectedMood, setSelectedMood] = useState('');
  
  // Fetch city weather data
  useEffect(() => {
    const fetchCityWeather = async () => {
      if (coordinates && coordinates.lat && coordinates.lon) {
        try {
          const weather = await getCurrentWeather(coordinates.lat, coordinates.lon);
          setCityWeather(weather);
        } catch (error) {
          console.error('Error fetching city weather:', error);
        }
      }
    };
    
    fetchCityWeather();
  }, [coordinates]);
  
  const activitySuggestions = getActivitySuggestions(cityWeather);
  
  const handleSavePlan = () => {
    alert('Plan saved! In a full implementation, this would save to your calendar or journal.');
  };
  
  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <PlanContainer>
      <Header 
        location={location} 
        onToggleTheme={onToggleTheme} 
        themeMode={themeMode}
      />
      
      <ContentWrapper>
        <BackButton onClick={handleBack}>
          ← Back to Dashboard
        </BackButton>
        
        <PageTitle>Plan My Day</PageTitle>
        
        <Section>
          <SectionTitle>Current Weather</SectionTitle>
          <WeatherCard>
            <CityName>{location.split(',')[0] || 'Current Location'}</CityName>
            {cityWeather ? (
              <>
                <WeatherCondition>
                  {cityWeather.weather[0].description.charAt(0).toUpperCase() + 
                   cityWeather.weather[0].description.slice(1)} • {Math.round(cityWeather.main.temp)}°F
                </WeatherCondition>
                <WeatherDetail>Feels like {Math.round(cityWeather.main.feels_like)}°F</WeatherDetail>
                <WeatherDetail>Humidity: {cityWeather.main.humidity}%</WeatherDetail>
                <WeatherDetail>Wind: {cityWeather.wind.speed} mph</WeatherDetail>
              </>
            ) : (
              <WeatherCondition>Loading weather information...</WeatherCondition>
            )}
          </WeatherCard>
        </Section>
        
        <Section>
          <SectionTitle>Activity Suggestions</SectionTitle>
          <ActivityGrid>
            {activitySuggestions.length > 0 ? (
              activitySuggestions.map((activity, index) => (
                <ActivityCard key={index} delay={`${index * 0.1}s`}>
                  <ActivityIcon>{activity.icon}</ActivityIcon>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityDescription>{activity.description}</ActivityDescription>
                </ActivityCard>
              ))
            ) : (
              <ActivityCard>
                <ActivityIcon>💡</ActivityIcon>
                <ActivityTitle>Personalized Suggestions</ActivityTitle>
                <ActivityDescription>Activity suggestions based on your current weather will appear here</ActivityDescription>
              </ActivityCard>
            )}
          </ActivityGrid>
        </Section>
        
        <Section>
          <SectionTitle>Preferred Time Slot</SectionTitle>
          <TimeSlotSelector>
            <TimeSlotOptions>
              <TimeSlotButton 
                selected={selectedTimeSlot === 'morning'} 
                onClick={() => setSelectedTimeSlot('morning')}
              >
                Morning
              </TimeSlotButton>
              <TimeSlotButton 
                selected={selectedTimeSlot === 'afternoon'} 
                onClick={() => setSelectedTimeSlot('afternoon')}
              >
                Afternoon
              </TimeSlotButton>
              <TimeSlotButton 
                selected={selectedTimeSlot === 'evening'} 
                onClick={() => setSelectedTimeSlot('evening')}
              >
                Evening
              </TimeSlotButton>
            </TimeSlotOptions>
          </TimeSlotSelector>
        </Section>
        
        <Section>
          <SectionTitle>How Are You Feeling?</SectionTitle>
          <MoodSection>
            <MoodOptions>
              <MoodButton 
                selected={selectedMood === 'energetic'} 
                onClick={() => setSelectedMood('energetic')}
              >
                ⚡ Feeling Energetic
              </MoodButton>
              <MoodButton 
                selected={selectedMood === 'relaxed'} 
                onClick={() => setSelectedMood('relaxed')}
              >
                😌 Feeling Relaxed
              </MoodButton>
              <MoodButton 
                selected={selectedMood === 'adventurous'} 
                onClick={() => setSelectedMood('adventurous')}
              >
                🏞️ Feeling Adventurous
              </MoodButton>
              <MoodButton 
                selected={selectedMood === 'creative'} 
                onClick={() => setSelectedMood('creative')}
              >
                🎨 Feeling Creative
              </MoodButton>
            </MoodOptions>
          </MoodSection>
        </Section>
        
        <ActionButton onClick={handleSavePlan}>
          Save My Plan
        </ActionButton>
      </ContentWrapper>
    </PlanContainer>
  );
};

export default PlanMyDay;