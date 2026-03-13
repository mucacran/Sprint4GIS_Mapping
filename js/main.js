import { cargarApiKey } from "./api-key.js";
import { lugares } from "./lugares.js";
import { agregarLugares } from "./lugares-layer.js";

// Archivo principal con imports ES Modules.
// main.js coordina el flujo y los demas archivos se enfocan en una sola tarea.

// Configuracion basica del mapa.
const MAP_CONTAINER_ID = "viewDiv";
const MAP_CENTER_GUAYAQUIL = [-79.8891, -2.170998];
const MAP_ZOOM = 12;
const MAP_BASEMAP = "streets-navigation-vector";

// Muestra un mensaje de error dentro del contenedor del mapa.
function mostrarError(mensaje) {
  const contenedor = document.getElementById(MAP_CONTAINER_ID);
  contenedor.innerHTML =
    "<p style='padding:16px;font-family:Arial,sans-serif;'>" + mensaje + "</p>";
}

// Crea y muestra el mapa usando el patron clasico de ArcGIS (require).
function crearMapa(apiKey) {
  window.require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Home"
  ], function (esriConfig, Map, MapView, Graphic, GraphicsLayer, LayerList, Home) {
    // Asignamos la API key para que ArcGIS cargue servicios y mapa base.
    esriConfig.apiKey = apiKey;

    // Creamos el mapa base.
    var mapa = new Map({
      basemap: MAP_BASEMAP
    });

    // Capa para dibujar marcadores personalizados.
    var capaLugares = new GraphicsLayer({
  title: "Tourist Places in Ecuador"
});
    mapa.add(capaLugares);

    // Creamos la vista centrada en Guayaquil.
    var vista = new MapView({
      container: MAP_CONTAINER_ID,
      map: mapa,
      center: MAP_CENTER_GUAYAQUIL,
      zoom: MAP_ZOOM
    });

    // Widget para mostrar y controlar capas en la vista.
    var layerList = new LayerList({
      view: vista
    });
    vista.ui.add(layerList, "top-right");

    // Agregamos los puntos de lugares desde el modulo de datos.
    agregarLugares(capaLugares, Graphic, lugares);

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
