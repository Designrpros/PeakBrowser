'use client';

<<<<<<< HEAD
import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import {
    BookOpen, Layout, CheckSquare, Shield, Zap,
    Keyboard, Cpu, FileText, MessageSquare, Github,
    PenTool, Wifi, Gamepad2, Users, History, Lock
=======
import React, { useState } from 'react';
import styled from "styled-components";
import Link from "next/link";
import { 
    BookOpen, Layers, MessageSquare, Command, Github, 
    Layout, PenTool, CheckSquare, Shield, Zap, 
    Keyboard, Cpu, FileText, Terminal, FolderOpen,
    Network, AlertTriangle, Monitor, MousePointer2
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
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
<<<<<<< HEAD

=======
  
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
  &::-webkit-scrollbar { width: 0px; background: transparent; }

  @media (max-width: 768px) {
    display: none;
  }
`;

<<<<<<< HEAD
=======
const VersionToggle = styled.div`
  background-color: var(--control-background-color);
  padding: 4px;
  border-radius: 8px;
  display: flex;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
`;

const ToggleBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  border: none;
  background: ${props => props.$active ? 'var(--window-background-color)' : 'transparent'};
  color: ${props => props.$active ? 'var(--peak-primary)' : 'var(--peak-secondary)'};
  padding: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: ${props => props.$active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.2s;
  
  &:hover {
    color: var(--peak-primary);
  }
`;

>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
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
<<<<<<< HEAD

=======
  
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
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

<<<<<<< HEAD
  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
=======
  h1 { 
    font-size: 3rem; 
    font-weight: 800; 
    margin-bottom: 1.5rem; 
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
    color: var(--peak-primary);
    letter-spacing: -1px;
    background: linear-gradient(135deg, var(--peak-primary) 0%, var(--peak-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
<<<<<<< HEAD

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
=======
  
  h2 { 
    font-size: 2rem; 
    font-weight: 700; 
    margin-top: 4rem; 
    margin-bottom: 1.5rem; 
    padding-bottom: 0.75rem; 
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
    border-bottom: 1px solid var(--border-color);
    color: var(--peak-primary);
    display: flex;
    align-items: center;
    gap: 12px;
  }
<<<<<<< HEAD

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

=======
  
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
  
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
  code {
    background-color: var(--control-background-color);
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
    font-family: 'SF Mono', monospace;
    font-size: 0.9em;
    color: var(--peak-accent);
    border: 1px solid var(--border-color);
  }
<<<<<<< HEAD

=======
  
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
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
<<<<<<< HEAD

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
=======
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
`;

const NoteBox = styled.div`
  background-color: var(--control-background-color);
  border-left: 4px solid var(--peak-accent);
  padding: 1.5rem;
  border-radius: 0 12px 12px 0;
  margin: 2rem 0;
<<<<<<< HEAD

=======
  
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
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
<<<<<<< HEAD

=======
  
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
  h4 { margin: 0 0 0.5rem 0; color: var(--peak-primary); display: flex; align-items: center; gap: 8px; font-weight: 600; }
  p { margin: 0; font-size: 0.9rem; }
  svg { color: var(--peak-accent); }
`;

<<<<<<< HEAD
export default function DocsPage() {
=======
const WarningBanner = styled.div`
  background-color: rgba(255, 171, 0, 0.1);
  border: 1px solid rgba(255, 171, 0, 0.3);
  color: #d48806;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  
  svg { flex-shrink: 0; }
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 171, 0, 0.15);
    color: #ffc107;
    border-color: rgba(255, 171, 0, 0.2);
  }
`;

export default function DocsPage() {
  const [docMode, setDocMode] = useState<'native' | 'multi'>('native');
  
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
  const handleSectionClick = (sectionName: string) => {
    trackEvent({
        action: 'read_section',
        category: GA_CATEGORY.DOCS,
<<<<<<< HEAD
        label: sectionName
=======
        label: `${docMode.toUpperCase()} - ${sectionName}`
    });
  };

  const switchMode = (mode: 'native' | 'multi') => {
    setDocMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent({
        action: 'switch_docs_version',
        category: GA_CATEGORY.DOCS,
        label: mode
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
    });
  };

  return (
    <DocsWrapper>
      <Sidebar>
<<<<<<< HEAD
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
=======
        <VersionToggle>
            <ToggleBtn $active={docMode === 'native'} onClick={() => switchMode('native')}>
                <Zap size={14} style={{display:'inline', marginRight:6}} /> Native
            </ToggleBtn>
            <ToggleBtn $active={docMode === 'multi'} onClick={() => switchMode('multi')}>
                <Layers size={14} style={{display:'inline', marginRight:6}} /> Multi
            </ToggleBtn>
        </VersionToggle>

        {docMode === 'native' ? (
            <>
                <SidebarGroup>
                  <SidebarTitle>Start Here</SidebarTitle>
                  <SidebarLink href="#overview" onClick={() => handleSectionClick('Overview')}><BookOpen /> Overview</SidebarLink>
                  <SidebarLink href="#getting-started" onClick={() => handleSectionClick('Getting Started')}><Zap /> Getting Started</SidebarLink>
                  <SidebarLink href="#interface" onClick={() => handleSectionClick('Interface')}><Layout /> The Interface</SidebarLink>
                </SidebarGroup>
                
                <SidebarGroup>
                  <SidebarTitle>Productivity</SidebarTitle>
                  <SidebarLink href="#notes" onClick={() => handleSectionClick('Notes')}><FileText /> Block Notes</SidebarLink>
                  <SidebarLink href="#tasks" onClick={() => handleSectionClick('Tasks')}><CheckSquare /> Kanban Tasks</SidebarLink>
                  <SidebarLink href="#ai" onClick={() => handleSectionClick('AI')}><MessageSquare /> AI Companion</SidebarLink>
                </SidebarGroup>
                
                <SidebarGroup>
                  <SidebarTitle>System</SidebarTitle>
                  <SidebarLink href="#shortcuts" onClick={() => handleSectionClick('Shortcuts')}><Keyboard /> Hotkeys</SidebarLink>
                  <SidebarLink href="#privacy" onClick={() => handleSectionClick('Privacy')}><Shield /> Privacy & Data</SidebarLink>
                </SidebarGroup>
            </>
        ) : (
            <>
                <SidebarGroup>
                  <SidebarTitle>Start Here</SidebarTitle>
                  <SidebarLink href="#multi-overview" onClick={() => handleSectionClick('Overview')}><Layers /> Overview</SidebarLink>
                  <SidebarLink href="#project-view" onClick={() => handleSectionClick('Project View')}><FolderOpen /> Project View</SidebarLink>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarTitle>Creative Tools</SidebarTitle>
                  <SidebarLink href="#whiteboard" onClick={() => handleSectionClick('Whiteboard')}><MousePointer2 /> Whiteboard</SidebarLink>
                  <SidebarLink href="#mindmap" onClick={() => handleSectionClick('Mind Map')}><Network /> Mind Maps</SidebarLink>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarTitle>Developer</SidebarTitle>
                  <SidebarLink href="#terminal" onClick={() => handleSectionClick('Terminal')}><Terminal /> Terminal</SidebarLink>
                  <SidebarLink href="#kanban" onClick={() => handleSectionClick('Kanban')}><CheckSquare /> Kanban</SidebarLink>
                </SidebarGroup>
            </>
        )}
        
        <SidebarGroup>
          <SidebarTitle>Resources</SidebarTitle>
          <SidebarLink href="https://github.com/Designrpros/peak-multiplatform" target="_blank" onClick={() => handleSectionClick('GitHub')}><Github /> GitHub Repo</SidebarLink>
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
        </SidebarGroup>
      </Sidebar>

      <Content>
<<<<<<< HEAD
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
=======
        {docMode === 'native' ? (
            // --- NATIVE DOCS ---
            <>
                <section id="overview">
                  <h1>Peak Native Documentation</h1>
                  <p>
                     Peak Native is a lightweight, keyboard-centric browser built exclusively for macOS using Swift and SwiftUI. It lives in your menubar and is designed to eliminate friction between thought and action.
                  </p>
                  
                  <FeatureGrid>
                    <FeatureCard>
                        <h4><Zap size={18} /> Instant Access</h4>
                        <p>Summon Peak from anywhere with a global hotkey. It appears instantly and vanishes when you&apos;re done.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <h4><Cpu size={18} /> Native Performance</h4>
                        <p>Built on WebKit and Swift. Low memory footprint, smooth animations, and deep macOS integration.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <h4><Layers size={18} /> Multi-Modal Tabs</h4>
                        <p>Tabs aren&apos;t just for websites. A tab can be a Note, a Task Board, or an AI Chat session.</p>
                    </FeatureCard>
                  </FeatureGrid>
                </section>

                <section id="getting-started">
                  <h2><Zap /> Getting Started</h2>
                  
                  <h3>Installation</h3>
                  <p>
                    Peak Native is compatible with <strong>macOS 26.0</strong> and later. Download the <code>.dmg</code>, drag it to Applications, and launch.
                  </p>
                  
                  <h3>Global Hotkey</h3>
                  <p>
                    By default, you can summon Peak using <kbd>Control</kbd> + <kbd>1</kbd>. This toggles the window visibility from anywhere in the OS.
                  </p>
                  <NoteBox>
                     <p><strong>Tip:</strong> You can customize this shortcut in <strong>Settings &gt; General</strong> if you prefer something like <kbd>Cmd</kbd> + <kbd>1</kbd> or <kbd>Option</kbd> + <kbd>S</kbd>.</p>
                  </NoteBox>

                  <h3>Menubar Mode</h3>
                  <p>
                    Peak lives in your menu bar (top right of your screen). Clicking the Peak icon will also toggle the window. The app is designed to be transient—if you click outside the window, it will automatically hide (this behavior can be toggled in Settings).
                  </p>
                </section>

                <section id="interface">
                  <h2><Layout /> The Interface</h2>
                  <p>Peak moves away from the traditional &quot;address bar + viewport&quot; model. Instead, it uses a horizontal paging system:</p>

                  <ol>
                      <li><strong>Landing (Search):</strong> The starting point. Search the web, open favorites, or start a command.</li>
                      <li><strong>Dashboard (Swipe Left):</strong> A widget-based view where you can organize bookmarks into groups and view quick stats.</li>
                      <li><strong>Activity Hub (Swipe Right):</strong> A timeline of your recent tabs, notes, and chats.</li>
                      <li><strong>Workspaces (Far Right):</strong> Save your current tab setup as a named workspace (e.g., &quot;Coding&quot;, &quot;Research&quot;) and restore it later.</li>
                  </ol>
                </section>

                <section id="notes">
                    <h2><FileText /> Intelligent Notes</h2>
                    <p>
                        Peak includes a full-featured block editor. Unlike a simple text pad, Peak Notes allow you to mix rich media and structured data.
                    </p>

                    <h3>Creating a Note</h3>
                    <p>From the landing page, switch the input mode to <strong>Note</strong> and type a title. Alternatively, open the Inspector side panel.</p>

                    <h3>Block Types</h3>
                    <ul>
                        <li><strong>Headings &amp; Text:</strong> Standard rich text formatting.</li>
                        <li><strong>Code Blocks:</strong> Use <kbd>```swift</kbd> or <kbd>```python</kbd> to create syntax-highlighted code snippets.</li>
                        <li><strong>To-Do Lists:</strong> Create interactive checklists directly in your notes.</li>
                        <li><strong>Smart Links:</strong> Format links as <code>Display Text | url.com</code> for clean, readable hyperlinks.</li>
                        <li><strong>Images:</strong> Drag and drop images directly onto a note, or use the photo picker.</li>
                    </ul>

                    <NoteBox>
                        <p><strong>Export:</strong> You can export any note to <strong>PDF</strong> by clicking the share icon in the note toolbar.</p>
                    </NoteBox>
                </section>

                <section id="ai">
                    <h2><MessageSquare /> AI Companion</h2>
                    <p>
                        Peak integrates directly with <strong>OpenRouter</strong>, allowing you to use state-of-the-art models without a monthly subscription to each provider.
                    </p>

                    <h3>Supported Models</h3>
                    <p>Peak Native supports reasoning models and huge-context models, including:</p>
                    <ul>
                        <li><strong>DeepSeek R1</strong> (Reasoning enabled)</li>
                        <li><strong>GPT-5</strong> (Preview/Hypothetical access via OpenRouter)</li>
                        <li><strong>Claude 4 Sonnet</strong></li>
                        <li><strong>Google Gemini 3 Pro</strong></li>
                        <li><strong>Grok 4 Fast</strong></li>
                    </ul>

                    <h3>Configuration</h3>
                    <p>
                        Go to <strong>Settings &gt; API</strong> and enter your OpenRouter API Key. Your key is stored securely in the macOS Keychain and is never sent to our servers.
                    </p>

                    <h3>Image Generation</h3>
                    <p>
                        In the chat input, click the <strong>Image Icon</strong>. Peak uses <code>Gemini 2.5 Flash</code> for rapid, high-quality image generation based on your text prompts.
                    </p>
                </section>

                <section id="tasks">
                    <h2><CheckSquare /> Kanban Tasks</h2>
                    <p>
                        For project management, Peak offers native Kanban boards.
                    </p>
                    <ul>
                        <li><strong>Create:</strong> Type &quot;Project Name&quot; in the launcher and select <strong>Task</strong> mode.</li>
                        <li><strong>Columns:</strong> Add custom columns (To Do, In Progress, Done).</li>
                        <li><strong>Drag &amp; Drop:</strong> Drag tasks between columns to update their status.</li>
                        <li><strong>Persistence:</strong> Boards are saved locally using CoreData.</li>
                    </ul>
                </section>

                <section id="shortcuts">
                    <h2><Keyboard /> Essential Hotkeys</h2>
                    <p>Master Peak with these shortcuts:</p>
                    
                    <table>
                        <tbody>
                            <tr>
                                <td width="150"><kbd>Ctrl</kbd> + <kbd>1</kbd></td>
                                <td>Toggle Peak Window (Global)</td>
                            </tr>
                            <tr>
                                <td><kbd>Cmd</kbd> + <kbd>N</kbd></td>
                                <td>New Tab (Opens Launcher)</td>
                            </tr>
                            <tr>
                                <td><kbd>Cmd</kbd> + <kbd>W</kbd></td>
                                <td>Close Current Tab</td>
                            </tr>
                            <tr>
                                <td><kbd>Cmd</kbd> + <kbd>R</kbd></td>
                                <td>Refresh WebTab</td>
                            </tr>
                            <tr>
                                <td><kbd>Cmd</kbd> + <kbd>,</kbd></td>
                                <td>Open Settings</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section id="privacy">
                    <h2><Shield /> Privacy &amp; Data</h2>
                    <p>
                        Peak is designed with a <strong>Local-First</strong> philosophy. We do not track your browsing history or store your notes on our servers.
                    </p>

                    <h3>Granular Data Management</h3>
                    <p>In <strong>Settings &gt; Privacy</strong>, you have complete control over your data. You can granularly wipe:</p>
                    <ul>
                        <li>Browsing History (Websites visited)</li>
                        <li>Saved Sessions (Workspaces)</li>
                        <li>Chat Logs (AI conversations)</li>
                        <li>Notes &amp; Attachments</li>
                        <li>Bookmarks</li>
                    </ul>
                    <p>
                        Or use the <strong>Reset All Data</strong> button to return the app to a factory-fresh state.
                    </p>
                </section>
            </>
        ) : (
            // --- MULTIPLATFORM DOCS ---
            <>
                <section id="multi-overview">
                    <h1>Peak Multiplatform</h1>
                    <WarningBanner>
                        <AlertTriangle size={24} />
                        <div>
                            <strong>Developer Preview:</strong> Peak Multiplatform is currently in active development. Features may change rapidly, and you might encounter bugs. Please report issues on GitHub.
                        </div>
                    </WarningBanner>
                    
                    <p>
                        Peak Multiplatform is a comprehensive Workspace OS built with Electron. It brings the philosophy of Peak to Windows, Linux, and macOS, adding powerful developer tools like an Integrated Terminal, Project Explorer, and Infinite Canvas.
                    </p>
                    
                    <FeatureGrid>
                        <FeatureCard>
                            <h4><Monitor size={18} /> Cross-Platform</h4>
                            <p>Seamless experience on macOS (Intel/Silicon), Windows, and Linux (Debian/RPM/AppImage).</p>
                        </FeatureCard>
                        <FeatureCard>
                            <h4><FolderOpen size={18} /> Project View</h4>
                            <p>A full file explorer and code editor embedded directly in your workspace tabs.</p>
                        </FeatureCard>
                        <FeatureCard>
                            <h4><MousePointer2 size={18} /> Infinite Canvas</h4>
                            <p>Sketch, diagram, and brainstorm with an advanced whiteboard tool.</p>
                        </FeatureCard>
                    </FeatureGrid>
                </section>

                <section id="project-view">
                    <h2><FolderOpen /> Project View</h2>
                    <p>
                        The Project View turns Peak into a lightweight IDE. It allows you to open any folder on your computer as a workspace tab.
                    </p>
                    <ul>
                        <li><strong>File Tree:</strong> Browse, create, delete, and rename files/folders with context menus.</li>
                        <li><strong>Code Editor:</strong> Built-in syntax highlighting for JS, TS, HTML, CSS, Python, and more.</li>
                        <li><strong>Integrated Terminal:</strong> Each project has its own terminal instance rooted in the project directory.</li>
                        <li><strong>Problems Panel:</strong> View diagnostics and errors directly within the project tab.</li>
                    </ul>
                </section>

                <section id="whiteboard">
                    <h2><MousePointer2 /> Infinite Whiteboard</h2>
                    <p>
                        A visual thinking space for diagrams and flowcharts. The whiteboard supports:
                    </p>
                    <ul>
                        <li><strong>Tools:</strong> Rectangle, Circle, Line, Freehand Draw, Text, and Eraser.</li>
                        <li><strong>Navigation:</strong> Infinite panning and zooming using on-screen controls or mouse gestures.</li>
                        <li><strong>Images:</strong> Drag and drop images directly onto the canvas.</li>
                        <li><strong>Persistence:</strong> Boards are saved automatically to your local database.</li>
                    </ul>
                </section>

                <section id="mindmap">
                    <h2><Network /> Mind Maps</h2>
                    <p>
                        A dedicated mode for structured brainstorming.
                    </p>
                    <ul>
                        <li><strong>Auto-Layout:</strong> Nodes automatically arrange themselves in a logical tree structure.</li>
                        <li><strong>Keyboard Driven:</strong> Press <kbd>Tab</kbd> to add a child node, <kbd>Enter</kbd> for a sibling node.</li>
                        <li><strong>Collapsible:</strong> Double-click nodes to edit text; drag nodes to reorganize branches.</li>
                    </ul>
                </section>

                <section id="terminal">
                    <h2><Terminal /> Integrated Terminal</h2>
                    <p>
                        Peak Multiplatform embeds a full xterm.js terminal emulator.
                    </p>
                    <ul>
                        <li><strong>Shell Support:</strong> Automatically detects your system shell (zsh, bash, powershell).</li>
                        <li><strong>Theming:</strong> Terminal colors sync with the app&apos;s Light/Dark mode preferences.</li>
                        <li><strong>Multiple Instances:</strong> Run separate terminal sessions for different tabs or projects.</li>
                    </ul>
                </section>
                
                <section id="kanban">
                    <h2><CheckSquare /> Kanban Boards</h2>
                    <p>
                        Similar to the Native version, Multiplatform includes a Kanban board, but with additional desktop-class features:
                    </p>
                    <ul>
                        <li><strong>Inline Editing:</strong> Double-click any card or column title to edit it instantly.</li>
                        <li><strong>Color Tags:</strong> Right-click cards to cycle through priority colors.</li>
                        <li><strong>Drag &amp; Drop:</strong> Smooth drag interactions for cards and columns.</li>
                    </ul>
                </section>
            </>
        )}
      </Content>
    </DocsWrapper>
  );
}
>>>>>>> 0ad4fa7d52b391ce7555aa0011289117ffed3869
