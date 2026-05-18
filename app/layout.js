import './globals.css';

export const metadata = {
  title: 'ગુજરાત — A literary atlas',
  description:
    'An interactive literary atlas of Gujarat — historical map, Gujarati poetry with bilingual karaoke.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'ગુજરાત — A literary atlas',
    description: 'Interactive literary atlas of Gujarat — map and poetry',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="gu-IN">
      <head />
      <body>{children}</body>
    </html>
  );
}
