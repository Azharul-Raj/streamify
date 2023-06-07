import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModelProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/action/getSongsByUserId'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Streamify',
  description: 'Music streaming website',
}
export const revalidate=0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const mySongs=await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}
        suppressHydrationWarning={true}
      >
        <SupabaseProvider>
          <UserProvider>
            <ToasterProvider/>
            <ModalProvider />
            <Sidebar songs={mySongs}>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
