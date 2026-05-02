import dynamic from 'next/dynamic';

const MapApp = dynamic(() => import('../components/MapApp'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0f0f1a]">
      <div className="text-center space-y-3">
        <div className="text-2xl font-semibold tracking-wide text-white/80">
          Gujarat — Across Time
        </div>
        <div className="text-sm text-white/40">Loading map…</div>
      </div>
    </div>
  ),
});

export default function Home() {
  return <MapApp />;
}
