'use client';

import styled from "styled-components";
// 1. IMPORT useState and useEffect
import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, ChevronsRight } from 'lucide-react';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #F0F4F8;
  color: #1A202C;
  padding: 8rem 2rem 4rem; // Extra padding at the top

  @media (max-width: 768px) {
    padding: 6rem 1rem 2rem;
  }
`;

const DownloadContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: #fff;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #E2E8F0;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid #E2E8F0;

  h1 {
    font-size: 2.75rem;
    font-weight: 800;
  }

  p {
    font-size: 1.2rem;
    color: #718096;
    margin-top: 0.5rem;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  /* margin-bottom: 2.5rem; */ // Removed to allow "OtherDownloads" to be closer
  margin-bottom: 1rem; // Give a little space
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  border: none;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 14px 0 rgba(74, 144, 226, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px 0 rgba(74, 144, 226, 0.5);
  }
`;

const AppStoreButton = styled(DownloadButton)`
  background: transparent;
  border: 2px solid #A0AEC0; // A more muted border color
  color: #4A5568; // Muted text color
  box-shadow: none;
  margin-bottom: 0.75rem; // Less space below

  &:hover {
    background: #EDF2F7;
    border-color: #718096;
    transform: translateY(-2px);
    box-shadow: none;
  }
`;

// 2. ADDED THIS NEW STYLED COMPONENT FOR THE LINKS
const OtherDownloads = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem; // This creates the space before the InfoBox
  
  a {
    color: #718096;
    font-size: 0.9rem;
    text-decoration: underline;
    transition: color 0.2s;

    &:hover {
      color: #1A202C;
    }
  }
`;


const CaptionText = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  color: #718096;
  margin-bottom: 2.5rem; // Creates space before the next button
`;

const InfoBox = styled.div`
  background: #EBF8FF;
  border-left: 4px solid #4A90E2;
  color: #2C5282;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2.5rem 0;
  display: flex;
  gap: 1rem;
  
  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
  }

  p {
    line-height: 1.6;
    margin: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const InstructionStep = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  p, li {
    color: #4A5568;
    line-height: 1.7;
  }
  code {
    background: #E2E8F0;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    color: #1A202C;
  }
`;

// 3. ADDED OS TYPE DEFINITION
type OS = 'mac' | 'windows' | 'linux' | 'unknown';

export default function DownloadPage() {
  
  // 4. ADDED OS STATE AND EFFECT TO DETECT
  const [os, setOs] = useState<OS>('unknown');

  useEffect(() => {
    // This code only runs in the browser after the page loads
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac') || userAgent.includes('iphone')) {
      setOs('mac');
    } else if (userAgent.includes('win')) {
      setOs('windows');
    } else if (userAgent.includes('linux')) {
      setOs('linux');
    }
  }, []); // The empty array [] means this runs once on mount

  // 5. This helper function renders the new "smart" button
  const renderPrimaryButton = () => {
    switch (os) {
      case 'mac':
        return (
          <DownloadButton href="/peak-electron-mac.zip" download>
            <Download size={24} />
            Download for macOS
          </DownloadButton>
        );
      case 'windows':
        return (
          <DownloadButton href="/peak-electron-win.exe" download>
            <Download size={24} />
            Download for Windows
          </DownloadButton>
        );
      case 'linux':
        return (
          <DownloadButton href="/peak-electron-linux.AppImage" download>
            <Download size={24} />
            Download for Linux
          </DownloadButton>
        );
      default:
        // Fallback if detection is in progress or fails
        return (
          <DownloadButton href="/peak-electron-mac.zip" download>
            <Download size={24} />
            Download Peak
          </DownloadButton>
        );
    }
  };

  return (
    <PageWrapper>
      <DownloadContainer>
        <Header>
          <h1>Download Peak</h1>
          <p>The new multi-platform Peak is here. <br />Available for macOS, Windows, and Linux.</p>
        </Header>
        
        <div style={{ textAlign: 'center' }}>
          
          {/* 6. REPLACED the old button with our new smart button */}
          {renderPrimaryButton()}
          
          {/* 7. ADDED the links for other platforms */}
          <OtherDownloads>
            {os !== 'mac' && <a href="/peak-electron-mac.zip" download>Download for macOS</a>}
            {os !== 'windows' && <a href="/peak-electron-win.exe" download>Download for Windows</a>}
            {os !== 'linux' && <a href="/peak-electron-linux.AppImage" download>Download for Linux</a>}
          </OtherDownloads>

          <AppStoreButton 
            href="https://apps.apple.com/no/app/peak-browser/id6753611346?l=nb&mt=12"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Download Legacy App (App Store)
          </AppStoreButton>
          <CaptionText>
            Note: This is the old Swift app and may be discontinued.
          </CaptionText>

        </div>

        {/* *** IMPORTANT ***
          The section below is the installation guide for the OLD Swift app.
          You will need to UPDATE this text to be correct for your new Electron app.
          (e.g., zipping the .app, or using a .dmg installer, or running the .exe)
        */}

        <InfoBox>
          <AlertTriangle size={48} style={{ flexShrink: 0, marginTop: '5px' }}/>
          <div>
            <h4>A Quick Note on Security</h4>
            <p>Your OS may show a standard security warning because the app is
            distributed directly by us. <strong>We guarantee the app is safe.</strong>
            </p>
          </div>
        </InfoBox>

        <SectionTitle>First-Time Installation Guide (macOS)</SectionTitle>

        <InstructionStep>
          <h3>Step 1: Unzip and Install</h3>
          <p>After downloading, double-click the <code>.zip</code> file to unzip it. Then, drag the new <strong>Peak</strong> icon into your <strong>Applications</strong> folder.</p>
        </InstructionStep>

        <InstructionStep>
          <h3>Step 2: Approve in System Settings</h3>
          <p>Go to <strong>Apple menu () &gt; System Settings &gt; Privacy & Security</strong>. Scroll down and you will see a message about &quot;Peak&quot;. Click the <strong>Open Anyway</strong> button.</p>
        </InstructionStep>
        
        <InfoBox>
          <ChevronsRight size={48} style={{ flexShrink: 0, marginTop: '5px' }}/>
          <div>
            <h4>Pro Tip: The Right-Click Method</h4>
            <p>Alternatively, you can simply <strong>right-click</strong> the app icon, select <strong>Open</strong> from the menu, and then click <strong>Open</strong> on the dialog that appears.</p>
          </div>
        </InfoBox>
      </DownloadContainer>
    </PageWrapper>
  );
}