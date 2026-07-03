'use client';

import styled from "styled-components";
import Link from "next/link";
import { trackEvent, GA_CATEGORY } from '@/lib/analytics'; // Analytics Import

const FooterWrapper = styled.footer`
  width: 100%;
  text-align: center;
  padding: 3rem 0;
  font-size: 0.9rem;
  
  /* Adaptive Theme Colors */
  background-color: var(--window-background-color);
  color: var(--peak-secondary);
  border-top: 1px solid var(--border-color);

  a {
    color: var(--peak-secondary);
    text-decoration: none;
    margin: 0 1rem;
    transition: color 0.2s;

    &:hover {
      color: var(--peak-primary);
    }
  }
`;

export default function Footer() {
  
  const handleFooterClick = (label: string) => {
    trackEvent({
        action: 'footer_click',
        category: GA_CATEGORY.NAVIGATION,
        label: label
    });
  };

  return (
    <FooterWrapper>
      <div>
        <Link href="/privacy" onClick={() => handleFooterClick('Privacy Policy')}>Privacy Policy</Link>
        <Link href="/terms" onClick={() => handleFooterClick('Terms of Service')}>Terms of Service</Link>
      </div>
      <p style={{ marginTop: '1rem', opacity: 0.8 }}>&copy; {new Date().getFullYear()} Peak Browser. All rights reserved.</p>
    </FooterWrapper>
  );
}