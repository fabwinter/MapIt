import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const minutes = searchParams.get('minutes') || '15';

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  const isoUrl = `https://api.mapbox.com/isochrone/v1/mapbox/driving/${lng},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
  const resp = await fetch(isoUrl);
  if (!resp.ok) {
    return NextResponse.json({ error: 'Failed to fetch isochrone' }, { status: 500 });
  }
  const data = await resp.json();
  return NextResponse.json(data);
}
