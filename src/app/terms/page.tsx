'use client';

import styled from "styled-components";

// Re-using the same styles from the Privacy page for consistency
const PolicyContainer = styled.div`
<<<<<<< HEAD
  background: var(--window-background-color);
=======
  background: #fff;
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
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
<<<<<<< HEAD
  color: var(--peak-secondary);
=======
  color: #4A5568;
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869

  h1 {
    font-size: 3rem;
    font-weight: 800;
<<<<<<< HEAD
    color: var(--peak-primary);
    margin-bottom: 2rem;
    letter-spacing: -1px;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--peak-primary);
    margin-top: 3rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
=======
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
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
    padding-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
<<<<<<< HEAD

  strong {
    color: var(--peak-primary);
  }

  ul {
    list-style-position: outside;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--peak-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
=======
  
  ul {
    list-style-position: inside;
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
`;

export default function TermsOfServicePage() {
  return (
    <PolicyContainer>
      <ContentWrapper>
        <h1>Terms of Service</h1>
<<<<<<< HEAD
        <p><strong>Last Updated: July 3, 2026</strong></p>

        <p>
          Please read these Terms of Service (&ldquo;Terms&rdquo;) before using Peak Browser (&ldquo;Peak,&rdquo; &ldquo;the App,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
        </p>
        <p>
          By downloading, accessing, or using Peak, you agree to these Terms. If you do not agree, do not use the App.
        </p>

        <h2>1. App Store Terms</h2>
        <p>
          Peak is distributed through Apple platforms. Your use of Peak is also subject to Apple&apos;s App Store terms and, unless a separate custom license applies, Apple&apos;s Standard Licensed Application End User License Agreement.
        </p>

        <h2>2. What Peak Provides</h2>
        <p>
          Peak is a native Apple browser workspace that includes WebKit browsing, workspace profiles, bookmarks, saved sessions, activity history, notes, task boards, whiteboards, optional AI chat, local mesh collaboration, arcade/intermission tools, and related productivity features.
        </p>
        <p>
          Some features may be experimental, platform-specific, or dependent on Apple services, local network conditions, third-party providers, or user configuration.
        </p>

        <h2>3. Your Content</h2>
        <p>
          You retain ownership of the content you create or store in Peak, including notes, tasks, chats, whiteboards, bookmarks, sessions, files, mesh messages, and other workspace data.
        </p>
        <p>
          You are responsible for your content and for how you use, share, export, sync, or delete it. Peak does not claim ownership of your content.
        </p>

        <h2>4. Local Storage And iCloud</h2>
        <p>
          Peak stores workspace data locally on your device. If iCloud sync is enabled, your data may sync through your private Apple iCloud account using CloudKit.
        </p>
        <p>
          We do not operate a server that stores your Peak workspace data. However, Apple services, websites you visit, AI providers, and other third-party services may process data according to their own terms and privacy policies.
        </p>

        <h2>5. AI Features</h2>
        <p>AI features are optional.</p>
        <p>
          If you use OpenRouter or another cloud AI provider, you are responsible for your API key, provider account, usage, billing, and compliance with that provider&apos;s terms. Prompts, chat messages, selected context, and attachments needed for a request may be sent to the selected provider.
        </p>
        <p>
          If you use local Ollama, you are responsible for your local model setup, installed models, and local system behavior.
        </p>
        <p>
          Peak is not responsible for AI-generated output. You should review AI responses before relying on them.
        </p>

        <h2>6. Web Browsing And External Services</h2>
        <p>
          Peak uses WebKit to access websites and other online services. Websites, search engines, cloud AI providers, App Store services, iCloud, and other third-party services are external services.
        </p>
        <p>
          You use external services at your own risk. We are not responsible for third-party content, availability, accuracy, policies, billing, or data practices.
        </p>

        <h2>7. Mesh Collaboration</h2>
        <p>
          Peak Mesh is an optional local peer-to-peer collaboration feature. If you enable mesh features, you may share selected data with nearby peers, including messages, tabs, workspace signals, notes, task boards, whiteboards, AI chat sync, game invites, and gameplay state.
        </p>
        <p>
          You are responsible for what you choose to share and with whom. Do not use mesh features to harass, threaten, spam, impersonate, or share unlawful or harmful content.
        </p>

        <h2>8. Acceptable Use</h2>
        <p>You agree not to use Peak to:</p>
        <ul>
          <li>Violate applicable laws or regulations</li>
          <li>Infringe intellectual property or privacy rights</li>
          <li>Harass, abuse, threaten, or defame others</li>
          <li>Distribute malware or harmful content</li>
          <li>Attempt to interfere with Peak, Apple services, third-party services, or other users&apos; devices</li>
          <li>Abuse AI, web, or mesh features in ways that violate provider terms or applicable law</li>
        </ul>

        <h2>9. Purchases And Third-Party Costs</h2>
        <p>
          Peak may include free, paid, or platform-managed features. Any App Store purchases are handled by Apple.
        </p>
        <p>
          Third-party services such as OpenRouter, other AI providers, websites, or network services may charge separately. You are responsible for any third-party costs you incur.
        </p>

        <h2>10. No Professional Advice</h2>
        <p>
          Peak may display web content, AI output, notes, calculations, or other information. This content is for general use only and is not professional legal, medical, financial, security, or other regulated advice.
        </p>

        <h2>11. No Warranty</h2>
        <p>
          Peak is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We do not guarantee that the App will be uninterrupted, error-free, secure, compatible with every website, or suitable for every purpose.
        </p>
        <p>
          Some jurisdictions do not allow certain warranty exclusions, so parts of this section may not apply to you.
        </p>

        <h2>12. Limitation Of Liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of data, loss of profits, business interruption, or inability to use Peak.
        </p>
        <p>
          Some jurisdictions do not allow certain liability limitations, so parts of this section may not apply to you.
        </p>

        <h2>13. Changes To Peak Or These Terms</h2>
        <p>
          We may update Peak or these Terms from time to time. If the Terms change, we will update this page and revise the &ldquo;Last Updated&rdquo; date.
        </p>
        <p>
          Your continued use of Peak after changes means you accept the updated Terms.
        </p>

        <h2>14. Contact</h2>
        <p>
          If you have questions about these Terms, contact us at:{' '}
          <a href="mailto:Designr.pros@gmail.com">Designr.pros@gmail.com</a>
        </p>
      </ContentWrapper>
    </PolicyContainer>
  );
}
=======
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
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
