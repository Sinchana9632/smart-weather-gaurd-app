import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EnvironmentalInsights from './components/EnvironmentalInsights';
import WeatherPlanningSession from './components/WeatherPlanningSession';
import PlanMyDay from './components/PlanMyDay';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { 
  getCurrentWeather, 
  getHourlyForecast, 
  getDailyForecast, 
  getUVIndex, 
  getAirQuality 
} from './services/weatherService';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

function App() {
  const [theme, setTheme] = useState('light');
  const [location, setLocation] = useState('New York, NY');
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lon: -74.0060 });
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handleCitySelect = (city) => {
    const locationString = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`;
    setLocation(locationString);
    setCoordinates({ lat: city.lat, lon: city.lon });
  };

  // Fetch weather data when coordinates change
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!coordinates.lat || !coordinates.lon) return;
      
      setLoading(true);
      try {
        // Fetch all weather data in parallel
        const [
          currentWeather,
          hourly,
          daily,
          uv,
          aqi
        ] = await Promise.all([
          getCurrentWeather(coordinates.lat, coordinates.lon),
          getHourlyForecast(coordinates.lat, coordinates.lon),
          getDailyForecast(coordinates.lat, coordinates.lon),
          getUVIndex(coordinates.lat, coordinates.lon),
          getAirQuality(coordinates.lat, coordinates.lon)
        ]);
        
        setWeatherData(currentWeather);
        setHourlyForecast(hourly);
        setDailyForecast(daily);
        setUvIndex(uv);
        setAirQuality(aqi);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [coordinates]);

  return (
    <Router>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <AppContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={
              <>
                <Header 
                  location={location} 
                  onLocationChange={handleLocationChange} 
                  onToggleTheme={toggleTheme} 
                  themeMode={theme}
                  onCitySelect={handleCitySelect}
                />
                {loading ? (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '200px' 
                  }}>
                    <div style={{ 
                      border: '4px solid #f3f3f3',
                      borderTop: '4px solid #4A90E2',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  </div>
                ) : (
                  <>
                    <Dashboard 
                      location={location} 
                      weatherData={weatherData}
                      hourlyForecast={hourlyForecast}
                      dailyForecast={dailyForecast}
                    />
                    <EnvironmentalInsights 
                      uvIndex={uvIndex}
                      airQuality={airQuality}
                    />
                    <WeatherPlanningSession coordinates={coordinates} location={location} />
                    <Footer />
                  </>
                )}
              </>
            } />
            <Route path="/plan-my-day" element={
              <PlanMyDay 
                location={location} 
                coordinates={coordinates} 
                themeMode={theme}
                onToggleTheme={toggleTheme}
              />
            } />
          </Routes>
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;