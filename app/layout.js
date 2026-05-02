import './globals.css';

export const metadata = {
  title: 'Gujarat — Across Time',
  description:
    'An interactive historical map exploring Gujarat through five eras — from early kingdoms to the modern state.',
  openGraph: {
    title: 'Gujarat — Across Time',
    description: 'Interactive historical map of Gujarat',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
