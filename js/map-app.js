// Map app module: creates ArcGIS map and view with the classic require() pattern.
window.MapApp = {
  init: function (apiKey) {
    return new Promise(function (resolve, reject) {
      require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
      ], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
        try {
          // Apply API key for ArcGIS basemaps and services.
          esriConfig.apiKey = apiKey;

          // Create basemap.
          var map = new Map({
            basemap: window.APP_CONFIG.basemap
          });

          // Layer for custom graphics (example marker for city center).
          var graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          // Create map view centered on Guayaquil.
          var view = new MapView({
            container: window.APP_CONFIG.mapContainerId,
            map: map,
            center: window.APP_CONFIG.guayaquilCenter,
            zoom: window.APP_CONFIG.zoom
          });

          // Add a simple marker at Guayaquil center to make the map more intuitive.
          var cityCenterPoint = {
            type: "point",
            longitude: window.APP_CONFIG.guayaquilCenter[0],
            latitude: window.APP_CONFIG.guayaquilCenter[1]
          };

          var cityCenterMarker = {
            type: "simple-marker",
            color: "#e63946",
            size: 10,
            outline: {
              color: "#ffffff",
              width: 1.5
            }
          };

          var cityCenterPopup = {
            title: "Guayaquil, Ecuador",
            content: "Project center point (CSE310)"
          };

          var cityCenterGraphic = new Graphic({
            geometry: cityCenterPoint,
            symbol: cityCenterMarker,
            popupTemplate: cityCenterPopup
          });

          graphicsLayer.add(cityCenterGraphic);

          resolve(view);
        } catch (error) {
          reject(error);
        }
      }, reject);
    });
  }
};
