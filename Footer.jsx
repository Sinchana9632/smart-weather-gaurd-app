import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.cardBackground};
  padding: 2rem;
  margin-top: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.primaryAccent};
  }
`;

const Quote = styled.blockquote`
  text-align: center;
  font-style: italic;
  color: ${props => props.theme.textSecondary};
  font-size: 1rem;
  max-width: 600px;
  margin: 0;
  padding: 0 1rem;
  
  &::before,
  &::after {
    content: '"';
  }
`;

const Copyright = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 0.8rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LinksContainer>
          <Link href="#">About Smart Weather Guard</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Contact Us</Link>
        </LinksContainer>
        
        <Quote>
          The best way to predict the future is to create it. Take care of your weather today.
        </Quote>
        
        <Copyright>
          © {new Date().getFullYear()} Smart Weather Guard. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;