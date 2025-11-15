'use client';

import Link from 'next/link';
import Image from "next/image";
import styled, { createGlobalStyle } from "styled-components";
import React, { useState } from 'react';
// Import Lucid Icons
import { Keyboard, Library, Bot, Plus } from 'lucide-react';

// STYLED COMPONENTS =============================================

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

// --- Page & Layout ---
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
  margin-top: 70px; // Space for fixed nav
`;

const Section = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

// --- Hero Section ---
const HeroSection = styled(Section)`
  justify-content: center;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: #fff;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
`;

const HeroPeakLogo = styled(Image)`
  filter: brightness(0) invert(1);
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin: 1.5rem 0;
  letter-spacing: -2px;
  background: linear-gradient(90deg, #fff, #E2E8F0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-top: 1rem;
  max-width: 700px;
  color: #E2E8F0;
  line-height: 1.6;
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 2.5rem;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #4A90E2;
  background-color: #fff;
  border: none;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryCTA = styled(CTAButton)`
  background-color: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.8);
  margin-left: 1rem;
  box-shadow: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
    box-shadow: none;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  text-align: left;
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  }
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EBF4FF;
  color: #4A90E2;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 4rem;
  background: linear-gradient(90deg, #1A202C, #4A5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TestimonialsSection = styled(Section)`
  background-color: #fff;
`;
const ActionSection = styled(Section)``;

const MacWindow = styled.div`
  width: 100%;
  max-width: 1000px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 30px 60px -15px rgba(0,0,0,0.25);
  overflow: hidden;
  border: 1px solid #E2E8F0;
`;

const MacWindowHeader = styled.div`
  height: 40px;
  background-color: #DCDDE1;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 10px;
`;
const MacWindowDot = styled.div<{ color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;
const DemoCaption = styled.p`
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: #718096;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
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
  padding: 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  transition: background 0.2s;
  
  // FIX: Explicitly set the text color to your dark theme color
  color: #1A202C; 

  svg {
    transition: transform 0.3s ease;
    flex-shrink: 0;
    // FIX: Explicitly set the icon color to your dark theme color
    color: #1A202C; 
  }

  &[aria-expanded='true'] svg {
    transform: rotate(45deg);
  }

  &:hover {
    background: #fff;
  }
`;

const FaqAnswer = styled.div<{ isOpen: boolean }>`
  padding: 0 1.75rem;
  max-height: ${props => (props.isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  p {
    padding-bottom: 1.75rem;
    color: #4A5568;
    line-height: 1.8;
    // FIX: Add this line to align the text to the left
    text-align: left; 
  }
`;

const FinalCTASection = styled(Section)`
  background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%);
  color: #fff;
`;

const FinalCTATitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const FinalCTASubtitle = styled.p`
  color: #A0AEC0;
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  max-width: 600px;
`;

const FaqRow = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FaqItem>
      <FaqQuestion onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        {question}
        <Plus size={24} />
      </FaqQuestion>
      <FaqAnswer isOpen={isOpen}>
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
        {/* NavBar is now in layout.tsx */}
        <MainContent>
          {/* === HERO SECTION === */}
          <HeroSection>
            <HeroPeakLogo
                src="/Peak.png"
                alt="Peak Browser Logo"
                width={160}
                height={80}
                priority
              />
            <Title>Unlock Peak Productivity.</Title>
            <Subtitle>
              The AI-powered menubar browser that supercharges your workflow. Browse, write, and create without breaking focus.
            </Subtitle>
            <div>
            <Link href="/download" passHref>
              <CTAButton>
                Download for macOS
              </CTAButton>
            </Link>
              <SecondaryCTA href="#demo">
                See it in Action
              </SecondaryCTA>
            </div>
          </HeroSection>
          
          {/* === FEATURE SHOWCASE SECTION === */}
          <Section id="features">
            <SectionTitle>Designed for Flow</SectionTitle>
            <FeatureGrid>
              <FeatureCard>
                <FeatureIcon><Keyboard size={24} /></FeatureIcon>
                <FeatureTitle>Instant Hotkey Access</FeatureTitle>
                <FeatureDescription>
                  Launch Peak from any app with a customizable shortcut. Never lose your train of thought.
                </FeatureDescription>
              </FeatureCard>
              <FeatureCard>
                <FeatureIcon><Library size={24} /></FeatureIcon>
                <FeatureTitle>Unified Workspace</FeatureTitle>
                <FeatureDescription>
                  Fluidly switch between web browsing, rich notes, and AI chat in one seamless interface.
                </FeatureDescription>
              </FeatureCard>
              <FeatureCard>
                <FeatureIcon><Bot size={24} /></FeatureIcon>
                <FeatureTitle>Your AI, Your Way</FeatureTitle>
                <FeatureDescription>
                  Integrate your own OpenRouter API key to unlock powerful, custom AI capabilities.
                </FeatureDescription>
              </FeatureCard>
            </FeatureGrid>
          </Section>

          {/* === "IN ACTION" SECTION === */}
          <ActionSection id="demo">
            <SectionTitle>See Peak in Action</SectionTitle>
            <MacWindow>
              <MacWindowHeader>
                <MacWindowDot color="#FF5F56" />
                <MacWindowDot color="#FFBD2E" />
                <MacWindowDot color="#27C93F" />
              </MacWindowHeader>
              <StyledVideo
                width="1000"
                height="625"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/peak-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </StyledVideo>
            </MacWindow>
            <DemoCaption>The ultimate companion for focused work and quick access.</DemoCaption>
          </ActionSection>
          
          {/* === TESTIMONIALS SECTION (FIXED) === */}
          <TestimonialsSection>
            <SectionTitle>Built for Professionals</SectionTitle>
            <FeatureGrid>
              <FeatureCard>
                <FeatureDescription style={{fontStyle: "italic", marginBottom: "1rem"}}>
                  &quot;Peak transformed my workflow—it&apos;s like having a supercharged assistant always ready.&quot;
                </FeatureDescription>
                <FeatureTitle style={{fontSize: "1.1rem"}}>- Jane D., Developer</FeatureTitle>
              </FeatureCard>
              <FeatureCard>
                <FeatureDescription style={{fontStyle: "italic", marginBottom: "1rem"}}>
                  &quot;The AI integration is a game-changer for quick research without leaving my code editor.&quot;
                </FeatureDescription>
                <FeatureTitle style={{fontSize: "1.1rem"}}>- Alex R., Designer</FeatureTitle>
              </FeatureCard>
              <FeatureCard>
                <FeatureDescription style={{fontStyle: "italic", marginBottom: "1rem"}}>
                  &quot;Simple, fast, and always there when I need it. Can&apos;t imagine my Mac without it now.&quot;
                </FeatureDescription>
                <FeatureTitle style={{fontSize: "1.1rem"}}>- Sam T., Writer</FeatureTitle>
              </FeatureCard>
            </FeatureGrid>
          </TestimonialsSection>

          {/* === FAQ SECTION === */}
          <FaqSection id="faq">
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <FaqContainer>
              <FaqRow 
                question="Is Peak Browser free?"
                answer="Yes, Peak is free to download and use for all its core features, including the web browser and note-taking. Advanced AI chat features require you to add your own OpenRouter API key."
              />
              <FaqRow 
                question="Why do I need my own API key for AI features?"
                answer="By using your own key, you get access to a wider variety of powerful models and your usage is billed directly to your own account. This gives you more control and keeps the core app free."
              />
              <FaqRow 
                question="Does this replace my main browser like Chrome or Safari?"
                answer="Not necessarily. Peak is designed to be a quick-access companion browser. It's perfect for fast lookups, jotting down ideas, or chatting with AI without leaving your current task."
              />
            </FaqContainer>
          </FaqSection>

          {/* === FINAL CTA SECTION === */}
          <FinalCTASection>
              <FinalCTATitle>Ready to Streamline Your Workflow?</FinalCTATitle>
              <FinalCTASubtitle>Download Peak and experience a faster, more intelligent way to work.</FinalCTASubtitle>
            <Link href="/download" passHref>
              <CTAButton>
                Download for macOS
              </CTAButton>
            </Link>
          </FinalCTASection>

        </MainContent>

        {/* Footer is now in layout.tsx */}
      </PageWrapper>
    </>
  );
}