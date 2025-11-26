'use client';

import styled from "styled-components";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, AlertTriangle, Zap, Layers, Apple, Monitor, Package, ShieldAlert, Cpu } from 'lucide-react';

// --- CONFIGURATION ---
const MULTI_REPO = 'Designrpros/peak-multiplatform';
const MULTI_BASE = `https://github.com/${MULTI_REPO}/releases/latest/download/`;
const NATIVE_STORE_URL = 'macappstore://apps.apple.com/no/app/peak-browser/id6753611346?l=nb&mt=12';

// --- ASSET MAPS ---
const MULTI_ASSETS = {
    mac_arm: { url: MULTI_BASE + "Peak-mac-arm64.dmg", filename: "Peak-mac-arm64.dmg" },
    mac_intel: { url: MULTI_BASE + "Peak-mac-x64.dmg", filename: "Peak-mac-x64.dmg" },
    win_arm: { url: MULTI_BASE + "Peak-win-arm64.exe", filename: "Peak-win-arm64.exe" },
    win_x64: { url: MULTI_BASE + "Peak-win-x64.exe", filename: "Peak-win-x64.exe" },
    linux_deb_arm: { url: MULTI_BASE + "Peak-linux-arm64.deb", filename: "Peak-linux-arm64.deb" },
    linux_deb_x64: { url: MULTI_BASE + "Peak-linux-amd64.deb", filename: "Peak-linux-amd64.deb" },
    linux_app_x64: { url: MULTI_BASE + "Peak-linux-x86_64.AppImage", filename: "Peak.AppImage" },
    linux_app_arm: { url: MULTI_BASE + "Peak-linux-arm64.AppImage", filename: "Peak-arm.AppImage" },
    linux_rpm: { url: MULTI_BASE + "Peak-linux-x86_64.rpm", filename: "Peak.rpm" }
};

// --- STYLED COMPONENTS ---
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: var(--window-background-color);
  color: var(--peak-primary);
  padding: 8rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 6rem 1rem 2rem;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: var(--text-background-color);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
  background-color: var(--control-background-color);
  padding: 4px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  border: none;
  background: ${props => props.$active ? 'var(--window-background-color)' : 'transparent'};
  color: ${props => props.$active ? 'var(--peak-primary)' : 'var(--peak-secondary)'};
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: var(--peak-primary);
  }
`;

const Header = styled.header`
  text-align: center;
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
    line-height: 1.5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a<{ $variant: 'blue' | 'purple' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: ${props => props.$variant === 'blue' ? 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)' : 'linear-gradient(135deg, #6688AA 0%, #88B0D6 100%)'};
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, opacity 0.2s;

  &:hover { 
    transform: translateY(-2px); 
    opacity: 0.95;
  }
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  border-top: 1px dashed var(--border-color);
  padding-top: 2rem;
`;

const Column = styled.div`
  display: flex; flex-direction: column; gap: 0.75rem;
  h5 { 
    text-transform: uppercase; 
    color: var(--peak-secondary); 
    font-size: 0.8rem; 
    letter-spacing: 0.5px;
    font-weight: 700;
    margin-bottom: 0.25rem; 
    display: flex;
    align-items: center;
    gap: 6px;
  }
  a { 
    color: var(--peak-primary); 
    font-size: 0.9rem; 
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  a:hover { opacity: 1; text-decoration: underline; }
`;

const InfoBox = styled.div`
  background-color: var(--control-background-color);
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  color: var(--peak-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  
  strong { color: var(--peak-primary); }
`;

function DesktopDownloadContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') === 'native' ? 'native' : 'multi';
  const [activeApp, setActiveApp] = useState<'native' | 'multi'>(initialApp);
  const [os, setOs] = useState('unknown');

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) setOs('mac'); // Treat all Macs as 'mac' to show both options
    else if (ua.includes('win')) setOs(ua.includes('arm') ? 'win-arm' : 'win-x64');
    else if (ua.includes('linux')) setOs('linux');
  }, []);

  return (
    <PageWrapper>
      <ToggleContainer>
        <ToggleButton $active={activeApp === 'native'} onClick={() => setActiveApp('native')}>
          <Zap size={16} /> Peak Native
        </ToggleButton>
        <ToggleButton $active={activeApp === 'multi'} onClick={() => setActiveApp('multi')}>
          <Layers size={16} /> Peak Multiplatform
        </ToggleButton>
      </ToggleContainer>

      <Container>
        {activeApp === 'native' ? (
          <>
            <Header>
              <h1>Peak Native</h1>
              <p>The ultra-lightweight Swift browser for macOS.<br/>Perfect for speed and simplicity.</p>
            </Header>
            <div style={{ textAlign: 'center' }}>
              <PrimaryButton href={NATIVE_STORE_URL} $variant="blue">
                <Apple size={20} /> Download on App Store
              </PrimaryButton>
              <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--peak-secondary)' }}>
                {/* UPDATED REQUIREMENT */}
                Requires macOS 26 or later.
              </p>
            </div>
          </>
        ) : (
          <>
            <Header>
              <h1>Peak Multiplatform</h1>
              <p>The complete workspace OS for Mac, Windows, and Linux.<br/>Includes Whiteboard, Terminal, and Dev Tools.</p>
            </Header>
            <div style={{ textAlign: 'center' }}>
              
              {/* MAC OS: Show BOTH options to ensure correct choice */}
              {os === 'mac' && (
                <ButtonGroup>
                    <PrimaryButton href={MULTI_ASSETS.mac_arm.url} $variant="purple">
                        <Cpu size={18} /> Apple Silicon
                    </PrimaryButton>
                    <PrimaryButton href={MULTI_ASSETS.mac_intel.url} $variant="purple">
                        <Monitor size={18} /> Intel Mac
                    </PrimaryButton>
                </ButtonGroup>
              )}

              {os.includes('win') && (
                <PrimaryButton href={MULTI_ASSETS.win_x64.url} $variant="purple">
                  <Download size={20} /> Download for Windows
                </PrimaryButton>
              )}
              {(os.includes('linux') || os === 'unknown') && (
                <PrimaryButton href={MULTI_ASSETS.linux_app_x64.url} $variant="purple">
                  <Download size={20} /> Download AppImage (Linux)
                </PrimaryButton>
              )}
              
              <div style={{ fontSize: '0.85rem', color: 'var(--peak-secondary)', marginTop: '1.5rem' }}>
                Downloads always fetch the latest release from GitHub.
              </div>
            </div>

            <LinkGrid>
              <Column>
                <h5><Apple size={14} /> macOS</h5>
                <a href={MULTI_ASSETS.mac_arm.url}>Apple Silicon (DMG)</a>
                <a href={MULTI_ASSETS.mac_intel.url}>Intel (DMG)</a>
              </Column>
              <Column>
                <h5><Monitor size={14} /> Windows</h5>
                <a href={MULTI_ASSETS.win_x64.url}>Installer (x64 .exe)</a>
                <a href={MULTI_ASSETS.win_arm.url}>Installer (ARM64 .exe)</a>
              </Column>
              <Column>
                <h5><Package size={14} /> Linux</h5>
                <a href={MULTI_ASSETS.linux_deb_x64.url}>Debian/Ubuntu (.deb)</a>
                <a href={MULTI_ASSETS.linux_app_x64.url}>AppImage (Universal)</a>
                <a href={MULTI_ASSETS.linux_rpm.url}>Fedora (.rpm)</a>
              </Column>
            </LinkGrid>
          </>
        )}

        <InfoBox>
          <ShieldAlert size={24} style={{ flexShrink: 0 }} />
          <div>
            <strong>Security Notice:</strong> Peak Multiplatform is an open-source project. You may need to approve the app in your system settings (Gatekeeper / SmartScreen) upon first launch as it is not yet signed with an enterprise certificate.
          </div>
        </InfoBox>
      </Container>
    </PageWrapper>
  );
}

export default function DesktopDownloadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesktopDownloadContent />
    </Suspense>
  );
}