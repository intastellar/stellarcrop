import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StellarCrop',
  description: 'On-chain warehouse receipts for African agriculture.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
