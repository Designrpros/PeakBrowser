'use client';

import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { X, Search, Clock, KanbanSquare, Trash2, ExternalLink } from 'lucide-react';

// --- TYPES ---
interface HistoryItem {
    id: number;
    query: string;
    type: 'web' | 'kanban';
    timestamp: string;
}

// --- STYLED COMPONENTS ---
const Container = styled.div<{ $visible: boolean }>`
    width: ${props => props.$visible ? '320px' : '0px'};
    height: 100%;
    background-color: var(--window-background-color);
    border-left: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
    flex-shrink: 0;
`;

const Header = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid var(--border-color);
    flex-shrink: 0;
`;

const Title = styled.h3`
    font-size: 13px;
    font-weight: 600;
    color: var(--peak-primary);
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
`;

const IconButton = styled.button`
    background: transparent;
    border: none;
    color: var(--peak-secondary);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: var(--control-background-color);
        color: var(--peak-primary);
    }
`;

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
`;

const ListItem = styled.div`
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background 0.1s;
    border-bottom: 1px solid transparent;

    &:hover {
        background-color: var(--control-background-color);
    }
`;

const ItemIcon = styled.div`
    color: var(--peak-secondary);
    display: flex;
    align-items: center;
`;

const ItemContent = styled.div`
    flex: 1;
    overflow: hidden;
`;

const ItemTitle = styled.div`
    font-size: 13px;
    color: var(--peak-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ItemMeta = styled.div`
    font-size: 11px;
    color: var(--peak-secondary);
    margin-top: 2px;
`;

const EmptyState = styled.div`
    padding: 32px;
    text-align: center;
    color: var(--peak-secondary);
    font-size: 13px;
`;

interface InspectorProps {
    visible: boolean;
    mode: 'history' | 'tasks' | null;
    onClose: () => void;
    onOpenItem: (type: string, query: string) => void;
}

export default function Inspector({ visible, mode, onClose, onOpenItem }: InspectorProps) {
    const [items, setItems] = useState<HistoryItem[]>([]);

    // Load data when mode changes or visibility changes
    useEffect(() => {
        if (!visible || !mode) return;

        if (mode === 'history') {
            const history = JSON.parse(localStorage.getItem('peak_web_history') || '[]');
            setItems(history.reverse()); // Show newest first
        } else if (mode === 'tasks') {
            // In this lightweight version, we only have one persistent board key 'peak_kanban'
            // We can simulate a list by checking if it exists
            const hasBoard = localStorage.getItem('peak_kanban');
            if (hasBoard) {
                setItems([{ 
                    id: 1, 
                    query: 'Task Board', 
                    type: 'kanban', 
                    timestamp: new Date().toISOString() 
                }]);
            } else {
                setItems([]);
            }
        }
    }, [visible, mode]);

    const clearHistory = () => {
        if (mode === 'history') {
            localStorage.removeItem('peak_web_history');
            setItems([]);
        }
    };

    return (
        <Container $visible={visible}>
            <Header>
                <Title>
                    {mode === 'history' ? <Clock size={14} /> : <KanbanSquare size={14} />}
                    {mode === 'history' ? 'Search History' : 'Task Boards'}
                </Title>
                <div style={{display:'flex', gap:4}}>
                    {mode === 'history' && items.length > 0 && (
                        <IconButton onClick={clearHistory} title="Clear History">
                            <Trash2 size={14} />
                        </IconButton>
                    )}
                    <IconButton onClick={onClose}>
                        <X size={14} />
                    </IconButton>
                </div>
            </Header>
            
            <Content>
                {items.length === 0 ? (
                    <EmptyState>
                        {mode === 'history' ? 'No search history yet.' : 'No saved boards found.'}
                    </EmptyState>
                ) : (
                    items.map((item, i) => (
                        <ListItem key={i} onClick={() => onOpenItem(item.type, item.query)}>
                            <ItemIcon>
                                {item.type === 'web' ? <Search size={14} /> : <KanbanSquare size={14} />}
                            </ItemIcon>
                            <ItemContent>
                                <ItemTitle>{item.query}</ItemTitle>
                                <ItemMeta>{new Date(item.timestamp).toLocaleDateString()}</ItemMeta>
                            </ItemContent>
                            {item.type === 'web' && <ExternalLink size={12} style={{opacity:0.5}} />}
                        </ListItem>
                    ))
                )}
            </Content>
        </Container>
    );
}