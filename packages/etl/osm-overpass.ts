import fetch from 'node-fetch';
import fs from 'fs';

const query = `
[out:csv(::lat,::lon,name,amenity;true)];
area["name"="Sydney"]->.searchArea;
(
  node["amenity"~"cafe|restaurant"](area.searchArea);
);
out center;
`;
async function run() {
  const csv = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query,
  }).then(r => r.text());
  fs.writeFileSync('/tmp/osm.csv', csv);
  console.log('OSM CSV saved to /tmp/osm.csv');
  // TODO: upload to Supabase storage and import into Postgres
}
run().catch(err => { console.error(err); process.exit(1); });
