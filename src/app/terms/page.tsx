'use client';

import styled from "styled-components";

// Re-using the same styles from the Privacy page for consistency
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

export default function TermsOfServicePage() {
  return (
    <PolicyContainer>
      <ContentWrapper>
        <h1>Terms of Service</h1>
        <p><strong>Last Updated: October 10, 2025</strong></p>

        <p>
          Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the Peak Browser application (the &ldquo;Service&rdquo;) operated by us.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>By downloading, accessing, or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

        <h2>2. Use of the Service</h2>
        <p>
          Peak Browser provides a suite of productivity tools. The core browsing and note-taking features are provided free of charge.
        </p>
        <ul>
          <li><strong>API Keys:</strong> To access advanced AI features, you are required to provide your own API key from a third-party service like OpenRouter. You are solely responsible for all costs and activities associated with your API key.</li>
          <li><strong>Prohibited Use:</strong> You agree not to use the Service for any unlawful purpose or to violate any laws in your jurisdiction.</li>
        </ul>

        <h2>3. User-Generated Content</h2>
        <p>You are solely responsible for the content you create, including notes, chat history, and browsing data (&ldquo;Content&rdquo;). You retain all rights to your Content. We do not access, store, or claim ownership of your Content. All Content is stored locally on your device or in your personal iCloud account.</p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>

        <h2>5. Limitation of Liability</h2>
        <p>In no event shall Peak Browser or its developers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service.</p>
        
        <h2>6. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.</p>
        
        <h2>7. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at Designr.pros@gmail.com.</p>
      </ContentWrapper>
    </PolicyContainer>
  );
}