import ky from 'ky';

type ABSRow = {
  sa2_code: string;
  sa2_name: string;
  value: number;
};

export async function fetchAbsPopulation(sa2Codes: string[]): Promise<ABSRow[]> {
  const keyList = sa2Codes.join('+');
  const url =
    `https://api.abs.gov.au/SDMX-JSON/data/ABS_CENSUS/ERP_TOT.POP.PERSON.TOT.TOT.AUS.SA2.${keyList}.A/all?dimensionAtObservation=AllDimensions`;
  const json = await ky(url).json<any>();
  const obs = json.dataSets[0].observations;
  const dims = json.structure.dimensions.observation;
  const sa2Idx = dims.findIndex((d: any) => d.id === 'SA2');
  return Object.entries(obs).map(([key, val]: [string, any]) => {
    const idx = key.split(':')[sa2Idx];
    const sa2Obj = dims[sa2Idx].values[idx];
    return {
      sa2_code: sa2Obj.id,
      sa2_name: sa2Obj.name,
      value: val[0],
    } as ABSRow;
  });
}
