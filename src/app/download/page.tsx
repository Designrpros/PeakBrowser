'use client';

import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, Terminal, Monitor, Apple, Package } from 'lucide-react';

// --- GITHUB ASSET CONSTANTS (UPDATED) ---
const REPO = 'Designrpros/peak-multiplatform';
const TAG = 'v0.0.2'; // <-- UPDATED TO LATEST SUCCESSFUL TAG
const BASE_URL = `https://github.com/${REPO}/releases/download/${TAG}/`;

const mac_arm64 = BASE_URL + "Peak-mac-arm64.dmg"; 
const mac_x64 = BASE_URL + "Peak-mac-x64.dmg";     

const win_x64 = BASE_URL + "Peak-win-x64.exe";     
const win_arm64 = BASE_URL + "Peak-win-arm64.exe"; 

const linux_AppImage_x64 = BASE_URL + "Peak-linux-x86_64.AppImage"; 
const linux_AppImage_arm64 = BASE_URL + "Peak-linux-arm64.AppImage";
const linux_deb_x64 = BASE_URL + "Peak-linux-amd64.deb"; 
const linux_deb_arm64 = BASE_URL + "Peak-linux-arm64.deb";
const linux_rpm_x64 = BASE_URL + "Peak-linux-x86_64.rpm"; 
// -----------------------------------------

// --- STYLED COMPONENTS ---
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #F0F4F8;
  color: #1A202C;
  padding: 8rem 2rem 4rem;

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

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
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

const SecondaryLink = styled.a`
  display: inline-block;
  color: #718096;
  font-size: 0.9rem;
  text-decoration: underline;
  margin: 0 0.5rem 0.5rem 0;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #1A202C;
  }
`;

const DistroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-top: 2rem;
  border-top: 1px dashed #E2E8F0;
`;

const DistroColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  h5 {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: #A0AEC0;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.75rem;
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
    word-break: break-word;
  }
`;

type OS = 'mac-arm' | 'mac-intel' | 'win-x64' | 'win-arm' | 'linux-arm' | 'linux-x64' | 'unknown';

// --- INSTRUCTION COMPONENTS ---
const MacInstructions = () => (
  <>
    <SectionTitle><Apple size={28} /> macOS Installation</SectionTitle>
    <InstructionStep>
      <h3>1. Install</h3>
      <p>Open the <code>.dmg</code> file and drag the Peak icon into your Applications folder.</p>
    </InstructionStep>
    <InstructionStep>
      <h3>2. Security Check</h3>
      <p>If macOS prevents opening, go to <strong>System Settings &gt; Privacy & Security</strong> and click <strong>Open Anyway</strong>.</p>
    </InstructionStep>
  </>
);

const WindowsInstructions = () => (
  <>
    <SectionTitle><Monitor size={28} /> Windows Installation</SectionTitle>
    <InstructionStep>
      <h3>1. Run Installer</h3>
      <p>Double-click the <code>.exe</code> file to start.</p>
    </InstructionStep>
    <InstructionStep>
      <h3>2. SmartScreen</h3>
      <p>If Windows Defender appears, click <strong>More info</strong> then <strong>Run anyway</strong>.</p>
    </InstructionStep>
  </>
);

const LinuxInstructions = () => (
  <>
    <SectionTitle><Terminal size={28} /> Linux Installation</SectionTitle>
    <InfoBox>
      <Package size={24} style={{ flexShrink: 0 }}/>
      <div>
        <h4>Which file should I choose?</h4>
        <p><strong>.deb</strong>: Ubuntu, Debian, Pop!_OS, Mint.<br/>
        <strong>.rpm</strong>: Fedora, RedHat, CentOS.<br/>
        <strong>.AppImage</strong>: Universal (Works on almost all distros).</p>
      </div>
    </InfoBox>
    <InstructionStep>
      <h3>For .deb (Debian/Ubuntu)</h3>
      <p><code>sudo dpkg -i Peak-linux-amd64.deb</code></p>
    </InstructionStep>
    <InstructionStep>
      <h3>For AppImage</h3>
      <p>1. Right-click file &gt; Properties &gt; Permissions &gt; Check "Allow executing file as program".</p>
      <p>2. Or via terminal: <code>chmod +x Peak-linux-x86_64.AppImage</code></p>
    </InstructionStep>
  </>
);

export default function DownloadPage() {
  const [os, setOs] = useState<OS>('unknown');

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) {
        // Simple UA check for initial Mac logic
        setOs(ua.includes('arm') ? 'mac-arm' : 'mac-intel'); 
    } else if (ua.includes('win')) {
        setOs(ua.includes('arm') ? 'win-arm' : 'win-x64');
    } else if (ua.includes('linux')) {
        // Simplification for Linux
        setOs(ua.includes('aarch64') || ua.includes('arm') ? 'linux-arm' : 'linux-x64');
    }
  }, []);

  const getPrimaryDownload = () => {
    // Note: The logic below provides the most suitable installer based on OS detection.
    switch (os) {
        case 'mac-arm': return { url: mac_arm64, label: 'Download for Mac (Apple Silicon)', filename: 'Peak-mac-arm64.dmg' };
        case 'mac-intel': return { url: mac_x64, label: 'Download for Mac (Intel)', filename: 'Peak-mac-x64.dmg' };
        case 'win-arm': return { url: win_arm64, label: 'Download for Windows (ARM)', filename: 'Peak-win-arm64.exe' };
        case 'win-x64': return { url: win_x64, label: 'Download for Windows', filename: 'Peak-win-x64.exe' };
        case 'linux-arm': return { url: linux_deb_arm64, label: 'Download .deb (Linux ARM)', filename: 'Peak-linux-arm64.deb' };
        case 'linux-x64': return { url: linux_deb_x64, label: 'Download .deb (Linux x64)', filename: 'Peak-linux-amd64.deb' };
        default: return { url: mac_arm64, label: 'Download Peak', filename: 'Peak-mac-arm64.dmg' };
    }
  };

  const primary = getPrimaryDownload();

  return (
    <PageWrapper>
      <DownloadContainer>
        <Header>
          <h1>Download Peak</h1>
          <p>Optimized for every platform. Free and open source.</p>
        </Header>
        
        <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
          <PrimaryButton href={primary.url} download={primary.filename}>
            <Download size={24} />
            {primary.label}
          </PrimaryButton>
          <div style={{ fontSize: '0.9rem', color: '#718096' }}>
            Current Version: {TAG}
          </div>
        </div>

        <DistroGrid>
          <DistroColumn>
            <h5>macOS</h5>
            <SecondaryLink href={mac_arm64} download="Peak-mac-arm64.dmg">Apple Silicon (M1/M2)</SecondaryLink>
            <SecondaryLink href={mac_x64} download="Peak-mac-x64.dmg">Intel Chip</SecondaryLink>
          </DistroColumn>

          <DistroColumn>
            <h5>Windows</h5>
            <SecondaryLink href={win_x64} download="Peak-win-x64.exe">Windows x64 (Standard)</SecondaryLink>
            <SecondaryLink href={win_arm64} download="Peak-win-arm64.exe">Windows ARM64</SecondaryLink>
          </DistroColumn>

          <DistroColumn>
            <h5>Linux (Debian/Ubuntu)</h5>
            <SecondaryLink href={linux_deb_x64} download="Peak-linux-amd64.deb">.deb (x64)</SecondaryLink>
            <SecondaryLink href={linux_deb_arm64} download="Peak-linux-arm64.deb">.deb (ARM64)</SecondaryLink>
          </DistroColumn>

          <DistroColumn>
            <h5>Linux (Universal/RPM)</h5>
            <SecondaryLink href={linux_AppImage_x64} download="Peak-linux-x86_64.AppImage">.AppImage (x64)</SecondaryLink>
            <SecondaryLink href={linux_AppImage_arm64} download="Peak-linux-arm64.AppImage">.AppImage (ARM64)</SecondaryLink>
            <SecondaryLink href={linux_rpm_x64} download="Peak-linux-x86_64.rpm">.rpm (Fedora/RedHat)</SecondaryLink>
          </DistroColumn>
        </DistroGrid>

        <InfoBox>
          <AlertTriangle size={48} style={{ flexShrink: 0, marginTop: '5px' }}/>
          <div>
            <h4>Security Note</h4>
            <p>Peak is safe. You may see a warning from Windows Defender or macOS Gatekeeper because we are an indie developer. Follow the instructions below to install.</p>
          </div>
        </InfoBox>

        {os.includes('mac') && <MacInstructions />}
        {os.includes('win') && <WindowsInstructions />}
        {os.includes('linux') && <LinuxInstructions />}
        {os === 'unknown' && (
            <>
                <MacInstructions />
                <WindowsInstructions />
                <LinuxInstructions />
            </>
        )}
      </DownloadContainer>
    </PageWrapper>
  );
}