'use client';

import React, { useEffect } from 'react';
import styled from "styled-components";
import { ExternalLink, Globe } from 'lucide-react';
import { trackEvent, GA_CATEGORY } from '@/lib/analytics'; // Analytics Import

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: var(--control-background-color);
    color: var(--peak-primary);
    text-align: center;
    padding: 2rem;
`;

const Card = styled.div`
    background-color: var(--window-background-color);
    padding: 3rem;
    border-radius: 24px;
    border: 1px solid var(--border-color);
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    max-width: 480px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

const IconCircle = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--control-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--peak-secondary);
    margin-bottom: 0.5rem;
`;

const Title = styled.h3`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
`;

const UrlText = styled.div`
    display: block;
    background-color: var(--control-background-color);
    padding: 12px 16px;
    border-radius: 12px;
    width: 100%;
    word-break: break-all;
    font-family: monospace;
    font-size: 0.9rem;
    color: var(--peak-secondary);
    border: 1px solid var(--border-color);
`;

const Button = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: var(--peak-accent);
    color: white;
    padding: 14px 32px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: transform 0.2s, opacity 0.2s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    
    &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
`;

export default function WebFrame({ url }: { url: string }) {
    
    // Auto-open logic 
    useEffect(() => {
        if (url) {
            // Track auto-open attempts
            trackEvent({
                action: 'auto_open_url',
                category: GA_CATEGORY.EXTERNAL,
                label: url
            });

            const timer = setTimeout(() => {
                window.open(url, '_blank');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [url]);

    const handleManualOpen = () => {
        trackEvent({
            action: 'manual_open_url',
            category: GA_CATEGORY.EXTERNAL,
            label: url
        });
    };

    return (
        <Container>
            <Card>
                <IconCircle>
                    <Globe size={32} />
                </IconCircle>
                <Title>External Link</Title>
                <p style={{opacity: 0.7, lineHeight: 1.5}}>
                    This website is opening in a new tab.<br/>
                    If it was blocked, click the button below.
                </p>
                <UrlText>{url}</UrlText>
                <Button 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={handleManualOpen}
                >
                    Open Website <ExternalLink size={18} />
                </Button>
            </Card>
        </Container>
    );
}