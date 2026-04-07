import type { Metadata } from 'next'
import { DM_Sans, Syne, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GA_TRACKING_ID } from '@/lib/analytics'
import '@/styles/globals.css'
import { Providers } from '@/components/providers'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://devdairy.online'),
  title: {
    default: 'Rupa.dev — Full-Stack Developer Blog',
    template: '%s | Rupa.dev',
  },
  description:
    'Real projects. Real code. Full-stack tutorials on React, Spring Boot, PostgreSQL, and more — written by Rupa.',
  keywords: ['React', 'Spring Boot', 'Full Stack', 'JavaScript', 'Java', 'Web Development', 'Blog'],
  authors: [{ name: 'Rupa', url: 'https://devdairy.online' }],
  creator: 'Rupa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devdairy.online',
    siteName: 'Rupa.dev',
    title: 'Rupa.dev — Full-Stack Developer Blog',
    description: 'Real projects. Real code. Real stories.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rupa.dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rupa.dev',
    description: 'Real projects. Real code. Real stories.',
    creator: '@rupa_dev',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <meta name="google-site-verification" content="4etL4NmbSz2QLDce_ftGVawOBdIKAjkww8NGcbP2bTo" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7718551137613171"
     crossOrigin="anonymous"></script>
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="bg-bg text-ink font-sans antialiased min-h-screen">
        <Providers>
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  </Providers>
  <Analytics />
  <SpeedInsights />
      </body>
    </html>
  )
}
