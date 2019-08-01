//INFO: punto de entrada principal de la UI (puede ser tooda la app, sino carga tus scripts en index.html)

//--------------------------------------------------------------------------------
//S: app de ejemplo
Preguntas= [ //U: esta es la lista de preguntas, la podria bajar de un servidor y guardar en localStorage
  {
      titulo: 'Quien descubrio America?',
      opciones: ["Colón","Américo Vespucio","Magallanes","Rui Diaz de Vivar"],
      respuesta: 'Colón'
  },
  {
      titulo: 'Que gusto tiene la sal?',
      opciones: ['Umami','Dulce','Salado','Amarrrrrrgo!'],
      respuesta: 'Salado'
  },
];
//TODO: bajar las preguntas de un servidor, puede ser una planilla google como mostre en el tutorial 
// https://www.podemosaprender.org/usando/planillas-mail-y-api-de-google-para-hacer-sistemas 
// o sino como hace esta linea https://glitch.com/edit/#!/android-launcher-cfg?path=rt/index.js:43:41

//TODO: mezclar las respuestas al azar
//TODO: mezclar las preguntas con algun criterio que ayude a memorizar?

uiPreguntas= MkUiComponent(function uiPreguntas(my) {
  function proximaPregunta() {
    var prox= parseInt(my.state.nroPregunta)+1; //A: me consigo el proximo numero o cero si recien empiezo
    console.log("uiPreguntas proximaPregunta: "+prox);
    if (prox<Preguntas.length) { preactRouter.route("/pregunta/"+prox); }
    else {
      alert("Respondiste todas las preguntas, postulate para el Nobel!");
			preactRouter.route("/"); 
    }
  }
  
  function revisarRespuesta(opc) {
    if (opc==my.state.pregunta.respuesta) {
      alert('Muy bien! Es '+opc);
      proximaPregunta();
    }
    else {
      alert("No, no es "+opc);
    }
  }
  
	my.componentWillMount= function() {
		//U: antes de crear la instancia del componente
		console.log("uiPregunta willMount",this.props);
    my.state.nroPregunta= this.props.id; //A: anote por que pregunta voy
    my.state.pregunta= Preguntas[this.props.id]; //A: y puse los datos
	}

  my.render= function (props, state) {
    //U: esta funcion dibuja la pantalla, podes usar elementos de html (ej. 'div') o Semantic UI (ej. Button)
    //el formato es h(elemento, propiedades, contenido1, contenido2, ...)
		console.log("uiPregunta render",props, state);
    return (
			h('div', {id:'app'},
				h('div',{},
					h('h2',{},state.pregunta.titulo),
					state.pregunta.opciones.map( 
						opc => h('p', {}, h(Button,{onClick: () => revisarRespuesta(opc), style: { width: '20em'}},opc)))) ));
  }
});


//-------------------------------------------------------------------
//S: Config ej. para cambiar el tema
uiCfg= MkUiComponent(function uiCfg(my) {
	function onCfg() { //U: puedo definir funciones que se llamen desde otras aca adentro
    my.setState({wantsCfg: !my.state.wantsCfg}); //A: cuando llamo my.setState se vuelve a dibujar el componente con render
    //A: como puse !my.state.wantsCfg si era false la cambia a true, si era true la cambia a false
  }

	my.render= function uiCfg_render(props, state) {
		return h('div',{},
				h(Button,{onClick: onCfg, style: {float: 'right'}, basic: true, color: 'gray'},'Cfg'),
				h('div',{style: {display: state.wantsCfg ? 'block' : 'none'}},
          //A: esta div se muestra solo si el my.state.wantsCfg es true
					h(Input,{ref: (e) => (my.nombre_el=e), value: my.nombre, placeholder: 'Tu nombre'}),
          h('div',{},
             Estilos.map(k => 
                h(Button,{basic: true, onClick: () => setTheme(k)},k))
          )
				),
		);
	};
});

//-------------------------------------------------------------------
//S: la primer pantalla que aparece, en /
uiHome= MkUiComponent(function uiHome(my) {
	my.render= function () {
		return h('div',{},
			h(Button,{onClick: ()=> preactRouter.route("/pregunta/0")},"Empezar"),
			h(Button,{onClick: ()=> preactRouter.route("/pregunta/1")},"Pregunta 1"),
		);
	}
});

//-------------------------------------------------------------------
//S: Seccion principal, publicamos los componentes en rutas, conectamos al DOM
Rutas= {
	"/": {cmp: uiHome},
	"/pregunta/:id": {cmp: uiPreguntas},
  "/profile/:id": {cmp: Profile= UiNA},
}

app_style= { //U: CSS especifico para la aplicacion
	// 'background-color': '#cccccc',
	'height': '100%', /* You must set a specified height */
};

App= MkUiComponent(function App(my) {
  my.render= function (props, state) {
    return (
			h('div', {id:'app', style: app_style},
				h(uiCfg), //A: ofrezco un boton de config para cambiar el tema

				h(preactRouter.Router, {history: History.createHashHistory()},
					Object.entries(Rutas).map( ([k,v]) => 
						h(v.cmp, {path: k, ...v}) //A: el componente para esta ruta
					)
				), //A: la parte de la app que controla el router
				//VER: https://github.com/preactjs/preact-router
			)
		);
  }
});


setTheme('readable');
render(h(App), document.body);
//A: estemos en cordova o web, llama a la inicializacion
