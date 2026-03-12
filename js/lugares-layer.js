// Modulo sencillo para dibujar lugares en una capa de graficos de ArcGIS.
export function agregarLugares(graphicsLayer, Graphic, lugares) {
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
