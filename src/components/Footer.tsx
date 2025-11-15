'use client';

import styled from "styled-components";
import Link from "next/link";

const FooterWrapper = styled.footer`
  width: 100%;
  text-align: center;
  padding: 3rem 0;
  font-size: 1rem;
  color: #718096;
  background-color: #fff;
  border-top: 1px solid #E2E8F0;

  a {
    color: #4A5568;
    text-decoration: none;
    margin: 0 1rem;
    transition: color 0.2s;

    &:hover {
      color: #4A90E2;
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
      <p style={{ marginTop: '1rem' }}>&copy; {new Date().getFullYear()} Peak Browser. All rights reserved.</p>
    </FooterWrapper>
  );
}