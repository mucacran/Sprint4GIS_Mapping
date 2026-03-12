// Este archivo hace todo el flujo principal de forma simple:
// 1) Pedir la API key al backend (/config)
// 2) Cargar modulos ArcGIS con require()
// 3) Dibujar el mapa en Guayaquil
// 4) Agregar lugares definidos en js/lugares.js
(function () {
  // Configuracion basica del mapa.
  var MAP_CONTAINER_ID = "viewDiv";
  var MAP_CENTER_GUAYAQUIL = [-79.8891, -2.170998];
  var MAP_ZOOM = 12;
  var MAP_BASEMAP = "streets-navigation-vector";

  // Muestra un mensaje de error dentro del contenedor del mapa.
  function mostrarError(mensaje) {
    var contenedor = document.getElementById(MAP_CONTAINER_ID);
    contenedor.innerHTML =
      "<p style='padding:16px;font-family:Arial,sans-serif;'>" + mensaje + "</p>";
  }

  // Crea y muestra el mapa usando el patron clasico de ArcGIS (require).
  function crearMapa(apiKey) {
    require([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer"
    ], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
      // Asignamos la API key para que ArcGIS cargue servicios y mapa base.
      esriConfig.apiKey = apiKey;

      // Creamos el mapa base.
      var mapa = new Map({
        basemap: MAP_BASEMAP
      });

      // Capa para dibujar marcadores personalizados.
      var capaLugares = new GraphicsLayer();
      mapa.add(capaLugares);

      // Creamos la vista centrada en Guayaquil.
      var vista = new MapView({
        container: MAP_CONTAINER_ID,
        map: mapa,
        center: MAP_CENTER_GUAYAQUIL,
        zoom: MAP_ZOOM
      });

      // Agregamos los puntos de lugares usando el modulo separado.
      window.LugaresLayer.agregar(capaLugares, Graphic);

      // Variable util para probar cosas desde la consola del navegador.
      window.view = vista;
    });
  }

  // Flujo principal: primero key (desde js/api-key.js), luego mapa.
  window.ApiKey.cargar()
    .then(function (apiKey) {
      crearMapa(apiKey);
    })
    .catch(function (error) {
      console.error("Error al iniciar el mapa:", error);
      mostrarError("Error cargando el mapa. Revisa /config y tu API key.");
    });
})();
