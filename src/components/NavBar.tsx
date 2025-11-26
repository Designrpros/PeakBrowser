'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Github, BookOpen, Download } from "lucide-react"; 

const NavBarWrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  
  /* Seamless Background blending */
  background-color: var(--window-background-color);
  border-bottom: 1px solid transparent; 
  
  /* Subtle shadow only */
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.05);
  z-index: 1000;

  @media (prefers-color-scheme: dark) {
    box-shadow: none;
    border-bottom: 1px solid var(--border-color);
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  color: var(--peak-primary);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

// Logo that inverts based on theme
const LogoImage = styled(Image)`
  object-fit: contain;
  @media (prefers-color-scheme: dark) {
    filter: invert(1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  a.nav-item {
    color: var(--peak-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    display: flex; 
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: color 0.2s;
    padding: 4px;

    &:hover {
      color: var(--peak-primary);
    }
  }
`;

const NavCTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: var(--peak-primary); 
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.2s ease;
  margin-left: 8px;
  
  &:hover {
    opacity: 0.9;
  }

  @media (prefers-color-scheme: dark) {
    background: #FFFFFF;
    color: #000000;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 20px;
  background-color: var(--border-color);
  margin: 0 4px;
`;

export default function NavBar() {
  const pathname = usePathname();
  const isWebApp = pathname === '/';

  return (
    <NavBarWrapper>
      <NavLeft>
        <NavLogoContainer href="/">
          <LogoImage src="/Peak.png" alt="Peak" width={28} height={14} priority />
          Peak
        </NavLogoContainer>
      </NavLeft>
      
      <NavLinks>
          <>
             <Link href="/docs" className="nav-item" title="Documentation">
                <BookOpen size={18} />
             </Link>
             
             <a href="https://github.com/Designrpros/peak-multiplatform" target="_blank" rel="noopener noreferrer" className="nav-item" title="GitHub">
                <Github size={18} />
             </a>
             
             <Separator />
          </>
        <NavCTAButton href="/download">
          <Download size={14} /> <span className="hide-mobile">Download</span>
        </NavCTAButton>
      </NavLinks>

      <style jsx global>{`
        @media (max-width: 600px) {
          .hide-mobile { display: none; }
        }
      `}</style>
    </NavBarWrapper>
  );
}