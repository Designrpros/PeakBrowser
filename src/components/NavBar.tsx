'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const NavBarWrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavLogoContainer = styled(Link)` // <-- Changed to Link
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  color: #1A202C;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  a {
    color: #4A5568;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;

    &:hover {
      color: #4A90E2;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavCTAButton = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background-color: #4A90E2; 
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #357ABD;
  }
`;

export default function NavBar() {
  return (
    <NavBarWrapper>
      <NavLogoContainer href="/">
        <Image
          src="/Peak.png"
          alt="Peak Browser Logo"
          width={28}
          height={14}
          priority
        />
        Peak Browser
      </NavLogoContainer>
      <NavLinks>
        {/* Use Link for internal navigation */}
        <Link href="/#features">Features</Link>
        <Link href="/#demo">Demo</Link>
        <Link href="/#faq">FAQ</Link>
        <Link href="/download" passHref>
          <NavCTAButton>
            Download
          </NavCTAButton>
        </Link>
      </NavLinks>
    </NavBarWrapper>
  );
}