// Modulo sencillo para dibujar lugares en una capa de graficos de ArcGIS.
export function agregarLugares(graphicsLayer, Graphic, lugares) {
    lugares.forEach(function (lugar) {
        var imagenPlaceholder =
            lugar.imagen || "https://picsum.photos/seed/ecuador-lugar/420/220";

        var punto = {
            type: "point",
            longitude: lugar.coordenadas[0],
            latitude: lugar.coordenadas[1]
        };

        var simbolo = {
            type: "simple-marker",
            color: "#e63946",
            size: 12,
            outline: {
                color: "#ffffff",
                width: 2
            }
        };

        var grafico = new Graphic({
            geometry: punto,
            symbol: simbolo,
            attributes: {
                nombre: lugar.nombre,
                descripcion: lugar.descripcion,
                imagen: imagenPlaceholder,
                latitud: lugar.coordenadas[1],
                longitud: lugar.coordenadas[0]
            },
            popupTemplate: {
                title: "{nombre}",
                content:
                    "<div style='max-width:260px;font-family:Arial,sans-serif;line-height:1.35;'>" +
                    "<img src='{imagen}' alt='Imagen de {nombre}' style='width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:10px;' />" +
                    "<p style='margin:0 0 8px 0;font-size:14px;color:#1f2937;'><strong>Descripcion:</strong> {descripcion}</p>" +
                    "<p style='margin:0;font-size:12px;color:#4b5563;'><strong>Coordenadas:</strong> {latitud}, {longitud}</p>" +
                    "</div>"
            }
        });

        graphicsLayer.add(grafico);
    });
}
