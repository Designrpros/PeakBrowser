'use client';

import React from 'react';
import styled from "styled-components";
import { X, Plus, Globe, CheckSquare, FileText, PenTool, BookOpen, Layout, History, KanbanSquare } from 'lucide-react';

// --- TYPES ---
export interface Tab {
    id: string;
    title: string;
    type: 'landing' | 'web' | 'kanban' | 'note' | 'whiteboard' | 'docs';
    // FIX: Changed 'any' to 'unknown' to satisfy linter
    data?: unknown; 
}

// --- ICONS ---
const getIcon = (type: string) => {
    switch (type) {
        case 'web': return <Globe size={14} />;
        case 'kanban': return <CheckSquare size={14} />;
        case 'note': return <FileText size={14} />;
        case 'whiteboard': return <PenTool size={14} />;
        case 'docs': return <BookOpen size={14} />;
        default: return <Layout size={14} />;
    }
};

// --- STYLED COMPONENTS ---
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    background-color: var(--window-background-color);
    border-bottom: 1px solid var(--border-color);
    width: 100%;
`;

const ScrollArea = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    padding: 0 8px;
    overflow-x: auto;
    height: 100%;
    
    /* Hide scrollbar */
    &::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const TabItem = styled.div<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    min-width: 120px;
    max-width: 200px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.1s;
    
    background-color: ${props => props.$active ? 'var(--control-background-color)' : 'transparent'};
    color: ${props => props.$active ? 'var(--peak-primary)' : 'var(--peak-secondary)'};
    box-shadow: ${props => props.$active ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'};

    &:hover {
        background-color: var(--control-background-color);
        color: var(--peak-primary);
    }
`;

const TabTitle = styled.span`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const IconButton = styled.button`
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 6px;
    cursor: pointer;
    color: var(--peak-secondary);
    transition: all 0.2s;
    
    &:hover {
        background-color: var(--control-background-color);
        color: var(--peak-primary);
    }
`;

const AddBtn = styled(IconButton)`
    width: 28px;
    height: 28px;
    flex-shrink: 0;
`;

const InspectorSection = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 12px;
    height: 24px;
    border-left: 1px solid var(--border-color);
    margin-left: 4px;
`;

interface TabBarProps {
    tabs: Tab[];
    activeTabId: string;
    onSwitch: (id: string) => void;
    onClose: (id: string, e: React.MouseEvent) => void;
    onNew: () => void;
    onOpenInspector: (type: 'history' | 'tasks') => void;
}

export default function TabBar({ tabs, activeTabId, onSwitch, onClose, onNew, onOpenInspector }: TabBarProps) {
    return (
        <Wrapper>
            <ScrollArea>
                {tabs.map(tab => (
                    <TabItem 
                        key={tab.id} 
                        $active={tab.id === activeTabId}
                        onClick={() => onSwitch(tab.id)}
                    >
                        {getIcon(tab.type)}
                        <TabTitle>{tab.title}</TabTitle>
                        <IconButton onClick={(e) => onClose(tab.id, e)} style={{padding: 2}}>
                            <X size={12} />
                        </IconButton>
                    </TabItem>
                ))}
                <AddBtn onClick={onNew} title="New Tab">
                    <Plus size={16} />
                </AddBtn>
            </ScrollArea>

            <InspectorSection>
                <IconButton onClick={() => onOpenInspector('history')} title="Search History">
                    <History size={16} />
                </IconButton>
                <IconButton onClick={() => onOpenInspector('tasks')} title="Task Boards">
                    <KanbanSquare size={16} />
                </IconButton>
            </InspectorSection>
        </Wrapper>
    );
}