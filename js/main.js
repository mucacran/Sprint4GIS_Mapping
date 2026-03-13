import { cargarApiKey } from "./api-key.js";
import { lugares } from "./lugares.js";
import { agregarLugares } from "./lugares-layer.js";
import { filtrarPorRegion } from "./filtrar.js";

/*
  Project: CSE310 GIS Mapping Project
  Purpose:
  Main orchestration file for a beginner ArcGIS JavaScript API application that
  loads Ecuador tourist locations and renders them on an interactive map.

  Main Features:
  - Loads ArcGIS API key from backend configuration.
  - Initializes map and view centered in Ecuador.
  - Creates and manages a graphics layer for tourist points.
  - Draws tourist locations with popup information.
  - Adds UI widgets (LayerList, Home, Search).
  - Connects a region-based filter bar to redraw map graphics.
*/

// -----------------------------------------------------------------------------
// 1. Load API key
// -----------------------------------------------------------------------------

// Configuracion basica del mapa.
const MAP_CONTAINER_ID = "viewDiv";
const MAP_CENTER_GUAYAQUIL = [-79.8891, -2.170998];
const MAP_ZOOM = 6;
const MAP_BASEMAP = "streets-navigation-vector";

// Muestra un mensaje de error dentro del contenedor del mapa.
function mostrarError(mensaje) {
  const contenedor = document.getElementById(MAP_CONTAINER_ID);
  contenedor.innerHTML =
    "<p style='padding:16px;font-family:Arial,sans-serif;'>" + mensaje + "</p>";
}

document.querySelectorAll("#filterBar button")
  .forEach(b => b.classList.remove("active"));

// -----------------------------------------------------------------------------
// 6. Filter system
// -----------------------------------------------------------------------------

// Conecta eventos click de la barra y aplica filtro por region.
function conectarBotonesFiltro(capaLugares, Graphic) {
  var botones = document.querySelectorAll("#filterBar button");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Limpia estado visual anterior y marca el filtro activo.
      botones.forEach(function (b) {
        b.classList.remove("active");
      });
      boton.classList.add("active");

      // Filtra datos segun region seleccionada y vuelve a dibujar capa.
      var region = boton.dataset.region || "All";
      var filtrados = filtrarPorRegion(lugares, region);

      capaLugares.removeAll();
      agregarLugares(capaLugares, Graphic, filtrados);
    });
  });
}

// Crea y muestra el mapa usando el patron clasico de ArcGIS (require).
function crearMapa(apiKey) {
  // ---------------------------------------------------------------------------
  // 2. Initialize map
  // ---------------------------------------------------------------------------

  // Carga modulos ArcGIS necesarios para mapa, capa, vista y widgets.
  window.require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Home",
    "esri/widgets/Search"
  ], function (esriConfig, Map, MapView, Graphic, GraphicsLayer, LayerList, Home, Search) {
    // Asignamos la API key para que ArcGIS cargue servicios y mapa base.
    esriConfig.apiKey = apiKey;

    // Creamos el mapa base.
    var mapa = new Map({
      basemap: MAP_BASEMAP
    });

    // -------------------------------------------------------------------------
    // 3. Create graphics layer
    // -------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------
    // 5. Add map widgets
    // -------------------------------------------------------------------------

    // Widget para mostrar y controlar capas en la vista.
    var layerList = new LayerList({
      view: vista
    });
    vista.ui.add(layerList, "top-right");

    // Widget para volver a la vista inicial.
    var homeWidget = new Home({
      view: vista
    });
    vista.ui.add(homeWidget, "top-left");

    // Widget de busqueda (no funcional sin servicios adicionales, pero se muestra).
    var searchWidget = new Search({
      view: vista
    });
    vista.ui.add(searchWidget, "top-right");

    // -------------------------------------------------------------------------
    // 4. Load tourist locations
    // -------------------------------------------------------------------------

    // Agregamos los puntos de lugares desde el modulo de datos.
    agregarLugares(capaLugares, Graphic, lugares);

    // Conectamos la barra de filtros con la capa de lugares.
    conectarBotonesFiltro(capaLugares, Graphic);

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
