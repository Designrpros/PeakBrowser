'use client';

import styled from "styled-components";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, AlertTriangle, Terminal, Monitor, Apple, Package, Layers, Zap, ExternalLink } from 'lucide-react';

// --- CONFIGURATION ---

// 1. Multiplatform (Electron) - Uses "latest" endpoint to always get newest assets
const MULTI_REPO = 'Designrpros/peak-multiplatform';
const MULTI_BASE = `https://github.com/${MULTI_REPO}/releases/latest/download/`;

// 2. Native (Swift) - Mac App Store
// FIX: Use 'macappstore://' scheme to force opening the App Store application directly
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
  background: #F0F4F8;
  color: #1A202C;
  padding: 8rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 6rem 1rem 2rem;
  }
`;

const Container = styled.div`
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

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  background: #E2E8F0;
  padding: 4px;
  border-radius: 12px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  border: none;
  background: ${props => props.active ? '#fff' : 'transparent'};
  color: ${props => props.active ? '#1A202C' : '#718096'};
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: ${props => props.active ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #1A202C;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
  p { font-size: 1.1rem; color: #718096; }
`;

const PrimaryButton = styled.a<{ variant: 'blue' | 'purple' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  background: ${props => props.variant === 'blue' ? 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)' : 'linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)'};
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover { transform: translateY(-2px); }
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  border-top: 1px dashed #E2E8F0;
  padding-top: 2rem;
`;

const Column = styled.div`
  display: flex; flex-direction: column; gap: 0.5rem;
  h5 { text-transform: uppercase; color: #A0AEC0; font-size: 0.85rem; margin-bottom: 0.5rem; }
  a { color: #718096; font-size: 0.9rem; text-decoration: underline; }
  a:hover { color: #1A202C; }
`;

const InfoBox = styled.div`
  background: #EBF8FF;
  border-left: 4px solid #4A90E2;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  color: #2C5282;
  p { margin: 0; line-height: 1.5; }
`;

// --- COMPONENT ---
function DownloadContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') === 'native' ? 'native' : 'multi';
  const [activeApp, setActiveApp] = useState<'native' | 'multi'>(initialApp);
  const [os, setOs] = useState('unknown');

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) setOs(ua.includes('arm') ? 'mac-arm' : 'mac-intel');
    else if (ua.includes('win')) setOs(ua.includes('arm') ? 'win-arm' : 'win-x64');
    else if (ua.includes('linux')) setOs('linux');
  }, []);

  return (
    <PageWrapper>
      <ToggleContainer>
        <ToggleButton active={activeApp === 'native'} onClick={() => setActiveApp('native')}>
          <Zap size={18} /> Peak Native
        </ToggleButton>
        <ToggleButton active={activeApp === 'multi'} onClick={() => setActiveApp('multi')}>
          <Layers size={18} /> Peak Multiplatform
        </ToggleButton>
      </ToggleContainer>

      <Container>
        {activeApp === 'native' ? (
          <>
            <Header>
              <h1>Download Peak Native</h1>
              <p>The lightweight Swift browser for macOS.</p>
            </Header>
            <div style={{ textAlign: 'center' }}>
              {/* FIX: Removed target="_blank" to prevent empty tab when launching external app */}
              <PrimaryButton href={NATIVE_STORE_URL} variant="blue">
                <Apple size={24} /> Download on App Store
              </PrimaryButton>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#A0AEC0' }}>
                macOS 12.0+ Required
              </p>
            </div>
          </>
        ) : (
          <>
            <Header>
              <h1>Download Peak Multiplatform</h1>
              <p>The all-in-one workspace for Mac, Windows, and Linux.</p>
            </Header>
            <div style={{ textAlign: 'center' }}>
              {/* Smart Button based on OS */}
              {os.includes('mac') && (
                <PrimaryButton href={os === 'mac-arm' ? MULTI_ASSETS.mac_arm.url : MULTI_ASSETS.mac_intel.url} variant="purple">
                  <Download size={24} /> Download for macOS
                </PrimaryButton>
              )}
              {os.includes('win') && (
                <PrimaryButton href={MULTI_ASSETS.win_x64.url} variant="purple">
                  <Download size={24} /> Download for Windows
                </PrimaryButton>
              )}
              {(os.includes('linux') || os === 'unknown') && (
                <PrimaryButton href={MULTI_ASSETS.linux_app_x64.url} variant="purple">
                  <Download size={24} /> Download AppImage (Linux)
                </PrimaryButton>
              )}
              
              <div style={{ fontSize: '0.85rem', color: '#A0AEC0', marginTop: '1rem' }}>
                Downloads always fetch the latest release.
              </div>
            </div>

            <LinkGrid>
              <Column>
                <h5>macOS</h5>
                <a href={MULTI_ASSETS.mac_arm.url}>Apple Silicon (DMG)</a>
                <a href={MULTI_ASSETS.mac_intel.url}>Intel (DMG)</a>
              </Column>
              <Column>
                <h5>Windows</h5>
                <a href={MULTI_ASSETS.win_x64.url}>Installer (x64 .exe)</a>
                <a href={MULTI_ASSETS.win_arm.url}>Installer (ARM64 .exe)</a>
              </Column>
              <Column>
                <h5>Linux</h5>
                <a href={MULTI_ASSETS.linux_deb_x64.url}>Debian/Ubuntu (.deb)</a>
                <a href={MULTI_ASSETS.linux_app_x64.url}>AppImage (Universal)</a>
                <a href={MULTI_ASSETS.linux_rpm.url}>Fedora (.rpm)</a>
              </Column>
            </LinkGrid>
          </>
        )}

        <InfoBox>
          <AlertTriangle size={24} style={{ flexShrink: 0 }} />
          <div>
            <strong>Security Note:</strong> Since Peak Multiplatform is an indie open-source project, you may need to approve the app in your system settings (Gatekeeper on macOS or SmartScreen on Windows) upon first launch.
          </div>
        </InfoBox>
      </Container>
    </PageWrapper>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DownloadContent />
    </Suspense>
  );
}