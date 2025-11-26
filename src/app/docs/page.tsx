'use client';

import styled from "styled-components";
import Link from "next/link";
import { BookOpen, Terminal, Layers, MessageSquare, Command, Github } from 'lucide-react';

// --- STYLED COMPONENTS ---

const DocsWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  padding-top: 60px; /* Navbar offset */
  background-color: var(--window-background-color);
  color: var(--peak-primary);
`;

const Sidebar = styled.aside`
  width: 260px;
  height: calc(100vh - 60px);
  position: fixed;
  left: 0;
  top: 60px;
  background-color: var(--text-background-color); /* Slightly distinct from window bg if needed, or same */
  border-right: 1px solid var(--border-color);
  padding: 2rem 1.5rem;
  overflow-y: auto;
  
  /* Hide scrollbar for cleaner look */
  &::-webkit-scrollbar { width: 0px; background: transparent; }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarGroup = styled.div`
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h4`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--peak-secondary);
  letter-spacing: 0.05em;
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
  transition: background-color 0.2s, color 0.2s;
  opacity: 0.8;

  &:hover {
    background-color: var(--control-background-color);
    opacity: 1;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: var(--peak-accent);
  }
`;

const Content = styled.main`
  margin-left: 260px;
  padding: 4rem 5rem;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 2rem 1.5rem;
  }

  h1 { 
    font-size: 2.5rem; 
    font-weight: 800; 
    margin-bottom: 1.5rem; 
    color: var(--peak-primary);
    letter-spacing: -0.5px;
  }
  
  h2 { 
    font-size: 1.75rem; 
    font-weight: 700; 
    margin-top: 3.5rem; 
    margin-bottom: 1.5rem; 
    padding-bottom: 0.75rem; 
    border-bottom: 1px solid var(--border-color);
    color: var(--peak-primary);
  }
  
  h3 { 
    font-size: 1.25rem; 
    font-weight: 600; 
    margin-top: 2rem; 
    margin-bottom: 0.75rem; 
    color: var(--peak-primary);
  }
  
  p { 
    line-height: 1.7; 
    margin-bottom: 1.25rem; 
    color: var(--peak-secondary);
    font-size: 1.05rem;
  }
  
  ul { 
    padding-left: 1.5rem; 
    margin-bottom: 1.5rem; 
    color: var(--peak-secondary);
  }
  
  li { 
    margin-bottom: 0.5rem; 
    line-height: 1.6;
  }
  
  /* Inline Code */
  code {
    background-color: var(--control-background-color);
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
    font-family: 'SF Mono', monospace;
    font-size: 0.9em;
    color: var(--peak-accent);
    border: 1px solid var(--border-color);
  }
  
  /* Code Blocks */
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
  }
  
  strong {
    color: var(--peak-primary);
    font-weight: 600;
  }
`;

const NoteBox = styled.div`
  background-color: var(--control-background-color);
  border-left: 4px solid var(--peak-accent);
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
  margin: 2rem 0;
  
  p { margin: 0; color: var(--peak-primary); font-size: 0.95rem; }
`;

export default function DocsPage() {
  return (
    <DocsWrapper>
      <Sidebar>
        <SidebarGroup>
          <SidebarTitle>Getting Started</SidebarTitle>
          <SidebarLink href="#introduction"><BookOpen /> Introduction</SidebarLink>
          <SidebarLink href="#installation"><Layers /> Installation</SidebarLink>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarTitle>Core Features</SidebarTitle>
          <SidebarLink href="#launcher"><Command /> Smart Launcher</SidebarLink>
          <SidebarLink href="#ai"><MessageSquare /> AI Assistant</SidebarLink>
          <SidebarLink href="#terminal"><Terminal /> Terminal</SidebarLink>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarTitle>Resources</SidebarTitle>
          <SidebarLink href="https://github.com/Designrpros/peak-multiplatform" target="_blank"><Github /> GitHub Repo</SidebarLink>
        </SidebarGroup>
      </Sidebar>

      <Content>
        <section id="introduction">
          <h1>Peak Documentation</h1>
          <p>
            Peak is an integrated workspace for developers that unifies your essential tools into a single, keyboard-centric interface. By combining a web browser, code editor, terminal, and AI assistant, Peak reduces context switching and keeps you in the flow.
          </p>
          <NoteBox>
            <p><strong>Note:</strong> Peak is currently in active beta. Features and UI may change rapidly.</p>
          </NoteBox>
        </section>

        <section id="installation">
          <h2>Installation</h2>
          <p>Peak is available for macOS, Windows, and Linux.</p>
          
          <h3>macOS</h3>
          <ol style={{marginLeft: '1.5rem', color: 'var(--peak-secondary)', lineHeight: '1.8'}}>
            <li>Download the <code>.dmg</code> file for your architecture (Apple Silicon or Intel).</li>
            <li>Open the disk image and drag <strong>Peak</strong> to your Applications folder.</li>
            <li>On first launch, macOS Gatekeeper may prompt you to verify the developer.</li>
          </ol>
          
          <h3>Windows & Linux</h3>
          <p>Simply run the <code>.exe</code> installer or <code>.AppImage</code>. Peak will automatically handle updates in the background.</p>
        </section>

        <section id="launcher">
          <h2>The Smart Launcher</h2>
          <p>
            Unlike traditional browsers with a static address bar, Peak uses a command palette as its primary interface. Press <kbd>Cmd</kbd> + <kbd>K</kbd> (or your custom hotkey) to summon Peak from anywhere.
          </p>
          <p>Supported Commands:</p>
          <ul>
            <li><strong>Web Search:</strong> Type any query to search your default engine.</li>
            <li><strong>Project:</strong> Type <code>Project</code> to open the integrated file explorer.</li>
            <li><strong>Chat:</strong> Type <code>Chat</code> to start a new AI session.</li>
            <li><strong>Task:</strong> Type <code>Tasks</code> to open your Kanban board.</li>
          </ul>
        </section>

        <section id="ai">
          <h2>AI Assistant</h2>
          <p>
            Peak integrates directly with OpenRouter, giving you access to top-tier models like <strong>GPT-4o</strong>, <strong>Claude 3.5 Sonnet</strong>, and <strong>DeepSeek</strong> without needing separate subscriptions for each.
          </p>
          
          <h3>Configuration</h3>
          <p>
            To enable AI features, navigate to the <strong>Settings</strong> panel (accessible from the landing page footer) and enter your OpenRouter API Key. Your key is encrypted and stored locally on your device&apos;s Keychain.
          </p>
          
          <h3>Context Awareness</h3>
          <p>
            When using the AI Assistant inside a Project tab, Peak can read your currently open file. This allows you to ask context-specific questions like <em>&quot;Refactor this function&quot;</em> or <em>&quot;Explain this logic&quot;</em> without copy-pasting code.
          </p>
        </section>
        
        <section id="terminal">
            <h2>Integrated Terminal</h2>
            <p>
                Peak includes a fully functional terminal emulator based on <code>xterm.js</code> and <code>node-pty</code>. It supports your system shell (zsh, bash, powershell) and inherits your local environment variables.
            </p>
            <pre>
# You can run standard commands
npm install
git status
docker-compose up</pre>
        </section>
      </Content>
    </DocsWrapper>
  );
}