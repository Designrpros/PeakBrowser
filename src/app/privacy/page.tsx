'use client';

import styled from "styled-components";

const PolicyContainer = styled.div`
  background: #fff;
  padding: 8rem 2rem 4rem 2rem;
  margin-top: 70px; // Space for fixed nav
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #4A5568;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #1A202C;
    margin-bottom: 2rem;
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1A202C;
    margin-top: 3rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style-position: inside;
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export default function PrivacyPolicyPage() {
  return (
    <PolicyContainer>
      <ContentWrapper>
        <h1>Privacy Policy</h1>
        <p><strong>Last Updated: October 10, 2025</strong></p>

        <p>
          Welcome to Peak Browser (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our macOS application.
        </p>

        <h2>Information We Collect</h2>
        <p>Peak Browser is designed with privacy as a core feature. We collect minimal information necessary for the app to function:</p>
        <ul>
          <li><strong>API Keys:</strong> If you choose to use the AI features, your OpenRouter API key is stored securely in the macOS Keychain on your device. It is never transmitted to our servers.</li>
          <li><strong>Locally Stored Data:</strong> Your browsing history, notes, and chat sessions are stored locally on your device and can be synced via your personal iCloud account. We do not have access to this data.</li>
          <li><strong>No Analytics:</strong> We do not collect any analytics, usage data, or personal information.</li>
        </ul>

        <h2>How We Use Information</h2>
        <p>Since we do not collect personal information, we do not use it for any purpose. Your data is yours and remains on your devices.</p>

        <h2>Data Security</h2>
        <p>We take security seriously. Your API key is stored using the industry-standard macOS Keychain service, which provides encrypted storage. All other user-generated content resides locally or within your private iCloud container, protected by Apple&apos;s security infrastructure.</p>
        
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at Designr.pros@gmail.com.</p>
      </ContentWrapper>
    </PolicyContainer>
  );
}