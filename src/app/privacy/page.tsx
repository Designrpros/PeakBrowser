'use client';

import styled from "styled-components";

const PolicyContainer = styled.div`
  background: var(--window-background-color);
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
  color: var(--peak-secondary);

  h1 {
    font-size: 3rem;
    font-weight: 800;
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
    padding-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

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
`;

export default function PrivacyPolicyPage() {
  return (
    <PolicyContainer>
      <ContentWrapper>
        <h1>Privacy Policy</h1>
        <p><strong>Last Updated: July 15, 2026</strong></p>

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
        <p>
          Some optional features do reach outside your device: cloud AI models, the websites you browse, and Peak Surf&apos;s weather, map, and country data. Each is described below, and none of them is required to use Peak.
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

        <h2>Peak Surf: Waves, Weather, Maps, And Country Data</h2>
        <p>
          Peak Surf is optional, and it is the only part of Peak that contacts third-party data services. Everything in this section applies only when you use it.
        </p>

        <p>
          <strong>Waves are simulated on your device.</strong> By default, Peak generates swell height, period, and direction locally using its own model. These figures are a plausible simulation, not a forecast. They are labelled &ldquo;Simulated&rdquo; wherever they appear, nothing about them is sent anywhere, and they must never be used to judge whether it is safe to enter the water.
        </p>

        <p>
          <strong>Weather comes from Apple Weather.</strong> To show wind, cloud, precipitation, and sunrise and sunset times for a surf spot, the coordinates of that spot are sent to Apple&apos;s WeatherKit service. WeatherKit provides no ocean swell, which is why wave data comes from a separate source. Apple handles this data under Apple&apos;s own privacy policy. See{' '}
          <a href="https://weatherkit.apple.com/legal-attribution.html">Apple Weather data sources</a>.
        </p>

        <p>
          <strong>Open-Meteo is opt-in and needs your own API key.</strong> Peak does not contact Open-Meteo unless you add your own Open-Meteo API key under Settings &rarr; Surf &rarr; Surf Data. Their free endpoint is licensed for non-commercial use only and Peak does not use it. If you add a key, the coordinates of spots you view are sent to Open-Meteo to fetch weather, marine conditions, and sunrise and sunset times, and Peak shows the attribution &ldquo;Weather data by Open-Meteo.com&rdquo; that their CC BY 4.0 licence requires. Open-Meteo states that their server logs may retain information such as IP addresses, requested URLs, and the coordinates within them for up to 90 days. Your key is stored on your device. See the{' '}
          <a href="https://open-meteo.com/en/license">Open-Meteo licence</a> and their{' '}
          <a href="https://open-meteo.com/en/terms">terms and privacy policy</a>.
        </p>

        <p>
          <strong>Country summaries come from Wikipedia.</strong> When you open a country in the surf travel passport, its name is sent to Wikipedia&apos;s API to fetch a summary. That text is contributed by Wikipedia&apos;s volunteer editors and reused under{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; Peak links to the specific article it quotes. Requests are handled by the Wikimedia Foundation under the{' '}
          <a href="https://foundation.wikimedia.org/wiki/Policy:Privacy_policy/en">Wikimedia privacy policy</a>.
        </p>

        <p>
          <strong>Country indicators come from World Bank Open Data.</strong> Population, GDP per person, fertility, and life expectancy figures are fetched by sending a country code to the World Bank API. This data is licensed CC BY 4.0. See the{' '}
          <a href="https://data.worldbank.org/summary-terms-of-use">World Bank terms of use</a>.
        </p>

        <p>
          <strong>Maps come from Apple.</strong> Maps, satellite imagery, and geographic presentation are provided by Apple Maps through MapKit, which displays its own attribution on the map itself. See{' '}
          <a href="https://developer.apple.com/documentation/mapkit">MapKit</a>.
        </p>

        <p>
          Forecast and country information may be cached on your device so Peak does not repeatedly re-request it. Peak does not sell any of this information, and does not use it for advertising or tracking.
        </p>

        <h2>Location</h2>
        <p>
          Peak requests your location only when you use a feature that needs it: finding the coast nearest you when you set up a home break in Peak Surf, showing where you are on the surf travel map, and estimating flight distances. You can decline or revoke this permission at any time in your system settings, and those features fall back to a home coast you choose yourself.
        </p>
        <p>
          <strong>Before any location leaves your device, Peak rounds it to roughly one kilometre.</strong> The unrounded position is used only on your device, to draw your own position on the map. The rounded coordinate is what gets sent to Apple Weather to fetch conditions, to Apple&apos;s geocoder to resolve a country name, and, only if you have configured your own key, to Open-Meteo.
        </p>
        <p>
          Peak does not store your location on our servers, does not link it to an identity or an account, and does not use it for advertising or tracking.
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
