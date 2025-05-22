'use client';

import { useRef } from 'react';
import Map, { MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

type Props = {
  onPick?: (lngLat: [number, number]) => void;
};

export default function MapView({ onPick }: Props) {
  const mapRef = useRef<MapRef>(null);

  return (
    <Map
      ref={mapRef}
      initialViewState={{ longitude: 151.2093, latitude: -33.8688, zoom: 10 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onClick={(e) => {
        const [lng, lat] = e.lngLat;
        if (onPick) onPick([lng, lat]);
      }}
    />
  );
}
