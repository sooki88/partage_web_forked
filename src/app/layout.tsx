import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { pretendard } from '@/utils/fonts';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className} mx-auto`}>
        <header className="flex h-[81px] w-full items-center justify-between">
          <div className="heading-1">Partage</div>
          <div>
            <input
              type="text"
              placeholder="검색"
              className="w-[260px] border-b-4 border-foreground-high bg-transparent py-2 outline-none placeholder:text-foreground-high placeholder:body-large-3"
            />
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </header>
        <main className="h-screen w-full">{children}</main>
        <footer className="h-[210px]">
          <div className="flex flex-col gap-[23px] pt-[98px] text-gray-100">
            <div className="flex items-center justify-between">
              <p className="sub-heading-2 ">
                Harmonise Your <span className="text-[#4484FF]"> Playlist</span>: Your,
                <span className="text-[#4484FF]"> Soundtrack</span>, Your
                <span className="text-[#4484FF]"> Way</span>!
              </p>
              <div className="flex items-center justify-center gap-[23px] text-foreground-high">
                <Instagram />
                <Twitter />
                <Facebook />
              </div>
            </div>
            <div className="body-normal-3">Copyright 2023. All Rights Reserved</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
