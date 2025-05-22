import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Aus Location Intelligence',
  description: 'Low-cost location intelligence for Australia',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">{children}</body>
    </html>
  )
}
