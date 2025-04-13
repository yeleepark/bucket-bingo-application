import React from 'react';
import { Header } from './header';
import { Footer } from './footer';

type PageLayoutProps = {
  children: React.ReactNode;
  showHeaderButtons?: boolean;
  showFooterLinks?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
};

export function PageLayout({
  children,
  showHeaderButtons = true,
  showFooterLinks = true,
  maxWidth = 'xl',
}: PageLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen p-6 ${maxWidthClasses[maxWidth]} mx-auto`}>
      <Header showActionButtons={showHeaderButtons} />
      <main className="flex-1">{children}</main>
      <Footer showFullLinks={showFooterLinks} />
    </div>
  );
}
