import './globals.css';
import type { Metadata } from 'next';
import { Bebas_Neue } from 'next/font/google';
import SessionProv from '@components/auth/SessionProv';
import Navbar from '@components/Navbar';

const bebas = Bebas_Neue({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Craft Care',
  description: 'Craft Care is a platform for crafters to manage their business.',
  icons: [
    {
      href: '/logo.svg',
      url: '/logo.svg',
      sizes: 'any',
      type: 'image/svg+xml',
    },
  ],
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={bebas.className}>
        <SessionProv session={session}>
          <Navbar />
          {children}
        </SessionProv>
      </body>
    </html>
  );
}
