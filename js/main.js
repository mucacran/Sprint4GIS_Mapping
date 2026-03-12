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

  // Pide la API key al backend Flask (lee la variable desde .env).
  function cargarApiKey() {
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

  // Agrega al mapa todos los lugares definidos en window.LUGARES.
  function agregarLugares(graphicsLayer, Graphic) {
    var lugares = window.LUGARES || [];

    lugares.forEach(function (lugar) {
      var punto = {
        type: "point",
        longitude: lugar.coordenadas[0],
        latitude: lugar.coordenadas[1]
      };

      var simbolo = {
        type: "simple-marker",
        color: "#e63946",
        size: 9,
        outline: {
          color: "#ffffff",
          width: 1.5
        }
      };

      var popup = {
        title: lugar.nombre,
        content: lugar.descripcion
      };

      var grafico = new Graphic({
        geometry: punto,
        symbol: simbolo,
        popupTemplate: popup
      });

      graphicsLayer.add(grafico);
    });
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

      // Agregamos los puntos de lugares desde js/lugares.js.
      agregarLugares(capaLugares, Graphic);

      // Variable util para probar cosas desde la consola del navegador.
      window.view = vista;
    });
  }

  // Flujo principal: primero key, luego mapa.
  cargarApiKey()
    .then(function (apiKey) {
      crearMapa(apiKey);
    })
    .catch(function (error) {
      console.error("Error al iniciar el mapa:", error);
      mostrarError("Error cargando el mapa. Revisa /config y tu API key.");
    });
})();
