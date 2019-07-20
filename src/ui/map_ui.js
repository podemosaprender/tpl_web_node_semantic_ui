/**
	@file: exporta en window.ui las funciones que necesita RedMovil/ui/mapa ej para dibujar el popup cuando tocás el mapa

	@module components/map_ui

*/
MapUi= {on: {}};

/**
	El menu que mostramos en la barra lateral
	Se configura dinamicamente desde RedMovil
*/
var menu= [];

/**
	Menu "fijo" necesario para que se despliegue el otro
*/
const	menuX= [ { dsc: 'Planos', dst: '/planos', icon: 'map' }, ];

//------------------------------------------------------------
/**
	El icono propiamente dicho, elegido de [la tipografia](https://material.io/tools/icons/?icon=place&style=outline)
*/
const uiMapIconName= {
	cursor: 'place',
	elemento: 'flag',
	nota: 'local_offer',
	area: 'map',
}
	
const uiMapIcon= ({k}) => h(Icon, {}, uiMapIconName[k] || 'not_listed_location');

/**
	El popup que aparece cuando tocás el mapa
	   Es un [componente stateless](https://preactjs.com/guide/types-of-components)
	   Se renderiza a un string html con [preactjs-render-to-string](https://www.npmjs.com/package/preact-render-to-string)

	@param datos_elemento {kv} Los datos del elemento, título, etc.
*/
const PopupXY= ({datos_elemento}) => (
		/*
		<div style="max-width: 300px; border: 3px solid #060609;">
			Elemento { JSON.stringify(datos_elemento, null, 1) }
			<div style="text-align: center;">
				<Button raised ripple dense style="width: 10em; margin: 5px;"
					onClick={ 
						'ui.onInformar(' +
							JSON.stringify(datos_elemento) +
						')'
						}
				>
					Informar
				</Button>
				
				<Button raised ripple dense style="width: 10em; margin: 5px;"
				>
					Area
				</Button>
			</div>
		</div>
		*/
		h('div',{},'NOT IMPLEMENTED'));



function escapeAttr(s) { 
	return s.replace(/[^A-Z0-9-_]/gi, c => ('&#'+c.charCodeAt(0)+';'));
}

function iconDef_para(k) {
	return {
			iconAnchor: [20, 40], //A: se acomoda desde css
			iconSize: 40,
			className: 'map-icon map-icon-'+k,
			html: render_str(h(uiMapIcon, k={k}))
	}
}

function onMenu(aMenu) { //A: se actualizó el menu
	menu= aMenu.concat(menuX);
	if (MapUi.on.menu) { MapUi.on.menu(menu) }
}

function onMarker(datos, marker) {
	var id= 'xy_'+datos.X+','+datos.Y+'/'+(datos.elementId||'_');
	marker.on('click',(e) => route('/marker/'+id) );
	route('/marker/'+id);
}

function onInformar(datos) {
	console.log("XXX:onInformar",datos);
	route('/nota/xy_'+datos.X+','+datos.Y+'/'+(datos.elementId||'_'));
	//XXX:IMPLEMENTAR:le pasamos los datos a la pantalla de la nota, tambien podria ser con una variable
}

window.ui= {
	iconDef_para,
	onMenu,
	onMarker,
	onInformar,	
}

