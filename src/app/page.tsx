'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import {
  Globe, FileText, CheckSquare, PenTool, MessageSquare,
  Apple, ArrowRight, Search, Clock, Bookmark,
  Lock, KeyRound, EyeOff, HardDrive, Cloud, BarChart3,
  Wifi, Share2, Users, Gamepad2, Wind, CloudRain, Timer,
  Layers, Cpu, Smartphone, History, Sparkles, Play,
} from 'lucide-react';
import { trackEvent, GA_CATEGORY } from '@/lib/analytics';

// --- CONFIG ---

const APP_STORE_URL = 'https://apps.apple.com/app/peak-browser/id6753611346';

const MODES = [
  { id: 'Search', icon: Globe, phrase: 'best hiking trails near Bergen' },
  { id: 'Note', icon: FileText, phrase: 'Trip planning — gear checklist' },
  { id: 'Tasks', icon: CheckSquare, phrase: 'App launch board' },
  { id: 'Whiteboard', icon: PenTool, phrase: 'Onboarding flow sketch' },
  { id: 'LLM', icon: MessageSquare, phrase: 'Summarize this article for me' },
];

// --- HOOKS ---

function useTypewriter() {
  const [modeIndex, setModeIndex] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const phrase = MODES[modeIndex].phrase;
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!deleting) {
        i++;
        setText(phrase.slice(0, i));
        if (i === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, 2000);
          return;
        }
        timer = setTimeout(tick, 40 + Math.random() * 45);
      } else {
        i--;
        setText(phrase.slice(0, i));
        if (i === 0) {
          setModeIndex((m) => (m + 1) % MODES.length);
          return;
        }
        timer = setTimeout(tick, 18);
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [modeIndex]);

  return { modeIndex, text };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// --- ANIMATIONS ---

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(0.6); opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
`;

const drift = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const pressKey = keyframes`
  0%, 8%, 100% {
    transform: translateY(0);
    box-shadow: 0 2px 0 var(--border-color);
    border-color: var(--border-color);
    color: var(--peak-secondary);
  }
  3%, 5% {
    transform: translateY(2px);
    box-shadow: 0 0 0 var(--border-color);
    border-color: var(--peak-accent);
    color: var(--peak-accent);
  }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.25; }
`;

const meshPing = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(40, 200, 64, 0.45); }
  100% { box-shadow: 0 0 0 9px rgba(40, 200, 64, 0); }
`;

// --- SHARED PRIMITIVES ---

const revealStyles = css`
  &[data-reveal] {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  &[data-reveal].revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled.main`
  /* clip, not hidden — hidden would force overflow-y:auto and create a nested scroll container */
  overflow-x: clip;
  background: var(--window-background-color);
  color: var(--peak-primary);
`;

const Section = styled.section`
  max-width: 1080px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  ${revealStyles}

  @media (max-width: 768px) {
    padding: 4rem 1.25rem;
  }
`;

const Kicker = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--peak-accent);
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 1rem;
`;

const SectionLead = styled.p`
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--peak-secondary);
  max-width: 560px;
`;

const Card = styled.div`
  background: var(--text-background-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
`;

// --- HERO ---

const Hero = styled.header`
  position: relative;
  padding: 9rem 1.5rem 0;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: -30%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 700px;
    background: radial-gradient(ellipse at center, color-mix(in srgb, var(--peak-accent) 22%, transparent) 0%, transparent 65%);
    pointer-events: none;
  }
`;

const Stars = styled.div<{ $alt?: boolean }>`
  position: absolute;
  top: ${(p) => (p.$alt ? '140px' : '70px')};
  left: 50%;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  pointer-events: none;
  display: none;

  @media (prefers-color-scheme: dark) {
    display: block;
    box-shadow: ${(p) =>
      p.$alt
        ? `-560px 30px 0 rgba(255,255,255,0.35), -330px 170px 0 rgba(255,255,255,0.25),
           -90px 40px 0 rgba(255,255,255,0.3), 150px 200px 0 rgba(255,255,255,0.25),
           400px 60px 0 rgba(255,255,255,0.35), 600px 180px 0 rgba(255,255,255,0.2)`
        : `-620px 120px 0 rgba(255,255,255,0.3), -430px 20px 0 rgba(255,255,255,0.35),
           -210px 150px 0 rgba(255,255,255,0.2), 60px 10px 0 rgba(255,255,255,0.35),
           280px 130px 0 rgba(255,255,255,0.3), 520px 20px 0 rgba(255,255,255,0.25),
           640px 220px 0 rgba(255,255,255,0.3)`};
    animation: ${twinkle} ${(p) => (p.$alt ? '5.5s 1.8s' : '4s')} ease-in-out infinite;
  }
`;

const Stage = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1060px;
  margin: 0 auto;
`;

const FloatCard = styled.div<{ $pos: string; $rot: string; $delay: string }>`
  position: absolute;
  ${(p) => p.$pos}
  width: 195px;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  text-align: left;
  background: color-mix(in srgb, var(--text-background-color) 78%, transparent);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.3);
  rotate: ${(p) => p.$rot};
  animation: ${drift} 7s ${(p) => p.$delay} ease-in-out infinite;
  z-index: 3;

  .head {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 9px;

    svg { color: var(--peak-accent); }
  }
  .line {
    height: 8px;
    border-radius: 4px;
    background: var(--control-background-color);
    margin-bottom: 7px;
  }
  .mini {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .mini div {
    height: 22px;
    border-radius: 6px;
    background: var(--control-background-color);
  }
  .bubble {
    font-size: 0.78rem;
    line-height: 1.4;
    color: var(--peak-secondary);
    background: var(--control-background-color);
    padding: 7px 10px;
    border-radius: 10px;
  }

  @media (max-width: 1180px) {
    display: none;
  }
`;

const MeshPill = styled.div`
  position: absolute;
  right: -34px;
  bottom: -72px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.55rem 1.05rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--text-background-color) 78%, transparent);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 14px 30px -14px rgba(0, 0, 0, 0.3);
  font-size: 0.82rem;
  font-weight: 600;
  z-index: 3;
  animation: ${drift} 6s 1s ease-in-out infinite;

  svg { color: var(--peak-accent); }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #28c840;
    animation: ${meshPing} 2s ease-out infinite;
  }

  @media (max-width: 1180px) {
    display: none;
  }
`;

const PlanetWrap = styled.div`
  position: relative;
  z-index: 1;
  height: 380px;
  margin-top: -240px;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (max-width: 768px) {
    height: 250px;
    margin-top: -150px;
  }
`;

const HeroInner = styled.div`
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  animation: ${fadeUp} 0.8s ease both;
`;

const Badge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--control-background-color);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--peak-secondary);
  margin-bottom: 1.75rem;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: var(--peak-primary);
    border-color: var(--peak-accent);
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.6rem, 7vw, 4.4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.03;
  margin-bottom: 1.4rem;

  span {
    background: linear-gradient(120deg, var(--peak-accent), color-mix(in srgb, var(--peak-accent) 45%, var(--peak-primary)));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSub = styled.p`
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: var(--peak-secondary);
  max-width: 620px;
  margin: 0 auto 2.25rem;
`;

const CTARow = styled.div`
  display: flex;
  gap: 0.9rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const StoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0.95rem 1.9rem;
  border-radius: 14px;
  background: var(--peak-primary);
  color: var(--window-background-color);
  font-weight: 700;
  font-size: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--peak-primary) 45%, transparent);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px -10px color-mix(in srgb, var(--peak-primary) 55%, transparent);
  }

  @media (prefers-color-scheme: dark) {
    box-shadow: 0 10px 30px -12px color-mix(in srgb, var(--peak-primary) 20%, transparent);

    &:hover {
      box-shadow: 0 16px 36px -12px color-mix(in srgb, var(--peak-primary) 28%, transparent);
    }
  }
`;

const GhostButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.95rem 1.6rem;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  color: var(--peak-primary);
  font-weight: 600;
  font-size: 1rem;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: var(--peak-accent);
    background: var(--control-background-color);
  }
`;

// --- COMMAND SURFACE MOCK ---

const SurfaceWrap = styled.div`
  position: relative;
  max-width: 760px;
  margin: 4.5rem auto 0;
  animation: ${fadeUp} 0.9s 0.2s ease both;
`;

const Surface = styled(Card)`
  border-radius: 22px;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.35);
  text-align: left;
`;

const TrafficBar = styled.div`
  display: flex;
  gap: 7px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);

  span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--border-color);
  }
  span:nth-child(1) { background: #ff5f57; }
  span:nth-child(2) { background: #febc2e; }
  span:nth-child(3) { background: #28c840; }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px;
  padding: 0.95rem 1.15rem;
  border-radius: 14px;
  background: var(--control-background-color);
  border: 1px solid var(--border-color);
  font-size: 1.02rem;
`;

const TypedText = styled.span`
  color: var(--peak-primary);
  white-space: nowrap;
  overflow: hidden;
`;

const Caret = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.15em;
  background: var(--peak-accent);
  animation: ${blink} 1.1s steps(1) infinite;
  vertical-align: text-bottom;
`;

const ShortcutKeys = styled.span`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
`;

const KeyCap = styled.span<{ $d: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 7px;
  border-radius: 7px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 0 var(--border-color);
  background: var(--text-background-color);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--peak-secondary);
  animation: ${pressKey} 4.5s ${(p) => p.$d} ease-in-out infinite;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 22px 22px;
  flex-wrap: wrap;
`;

const Chip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: default;
  border: 1px solid ${(p) => (p.$active ? 'var(--peak-accent)' : 'var(--border-color)')};
  background: ${(p) => (p.$active ? 'color-mix(in srgb, var(--peak-accent) 14%, transparent)' : 'transparent')};
  color: ${(p) => (p.$active ? 'var(--peak-accent)' : 'var(--peak-secondary)')};
  transition: all 0.3s ease;
`;

const PreviewArea = styled.div`
  height: 190px;
  margin: 0 22px 22px;
  border-radius: 14px;
  border: 1px dashed var(--border-color);
  padding: 18px;
  position: relative;
  overflow: hidden;

  @media (max-width: 560px) {
    height: 160px;
  }
`;

const PreviewFade = styled.div`
  animation: ${fadeUp} 0.45s ease both;
  height: 100%;
`;

const GhostLine = styled.div<{ $w: string }>`
  height: 11px;
  border-radius: 6px;
  background: var(--control-background-color);
  width: ${(p) => p.$w};
  margin-bottom: 12px;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;

  .dot {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--peak-accent) 18%, var(--control-background-color));
    flex-shrink: 0;
  }
  .lines { flex: 1; }
  .lines div { margin-bottom: 6px; }
`;

const KanbanMock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  height: 100%;

  .col {
    background: var(--control-background-color);
    border-radius: 10px;
    padding: 10px;
  }
  .card {
    background: var(--text-background-color);
    border: 1px solid var(--border-color);
    border-radius: 7px;
    height: 30px;
    margin-bottom: 8px;
  }
  .label {
    height: 8px;
    width: 60%;
    border-radius: 4px;
    background: var(--border-color);
    margin-bottom: 10px;
  }
`;

const BoardMock = styled.div`
  position: relative;
  height: 100%;

  .shape {
    position: absolute;
    border: 2px solid var(--peak-accent);
    opacity: 0.65;
    border-radius: 10px;
  }
  .s1 { width: 90px; height: 56px; left: 8%; top: 12%; }
  .s2 { width: 74px; height: 74px; border-radius: 50%; right: 14%; top: 8%; }
  .s3 { width: 110px; height: 48px; left: 38%; bottom: 10%; }
  svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  line { stroke: var(--peak-secondary); stroke-width: 1.5; stroke-dasharray: 5 5; opacity: 0.5; }
`;

const ChatMock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: flex-end;

  .bubble {
    max-width: 70%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 0.82rem;
    line-height: 1.4;
    color: var(--peak-secondary);
  }
  .user {
    align-self: flex-end;
    background: color-mix(in srgb, var(--peak-accent) 20%, var(--control-background-color));
    color: var(--peak-primary);
  }
  .ai {
    align-self: flex-start;
    background: var(--control-background-color);
  }
`;

function ModePreview({ mode }: { mode: string }) {
  switch (mode) {
    case 'Search':
      return (
        <PreviewFade key="search">
          <ResultRow><div className="dot" /><div className="lines"><GhostLine $w="55%" /><GhostLine $w="80%" /></div></ResultRow>
          <ResultRow><div className="dot" /><div className="lines"><GhostLine $w="42%" /><GhostLine $w="70%" /></div></ResultRow>
          <ResultRow><div className="dot" /><div className="lines"><GhostLine $w="60%" /><GhostLine $w="75%" /></div></ResultRow>
        </PreviewFade>
      );
    case 'Note':
      return (
        <PreviewFade key="note">
          <GhostLine $w="40%" style={{ height: 16 }} />
          <GhostLine $w="92%" />
          <GhostLine $w="86%" />
          <GhostLine $w="64%" />
          <GhostLine $w="78%" />
        </PreviewFade>
      );
    case 'Tasks':
      return (
        <PreviewFade key="tasks">
          <KanbanMock>
            <div className="col"><div className="label" /><div className="card" /><div className="card" /><div className="card" /></div>
            <div className="col"><div className="label" /><div className="card" /><div className="card" /></div>
            <div className="col"><div className="label" /><div className="card" /></div>
          </KanbanMock>
        </PreviewFade>
      );
    case 'Whiteboard':
      return (
        <PreviewFade key="board">
          <BoardMock>
            <svg><line x1="22%" y1="30%" x2="78%" y2="24%" /><line x1="50%" y1="34%" x2="48%" y2="78%" /></svg>
            <div className="shape s1" /><div className="shape s2" /><div className="shape s3" />
          </BoardMock>
        </PreviewFade>
      );
    default:
      return (
        <PreviewFade key="llm">
          <div style={{ height: '100%' }}>
            <ChatMock>
              <div className="bubble user">Summarize this article for me</div>
              <div className="bubble ai">Here are the key points — running locally via Ollama…</div>
            </ChatMock>
          </div>
        </PreviewFade>
      );
  }
}

// --- FEATURE SECTIONS ---

const SplitSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 0.98rem;
    line-height: 1.5;
    color: var(--peak-secondary);

    svg {
      flex-shrink: 0;
      margin-top: 2px;
      color: var(--peak-accent);
    }
    strong { color: var(--peak-primary); font-weight: 600; }
  }
`;

// Session mock (Section 1)
const SessionMock = styled(Card)`
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h4 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--peak-secondary);
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 0.3rem;
  }
`;

const SessionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  background: var(--control-background-color);
  border: 1px solid transparent;
  transition: border-color 0.2s;

  &:hover { border-color: var(--peak-accent); }

  .fav {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--peak-accent) 16%, var(--text-background-color));
    color: var(--peak-accent);
    flex-shrink: 0;
  }
  .meta { flex: 1; min-width: 0; }
  .title { font-size: 0.88rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sub { font-size: 0.76rem; color: var(--peak-secondary); }
  .time { font-size: 0.74rem; color: var(--peak-secondary); flex-shrink: 0; }
`;

// Tool grid (Section 2)
const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;
  margin-top: 3rem;

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const ToolCard = styled(Card)`
  padding: 1.6rem;
  transition: transform 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--peak-accent);
  }

  .icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--peak-accent) 14%, var(--control-background-color));
    color: var(--peak-accent);
    margin-bottom: 1.1rem;
  }
  h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.45rem; }
  p { font-size: 0.9rem; line-height: 1.55; color: var(--peak-secondary); }
`;

// Privacy (Section 3)
const PrivacyPanel = styled(Card)`
  padding: 3.5rem;
  background:
    radial-gradient(ellipse at top left, color-mix(in srgb, var(--peak-accent) 10%, transparent), transparent 55%),
    var(--text-background-color);

  @media (max-width: 768px) { padding: 2rem; }
`;

const PrivacyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem 2rem;
  margin-top: 2.5rem;

  @media (max-width: 860px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const PrivacyItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;

  svg { color: var(--peak-accent); flex-shrink: 0; margin-top: 2px; }
  h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.25rem; }
  p { font-size: 0.85rem; line-height: 1.5; color: var(--peak-secondary); }
`;

// Mesh (Section 4)
const MeshVisual = styled.div`
  position: relative;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 860px) { height: 300px; }
`;

const MeshRing = styled.div<{ $delay: string }>`
  position: absolute;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  border: 1.5px solid var(--peak-accent);
  animation: ${pulse} 3.2s ${(p) => p.$delay} ease-out infinite;
`;

const MeshCenter = styled.div`
  width: 74px;
  height: 74px;
  border-radius: 22px;
  background: var(--peak-primary);
  color: var(--window-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.4);
`;

const MeshNode = styled.div<{ $x: string; $y: string; $delay: string }>`
  position: absolute;
  left: ${(p) => p.$x};
  top: ${(p) => p.$y};
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--text-background-color);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--peak-accent);
  animation: ${drift} 4s ${(p) => p.$delay} ease-in-out infinite;
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.25);
  z-index: 2;
`;

// Platforms (Section 5)
const PlatformStrip = styled(Section)`
  text-align: center;
`;

const TechChips = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2.25rem;
`;

const TechChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.65rem 1.2rem;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--text-background-color);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--peak-secondary);

  svg { color: var(--peak-accent); }
`;

// Intermission (Section 6)
const IntermissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-top: 3rem;

  @media (max-width: 860px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 560px) { grid-template-columns: repeat(2, 1fr); }
`;

const IntermissionCard = styled(Card)`
  padding: 1.4rem 1rem;
  text-align: center;
  transition: transform 0.25s ease;

  &:hover { transform: translateY(-4px) rotate(-1deg); }

  svg { color: var(--peak-accent); margin-bottom: 0.6rem; }
  div { font-size: 0.85rem; font-weight: 600; }
`;

// Final CTA
const FinalCTA = styled(Section)`
  text-align: center;
  padding-bottom: 8rem;
`;

// --- PAGE ---

export default function Home() {
  const { modeIndex, text } = useTypewriter();
  useReveal();

  const activeMode = MODES[modeIndex];

  const handleStoreClick = (label: string) => {
    trackEvent({ action: 'app_store_click', category: GA_CATEGORY.DOWNLOAD, label });
  };

  return (
    <Page>
      {/* HERO */}
      <Hero>
        <Stars aria-hidden />
        <Stars aria-hidden $alt />
        <HeroInner>
          <Badge href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => handleStoreClick('Hero Badge')}>
            <Apple size={13} /> Now on the App Store
          </Badge>
          <HeroTitle>
            Press a shortcut.<br /><span>Peak appears.</span>
          </HeroTitle>
          <HeroSub>
            A native Apple browser workspace for quick lookups, saved context,
            private profiles, optional AI, whiteboards, and nearby collaboration —
            one calm command surface.
          </HeroSub>
          <CTARow>
            <StoreButton href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => handleStoreClick('Hero CTA')}>
              <Apple size={19} /> Download on the App Store
            </StoreButton>
            <GhostButton href="/demo">
              <Play size={16} /> Try the web demo
            </GhostButton>
          </CTARow>
        </HeroInner>

        {/* COMMAND SURFACE + FLOATING OUTCOMES */}
        <Stage>
          <FloatCard $pos="left: -72px; top: 44px;" $rot="-5deg" $delay="0s">
            <div className="head"><FileText size={14} /> Gear checklist</div>
            <div className="line" style={{ width: '86%' }} />
            <div className="line" style={{ width: '62%' }} />
            <div className="line" style={{ width: '74%' }} />
          </FloatCard>

          <FloatCard $pos="right: -80px; top: 100px;" $rot="4deg" $delay="1.4s">
            <div className="head"><CheckSquare size={14} /> Launch board</div>
            <div className="mini"><div /><div /><div /><div /></div>
          </FloatCard>

          <FloatCard $pos="left: -48px; bottom: -30px;" $rot="3deg" $delay="0.8s">
            <div className="head"><MessageSquare size={14} /> Ask AI</div>
            <div className="bubble">Summarize this page →</div>
          </FloatCard>

          <MeshPill>
            <span className="dot" /> <Wifi size={13} /> 2 peers nearby
          </MeshPill>

          <SurfaceWrap>
            <Surface>
            <TrafficBar><span /><span /><span /></TrafficBar>
            <InputRow>
              <Search size={18} color="var(--peak-secondary)" />
              <TypedText>{text}</TypedText>
              <Caret />
              <ShortcutKeys>
                <KeyCap $d="0s">⌃</KeyCap>
                <KeyCap $d="0.12s">1</KeyCap>
              </ShortcutKeys>
            </InputRow>
            <ChipRow>
              {MODES.map((m, i) => (
                <Chip key={m.id} $active={i === modeIndex}>
                  <m.icon size={14} /> {m.id}
                </Chip>
              ))}
            </ChipRow>
            <PreviewArea>
              <ModePreview mode={activeMode.id} />
            </PreviewArea>
            </Surface>
          </SurfaceWrap>
        </Stage>

        {/* PLANET HORIZON */}
        <PlanetWrap id="planet-horizon" aria-hidden>
          <svg viewBox="0 0 1200 460" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="planetFill" cx="0.5" cy="0" r="0.55">
                <stop offset="0%" stopColor="var(--peak-accent)" stopOpacity="0.28" />
                <stop offset="45%" stopColor="var(--peak-accent)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--peak-accent)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="planetRim" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--peak-accent)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--peak-accent)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--peak-accent)" stopOpacity="0" />
              </linearGradient>
              <filter id="planetBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>

            {/* planet body + glowing rim */}
            <circle cx="600" cy="1300" r="1000" fill="url(#planetFill)" />
            <circle cx="600" cy="1300" r="1000" fill="none" stroke="url(#planetRim)" strokeWidth="10" opacity="0.35" filter="url(#planetBlur)" />
            <circle cx="600" cy="1300" r="1000" fill="none" stroke="url(#planetRim)" strokeWidth="1.5" />
            {/* latitude rings */}
            <circle cx="600" cy="1300" r="952" fill="none" stroke="var(--peak-accent)" strokeOpacity="0.14" strokeWidth="1" />
            <circle cx="600" cy="1300" r="900" fill="none" stroke="var(--peak-accent)" strokeOpacity="0.07" strokeWidth="1" />

            {/* connection arcs between peers */}
            <path d="M177 394 Q 430 130 739 310" fill="none" stroke="var(--peak-accent)" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 7" strokeLinecap="round" />
            <path d="M341 334 Q 660 120 1023 394" fill="none" stroke="var(--peak-accent)" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 7" strokeLinecap="round" />

            {/* traveling packets */}
            <circle r="3.5" fill="var(--peak-accent)">
              <animateMotion dur="7s" repeatCount="indefinite" path="M177 394 Q 430 130 739 310" />
            </circle>
            <circle r="3.5" fill="var(--peak-accent)">
              <animateMotion dur="9s" begin="2.5s" repeatCount="indefinite" path="M1023 394 Q 660 120 341 334" />
            </circle>

            {/* peer pins with pulse rings */}
            {[[177, 394], [341, 334], [495, 306], [739, 310], [1023, 394]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill="none" stroke="var(--peak-accent)" strokeWidth="1.5">
                  <animate attributeName="r" values="6;24" dur="3s" begin={`${i * 0.55}s`} repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.6;0" dur="3s" begin={`${i * 0.55}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r="5.5" fill="var(--peak-accent)" stroke="var(--window-background-color)" strokeWidth="2.5" />
              </g>
            ))}
          </svg>
        </PlanetWrap>
      </Hero>

      {/* SECTION 1: SEARCH WITHOUT LOSING THE THREAD */}
      <SplitSection data-reveal>
        <div>
          <Kicker><History size={14} /> Saved context</Kicker>
          <SectionTitle>Search without losing the thread.</SectionTitle>
          <SectionLead>
            Peak is built for the lookup-and-return rhythm. WebKit tabs, your
            favorite search engines, saved sessions, and jump-back history keep
            the trail warm — so a quick search never costs you your flow.
          </SectionLead>
          <FeatureList>
            <li><Globe size={18} /><span><strong>Fast WebKit browsing</strong> with a dozen search engines one keystroke away.</span></li>
            <li><Bookmark size={18} /><span><strong>Sessions, bookmarks &amp; activity</strong> saved automatically as you move.</span></li>
            <li><Clock size={18} /><span><strong>Jump back in</strong> — recent tabs, notes, and boards surface right on the command surface.</span></li>
          </FeatureList>
        </div>
        <SessionMock>
          <h4><Clock size={13} /> Jump back in</h4>
          <SessionRow>
            <div className="fav"><Globe size={15} /></div>
            <div className="meta"><div className="title">WebKit documentation — WKWebView</div><div className="sub">Research session · 4 tabs</div></div>
            <div className="time">2m ago</div>
          </SessionRow>
          <SessionRow>
            <div className="fav"><CheckSquare size={15} /></div>
            <div className="meta"><div className="title">App launch board</div><div className="sub">Kanban · 3 columns</div></div>
            <div className="time">1h ago</div>
          </SessionRow>
          <SessionRow>
            <div className="fav"><FileText size={15} /></div>
            <div className="meta"><div className="title">Trip planning — gear checklist</div><div className="sub">Note · edited today</div></div>
            <div className="time">3h ago</div>
          </SessionRow>
          <SessionRow>
            <div className="fav"><PenTool size={15} /></div>
            <div className="meta"><div className="title">Onboarding flow sketch</div><div className="sub">Whiteboard</div></div>
            <div className="time">Yesterday</div>
          </SessionRow>
        </SessionMock>
      </SplitSection>

      {/* SECTION 2: TURN LOOKUPS INTO WORK */}
      <Section data-reveal>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <Kicker style={{ justifyContent: 'center' }}><Sparkles size={14} /> One input, many outcomes</Kicker>
          <SectionTitle>Turn lookups into work.</SectionTitle>
          <SectionLead style={{ margin: '0 auto' }}>
            The same input that searches the web can start a note, spin up a task
            board, open a whiteboard, or ask an AI. Browsing flows straight into
            doing.
          </SectionLead>
        </div>
        <ToolGrid>
          <ToolCard>
            <div className="icon"><FileText size={21} /></div>
            <h3>Block Notes</h3>
            <p>Capture ideas in structured, block-based notes that live right next to your tabs.</p>
          </ToolCard>
          <ToolCard>
            <div className="icon"><CheckSquare size={21} /></div>
            <h3>Task Boards</h3>
            <p>Kanban boards for planning — turn a research session into a shipped project.</p>
          </ToolCard>
          <ToolCard>
            <div className="icon"><PenTool size={21} /></div>
            <h3>Whiteboards</h3>
            <p>Infinite canvases for sketching, diagramming, and thinking spatially.</p>
          </ToolCard>
          <ToolCard>
            <div className="icon"><MessageSquare size={21} /></div>
            <h3>AI Chats</h3>
            <p>Opt-in AI through local Ollama or cloud models via OpenRouter. Never the center — always available.</p>
          </ToolCard>
          <ToolCard>
            <div className="icon"><HardDrive size={21} /></div>
            <h3>Files</h3>
            <p>Keep downloads and documents close to the context they came from.</p>
          </ToolCard>
          <ToolCard>
            <div className="icon"><Layers size={21} /></div>
            <h3>Inspectors</h3>
            <p>Activity views, history, and bookmarks — always one pane away.</p>
          </ToolCard>
        </ToolGrid>
      </Section>

      {/* SECTION 3: PRIVATE BY DESIGN */}
      <Section data-reveal>
        <PrivacyPanel>
          <Kicker><Lock size={14} /> Private by design</Kicker>
          <SectionTitle>Your workspace stays yours.</SectionTitle>
          <SectionLead>
            Local-first by default. No accounts required, no built-in analytics,
            and nothing leaves your devices unless you choose iCloud sync.
          </SectionLead>
          <PrivacyGrid>
            <PrivacyItem>
              <HardDrive size={19} />
              <div><h4>Local-first storage</h4><p>Notes, boards, history, and sessions live on your device.</p></div>
            </PrivacyItem>
            <PrivacyItem>
              <Cloud size={19} />
              <div><h4>Private iCloud sync</h4><p>Optional sync through your own iCloud — never our servers.</p></div>
            </PrivacyItem>
            <PrivacyItem>
              <Users size={19} />
              <div><h4>Isolated profiles</h4><p>Workspace profiles separate cookies, sessions, caches, and storage.</p></div>
            </PrivacyItem>
            <PrivacyItem>
              <EyeOff size={19} />
              <div><h4>True incognito</h4><p>No history or activity persistence when you go private.</p></div>
            </PrivacyItem>
            <PrivacyItem>
              <KeyRound size={19} />
              <div><h4>Keys in Keychain</h4><p>AI API keys are stored in the Apple Keychain, nowhere else.</p></div>
            </PrivacyItem>
            <PrivacyItem>
              <BarChart3 size={19} />
              <div><h4>No built-in analytics</h4><p>Peak doesn&apos;t watch you work. Full stop.</p></div>
            </PrivacyItem>
          </PrivacyGrid>
        </PrivacyPanel>
      </Section>

      {/* SECTION 4: PEAK MESH */}
      <SplitSection data-reveal>
        <MeshVisual>
          <MeshRing $delay="0s" />
          <MeshRing $delay="1.1s" />
          <MeshRing $delay="2.2s" />
          <MeshCenter><Wifi size={30} /></MeshCenter>
          <MeshNode $x="12%" $y="16%" $delay="0s"><MessageSquare size={20} /></MeshNode>
          <MeshNode $x="74%" $y="12%" $delay="0.6s"><Share2 size={20} /></MeshNode>
          <MeshNode $x="8%" $y="68%" $delay="1.2s"><Gamepad2 size={20} /></MeshNode>
          <MeshNode $x="78%" $y="64%" $delay="1.8s"><Smartphone size={20} /></MeshNode>
        </MeshVisual>
        <div>
          <Kicker><Wifi size={14} /> Peak Mesh</Kicker>
          <SectionTitle>Collaborate with the room.</SectionTitle>
          <SectionLead>
            Nearby devices discover each other directly — no accounts, no cloud
            relay, no setup. Just people in the same space, working together.
          </SectionLead>
          <FeatureList>
            <li><MessageSquare size={18} /><span><strong>Local chat</strong> with everyone nearby, instantly.</span></li>
            <li><Share2 size={18} /><span><strong>Share tabs &amp; sync workspaces</strong> device to device.</span></li>
            <li><Gamepad2 size={18} /><span><strong>Multiplayer lobbies</strong> — invite the room into a game.</span></li>
          </FeatureList>
        </div>
      </SplitSection>

      {/* SECTION 5: BUILT FOR APPLE PLATFORMS */}
      <PlatformStrip data-reveal>
        <Kicker style={{ justifyContent: 'center' }}><Apple size={14} /> Native, through and through</Kicker>
        <SectionTitle>Built for Apple platforms.</SectionTitle>
        <SectionLead style={{ margin: '0 auto' }}>
          Peak is not a web wrapper. It&apos;s native SwiftUI on top of WebKit,
          with Core Data and CloudKit underneath — at home on every Apple screen.
        </SectionLead>
        <TechChips>
          <TechChip><Cpu size={16} /> SwiftUI</TechChip>
          <TechChip><Globe size={16} /> WebKit</TechChip>
          <TechChip><Cloud size={16} /> Core Data + CloudKit</TechChip>
          <TechChip><Apple size={16} /> macOS · iPadOS · iOS</TechChip>
        </TechChips>
      </PlatformStrip>

      {/* SECTION 6: INTERMISSION */}
      <Section data-reveal>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <Kicker style={{ justifyContent: 'center' }}><Gamepad2 size={14} /> Intermission</Kicker>
          <SectionTitle>Take a break without leaving.</SectionTitle>
          <SectionLead style={{ margin: '0 auto' }}>
            Deep work needs recovery. Peak ships with playful pauses — right
            inside the workspace, and multiplayer over Mesh.
          </SectionLead>
        </div>
        <IntermissionGrid>
          <IntermissionCard><Gamepad2 size={22} /><div>Arcade</div></IntermissionCard>
          <IntermissionCard><Wind size={22} /><div>Breathing</div></IntermissionCard>
          <IntermissionCard><CloudRain size={22} /><div>Rain</div></IntermissionCard>
          <IntermissionCard><Timer size={22} /><div>Focus</div></IntermissionCard>
          <IntermissionCard><Play size={22} /><div>Slideshows</div></IntermissionCard>
          <IntermissionCard><Users size={22} /><div>Mesh games</div></IntermissionCard>
        </IntermissionGrid>
      </Section>

      {/* FINAL CTA */}
      <FinalCTA data-reveal>
        <SectionTitle style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
          Your workspace,<br />one shortcut away.
        </SectionTitle>
        <SectionLead style={{ margin: '0 auto 2.5rem' }}>
          Search, save, plan, draw, ask AI, and collaborate nearby — from one
          calm command surface. Local-first, private, and ready when you are.
        </SectionLead>
        <CTARow>
          <StoreButton href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => handleStoreClick('Footer CTA')}>
            <Apple size={19} /> Download on the App Store
          </StoreButton>
          <GhostButton href="/demo">
            Try the web demo <ArrowRight size={16} />
          </GhostButton>
        </CTARow>
      </FinalCTA>
    </Page>
  );
}
