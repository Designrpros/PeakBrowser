'use client';

import styled from "styled-components";
import { Apple, Lock, Wifi, Sparkles, Layers } from 'lucide-react';
import { trackEvent, GA_CATEGORY } from '@/lib/analytics';

const APP_STORE_URL = 'https://apps.apple.com/app/peak-browser/id6753611346';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: var(--window-background-color);
  color: var(--peak-primary);
  padding: 9rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 7rem 1rem 2rem;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 640px;
  background-color: var(--text-background-color);
  border-radius: 24px;
  padding: 3.5rem 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
  text-align: center;

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.75rem;
    letter-spacing: -0.5px;
  }
  p {
    font-size: 1.1rem;
    color: var(--peak-secondary);
    line-height: 1.6;
  }
`;

const StoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.2rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--window-background-color);
  background: var(--peak-primary);
  border-radius: 14px;
  text-decoration: none;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

const Requirements = styled.p`
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--peak-secondary);
`;

const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 3rem;
  border-top: 1px dashed var(--border-color);
  padding-top: 2.5rem;
  text-align: left;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;

  svg {
    color: var(--peak-accent);
    flex-shrink: 0;
    margin-top: 2px;
  }
  h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.2rem; }
  p { font-size: 0.85rem; color: var(--peak-secondary); line-height: 1.5; }
`;

export default function DownloadPage() {
  const handleDownloadClick = () => {
    trackEvent({
      action: 'download_initiated',
      category: GA_CATEGORY.DOWNLOAD,
      label: 'App Store',
    });
  };

  return (
    <PageWrapper>
      <Container>
        <Header>
          <h1>Get Peak Browser</h1>
          <p>
            The native Apple browser workspace.<br />
            Available on the App Store.
          </p>
        </Header>

        <StoreButton
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownloadClick}
        >
          <Apple size={20} /> Download on the App Store
        </StoreButton>
        <Requirements>Requires macOS 14.0+ or iOS/iPadOS 17.0+.</Requirements>

        <FeatureRow>
          <Feature>
            <Sparkles size={18} />
            <div>
              <h4>One input, many outcomes</h4>
              <p>Search, notes, tasks, whiteboards, and AI from a single command surface.</p>
            </div>
          </Feature>
          <Feature>
            <Lock size={18} />
            <div>
              <h4>Private by design</h4>
              <p>Local-first data, isolated profiles, and optional private iCloud sync.</p>
            </div>
          </Feature>
          <Feature>
            <Wifi size={18} />
            <div>
              <h4>Peak Mesh</h4>
              <p>Chat, share tabs, and play with nearby devices — no accounts, no cloud.</p>
            </div>
          </Feature>
          <Feature>
            <Layers size={18} />
            <div>
              <h4>Native SwiftUI</h4>
              <p>Built on WebKit, Core Data, and CloudKit — fast and at home on your Mac.</p>
            </div>
          </Feature>
        </FeatureRow>
      </Container>
    </PageWrapper>
  );
}
