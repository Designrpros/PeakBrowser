'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import { ArrowUp, Globe, FileText, Terminal, Folder, PenTool, BookOpen, HardDrive, ChevronDown, Check, MessageSquare, CheckSquare, AlertTriangle, Lock } from 'lucide-react';
import Image from 'next/image';

// --- CONFIGURATION ---

const AVAILABLE_MODES = [
    { id: 'Search', icon: Globe, placeholder: 'Search the web or enter URL...' },
    { id: 'Tasks', icon: CheckSquare, placeholder: 'Enter board name...' },
    { id: 'Docs', icon: BookOpen, placeholder: 'Search DevDocs...' },
];

const UNAVAILABLE_MODES = [
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

// --- STYLED COMPONENTS ---

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent; 
    color: var(--peak-primary);
    padding-bottom: 15vh;
`;

const VStack = styled.div`
    max-width: 800px; 
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
`;

const Logo = styled(Image)`
    width: 150px;
    height: auto;
    opacity: 0.6; 
    margin-bottom: 12px;
    
    @media (prefers-color-scheme: dark) {
        filter: invert(1); 
    }
`;

const InputBox = styled.div`
    width: 100%;
    position: relative; 
`;

const TextArea = styled.textarea`
    width: 100%;
    outline: none;
    resize: none;
    color: var(--peak-primary);
    box-sizing: border-box;
    
    background-color: var(--control-background-color); 
    border: 1px solid var(--border-color); 
    border-radius: 24px;
    
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 20px; 
    line-height: 1.4;
    padding: 24px 24px 70px 24px; 
    
    min-height: 140px; 
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
        border-color: var(--peak-accent);
        box-shadow: 0 8px 40px rgba(0,0,0,0.1);
        background-color: var(--window-background-color);
    }
`;

const ControlRow = styled.div`
    position: absolute;
    bottom: 20px; 
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 12px; 
`;

const ActionButton = styled.button`
    margin-left: auto; 
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--peak-accent);
    border: none;
    color: white; 
    cursor: pointer;
    transition: transform 0.1s, opacity 0.1s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);

    &:disabled {
        opacity: 0.5;
        background-color: var(--border-color);
        color: var(--peak-secondary);
        cursor: default;
        box-shadow: none;
    }

    &:hover:not(:disabled) {
        transform: scale(1.05);
    }
`;

// --- CUSTOM DROPDOWN ---
const DropdownContainer = styled.div`
    position: relative;
`;

const DropdownButton = styled.button`
    padding: 6px 12px;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid transparent; 
    cursor: pointer;
    color: var(--peak-secondary);
    font-weight: 500;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover {
        color: var(--peak-primary);
        background-color: var(--control-background-color);
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
    background-color: var(--window-background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    padding: 6px;
    min-width: 220px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 350px;
    overflow-y: auto;
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
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    text-align: left;
    padding: 8px 12px;
    border: none;
    background-color: ${props => props.$isActive ? 'var(--control-background-color)' : 'transparent'};
    color: ${props => props.$disabled ? 'var(--peak-secondary)' : props.$isActive ? 'var(--peak-primary)' : 'var(--peak-secondary)'};
    opacity: ${props => props.$disabled ? 0.5 : 1};
    border-radius: 6px;
    cursor: ${props => props.$disabled ? 'default' : 'pointer'};
    font-size: 13px;
    font-weight: 500;

    &:hover {
        background-color: ${props => props.$disabled ? 'transparent' : 'var(--control-background-color)'};
        color: ${props => props.$disabled ? 'var(--peak-secondary)' : 'var(--peak-primary)'};
    }
`;

interface LandingPageProps {
    onOpenTab: (type: string, query: string, data?: any) => void;
}

export default function LandingPage({ onOpenTab }: LandingPageProps) {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState(AVAILABLE_MODES[0]);
    const [engine, setEngine] = useState(SEARCH_ENGINES[0]);
    
    const [showModeMenu, setShowModeMenu] = useState(false);
    const [showEngineMenu, setShowEngineMenu] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowModeMenu(false);
                setShowEngineMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (textareaRef.current) textareaRef.current.focus();
    }, []);

    const handleSubmit = () => {
        if (!input.trim() && mode.id !== 'Tasks') return;

        if (mode.id === 'Search') {
            // History logic here if needed
            const existing = JSON.parse(localStorage.getItem('peak_web_history') || '[]');
            const newItem = { id: Date.now(), query: input, type: 'web', timestamp: new Date().toISOString() };
            localStorage.setItem('peak_web_history', JSON.stringify([newItem, ...existing].slice(0, 50)));
            
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

    return (
        <Container>
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
                                    {/* SUPPORTED */}
                                    <SectionHeader>Available</SectionHeader>
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
                                    
                                    {/* UNSUPPORTED */}
                                    <SectionHeader>Desktop App Only</SectionHeader>
                                    {UNAVAILABLE_MODES.map((m) => (
                                        <DropdownItem 
                                            key={m.id} 
                                            $isActive={false}
                                            $disabled={true}
                                            onClick={(e) => { e.preventDefault(); alert(`Please download Peak Desktop to use ${m.id}.`); }}
                                        >
                                            <m.icon size={16} /> {m.id}
                                            <Lock size={12} style={{marginLeft:'auto', opacity:0.5}} />
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            )}
                        </DropdownContainer>

                        {/* SEARCH ENGINE (Only in Search Mode) */}
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
        </Container>
    );
}