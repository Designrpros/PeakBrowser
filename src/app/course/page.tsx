'use client';

import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import { 
    BookOpen, MessageSquare, Code, Terminal, 
    Monitor, Play, Globe, Hammer, Folder
} from 'lucide-react';
import { trackEvent, GA_CATEGORY } from '@/lib/analytics';

// --- STYLED COMPONENTS ---

const CourseWrapper = styled.div`
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

export default function CoursePage() {
  const handleSectionClick = (sectionName: string) => {
    trackEvent({
        action: 'read_course_section',
        category: GA_CATEGORY.DOCS,
        label: sectionName
    });
  };

  return (
    <CourseWrapper>
      <Sidebar>
        <SidebarGroup>
          <SidebarTitle>Fundamentals</SidebarTitle>
          <SidebarLink href="#introduction" onClick={() => handleSectionClick('Introduction')}><BookOpen /> Introduction</SidebarLink>
          <SidebarLink href="#web-concepts" onClick={() => handleSectionClick('Web Concepts')}><Globe /> Web Basics</SidebarLink>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarTitle>Setup</SidebarTitle>
          <SidebarLink href="#peak-tools" onClick={() => handleSectionClick('Peak Tools')}><Hammer /> Peak Tools</SidebarLink>
          <SidebarLink href="#terminal" onClick={() => handleSectionClick('Terminal')}><Terminal /> Terminal</SidebarLink>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarTitle>Building Phase</SidebarTitle>
          <SidebarLink href="#create-project" onClick={() => handleSectionClick('Create Project')}><Folder /> Create Project</SidebarLink>
          <SidebarLink href="#project-view" onClick={() => handleSectionClick('Project View')}><Code /> Project Mode</SidebarLink>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarTitle>Development</SidebarTitle>
          <SidebarLink href="#ai-assistant" onClick={() => handleSectionClick('AI Assistant')}><MessageSquare /> AI & Coding</SidebarLink>
          <SidebarLink href="#live-preview" onClick={() => handleSectionClick('Live Preview')}><Play /> Live Preview</SidebarLink>
        </SidebarGroup>
      </Sidebar>

      <Content>
        <section id="introduction">
          <h1>Building with Peak Multiplatform</h1>
          <p>
            Welcome to the comprehensive guide on modern web development using <strong>Peak Multiplatform</strong>. This course will take you from zero to a fully functional Next.js application, leveraging the power of Peak&apos;s integrated developer tools and AI assistance.
          </p>
          
          <FeatureGrid>
            <FeatureCard>
                <h4><Code size={18} /> Integrated Environment</h4>
                <p>Edit code, run commands, and preview your app without ever leaving Peak.</p>
            </FeatureCard>
            <FeatureCard>
                <h4><MessageSquare size={18} /> AI-Powered Coding</h4>
                <p>Use our advanced AI assistant to generate code, components, and styling instantly.</p>
            </FeatureCard>
            <FeatureCard>
                <h4><Monitor size={18} /> Live Preview</h4>
                <p>See your changes reflect instantly with our built-in browser engine.</p>
            </FeatureCard>
          </FeatureGrid>
        </section>

        <section id="web-concepts">
          <h2><Globe /> Web Concepts Crash Course</h2>
          <p>
            Before we dive into the tools, let&apos;s briefly touch on what we are building. The modern web is built on three pillars, plus a powerful framework.
          </p>
          
          <h3>The Building Blocks</h3>
          <ul>
            <li><strong>HTML (Structure):</strong> The skeleton of your site. It defines elements like paragraphs, headers, and buttons.</li>
            <li><strong>CSS (Style):</strong> The skin. It controls colors, fonts, layout, and responsiveness.</li>
            <li><strong>JavaScript (Behavior):</strong> The brain. It handles interactions, data fetching, and logic.</li>
          </ul>

          <h3>The Framework: Next.js</h3>
          <p>
            We will be using <strong>Next.js</strong>, a framework built on top of React. It simplifies the process of building complex web applications by handling routing, optimization, and server-side rendering out of the box. Think of it as a set of pre-made tools that makes building a house much faster than starting with raw lumber.
          </p>
        </section>

        <section id="peak-tools">
          <h2><Hammer /> Peak Developer Tools</h2>
          <p>
            Peak Multiplatform isn&apos;t just a browser; it&apos;s a workspace. It unifies your terminal, code editor, and browser into a single interface.
          </p>
          <p>
            You can access the developer tools by creating a new tab and selecting <strong>Project</strong> or <strong>Terminal</strong> mode, or by opening an existing folder on your computer.
          </p>
        </section>

        <section id="terminal">
            <h2><Terminal /> The Terminal</h2>
            <p>
                The Terminal is your direct line to the computer&apos;s operating system. Instead of clicking icons, you type text commands to perform powerful actions. We will use it to create our project files.
            </p>

            <h3>Opening the Terminal</h3>
            <ol>
                <li>Open a new tab in Peak Multiplatform (<kbd>Cmd</kbd> + <kbd>T</kbd>).</li>
                <li>In the Launcher, select <strong>Terminal</strong>.</li>
                <li>A terminal session will start in your home directory or the last visited folder.</li>
            </ol>
        </section>

        <section id="create-project">
            <h2><Folder /> Step 1: Create the Project</h2>
            <p>
                Let&apos;s create a new Next.js project. We will use `npx`, a tool that comes with Node.js to execute packages.
            </p>

            <NoteBox>
                <p><strong>Prerequisite:</strong> Ensure you have <strong>Node.js</strong> installed on your system. You can verify this by typing <code>node -v</code> in the terminal.</p>
            </NoteBox>

            <h3>Run the Create Command</h3>
            <p>In your Peak Terminal tab, type the following command and press <kbd>Enter</kbd>:</p>
            
            <pre>npx create-next-app@latest my-peak-app</pre>

            <p>
                The terminal will ask you a series of questions. Press <kbd>Enter</kbd> to accept the defaults for most of them:
            </p>
            <ul>
                <li>TypeScript: <strong>Yes</strong></li>
                <li>ESLint: <strong>Yes</strong></li>
                <li>Tailwind CSS: <strong>Yes</strong> (Recommended for easy styling)</li>
                <li>App Router: <strong>Yes</strong></li>
            </ul>

            <p>Once the process completes, you will have a new folder named <code>my-peak-app</code> containing your website&apos;s source code.</p>
        </section>

        <section id="project-view">
            <h2><Code /> Step 2: Open in Project Mode</h2>
            <p>
                Now that we have the files, let&apos;s open them in Peak&apos;s Project Editor.
            </p>
            <ol>
                <li>Close the terminal tab (or keep it open if you like).</li>
                <li>Open a <strong>New Tab</strong>.</li>
                <li>Click on the <strong>Project</strong> icon or type &quot;Project&quot;.</li>
                <li>Navigate to the <code>my-peak-app</code> folder we just created and select <strong>Open</strong>.</li>
            </ol>

            <p>
                You are now in <strong>Project Mode</strong>. on the left, you see the file explorer. On the right, the main editor area.
            </p>
            
            <h3>Understanding the Structure</h3>
            <ul>
                <li><code>src/app/page.tsx</code>: This is the homepage of your website.</li>
                <li><code>src/app/layout.tsx</code>: Defines the global shell (html/body tags).</li>
                <li><code>public/</code>: Stores images and static assets.</li>
            </ul>
        </section>

        <section id="ai-assistant">
            <h2><MessageSquare /> Step 3: AI-Assisted Development</h2>
            <p>
                Here is where Peak shines. You don&apos;t need to be a masterful coder to build something beautiful. We will use Peak&apos;s AI Assistant to write the code for us.
            </p>

            <h3>Opening the Sidebar</h3>
            <p>
                In the Project View, look at the top right of the editor toolbar. Click the <strong>Sidebar Toggle</strong> icon to reveal the AI Assistant panel.
            </p>

            <h3>Prompting the AI</h3>
            <p>
                Select the file you want to edit (e.g., <code>src/app/page.tsx</code>) in the file explorer. Then, in the AI chat input, type what you want the page to look like.
            </p>
            
            <NoteBox>
                <strong>Example Prompt:</strong>
                <p>&quot;Create a modern landing page for a coffee shop called &apos;Brew Peak&apos;. It should have a hero section with a dark wood background, a menu grid with prices, and a contact footer. Use Tailwind CSS for styling.&quot;</p>
            </NoteBox>

            <p>
                The AI will generate the code. You can either copy-paste it into the editor or, if available, click &quot;Apply to File&quot;.
            </p>
        </section>

        <section id="live-preview">
            <h2><Play /> Step 4: Live Preview</h2>
            <p>
                To see your website in action, we need to run the development server.
            </p>

            <h3>Start the Server</h3>
            <ol>
                <li>
                    In the Project View, open the <strong>Integrated Terminal</strong> panel (usually at the bottom, or toggle via the menu).
                </li>
                <li>Type <code>npm run dev</code> and press <kbd>Enter</kbd>.</li>
                <li>Wait for the terminal to say <strong>Ready in ... ms</strong>.</li>
            </ol>

            <h3>View the Site</h3>
            <p>
                Now, you can split your view or open a new browser tab.
            </p>
            <ul>
                <li>Go to the address bar and type <code>localhost:3000</code>.</li>
            </ul>
            <p>
                You should see your &quot;Brew Peak&quot; landing page live! Any changes you make in the code (or via AI) will automatically update here when you save (<kbd>Cmd</kbd> + <kbd>S</kbd>).
            </p>
            
            <NoteBox>
                <p><strong>Pro Tip:</strong> Split your Peak window so you have the Code Editor on one side and the Live Preview on the other for a seamless workflow.</p>
            </NoteBox>
        </section>
      </Content>
    </CourseWrapper>
  );
}