'use client';

import React, { useState } from 'react';
import styled from "styled-components";
import Link from "next/link";
import { 
    BookOpen, Layers, MessageSquare, Command, Github, 
    Layout, PenTool, CheckSquare, Shield, Zap, 
    Keyboard, Cpu, FileText, Terminal, FolderOpen,
    Network, AlertTriangle, Monitor, MousePointer2
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
  
  const handleSectionClick = (sectionName: string) => {
    trackEvent({
        action: 'read_section',
        category: GA_CATEGORY.DOCS,
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
    });
  };

  return (
    <DocsWrapper>
      <Sidebar>
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
        </SidebarGroup>
      </Sidebar>

      <Content>
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