'use client';

import React, { useState } from 'react';
import styled from "styled-components";
import TabBar, { Tab } from './TabBar';
import LandingPage from './LandingPage';
import KanbanBoard from './Kanban';
import WebFrame from './WebFrame';
import Inspector from './Inspector';
import { trackEvent, GA_CATEGORY } from '@/lib/analytics'; // Analytics Import

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: var(--window-background-color);
    padding-top: 60px;
    overflow: hidden;
`;

const MainLayout = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
`;

const ContentArea = styled.div`
    flex: 1;
    overflow: hidden;
    position: relative;
    background-color: var(--text-background-color);
    display: flex;
    flex-direction: column;
`;

const TabContent = styled.div<{ $visible: boolean }>`
    display: ${props => props.$visible ? 'block' : 'none'};
    width: 100%;
    height: 100%;
`;

const IframeContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;

export default function TabManager() {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: 't1', title: 'New Tab', type: 'landing' }
    ]);
    const [activeTabId, setActiveTabId] = useState('t1');
    
    const [isInspectorOpen, setInspectorOpen] = useState(false);
    const [inspectorMode, setInspectorMode] = useState<'history' | 'tasks' | null>(null);

    const handleNewTab = () => {
        // Analytics: Track new tab creation
        trackEvent({
            action: 'new_tab',
            category: GA_CATEGORY.BROWSER,
            label: 'User clicked + button'
        });

        const id = Date.now().toString();
        setTabs([...tabs, { id, title: 'New Tab', type: 'landing' }]);
        setActiveTabId(id);
    };

    const handleCloseTab = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();

        // Analytics: Track tab closing
        trackEvent({
            action: 'close_tab',
            category: GA_CATEGORY.BROWSER
        });

        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id) {
            if (newTabs.length > 0) setActiveTabId(newTabs[newTabs.length - 1].id);
            else handleNewTab();
        }
    };

    const handleOpenFromLanding = (type: string, query: string, extraData?: { engineUrl?: string }) => {
        // Analytics: Track feature usage
        trackEvent({
            action: 'launch_mode',
            category: GA_CATEGORY.BROWSER,
            label: type // 'web', 'kanban', or 'docs'
        });

        let title = query || 'New Tab';
        let finalType: Tab['type'] = 'web'; 

        if (type === 'web') {
            finalType = 'web';
            const isUrl = query.includes('.') && !query.includes(' ');
            const targetUrl = isUrl 
                ? (query.startsWith('http') ? query : `https://${query}`) 
                : `${extraData?.engineUrl}${encodeURIComponent(query)}`;
            
            setTabs(tabs.map(t => t.id === activeTabId ? { ...t, title, type: finalType, data: { url: targetUrl } } : t));
            return;
        }
        
        if (type === 'kanban') { 
            finalType = 'kanban'; 
            title = query.trim() ? query : 'Tasks';
        }
        
        if (type === 'docs') { 
            finalType = 'docs'; 
            title = 'DevDocs'; 
        }
        
        setTabs(tabs.map(t => t.id === activeTabId ? { ...t, title, type: finalType } : t));
    };

    const handleInspectorToggle = (mode: 'history' | 'tasks') => {
        if (isInspectorOpen && inspectorMode === mode) {
            setInspectorOpen(false); 
        } else {
            setInspectorOpen(true);
            setInspectorMode(mode);
        }
    };

    const handleOpenFromInspector = (type: string, query: string) => {
        const id = Date.now().toString();
        let newTab: Tab = { id, title: query, type: 'web' };

        if (type === 'web') {
            const isUrl = query.startsWith('http');
            const url = isUrl ? query : `https://google.com/search?q=${encodeURIComponent(query)}`;
            newTab = { id, title: query, type: 'web', data: { url } };
        } else if (type === 'kanban') {
            newTab = { id, title: query || 'Tasks', type: 'kanban' };
        }

        setTabs([...tabs, newTab]);
        setActiveTabId(id);
    };

    return (
        <AppContainer>
            <TabBar 
                tabs={tabs} 
                activeTabId={activeTabId} 
                onSwitch={setActiveTabId} 
                onClose={handleCloseTab}
                onNew={handleNewTab} 
                onOpenInspector={handleInspectorToggle}
            />
            <MainLayout>
                <ContentArea>
                    {tabs.map(tab => (
                        <TabContent key={tab.id} $visible={tab.id === activeTabId}>
                            {tab.type === 'landing' && <LandingPage onOpenTab={handleOpenFromLanding} />}
                            {tab.type === 'kanban' && <KanbanBoard title={tab.title} />}
                            {tab.type === 'web' && <WebFrame url={(tab.data as { url: string })?.url} />}
                            
                            {tab.type === 'docs' && (
                                <IframeContainer>
                                    <iframe 
                                        src="https://devdocs.io" 
                                        style={{width:'100%', height:'100%', border:'none'}} 
                                        title="DevDocs"
                                    />
                                </IframeContainer>
                            )}
                        </TabContent>
                    ))}
                </ContentArea>
                
                <Inspector 
                    visible={isInspectorOpen} 
                    mode={inspectorMode} 
                    onClose={() => setInspectorOpen(false)}
                    onOpenItem={handleOpenFromInspector}
                />
            </MainLayout>
        </AppContainer>
    );
}