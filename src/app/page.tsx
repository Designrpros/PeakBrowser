'use client';

import Link from 'next/link';
import Image from "next/image";
import styled, { createGlobalStyle } from "styled-components";
import React, { useState } from 'react';
import { Library, Bot, Plus, Zap, Box, Layers, Monitor } from 'lucide-react';

// STYLED COMPONENTS =============================================

const GlobalStyle = createGlobalStyle`
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #F0F4F8; 
  color: #1A202C;
`;

const MainContent = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 70px; 
`;

const Section = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) { padding: 4rem 1rem; }
`;

// --- Hero Section ---
const HeroSection = styled(Section)`
  background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
  color: #fff;
  padding-top: 8rem;
  padding-bottom: 8rem;
  clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -1px;
  background: linear-gradient(90deg, #fff, #A0AEC0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #CBD5E0;
  max-width: 600px;
  margin-bottom: 4rem;
  line-height: 1.6;
`;

// --- Split Choice Grid ---
const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChoiceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 24px;
  text-align: left;
  transition: transform 0.2s, background 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CardIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
`;

const CardDescription = styled.p`
  color: #A0AEC0;
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.5;
  flex-grow: 1;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  
  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #E2E8F0;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    
    svg {
      color: #48BB78;
      width: 18px;
      height: 18px;
    }
  }
`;

const CardButton = styled(Link)<{ variant: 'blue' | 'purple' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
  background: ${props => props.variant === 'blue' ? '#4A90E2' : '#9F7AEA'};
  color: white;
  
  &:hover {
    opacity: 0.9;
  }
`;

// --- General Components ---
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: #1A202C;
`;

const FaqSection = styled(Section)`
  background-color: #fff;
`;

const FaqContainer = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FaqItem = styled.div`
  background: #F7FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  overflow: hidden;
`;

const FaqQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  color: #1A202C; 

  svg {
    transition: transform 0.3s ease;
    color: #1A202C; 
  }

  &[aria-expanded='true'] svg {
    transform: rotate(45deg);
  }
`;

const FaqAnswer = styled.div<{ $isOpen: boolean }>`
  padding: 0 1.5rem;
  max-height: ${props => (props.$isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  p {
    padding-bottom: 1.5rem;
    color: #4A5568;
    line-height: 1.6;
    text-align: left; 
  }
`;

const FaqRow = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FaqItem>
      <FaqQuestion onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        {question}
        <Plus size={20} />
      </FaqQuestion>
      <FaqAnswer $isOpen={isOpen}>
        <p>{answer}</p>
      </FaqAnswer>
    </FaqItem>
  );
};

// REACT COMPONENT ===============================================
export default function Home() {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <MainContent>
          {/* === HERO SECTION === */}
          <HeroSection>
            <Image src="/Peak.png" alt="Peak Logo" width={120} height={60} style={{filter: 'invert(1)'}} priority />
            <HeroTitle>Two Ways to Peak.</HeroTitle>
            <HeroSubtitle>
              One philosophy: Uninterrupted Flow. Choose the browser that fits your workflow.
            </HeroSubtitle>
            
            <ChoiceGrid>
              {/* PEAK NATIVE */}
              <ChoiceCard>
                <CardHeader>
                  <CardIcon color="#4A90E2"><Zap size={24} /></CardIcon>
                  <CardTitle>Peak Native</CardTitle>
                </CardHeader>
                <CardDescription>
                  The original lightweight companion. Built with Swift for macOS. Perfect for fast browsing and quick notes without the bloat.
                </CardDescription>
                <FeatureList>
                  <li><Zap /> Native macOS Performance</li>
                  <li><Monitor /> Lightweight WebKit Engine</li>
                  <li><Library /> Basic Notes & Bookmarks</li>
                  <li><Bot /> Chat with LLMs</li>
                </FeatureList>
                <CardButton href="/download?app=native" variant="blue">Download Native</CardButton>
              </ChoiceCard>

              {/* PEAK MULTIPLATFORM */}
              <ChoiceCard>
                <CardHeader>
                  <CardIcon color="#805AD5"><Layers size={24} /></CardIcon>
                  <CardTitle>Peak Multiplatform</CardTitle>
                </CardHeader>
                <CardDescription>
                  The complete OS for your workflow. Built with Electron for Mac, Windows, and Linux. Includes advanced developer tools.
                </CardDescription>
                <FeatureList>
                  <li><Box /> Cross-Platform (Win/Lin/Mac)</li>
                  <li><Layers /> Kanban & Whiteboards</li>
                  <li><Bot /> Project View & Terminal</li>
                  <li><Library /> Advanced AI Context</li>
                </FeatureList>
                <CardButton href="/download?app=multi" variant="purple">Download Multiplatform</CardButton>
              </ChoiceCard>
            </ChoiceGrid>
          </HeroSection>

          {/* === FAQ SECTION === */}
          <FaqSection id="faq">
            <SectionTitle>Which one is right for me?</SectionTitle>
            <FaqContainer>
              <FaqRow 
                question="What is the main difference?"
                answer="Peak Native is a lightweight Swift app designed exclusively for macOS for speed and simplicity. Peak Multiplatform is a more powerful 'Work OS' built on Electron that runs on Windows, Linux, and macOS, featuring integrated tools like Kanban boards, Whiteboards, and Terminals."
              />
              <FaqRow 
                question="Can I use both?"
                answer="Absolutely. They are separate applications. You might use Peak Native for quick personal browsing and Peak Multiplatform for your deep work and development projects."
              />
              <FaqRow 
                question="Are they both free?"
                answer="Yes, both versions of Peak are free to download. However, to use the AI chat features in either version, you will need to provide your own OpenRouter API key."
              />
            </FaqContainer>
          </FaqSection>

        </MainContent>
      </PageWrapper>
    </>
  );
}