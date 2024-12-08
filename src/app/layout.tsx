import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Starlet Fashion',
  description: 'Discover awesome products from your favourite Insta brands',
  icons: {
    icon: [
      {
        url: 'https://pub-06d51e6c1aa54fd89591586997af384c.r2.dev/logo.jpg',
        sizes: '32x32',
        type: 'image/jpg',
      },
      {
        url: 'https://pub-06d51e6c1aa54fd89591586997af384c.r2.dev/logo.jpg',
        sizes: '16x16',
        type: 'image/jpg',
      }
    ],
    apple: [
      {
        url: 'https://pub-06d51e6c1aa54fd89591586997af384c.r2.dev/logo.jpg',
        sizes: '180x180',
        type: 'image/jpg',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F8F1FF]`}>
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src="https://pub-06d51e6c1aa54fd89591586997af384c.r2.dev/logo.jpg" 
                alt="Starlet Fashion Logo" 
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-2xl font-bold text-purple-700">Starlet Fashion</span>
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t bg-white mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src="https://pub-06d51e6c1aa54fd89591586997af384c.r2.dev/logo.jpg" 
                  alt="Starlet Fashion Logo" 
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-lg font-semibold text-gray-700">Starlet Fashion</span>
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Starlet Fashion. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 