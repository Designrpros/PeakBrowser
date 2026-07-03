'use client';

import styled from "styled-components";

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

export default function PrivacyPolicyPage() {
  return (
    <PolicyContainer>
      <ContentWrapper>
        <h1>Privacy Policy</h1>
<<<<<<< HEAD
        <p><strong>Last Updated: July 3, 2026</strong></p>

        <p>
          Peak Browser (&ldquo;Peak,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is designed as a local-first browser workspace for Apple platforms. This Privacy Policy explains how information is handled when you use Peak.
        </p>

        <h2>Our Privacy Model</h2>
        <p>
          Peak does not run a built-in analytics pipeline, advertising tracker, or user-account service. We do not sell your data, and we do not operate servers that store your browsing history, notes, tasks, chats, whiteboards, bookmarks, or workspace data.
        </p>
        <p>
          Most Peak data is stored locally on your device. If iCloud sync is enabled, that data may sync through your private Apple iCloud account using CloudKit.
        </p>

        <h2>Information Stored On Your Device</h2>
        <p>Peak may store the following data locally so the app can function:</p>
        <ul>
          <li>Browsing history and search/activity logs</li>
          <li>Bookmarks and bookmark groups</li>
          <li>Saved sessions and workspaces</li>
          <li>Notes, note images, and attachments</li>
          <li>Kanban task boards</li>
          <li>AI chat history</li>
          <li>Whiteboards and whiteboard assets</li>
          <li>Mesh messages and peer/workspace metadata</li>
          <li>Arcade/game state where applicable</li>
          <li>App settings, workspace profiles, and preferences</li>
        </ul>
        <p>
          This data is stored in app-local storage such as Core Data, app support files, UserDefaults, and Apple Keychain where appropriate.
        </p>

        <h2>iCloud Sync</h2>
        <p>
          Peak can sync workspace data through your private iCloud account using Apple CloudKit. We do not have access to your private iCloud database. iCloud data is handled by Apple under Apple&apos;s privacy and iCloud terms.
        </p>

        <h2>API Keys And Secrets</h2>
        <p>
          If you add an OpenRouter API key, Peak stores it securely in Apple Keychain on your device. Your API key is used only to make requests to OpenRouter when you choose to use cloud AI features. It is not sent to our servers.
        </p>
        <p>
          Mesh passphrases and related encryption material are also stored using Keychain-backed storage where applicable.
        </p>

        <h2>AI Features</h2>
        <p>AI features are optional.</p>
        <p>
          If you use local Ollama models, requests are sent to your local Ollama service on your device or local machine.
        </p>
        <p>
          If you use OpenRouter or another cloud model route, your prompts, chat messages, selected context, and any attached content needed for the request may be sent to the selected AI provider through OpenRouter. Those providers process the request according to their own terms and privacy policies.
        </p>
        <p>
          Peak does not use your AI chats for our own training, analytics, or advertising.
        </p>

        <h2>Web Browsing And Search</h2>
        <p>
          Peak uses WebKit for browsing. When you visit websites or use a search engine, your device connects directly to those websites or services. Those third-party websites may collect information according to their own privacy policies.
        </p>
        <p>
          Peak does not control the privacy practices of websites you visit.
        </p>

        <h2>Local Mesh Collaboration</h2>
        <p>
          Peak Mesh is an optional local peer-to-peer feature for nearby collaboration. When enabled, Peak may share selected data with nearby peers, depending on your mesh settings. This can include chat messages, tab shares, workspace signals, note/task/whiteboard updates, AI chat sync, game invites, and gameplay state.
        </p>
        <p>
          Mesh traffic is designed for local peer-to-peer collaboration and does not use a Peak cloud relay. You control which workspace categories participate in mesh sharing.
        </p>

        <h2>Analytics And Tracking</h2>
        <p>
          Peak does not include built-in third-party analytics, advertising SDKs, or cross-app tracking. We do not sell personal information.
        </p>

        <h2>Data Deletion</h2>
        <p>
          You can delete Peak data from inside Settings. Depending on your configuration, deleting synced data may also remove it from your private iCloud-synced workspace.
        </p>
        <p>
          You may also remove the app from your device to delete local app data, subject to Apple platform behavior and any iCloud sync settings.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Peak is not directed to children under 13. We do not knowingly collect personal information from children.
        </p>

        <h2>Changes To This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at:{' '}
          <a href="mailto:Designr.pros@gmail.com">Designr.pros@gmail.com</a>
        </p>
      </ContentWrapper>
    </PolicyContainer>
  );
}
=======
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
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
