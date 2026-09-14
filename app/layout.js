import './globals.css';

export const metadata = {
  title: 'ગુજરાત — An open folio of Gujarati literature',
  description:
    'Read and listen to Gujarati poetry with contextual English renderings, then follow the ideas that connect each verse.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'ગુજરાત — An open folio of Gujarati literature',
    description: 'Gujarati verses to read, hear, and follow from one idea to the next.',
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
