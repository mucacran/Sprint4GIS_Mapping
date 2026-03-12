# CSE310 GIS Mapping Project

Proyecto introductorio de ArcGIS JavaScript API con backend Flask.
El frontend usa ES Modules (import/export) y se puede empaquetar con Vite en un unico archivo final.

## Instrucciones De Ejecucion

### Opcion 1: Desarrollo simple con Flask

1. Instalar dependencias Python:
	`pip install -r requirements.txt`
2. Ejecutar backend:
	`python app.py`
3. Abrir en navegador:
	`http://127.0.0.1:5000`

### Opcion 2: Build final con Vite (single file)

1. Instalar dependencias Node:
	`npm install`
2. Generar build final:
	`npm run build`
3. Reiniciar Flask para que detecte `dist/index.html`:
	`python app.py`

## Estructura Del Proyecto

* `index.html`: entrada de la pagina.
* `js/main.js`: flujo principal de la app.
* `js/api-key.js`: carga API key desde `/config`.
* `js/lugares.js`: datos de lugares.
* `js/lugares-layer.js`: dibuja marcadores y popups.
* `app.py`: backend Flask y endpoint `/config`.
* `dist/index.html`: build final en un solo archivo (generado por Vite).

## Entorno De Desarrollo

* Python 3.12+
* Flask
* python-dotenv
* Node.js 20+
* Vite 5

## Sitios Utiles

* [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/)
* [Flask Documentation](https://flask.palletsprojects.com/)
* [Vite Guide](https://vitejs.dev/guide/)

## Trabajo Futuro

* [ ] Agregar filtros de lugares por categoria.
* [ ] Agregar estilos distintos por tipo de punto.
* [ ] Mostrar lista lateral de lugares con zoom al seleccionar.
