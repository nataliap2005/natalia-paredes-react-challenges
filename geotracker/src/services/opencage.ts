export interface GeocodeResult { formatted: string; }
export async function getAddress(lat: number, lng: number): Promise<string> {
  const key = import.meta.env.VITE_OPENCAGE_KEY;
  if (!key || key === 'TU_CLAVE_OPENCAGE') {
    throw new Error('Configura VITE_OPENCAGE_KEY en .env para consultar la dirección.');
  }
  const params = new URLSearchParams({q:`${lat},${lng}`,key,language:'es',limit:'1',no_annotations:'1'});
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?${params}`);
  if (!response.ok) throw new Error(`OpenCage respondió HTTP ${response.status}`);
  const data = await response.json() as {results?:GeocodeResult[]; status?:{message?:string}};
  if (!data.results?.length) throw new Error('No se encontró una dirección para estas coordenadas.');
  return data.results[0].formatted;
}
