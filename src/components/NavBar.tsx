'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { Github } from "lucide-react"; 

const NavBarWrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavLogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 800;
  font-size: 1.35rem;
  text-decoration: none;
  color: #1A202C;
  letter-spacing: -0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  a.nav-item {
    color: #4A5568;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s;

    &:hover {
      color: #1A202C;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4A5568;
  transition: color 0.2s;
  
  &:hover {
    color: #1A202C;
  }
`;

// FIX: Changed from styled.a to styled(Link) to prevent nested <a> tags
const NavCTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: #1A202C; 
  border-radius: 10px;
  text-decoration: none;
  transition: transform 0.1s ease, background-color 0.2s ease;
  
  &:hover {
    background-color: #2D3748;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default function NavBar() {
  return (
    <NavBarWrapper>
      <NavLogoContainer href="/">
        <Image
          src="/Peak.png"
          alt="Peak Logo"
          width={32} 
          height={16}
          priority
        />
        Peak
      </NavLogoContainer>
      
      <NavLinks>
        <Link href="/#demo" className="nav-item">Demo</Link>
        <Link href="/#faq" className="nav-item">FAQ</Link>
        
        <IconLink 
          href="https://github.com/Designrpros/peak-multiplatform" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="View on GitHub"
        >
          <Github size={20} />
        </IconLink>

        {/* FIX: Removed wrapping <Link> since NavCTAButton is now a Link itself */}
        <NavCTAButton href="/download">
          Download
        </NavCTAButton>
      </NavLinks>
    </NavBarWrapper>
  );
}