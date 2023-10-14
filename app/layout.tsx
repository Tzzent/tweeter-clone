import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import Layout from '@/components/layout/Layout'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'

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
        <AuthContext>
          <ToasterContext />
          <Layout>
            {children}
          </Layout>
        </AuthContext>
      </body>
    </html>
  )
}
