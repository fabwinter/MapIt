'use client';

import Map from 'react-map-gl';
import { useRef } from 'react';

type Props = {
  onPick?: (lngLat: [number, number]) => void;
};

export default function MapView({ onPick }: Props) {
  const mapRef = useRef<Map>(null);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{ longitude: 151.2093, latitude: -33.8688, zoom: 10 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onClick={(e) => {
        const { lngLat } = e;
        if (onPick) onPick([lngLat.lng, lngLat.lat]);
      }}
    />
  );
}
