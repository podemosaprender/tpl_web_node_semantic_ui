//INFO: vars globales, inicializa, etc.

//-----------------------------------------------------------------------
//S: funciones
function escapeAttr(s) { //U: caracteres "raros" a entity html
	return s.replace(/[^A-Z0-9-_]/gi, c => ('&#'+c.charCodeAt(0)+';'));
}


//-----------------------------------------------------------------------
//S: UI
var { Component, h, render } = window.preact;
var { Header, Icon, Image, Menu, Segment, Sidebar, Button, Input, List }= window.semanticUIReact;

render_str= preactRenderToString;

function MkUiComponent(f, proto) {
	proto= proto || Component;
	var myComponentDef= function (...args) {
		var my= this; //A: I want my closueres back!
		proto.apply(my,args);  //A: initialize with parent
		my.toProp= function (name) { return (e) => { my[name]= e.target.value; } }
		//U: para usar con onChange u onInput
		
		f.apply(my,[my].concat(args));
		//A: llamamos la funcion que define el componente
	}
	myComponentDef.prototype= new proto(); 
	return myComponentDef;
}

UiNA= () => h('div',{},'UiNA:NOT IMPLEMENTED');

var Estilos= "cerulean chubby cosmo cyborg darkly flatly journal lumen paper readable sandstone simplex slate solar spacelab superhero united yeti".split(' '); //U: lista de estilos de theme forest disponibles

function setTheme(t) { //U: activar el estilo con nombre t
  var st= document.getElementById("tema");
  st.href='/node_modules/semantic-ui-forest-themes/semantic.'+t+'.min.css';
}


var app_style= {};
