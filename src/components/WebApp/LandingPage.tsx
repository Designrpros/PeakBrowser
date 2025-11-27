'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import { ArrowUp, Globe, FileText, Terminal, Folder, PenTool, BookOpen, HardDrive, ChevronDown, Check, MessageSquare, CheckSquare, Zap, Layers, Box, Monitor, Library, Bot, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent, GA_CATEGORY } from '@/lib/analytics';

// --- CONFIGURATION ---

// 1. Supported on Web (Search, Tasks, Docs)
const AVAILABLE_MODES = [
    { id: 'Search', icon: Globe, placeholder: 'Search the web or enter URL...' },
    { id: 'Tasks', icon: CheckSquare, placeholder: 'Enter board name...' },
    { id: 'Docs', icon: BookOpen, placeholder: 'Search documentation...' },
];

// 2. Desktop Only (Everything else)
const DESKTOP_MODES = [
    { id: 'Note', icon: FileText, placeholder: 'Enter note title...' },
    { id: 'Whiteboard', icon: PenTool, placeholder: 'Enter whiteboard name...' },
    { id: 'LLM', icon: MessageSquare, placeholder: 'Ask AI...' },
    { id: 'Terminal', icon: Terminal, placeholder: 'Enter terminal command...' },
    { id: 'Project', icon: Folder, placeholder: 'Open folder name...' },
    { id: 'Mind Map', icon: PenTool, placeholder: 'Enter Mind Map name...' },
    { id: 'Finder', icon: HardDrive, placeholder: 'Enter path...' },
];

const SEARCH_ENGINES = [
    { id: "google", name: "Google", url: "https://www.google.com/search?q=" },
    { id: "duckduckgo", name: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
    { id: "bing", name: "Bing", url: "https://www.bing.com/search?q=" },
    { id: "brave", name: "Brave Search", url: "https://search.brave.com/search?q=" },
    { id: "startpage", name: "Startpage", url: "https://www.startpage.com/sp/search?query=" },
    { id: "wikipedia", name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Special:Search?search=" },
    { id: "stackoverflow", name: "Stack Overflow", url: "https://stackoverflow.com/search?q=" },
    { id: "github", name: "GitHub", url: "https://github.com/search?q=" },
    { id: "mdn", name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/search?q=" },
    { id: "googlescholar", name: "Google Scholar", url: "https://scholar.google.com/scholar?q=" },
    { id: "wolframalpha", name: "WolframAlpha", url: "https://www.wolframalpha.com/input/?i=" },
    { id: "youtube", name: "YouTube", url: "https://www.youtube.com/results?search_query=" },
    { id: "unsplash", name: "Unsplash", url: "https://unsplash.com/s/photos/" },
    { id: "imdb", name: "IMDb", url: "https://www.imdb.com/find?q=" }
];

// --- HELPERS ---
const saveToHistory = (query: string) => {
    if (typeof window === 'undefined') return;
    const existing = JSON.parse(localStorage.getItem('peak_web_history') || '[]');
    const newItem = { 
        id: Date.now(), 
        query, 
        type: 'web', 
        timestamp: new Date().toISOString() 
    };
    const updated = [newItem, ...existing].slice(0, 50);
    localStorage.setItem('peak_web_history', JSON.stringify(updated));
};

// --- STYLED COMPONENTS (APP LAYOUT) ---

const PageScrollWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: var(--window-background-color);
    scroll-behavior: smooth;
`;

const AppContainer = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 10vh;
    position: relative;
`;

const VStack = styled.div`
    max-width: 800px; 
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    z-index: 10;
`;

const Logo = styled(Image)`
    width: 150px;
    height: auto;
    opacity: 0.6; 
    margin-bottom: 12px;
    @media (prefers-color-scheme: dark) { filter: invert(1); }
`;

const InputBox = styled.div` width: 100%; position: relative; `;

const TextArea = styled.textarea`
    width: 100%; outline: none; resize: none; color: var(--peak-primary); box-sizing: border-box;
    background-color: var(--control-background-color); border: 1px solid var(--border-color); border-radius: 24px;
    font-family: inherit; font-size: 20px; line-height: 1.4; padding: 24px 24px 70px 24px; 
    min-height: 140px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: border-color 0.2s, box-shadow 0.2s;
    &:focus { border-color: var(--peak-accent); box-shadow: 0 8px 40px rgba(0,0,0,0.1); background-color: var(--window-background-color); }
`;

const ControlRow = styled.div` position: absolute; bottom: 20px; left: 20px; right: 20px; display: flex; align-items: center; gap: 12px; `;

const ActionButton = styled.button`
    margin-left: auto; width: 36px; height: 36px; display: flex; justify-content: center; align-items: center;
    border-radius: 50%; background-color: var(--peak-accent); border: none; color: white; cursor: pointer;
    transition: transform 0.1s; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    &:disabled { opacity: 0.5; background-color: var(--border-color); cursor: default; }
    &:hover:not(:disabled) { transform: scale(1.05); }
`;

const DropdownContainer = styled.div` position: relative; `;
const DropdownButton = styled.button`
    padding: 6px 12px; background-color: transparent; border-radius: 8px; border: 1px solid transparent; 
    cursor: pointer; color: var(--peak-secondary); font-weight: 500; font-size: 14px; outline: none; 
    display: flex; align-items: center; gap: 6px;
    &:hover { color: var(--peak-primary); background-color: var(--control-background-color); }
`;
const DropdownMenu = styled.div`
    position: absolute; bottom: 100%; left: 0; margin-bottom: 8px; background-color: var(--window-background-color); 
    border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    padding: 6px; min-width: 220px; z-index: 50; max-height: 350px; overflow-y: auto;
`;

const SectionHeader = styled.div`
    padding: 8px 12px 4px 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--peak-secondary);
    opacity: 0.7;
`;

const DropdownItem = styled.button<{ $isActive: boolean; $disabled?: boolean }>`
    display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 8px 12px; 
    border: none; border-radius: 6px; cursor: ${props => props.$disabled ? 'default' : 'pointer'};
    font-size: 13px; font-weight: 500;
    
    background-color: ${props => props.$isActive ? 'var(--control-background-color)' : 'transparent'};
    color: ${props => props.$disabled ? 'var(--peak-secondary)' : props.$isActive ? 'var(--peak-primary)' : 'var(--peak-secondary)'};
    opacity: ${props => props.$disabled ? 0.5 : 1};

    &:hover {
        background-color: ${props => props.$disabled ? 'transparent' : 'var(--control-background-color)'};
        color: ${props => props.$disabled ? 'var(--peak-secondary)' : 'var(--peak-primary)'};
    }
`;

// --- STYLED COMPONENTS (MARKETING) ---

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);}
  40% {transform: translateX(-50%) translateY(-10px);}
  60% {transform: translateX(-50%) translateY(-5px);}
`;

const ScrollIndicator = styled.div`
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0.6;
    cursor: pointer;
    animation: ${bounce} 2s infinite;
    
    span { font-size: 12px; font-weight: 500; color: var(--peak-secondary); text-transform: uppercase; letter-spacing: 1px; }
`;

const MarketingWrapper = styled.div`
    width: 100%;
    background: linear-gradient(180deg, var(--window-background-color) 0%, var(--control-background-color) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6rem 2rem;
    border-top: 1px solid var(--border-color);
`;

const Section = styled.section`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 6rem;
`;

const HeroTitle = styled.h2`
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--peak-primary);
    letter-spacing: -1px;
`;

const HeroSubtitle = styled.p`
    font-size: 1.2rem;
    color: var(--peak-secondary);
    max-width: 600px;
    margin-bottom: 3rem;
    line-height: 1.6;
`;

const ChoiceGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;
    
    @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ChoiceCard = styled.div`
    background: var(--window-background-color);
    border: 1px solid var(--border-color);
    padding: 2.5rem;
    border-radius: 24px;
    text-align: left;
    transition: transform 0.2s;
    
    &:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
`;

const CardHeader = styled.div`
    display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;
`;

const CardIcon = styled.div<{ $color: string }>`
    width: 48px; height: 48px; border-radius: 12px; background: ${props => props.$color};
    display: flex; align-items: center; justify-content: center; color: white;
`;

const CardTitle = styled.h3`
    font-size: 1.5rem; font-weight: 700; color: var(--peak-primary);
`;

const CardDescription = styled.p`
    color: var(--peak-secondary); margin-bottom: 2rem; font-size: 1rem; line-height: 1.5;
`;

const FeatureList = styled.ul`
    list-style: none; padding: 0; margin-bottom: 2rem;
    li {
        display: flex; align-items: center; gap: 0.75rem; color: var(--peak-primary);
        margin-bottom: 0.75rem; font-size: 0.95rem;
        svg { color: var(--peak-accent); width: 18px; height: 18px; }
    }
`;

const CardButton = styled(Link)<{ $variant: 'blue' | 'purple' }>`
    display: flex; justify-content: center; align-items: center; padding: 1rem;
    border-radius: 12px; font-weight: 600; text-decoration: none;
    background: ${props => props.$variant === 'blue' ? '#4A90E2' : '#9F7AEA'};
    color: white;
    transition: opacity 0.2s;
    &:hover { opacity: 0.9; }
`;

// --- COMPONENT ---

interface LandingPageProps {
    onOpenTab: (type: string, query: string, data?: { engineUrl?: string }) => void;
}

export default function LandingPage({ onOpenTab }: LandingPageProps) {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState(AVAILABLE_MODES[0]);
    const [engine, setEngine] = useState(SEARCH_ENGINES[0]);
    
    const [showModeMenu, setShowModeMenu] = useState(false);
    const [showEngineMenu, setShowEngineMenu] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const marketingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowModeMenu(false); setShowEngineMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { if(textareaRef.current) textareaRef.current.focus(); }, []);

    const handleSubmit = () => {
        if (!input.trim() && mode.id !== 'Tasks') return;

        // Check if Desktop Only
        const isDesktopMode = DESKTOP_MODES.some(m => m.id === mode.id);
        if (isDesktopMode) {
            // Analytics: Track attempted use of desktop features
            trackEvent({
                action: 'blocked_feature_attempt',
                category: GA_CATEGORY.DOWNLOAD,
                label: mode.id // e.g., 'Terminal', 'Whiteboard'
            });

            alert(`The "${mode.id}" feature requires the desktop application.\n\nPlease scroll down to download Peak for your OS.`);
            return;
        }

        if (mode.id === 'Search') {
            // Analytics: Track search query engine
            trackEvent({
                action: 'search_query',
                category: GA_CATEGORY.SEARCH,
                label: engine.name // Track preference (Google, DuckDuckGo, etc.)
            });

            saveToHistory(input);
            const engineUrl = engine.url;
            onOpenTab('web', input, { engineUrl });
        } else if (mode.id === 'Tasks') {
            onOpenTab('kanban', input || 'Tasks');
        } else if (mode.id === 'Docs') {
            onOpenTab('docs', input || 'Docs');
        }
        
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const scrollToMarketing = () => {
        if (marketingRef.current) {
            marketingRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <PageScrollWrapper>
            {/* APP HERO */}
            <AppContainer>
                <VStack>
                    <Logo src="/Peak.png" alt="Peak Logo" width={150} height={75} priority />
                    
                    <InputBox ref={menuRef}>
                        <TextArea 
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={mode.placeholder}
                            rows={1}
                        />
                        <ControlRow>
                            {/* MODE SELECTOR */}
                            <DropdownContainer>
                                <DropdownButton onClick={() => { setShowModeMenu(!showModeMenu); setShowEngineMenu(false); }}>
                                    <mode.icon size={14} /> {mode.id} <ChevronDown size={12} style={{opacity:0.5}} />
                                </DropdownButton>
                                {showModeMenu && (
                                    <DropdownMenu>
                                        {/* AVAILABLE */}
                                        <SectionHeader>Web Supported</SectionHeader>
                                        {AVAILABLE_MODES.map((m) => (
                                            <DropdownItem 
                                                key={m.id} 
                                                $isActive={m.id === mode.id}
                                                onClick={() => { setMode(m); setShowModeMenu(false); textareaRef.current?.focus(); }}
                                            >
                                                <m.icon size={16} /> {m.id}
                                                {m.id === mode.id && <Check size={14} style={{marginLeft:'auto'}} />}
                                            </DropdownItem>
                                        ))}
                                        
                                        <div style={{height:1, background:'var(--border-color)', margin:'4px 0'}}></div>
                                        
                                        {/* DESKTOP ONLY */}
                                        <SectionHeader>Desktop App Only</SectionHeader>
                                        {DESKTOP_MODES.map((m) => (
                                            <DropdownItem 
                                                key={m.id} 
                                                $isActive={m.id === mode.id}
                                                $disabled={true}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setMode(m);
                                                    setShowModeMenu(false);
                                                    alert(`Please download the desktop app to use ${m.id}.`);
                                                }}
                                            >
                                                <m.icon size={16} /> {m.id}
                                                <Lock size={12} style={{marginLeft:'auto', opacity:0.5}} />
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                )}
                            </DropdownContainer>

                            {/* SEARCH ENGINE (Only for Search Mode) */}
                            {mode.id === 'Search' && (
                                <DropdownContainer>
                                    <DropdownButton onClick={() => { setShowEngineMenu(!showEngineMenu); setShowModeMenu(false); }}>
                                        {engine.name} <ChevronDown size={12} style={{opacity:0.5}} />
                                    </DropdownButton>
                                    {showEngineMenu && (
                                        <DropdownMenu>
                                            {SEARCH_ENGINES.map((e) => (
                                                <DropdownItem 
                                                    key={e.id} 
                                                    $isActive={e.id === engine.id}
                                                    onClick={() => { setEngine(e); setShowEngineMenu(false); textareaRef.current?.focus(); }}
                                                >
                                                    {e.name}
                                                    {e.id === engine.id && <Check size={14} style={{marginLeft:'auto'}} />}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    )}
                                </DropdownContainer>
                            )}

                            <ActionButton disabled={!input.trim() && mode.id !== 'Tasks'} onClick={handleSubmit}>
                                <ArrowUp size={18} strokeWidth={2.5} />
                            </ActionButton>
                        </ControlRow>
                    </InputBox>
                </VStack>

                <ScrollIndicator onClick={scrollToMarketing}>
                    <span>Learn More</span>
                    <ChevronDown size={20} />
                </ScrollIndicator>
            </AppContainer>

            {/* MARKETING CONTENT */}
            <MarketingWrapper ref={marketingRef}>
                <Section>
                    <HeroTitle>Two Ways to Peak.</HeroTitle>
                    <HeroSubtitle>
                        One philosophy: Uninterrupted Flow. Choose the browser that fits your workflow.
                    </HeroSubtitle>
                    
                    <ChoiceGrid>
                        {/* PEAK NATIVE - UPDATED LINK */}
                        <ChoiceCard>
                            <CardHeader>
                                <CardIcon $color="#4A90E2"><Zap size={24} /></CardIcon>
                                <CardTitle>Peak Native</CardTitle>
                            </CardHeader>
                            <CardDescription>
                                The original lightweight companion. Built with Swift for macOS. Perfect for fast browsing and quick notes without the bloat.
                            </CardDescription>
                            <FeatureList>
                                <li><Zap /> Native macOS Performance</li>
                                <li><Monitor /> Lightweight WebKit Engine</li>
                                <li><Library /> Basic Notes & Bookmarks</li>
                                <li><Bot /> Chat with LLMs</li>
                            </FeatureList>
                            <CardButton href="/download?app=native" $variant="blue">Download Native</CardButton>
                        </ChoiceCard>

                        {/* PEAK MULTIPLATFORM - UPDATED LINK */}
                        <ChoiceCard>
                            <CardHeader>
                                <CardIcon $color="#805AD5"><Layers size={24} /></CardIcon>
                                <CardTitle>Peak Multiplatform</CardTitle>
                            </CardHeader>
                            <CardDescription>
                                The complete OS for your workflow. Built with Electron for Mac, Windows, and Linux. Includes advanced developer tools.
                            </CardDescription>
                            <FeatureList>
                                <li><Box /> Cross-Platform (Win/Lin/Mac)</li>
                                <li><Layers /> Kanban & Whiteboards</li>
                                <li><Bot /> Project View & Terminal</li>
                                <li><Library /> Advanced AI Context</li>
                            </FeatureList>
                            <CardButton href="/download?app=multi" $variant="purple">Download Multiplatform</CardButton>
                        </ChoiceCard>
                    </ChoiceGrid>
                </Section>
            </MarketingWrapper>
        </PageScrollWrapper>
    );
}