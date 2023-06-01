import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Streamify',
  description: 'Music streaming website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className} 
      suppressHydrationWarning={true}
      >
        <Sidebar>
        {children}
        </Sidebar>        
      </body>
    </html>
  )
}
