import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getCurrentWeather } from '../services/weatherService';

const SessionContainer = styled.div`
  padding: 0 1.5rem 1.5rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 1rem 1rem;
  }
`;

const SessionPanel = styled.div`
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

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SessionTitle = styled.h2`
  color: ${props => props.theme.primaryAccent};
  margin: 0;
`;

const WeatherSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SummaryCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.tooltipBackground}, ${props => props.theme.background});
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

const SuggestionsSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SuggestionsTitle = styled.h3`
  color: ${props => props.theme.primaryAccent};
  margin-top: 0;
  margin-bottom: 1rem;
`;

const SuggestionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SuggestionItem = styled.li`
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background-color: ${props => props.theme.background};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SuggestionIcon = styled.span`
  font-size: 1.2rem;
`;

const SuggestionText = styled.span`
  color: ${props => props.theme.textPrimary};
`;

const MotivationalMessage = styled.div`
  background: linear-gradient(135deg, #4A90E2, #50E3C2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.5;
`;

const AuthorText = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  font-style: italic;
  opacity: 0.9;
`;

const StartSessionButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.theme.primaryAccent};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  
  &:hover {
    background-color: #3a7bc8;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Helper function to get weather-based suggestions
const getWeatherSuggestions = (weatherData) => {
  if (!weatherData) return [];
  
  const { main, weather, wind } = weatherData;
  const suggestions = [];
  
  // Temperature-based suggestions
  if (main.temp > 30) {
    suggestions.push({
      icon: '🌡️',
      text: 'Stay hydrated and seek shade during peak sun hours'
    });
    suggestions.push({
      icon: '🧴',
      text: 'Apply sunscreen regularly to protect your skin'
    });
  } else if (main.temp < 10) {
    suggestions.push({
      icon: '🧣',
      text: 'Dress warmly and protect extremities from cold'
    });
    suggestions.push({
      icon: '☕',
      text: 'Enjoy warm beverages to stay comfortable'
    });
  }
  
  // Weather condition-based suggestions
  if (weather[0].main === 'Rain') {
    suggestions.push({
      icon: '☔',
      text: 'Carry an umbrella and wear waterproof footwear'
    });
    suggestions.push({
      icon: '🏠',
      text: 'Consider indoor activities today'
    });
  } else if (weather[0].main === 'Clear') {
    suggestions.push({
      icon: '🚶',
      text: 'Great day for a walk or outdoor exercise'
    });
    suggestions.push({
      icon: '📸',
      text: 'Perfect weather for photography or outdoor hobbies'
    });
  } else if (weather[0].main === 'Clouds') {
    suggestions.push({
      icon: '📚',
      text: 'Ideal conditions for reading or creative work'
    });
    suggestions.push({
      icon: '🌤️',
      text: 'Comfortable weather for light outdoor activities'
    });
  }
  
  // Wind-based suggestions
  if (wind.speed > 7) {
    suggestions.push({
      icon: '💨',
      text: 'Windy conditions - secure loose outdoor items'
    });
  }
  
  // Humidity-based suggestions
  if (main.humidity > 80) {
    suggestions.push({
      icon: '💧',
      text: 'High humidity - stay hydrated and take breaks'
    });
  }
  
  return suggestions;
};

// Motivational messages based on weather
const getMotivationalMessage = (weatherData) => {
  if (!weatherData) {
    return {
      text: "Every day brings new possibilities. Plan with purpose and embrace the journey ahead.",
      author: "Smart Weather Guard"
    };
  }
  
  const { main, weather } = weatherData;
  const messages = [
    {
      condition: () => weather[0].main === 'Clear' && main.temp > 20,
      text: "Clear skies and pleasant temperatures create perfect opportunities. Step outside and make the most of today!",
      author: "Weather Wisdom"
    },
    {
      condition: () => weather[0].main === 'Rain',
      text: "Rain brings renewal and growth. Embrace the rhythm of nature and find joy in the moment.",
      author: "Nature's Insight"
    },
    {
      condition: () => main.temp < 10,
      text: "Cold weather brings cozy moments and warm connections. Bundle up and cherish the simple pleasures.",
      author: "Seasonal Comfort"
    },
    {
      condition: () => main.humidity > 80,
      text: "Humid days remind us to slow down and appreciate the subtleties of life. Breathe deeply and stay present.",
      author: "Mindful Living"
    },
    {
      condition: () => weather[0].main === 'Clouds',
      text: "Cloudy days offer a gentle canvas for reflection and creativity. Find beauty in the soft light around you.",
      author: "Creative Spirit"
    },
    {
      condition: () => true, // Default message
      text: "Every weather condition brings its own unique gifts. Embrace today's atmosphere and make it meaningful.",
      author: "Daily Inspiration"
    }
  ];
  
  return messages.find(msg => msg.condition()) || messages[messages.length - 1];
};

const WeatherPlanningSession = ({ coordinates, location }) => {
  const navigate = useNavigate();
  const [cityWeather, setCityWeather] = useState(null);
  
  // Fetch city weather data when coordinates change
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
  
  const suggestions = getWeatherSuggestions(cityWeather);
  const motivationalMessage = getMotivationalMessage(cityWeather);
  
  const handleStartSession = () => {
    // Navigate to the Plan My Day page
    navigate('/plan-my-day');
  };

  return (
    <SessionContainer>
      <SessionPanel>
        <SessionHeader>
          <SessionTitle>Your Daily Weather Companion</SessionTitle>
        </SessionHeader>
        
        <WeatherSummary>
          <SummaryCard>
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
          </SummaryCard>
        </WeatherSummary>
        
        <SuggestionsSection>
          <SuggestionsTitle>Personalized Suggestions</SuggestionsTitle>
          <SuggestionList>
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <SuggestionItem key={index}>
                  <SuggestionIcon>{suggestion.icon}</SuggestionIcon>
                  <SuggestionText>{suggestion.text}</SuggestionText>
                </SuggestionItem>
              ))
            ) : (
              <SuggestionItem>
                <SuggestionIcon>💡</SuggestionIcon>
                <SuggestionText>Check back later for personalized weather suggestions</SuggestionText>
              </SuggestionItem>
            )}
          </SuggestionList>
        </SuggestionsSection>
        
        <MotivationalMessage>
          <MessageText>"{motivationalMessage.text}"</MessageText>
          <AuthorText>— {motivationalMessage.author}</AuthorText>
        </MotivationalMessage>
        
        <StartSessionButton onClick={handleStartSession}>
          Plan My Day
        </StartSessionButton>
      </SessionPanel>
    </SessionContainer>
  );
};

export default WeatherPlanningSession;