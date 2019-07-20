var Estilos= "cerulean chubby cosmo cyborg darkly flatly journal lumen paper readable sandstone simplex slate solar spacelab superhero united yeti"
              .split(' ');
var app_style= {};

function setTheme(t) {
  var st= document.getElementById("tema");
  st.href='/node_modules/semantic-ui-forest-themes/semantic.'+t+'.min.css';
}

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

App= MkUiComponent(function App(my) {
  
  function onCfg() { //U: puedo definir funciones que se llamen desde otras aca adentro
    my.setState({wantsCfg: !my.state.wantsCfg}); //A: cuando llamo my.setState se vuelve a dibujar el componente con render
    //A: como puse !my.state.wantsCfg si era false la cambia a true, si era true la cambia a false
  }
  
  function proximaPregunta() {
    var prox= (my.state.nroPregunta==null ? -1 : my.state.nroPregunta)+1; //A: me consigo el proximo numero o cero si recien empiezo
    console.log("Proxima pregunta: "+prox);
    if (prox<Preguntas.length) {
      my.setState({
        nroPregunta: prox, //A: anote por que pregunta voy
        pregunta: Preguntas[prox], //A: y puse los datos
      });
    }
    else {
      alert("Respondiste todas las preguntas, postulate para el Nobel!");
      my.setState({
        nroPregunta: -1, //A: anote por que pregunta voy
        pregunta: null, //A: y puse los datos
      });
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
  
  my.render= function (props, state) {
    //U: esta funcion dibuja la pantalla, podes usar elementos de html (ej. 'div') o Semantic UI (ej. Button)
    //el formato es h(elemento, propiedades, contenido1, contenido2, ...)
    return (
			h('div', {id:'app'},
				h(Button,{onClick: onCfg, style: {float: 'right'}, basic: true, color: 'gray'},'Cfg'),
				h('div',{style: {display: state.wantsCfg ? 'block' : 'none'}},
          //A: esta div se muestra solo si el my.state.wantsCfg es true
					h(Input,{ref: (e) => (my.nombre_el=e), value: my.nombre, placeholder: 'Tu nombre'}),
          h('div',{},
             Estilos.map(k => 
                h(Button,{basic: true, onClick: () => setTheme(k)},k))
          )
				),
        (state.pregunta) ? //A: ya tengo una pregunta para mostrar
          h('div',{},
            h('h2',{},state.pregunta.titulo),
            state.pregunta.opciones.map( 
              opc => h('p', {}, h(Button,{onClick: () => revisarRespuesta(opc), style: { width: '20em'}},opc))
            )

          ) 
        :
          h(Button,{onClick: proximaPregunta},'Empezar')
        
			)
		);
  }
});

setTheme('readable');
render(h(App), document.body);
//A: estemos en cordova o web, llama a la inicializacion
