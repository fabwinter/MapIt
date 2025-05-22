import { useEffect, useState } from 'react';
import { Source, Layer } from 'react-map-gl/maplibre';
import { fetchAbsPopulation } from '@/lib/abs';

export default function ChoroplethLayer({ sa2GeoJson }: { sa2GeoJson: GeoJSON.FeatureCollection }) {
  const [data, setData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    const codes = sa2GeoJson.features.map(f => f.properties!.SA2_CODE21);
    fetchAbsPopulation(codes).then(rows => {
      const joined: GeoJSON.Feature[] = sa2GeoJson.features.map(f => {
        const match = rows.find(r => r.sa2_code === f.properties!.SA2_CODE21);
        return {
          ...f,
          properties: { ...f.properties, value: match?.value ?? 0 },
        };
      });
      setData({ type: 'FeatureCollection', features: joined });
    }).catch(console.error);
  }, [sa2GeoJson]);

  if (!data) return null;
  return (
    <>
      <Source id="abs-pop" type="geojson" data={data as any} />
      <Layer
        id="abs-pop-fill"
        type="fill"
        source="abs-pop"
        paint={{
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'value'],
            0, '#f2f0f7',
            500, '#cbc9e2',
            2000, '#9e9ac8',
            5000, '#756bb1',
            10000, '#54278f',
          ],
          'fill-opacity': 0.6,
        }}
      />
    </>
  );
}
