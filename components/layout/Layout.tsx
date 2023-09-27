'use client';

import Footer from "./Footer";
import Header from "./header/Header";

interface LayoutProps {
  children: React.ReactNode,
  className?: string,
}

export default function Layout({
  children,
  className,
}: LayoutProps) {
  return (
    <div
      className="
      flex
      flex-col
      min-h-screen
      relative
      "
    >
      <Header />
      <main
        className="
        mt-14
        flex-1
        h-full
        w-full
        "
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
