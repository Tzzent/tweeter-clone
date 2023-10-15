import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import Layout from '@/components/layout/Layout'
import SessionProvider from './providers/SessionProvider'
import ToasterProvider from './providers/ToasterProvider'

const inter = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Tweeter',
  description: 'This tweeter clone was made by @Tzzent',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ToasterProvider />
          <Layout>
            {children}
          </Layout>
        </SessionProvider>
      </body>
    </html>
  )
}
