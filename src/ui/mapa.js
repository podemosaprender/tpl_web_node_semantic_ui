CfgZoomMin= 2;
CfgZoomMax= 30;
CfgZoomInicial= 17;

ui= { iconDef_para: function () {} };

function onViewReset() {
	console.log("onViewReset");
}

function mapaOnClickUi() { }

function onLocationFound() {}

function onLocationError() {}

var MapIcon= {};

function init_mapa() {
	if (!document.getElementById("map")) {
		logm("ERR",1,"No hay elemento con id=map en el documento")
	}
	else {
		map = L.map('map', {
				zoomControl: false,
        minZoom: CfgZoomMin,
        maxZoom: CfgZoomMax,
				zoomDelta: 0.5,
				zoomSnap: 0.5,
				attributionControl: false // disable "Leaflet" text in botton-right corner
    	})
			.setZoom(CfgZoomInicial)

		if (L.control && L.control.scale) {
			L.control.scale({metric: true}).addTo(map)
		} 

		map.setView([-34.58236208400061, -58.421323299407966],17);

		mapLayerOsm= L.tileLayer('http:/'+'/{s}.tile.osm.org/{z}/{x}/{y}.png', { maxZoom: 20 }).addTo(map); //A: instanciamos un layer que coseguira los tiles de OpenStreetMap CUANDO lo active el usuario
		mapLayerNotes= L.layerGroup().addTo(map); //U: agrupamos los markers de notas en un layer para ej. borrarlos juntos
		mapLayerPolys= L.layerGroup().addTo(map); //U: agrupamos los polys de areas en un layer para ej. borrarlos juntos
		//dibujar_map.set_map(map); //XXX:  debería "envolver" a este

		map.on('click', mapaOnClickUi);
		map.on('viewreset', function(){logm("DBG",9,'ON VIEW RESET viewreset');onViewReset();});
		map.on('moveend', function(){logm("DBG",9,'ON VIEW RESET moveend');onViewReset();});
		map.on('zoomend', function(){logm("DBG",9,'ON VIEW RESET zoomend');onViewReset();});
		//A: conectamos los eventos del mapa a nuestros handlers

		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);
//		map.locate({setView: true, maxZoom: 19});
		
		"cursor elemento nota area".split(" ").forEach( k => {
			MapIcon[k]= L.divIcon( 
				ui.iconDef_para(k)
			);
		});
	}
}

//============================================================

