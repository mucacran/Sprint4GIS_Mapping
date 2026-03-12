// Servicio sencillo para obtener la API key desde Flask (/config).
export async function cargarApiKey() {
  const respuesta = await fetch("/config");

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la API key desde /config");
  }

  const datos = await respuesta.json();

  if (!datos.apiKey) {
    throw new Error("La API key no llego en la respuesta del servidor");
  }

  return datos.apiKey;
}
