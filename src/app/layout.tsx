import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'SecureSight - CCTV Monitoring Dashboard',
  description: 'Monitor CCTV feeds and detect security incidents',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-bs-theme="dark">
      <body className={`${inter.className} bg-dark text-white`}>
        {children}
      </body>
    </html>
  )
}
