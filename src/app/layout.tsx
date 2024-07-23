import Header from '@/components/Header';
import { pretendard } from '@/utils/fonts';

import AuthSession from '../lib/AuthSession';

import type { Metadata } from 'next';

import './globals.css';
import KakaoScript from '@/lib/KakaoScript';

export const metadata: Metadata = {
  title: 'Partage',
  description: 'Generated by Partage Team',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable} h-full`}>
      <body className={`${pretendard.className} flex h-full flex-col`}>
        <AuthSession>
          <Header />
          {children}
        </AuthSession>
        <KakaoScript />
      </body>
    </html>
  );
}
