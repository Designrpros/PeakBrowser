'use client';

import styled from "styled-components";
import Link from "next/link";

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
  return (
    <FooterWrapper>
      <div>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </div>
      <p style={{ marginTop: '1rem', opacity: 0.8 }}>&copy; {new Date().getFullYear()} Peak Browser. All rights reserved.</p>
    </FooterWrapper>
  );
}