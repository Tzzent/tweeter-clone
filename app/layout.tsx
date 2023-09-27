import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import Layout from '@/components/layout/Layout'

const inter = Noto_Sans({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Tweeter',
  description: 'This tweeter clone was made by @Tzzent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
