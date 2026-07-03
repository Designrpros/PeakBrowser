'use client';

import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import {
    BookOpen, Layout, CheckSquare, Shield, Zap,
    Keyboard, Cpu, FileText, MessageSquare, Github,
    PenTool, Wifi, Gamepad2, Users, History, Lock
} from 'lucide-react';
import { trackEvent, GA_CATEGORY } from '@/lib/analytics';

// --- STYLED COMPONENTS ---

const DocsWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  padding-top: 60px;
  background-color: var(--window-background-color);
  color: var(--peak-primary);
`;

const Sidebar = styled.aside`
  width: 280px;
  height: calc(100vh - 60px);
  position: fixed;
  left: 0;
  top: 60px;
  background-color: var(--text-background-color);
  border-right: 1px solid var(--border-color);
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar { width: 0px; background: transparent; }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarGroup = styled.div`
  margin-bottom: 2.5rem;
`;

const SidebarTitle = styled.h4`
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--peak-secondary);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  font-weight: 700;
  padding-left: 0.5rem;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--peak-primary);
  text-decoration: none;
  padding: 0.6rem 0.5rem;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: all 0.2s;
  opacity: 0.8;
  font-weight: 500;

  &:hover {
    background-color: var(--control-background-color);
    opacity: 1;
    transform: translateX(4px);
  }

  svg {
    width: 18px;
    height: 18px;
    color: var(--peak-accent);
    opacity: 0.8;
  }
`;

const Content = styled.main`
  margin-left: 280px;
  padding: 4rem 6rem;
  max-width: 1100px;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 2rem 1.5rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: var(--peak-primary);
    letter-spacing: -1px;
    background: linear-gradient(135deg, var(--peak-primary) 0%, var(--peak-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-color);
    color: var(--peak-primary);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: var(--peak-primary);
  }

  p {
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: var(--peak-secondary);
    font-size: 1.05rem;
  }

  p strong { color: var(--peak-primary); }

  p a {
    color: var(--peak-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--peak-secondary);
  }

  li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
    padding-left: 0.5rem;
  }

  li strong { color: var(--peak-primary); }

  code {
    background-color: var(--control-background-color);
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
    font-family: 'SF Mono', monospace;
    font-size: 0.9em;
    color: var(--peak-accent);
    border: 1px solid var(--border-color);
  }

  pre {
    background-color: var(--control-background-color);
    border: 1px solid var(--border-color);
    color: var(--peak-primary);
    padding: 1.5rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 1.5rem 0;
    font-family: 'SF Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  kbd {
    background-color: var(--window-background-color);
    border: 1px solid var(--border-color);
    border-bottom: 2px solid var(--border-color);
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.85em;
    font-family: inherit;
    font-weight: 600;
    color: var(--peak-primary);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  th, td {
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border-color);
    color: var(--peak-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  th {
    color: var(--peak-primary);
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const NoteBox = styled.div`
  background-color: var(--control-background-color);
  border-left: 4px solid var(--peak-accent);
  padding: 1.5rem;
  border-radius: 0 12px 12px 0;
  margin: 2rem 0;

  p { margin: 0; color: var(--peak-primary); font-size: 0.95rem; }
  strong { color: var(--peak-primary); }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const FeatureCard = styled.div`
  background: var(--window-background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;

  h4 { margin: 0 0 0.5rem 0; color: var(--peak-primary); display: flex; align-items: center; gap: 8px; font-weight: 600; }
  p { margin: 0; font-size: 0.9rem; }
  svg { color: var(--peak-accent); }
`;

export default function DocsPage() {
  const handleSectionClick = (sectionName: string) => {
    trackEvent({
        action: 'read_section',
        category: GA_CATEGORY.DOCS,
        label: sectionName
    });
  };

  return (
    <DocsWrapper>
      <Sidebar>
        <SidebarGroup>
          <SidebarTitle>Start Here</SidebarTitle>
          <SidebarLink href="#overview" onClick={() => handleSectionClick('Overview')}><BookOpen /> Overview</SidebarLink>
          <SidebarLink href="#getting-started" onClick={() => handleSectionClick('Getting Started')}><Zap /> Getting Started</SidebarLink>
          <SidebarLink href="#root-pages" onClick={() => handleSectionClick('Root Pages')}><Layout /> Root Pages</SidebarLink>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarTitle>Browsing</SidebarTitle>
          <SidebarLink href="#dashboard" onClick={() => handleSectionClick('Dashboard & Activity')}><History /> Dashboard &amp; Activity</SidebarLink>
          <SidebarLink href="#profiles" onClick={() => handleSectionClick('Profiles & Incognito')}><Users /> Profiles &amp; Incognito</SidebarLink>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarTitle>Workspace</SidebarTitle>
          <SidebarLink href="#notes" onClick={() => handleSectionClick('Notes')}><FileText /> Block Notes</SidebarLink>
          <SidebarLink href="#tasks" onClick={() => handleSectionClick('Tasks')}><CheckSquare /> Kanban Tasks</SidebarLink>
          <SidebarLink href="#whiteboards" onClick={() => handleSectionClick('Whiteboards')}><PenTool /> Whiteboards</SidebarLink>
          <SidebarLink href="#ai" onClick={() => handleSectionClick('Optional AI')}><MessageSquare /> Optional AI</SidebarLink>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarTitle>Collaboration</SidebarTitle>
          <SidebarLink href="#mesh" onClick={() => handleSectionClick('Local Mesh')}><Wifi /> Local Mesh</SidebarLink>
          <SidebarLink href="#arcade" onClick={() => handleSectionClick('Arcade & Intermission')}><Gamepad2 /> Arcade &amp; Intermission</SidebarLink>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarTitle>System</SidebarTitle>
          <SidebarLink href="#shortcuts" onClick={() => handleSectionClick('Shortcuts')}><Keyboard /> Hotkeys</SidebarLink>
          <SidebarLink href="#privacy" onClick={() => handleSectionClick('Privacy')}><Shield /> Privacy &amp; Data</SidebarLink>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarTitle>Resources</SidebarTitle>
          <SidebarLink href="https://github.com/Designrpros/PeakBrowser" target="_blank" onClick={() => handleSectionClick('GitHub')}><Github /> GitHub Repo</SidebarLink>
        </SidebarGroup>
      </Sidebar>

      <Content>
        <section id="overview">
          <h1>Peak Browser Documentation</h1>
          <p>
            Peak Browser is a native Apple browser workspace for quick lookups, saved context, focused work, optional AI, and nearby collaboration. It is built with SwiftUI and WebKit, and runs across Apple platforms with a local-first privacy model.
          </p>
          <p>
            Peak is not just an address bar with tabs. It is a summonable workspace where a lookup can become a note, task board, AI chat, whiteboard, saved session, mesh conversation, or even a short intermission game.
          </p>

          <FeatureGrid>
            <FeatureCard>
                <h4><Zap size={18} /> Instant Access</h4>
                <p>On macOS, summon Peak from anywhere with a global hotkey. Open it when you need it, search or capture something, then return to your flow.</p>
            </FeatureCard>
            <FeatureCard>
                <h4><Cpu size={18} /> Native Apple Workspace</h4>
                <p>Native SwiftUI, WebKit, Core Data, CloudKit, Keychain, and MultipeerConnectivity. Web tabs use real WebKit views.</p>
            </FeatureCard>
            <FeatureCard>
                <h4><Lock size={18} /> Local-First By Design</h4>
                <p>Workspace data stays on-device and can sync through your private iCloud. API keys live in Keychain. No built-in analytics.</p>
            </FeatureCard>
          </FeatureGrid>

          <p>
            Alongside real WebKit web tabs, app-native tabs can hold notes, Kanban boards, AI chats, whiteboards, mesh rooms, arcade games, and local tools.
          </p>
        </section>

        <section id="getting-started">
          <h2><Zap /> Getting Started</h2>

          <h3>Installation</h3>
          <p>
            Peak Browser is available for Apple platforms. The current app targets <strong>macOS 14.0+</strong> and <strong>iOS/iPadOS 17.0+</strong>.
          </p>
          <p>
            Download Peak from the <a href="https://apps.apple.com/app/peak-browser/id6753611346" target="_blank" rel="noopener noreferrer">App Store</a>, launch it, and complete the welcome flow.
          </p>

          <h3>Global Hotkey</h3>
          <p>On Mac, Peak can be summoned with:</p>
          <table>
            <thead>
              <tr><th>Shortcut</th><th>Action</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><kbd>Control</kbd> + <kbd>1</kbd></td>
                <td>Toggle Peak window</td>
              </tr>
            </tbody>
          </table>
          <p>
            You can change this in Settings. Peak supports Command, Shift, Option, and Control modifier combinations.
          </p>

          <h3>Menu Bar Mode</h3>
          <p>
            On macOS, Peak can sit in the menu bar. Clicking the Peak icon toggles the window. Peak can also hide automatically when it loses focus, which makes it feel more like a fast command workspace than a traditional browser window.
          </p>
          <NoteBox>
            <p><strong>Tip:</strong> This behavior can be changed in Settings.</p>
          </NoteBox>
        </section>

        <section id="root-pages">
          <h2><Layout /> Root Pages</h2>
          <p>Peak&apos;s root experience is a horizontal workspace with five major pages:</p>

          <ol>
            <li><strong>Landing:</strong> The starting point. One input to search the web, open a URL, create a note, start a task board, begin an AI chat, or create a whiteboard.</li>
            <li><strong>Dashboard:</strong> Your local command center — profiles, incognito, bookmarks, saved sessions, and jump-back entries.</li>
            <li><strong>Activity Hub:</strong> A timeline of recent searches, pages, notes, boards, chats, and whiteboards.</li>
            <li><strong>Arcade Hub:</strong> An Intermission area with short games and focus tools.</li>
            <li><strong>Mesh Hub:</strong> The local peer-to-peer collaboration layer for nearby devices.</li>
          </ol>

          <h3>One Input, Many Outcomes</h3>
          <p>The landing input supports multiple modes:</p>
          <ul>
            <li><strong>Search</strong> — search the web or open a URL</li>
            <li><strong>Whiteboard</strong> — create an infinite canvas</li>
            <li><strong>Tasks</strong> — start a Kanban board</li>
            <li><strong>Note</strong> — capture a block-based note</li>
            <li><strong>LLM chat</strong> — begin an AI conversation</li>
          </ul>

          <h3>Search Engines</h3>
          <p>
            Search supports multiple engines, including DuckDuckGo, Google, Bing, Brave Search, Startpage, Wikipedia, Stack Overflow, GitHub, MDN, Google Scholar, WolframAlpha, YouTube, Unsplash, and IMDb.
          </p>
        </section>

        <section id="dashboard">
          <h2><History /> Dashboard &amp; Activity</h2>
          <p>
            The dashboard is your local command center. It includes workspace profiles, incognito mode, bookmarks, bookmark groups, saved tab sessions, activity summaries, and jump-back entries for recent work.
          </p>

          <h3>Activity Hub</h3>
          <p>
            The Activity Hub shows recent searches, visited pages, created notes, task boards, chats, whiteboards, and other workspace events. It helps you return to useful context without relying on memory.
          </p>
        </section>

        <section id="profiles">
          <h2><Users /> Profiles &amp; Incognito</h2>
          <p>
            Workspace profiles isolate cookies, sessions, caches, and local web storage, so personal, work, and sandbox browsing can stay separate.
          </p>
          <p>
            Incognito mode avoids history and activity persistence — browse without leaving a trail in your workspace.
          </p>
        </section>

        <section id="notes">
          <h2><FileText /> Block Notes</h2>
          <p>
            Peak Notes are block-based documents for capturing structured thoughts without leaving the browser workspace.
          </p>

          <h3>Creating A Note</h3>
          <p>
            From the landing page, switch the input mode to <strong>Note</strong>, type a title or first idea, and submit. Peak creates a new note tab immediately. You can also open notes from the Notes inspector.
          </p>

          <h3>Block Types</h3>
          <ul>
            <li>Headings</li>
            <li>Paragraphs</li>
            <li>To-do blocks</li>
            <li>Code blocks</li>
            <li>Markdown blocks</li>
            <li>Links</li>
            <li>Separators</li>
            <li>Images</li>
          </ul>
          <p>
            Images can be added through drag and drop or file input.
          </p>
          <NoteBox>
            <p><strong>Export:</strong> On macOS, notes can be exported to PDF.</p>
          </NoteBox>

          <h3>Mesh-Aware Notes</h3>
          <p>
            When mesh sync is enabled, note changes can be represented as structured workspace deltas and shared with nearby peers.
          </p>
        </section>

        <section id="tasks">
          <h2><CheckSquare /> Kanban Tasks</h2>
          <p>
            Peak includes native Kanban boards for lightweight project tracking.
          </p>

          <h3>Creating A Board</h3>
          <p>
            From the landing page, switch the input mode to <strong>Tasks</strong>, enter a board name, and submit. Peak opens the new task board in a tab.
          </p>

          <h3>Boards And Cards</h3>
          <p>
            Task boards support lanes, cards, drag-and-drop movement, and local persistence through Core Data. Boards can also participate in mesh workspace sync when enabled.
          </p>
        </section>

        <section id="whiteboards">
          <h2><PenTool /> Whiteboards</h2>
          <p>
            Peak includes an infinite whiteboard workspace for visual thinking, diagrams, maps, files, and lightweight design work.
          </p>

          <h3>Whiteboard Tools</h3>
          <ul>
            <li>Select and pan</li>
            <li>Freehand drawing</li>
            <li>Lines, arrows, elbow connectors, and curved connectors</li>
            <li>Rectangles, circles, diamonds, triangles, inverse triangles, and cylinders</li>
            <li>Text, sticky notes, and tables</li>
            <li>Images, documents, videos, audio notes, and web embeds</li>
            <li>Groups and layer organization</li>
            <li>Export controls for selected elements</li>
            <li>Lucide icon assets</li>
            <li>World, continent, and country map assets</li>
          </ul>
          <p>
            Whiteboards can also sync through Peak Mesh when enabled.
          </p>
        </section>

        <section id="ai">
          <h2><MessageSquare /> Optional AI</h2>
          <p>
            AI in Peak is optional. You can use it when it helps, or ignore it when you want Peak to remain a quiet browser workspace.
          </p>

          <h3>Local AI</h3>
          <p>
            Peak can discover local <strong>Ollama</strong> models from your machine and expose them as local chat models. Local model requests stay on-device through your Ollama setup.
          </p>

          <h3>Cloud AI</h3>
          <p>
            Peak can use <strong>OpenRouter</strong> for cloud model access. Add your OpenRouter API key in Settings. Your key is stored securely in Apple Keychain.
          </p>
          <p>Current cloud model routes include:</p>
          <ul>
            <li>Auto Routing</li>
            <li>Gemini Pro</li>
            <li>Gemini Flash</li>
            <li>GPT Latest</li>
            <li>GPT Mini</li>
            <li>Claude Opus</li>
            <li>Claude Sonnet</li>
            <li>DeepSeek V4 Pro</li>
            <li>DeepSeek V4 Flash</li>
            <li>Kimi Latest</li>
          </ul>
          <NoteBox>
            <p><strong>Note:</strong> Model availability depends on OpenRouter and your account configuration.</p>
          </NoteBox>

          <h3>AI Chat Tabs</h3>
          <p>
            AI chats live as normal Peak tabs, so you can keep a chat beside websites, notes, tasks, and whiteboards. Peak can also use web-search grounding when enabled.
          </p>
        </section>

        <section id="mesh">
          <h2><Wifi /> Local Mesh</h2>
          <p>
            Peak Mesh connects nearby Apple devices for local collaboration. It uses Apple <strong>MultipeerConnectivity</strong> for nearby discovery, chat, tab sharing, workspace sync, and game invites without accounts or a cloud relay.
          </p>

          <h3>Mesh Capabilities</h3>
          <ul>
            <li>Peer discovery</li>
            <li>Mesh chat</li>
            <li>Tab sharing</li>
            <li>Shared workspace signals</li>
            <li>Note deltas</li>
            <li>Task board deltas</li>
            <li>Whiteboard deltas</li>
            <li>AI chat sync</li>
            <li>Game invites</li>
            <li>Multiplayer game state</li>
          </ul>
          <NoteBox>
            <p><strong>Opt-in by design:</strong> Mesh does not use a cloud relay. Workspace categories are controlled by user-facing toggles, so Peak does not silently broadcast everything.</p>
          </NoteBox>
        </section>

        <section id="arcade">
          <h2><Gamepad2 /> Arcade &amp; Intermission</h2>
          <p>
            Peak includes an Intermission area with short games and focus tools — take a break without leaving the workspace.
          </p>
          <p>
            Current arcade and pastime surfaces include games like <strong>Peak Runner</strong>, <strong>Bit Copter</strong>, <strong>Cache Breaker</strong>, <strong>Bit Artillery</strong>, <strong>Global Conquest</strong>, and <strong>Matrix Chess</strong>, plus focus spaces like breathing, rain, slideshows, and motion tools.
          </p>
          <NoteBox>
            <p><strong>Multiplayer:</strong> Some games support local mesh multiplayer — invite nearby devices into a lobby.</p>
          </NoteBox>
        </section>

        <section id="shortcuts">
          <h2><Keyboard /> Essential Hotkeys</h2>
          <p>Master Peak with these shortcuts:</p>

          <table>
            <thead>
              <tr><th>Shortcut</th><th>Action</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><kbd>Control</kbd> + <kbd>1</kbd></td>
                <td>Toggle Peak window globally on macOS</td>
              </tr>
              <tr>
                <td><kbd>Cmd</kbd> + <kbd>N</kbd></td>
                <td>New tab</td>
              </tr>
              <tr>
                <td><kbd>Cmd</kbd> + <kbd>W</kbd></td>
                <td>Close current tab</td>
              </tr>
              <tr>
                <td><kbd>Cmd</kbd> + <kbd>R</kbd></td>
                <td>Refresh current web tab</td>
              </tr>
              <tr>
                <td><kbd>Cmd</kbd> + <kbd>1</kbd>...<kbd>9</kbd></td>
                <td>Switch to tab 1 through 9</td>
              </tr>
            </tbody>
          </table>
          <p>
            Whiteboards also include their own tool shortcuts, including select, pan, draw, text, sticky notes, shapes, arrows, grouping, duplication, zoom, and delete.
          </p>
        </section>

        <section id="privacy">
          <h2><Shield /> Privacy &amp; Data</h2>
          <p>
            Peak is designed around local ownership and explicit control.
          </p>

          <h3>What Peak Stores Locally</h3>
          <ul>
            <li>Browsing history</li>
            <li>Saved sessions</li>
            <li>Bookmarks</li>
            <li>Activity logs</li>
            <li>Notes</li>
            <li>Task boards</li>
            <li>AI chat history</li>
            <li>Whiteboards</li>
            <li>Workspace profiles</li>
            <li>Dashboard layout</li>
            <li>Mesh message history</li>
          </ul>
          <p>
            This data is stored locally and can sync through the user&apos;s private iCloud account using CloudKit.
          </p>

          <h3>What Peak Does Not Do</h3>
          <p>
            Peak does not ship with built-in analytics. It does not require a Peak account for local workspace use. Mesh collaboration does not require a cloud relay.
          </p>
          <p>
            Cloud AI and web search are opt-in workflows. If you use cloud AI, prompts are sent to the configured provider through OpenRouter. If you use local Ollama, model requests stay local to your machine.
          </p>

          <h3>Data Management</h3>
          <p>
            Settings include privacy controls for clearing workspace data, including history, sessions, chats, notes, bookmarks, task boards, whiteboards, activity, dashboard data, tags, and mesh message history.
          </p>
        </section>
      </Content>
    </DocsWrapper>
  );
}
