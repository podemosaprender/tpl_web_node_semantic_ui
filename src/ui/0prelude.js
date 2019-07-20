//INFO: vars globales, inicializa, etc.

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

