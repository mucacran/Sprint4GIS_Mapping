// Servicio sencillo para obtener la API key desde Flask (/config).
window.ApiKey = {
  cargar: function () {
    return fetch("/config")
      .then(function (respuesta) {
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la API key desde /config");
        }
        return respuesta.json();
      })
      .then(function (datos) {
        if (!datos.apiKey) {
          throw new Error("La API key no llego en la respuesta del servidor");
        }
        return datos.apiKey;
      });
  }
};
