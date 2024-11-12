import './globals.css'

import { cn } from '@/lib/utils'

import { Navbar } from './Navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="pt-br">
      <body className={cn('min-h-screen bg-background')}>
        <Navbar />

        {children}
      </body>
    </html>
  )
}
