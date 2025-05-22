'use client';

import { useState } from 'react';
import MapView from '@/components/MapView';

export default function HomePage() {
  const [coords, setCoords] = useState<[number, number] | null>(null);

  return (
    <div className="flex h-full">
      <div className="flex-1 relative">
        <MapView onPick={setCoords} />
      </div>
      <aside className="w-72 p-4 border-l border-gray-200 overflow-auto">
        {coords ? (
          <pre className="text-xs">{JSON.stringify(coords, null, 2)}</pre>
        ) : (
          <p className="text-sm text-gray-500">Click anywhere on the map to begin</p>
        )}
      </aside>
    </div>
  );
}
