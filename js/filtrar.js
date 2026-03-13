// Devuelve la lista filtrada por region; si es All, retorna todos.
export function filtrarPorRegion(lugares, region) {
    if (region === "All") {
        return lugares;
    }

    return lugares.filter(function (lugar) {
        return lugar.region === region;
    });
}