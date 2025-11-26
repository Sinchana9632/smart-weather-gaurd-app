import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { searchCities } from '../services/weatherService';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.textSecondary};
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textPrimary};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: ${props => props.theme.primaryAccent};
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid ${props => props.theme.background};
  
  &:hover {
    background-color: ${props => props.theme.primaryAccent};
    color: white;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const LoadingSpinner = styled.div`
  border: 2px solid ${props => props.theme.textSecondary};
  border-top: 2px solid ${props => props.theme.primaryAccent};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #FF6B6B;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  text-align: center;
`;

const CitySearch = ({ onCitySelect, currentCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      searchCitiesAPI(query);
    }, 100);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const searchCitiesAPI = async (searchQuery) => {
    setIsLoading(true);
    setError('');
    
    try {
      const results = await searchCities(searchQuery);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
    } catch (err) {
      setError('Failed to fetch cities. Please try again.');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length === 0) {
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (city) => {
    setQuery(`${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`);
    setShowDropdown(false);
    onCitySelect(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleCitySelect(suggestions[0]);
    }
  };

  return (
    <SearchContainer ref={dropdownRef}>
      <SearchInput
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a city..."
        onFocus={() => query.length >= 1 && setShowDropdown(suggestions.length > 0)}
      />
      
      {showDropdown && (
        <Dropdown>
          {isLoading ? (
            <div style={{ padding: '1rem' }}>
              <LoadingSpinner />
            </div>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            suggestions.map((city, index) => (
              <DropdownItem 
                key={`${city.lat}-${city.lon}-${index}`}
                onClick={() => handleCitySelect(city)}
              >
                {city.name}
                {city.state && `, ${city.state}`}
                {`, ${city.country}`}
              </DropdownItem>
            ))
          )}
        </Dropdown>
      )}
    </SearchContainer>
  );
};

export default CitySearch;