uiCfgFuente= MkUiComponent(function (my) {
	var state = {
		provedores: null,
		editando: false,
	};

	my.componentWillMount= function () {
		RedMovil.d.get_proveedores_p().then( kv => {
			my.setState( {
				proveedores: kv,
			});
		});
	}

	my.onEdit= (k, esNuevo) => {
		my.setState({ 
			nombre: k, 
			url: esNuevo ? '' : my.state.proveedores[k].url, 	
			auth: esNuevo ? '' : my.state.proveedores[k].auth, 	
			esNuevo: esNuevo,
			editando: true,
		});
	}

	my.onCancelar= () => {
		my.setState({
			editando: false,
		});
	}

	my.onEliminar= () => {
		var k = my.state.nombre;
		if (my.state.esNuevo) {
			my.setState({editando: false});
   		my.cmp_page.showMsg("Se eliminaron los datos");
		}
		else {
			delete my.state.proveedores[k];
			RedMovil.d.set_proveedores_p(my.state.proveedores)
				.then( () => { 
					my.setState({ 
						editando: false, 
						proveedores: my.state.proveedores,
					});
					my.cmp_page.showMsg("Datos guardados correctamente");
				})
				.catch( () => {
					my.cmp_page.showMsg("No se pudieron guardar los datos");
				});	
		}
	}

	my.onGuardar= () => {
		var k = my.nombre;
		var datos= my.state.esNuevo ? {}  : my.state.proveedores[k];
		datos.url= my.url;
		datos.auth= my.auth;

		my.state.proveedores[k]= datos;
		RedMovil.d.set_proveedores_p(my.state.proveedores)
			.then( () => { 
				my.setState({ 
					editando: false, 
					proveedores: my.state.proveedores,
				});
    		my.cmp_page.showMsg("Datos guardados correctamente");
			})
			.catch( () => {
    		my.cmp_page.showMsg("No se pudieron guardar los datos");
			});	
	}

	my.render= function ({ id }, { editando, proveedores }) {
		console.log("cfg_fuente", editando, window.XP= proveedores);
		return (
			h(uiPagina, {
				dsc:"¿De dónde obtener los datos?",
			 	ref: (cmp) => { if (cmp) { my.cmp_page= cmp; }}
			},
			h('div', 
				{
					style: {display: ( editando ? "block" : "none" )}
				},
				h('p', {},
					h(Input, {
						label:"URL servidor",
						type:"url",
						value: my.state.url ,
						onInput: my.toProp('url'), 
					})
				),
				h('p', {},
					h(Input, { 
						label:"Clave", 
						type:"password", 
						value: my.state.auth  ,
						onInput:  my.toProp('auth'),
					})
				),
				h('p', {},
					h(Input, {
						label:'Nombre', 
						disabled: ! my.state.esNuevo ,
						value: my.state.nombre,
						onInput: my.toProp('nombre'), 
					})
				),
				h('div', {className:"form-acciones"},
					h(Button, {onClick: my.onEliminar},'Eliminar'),
					h(Button, {onClick: my.onCancelar},'Cancelar'),
					h(Button, {onClick: my.onGuardar},'Guardar'),
				),
			),
			( proveedores!=null ? 
				h(List, {},
					Object.keys(proveedores).sort().map( k => ( 
						h(List.Item, {onClick: () => my.onEdit(k) }, k)
					)), 
					h(List.Item, {onClick: () => my.onEdit('', true) }, '(nuevo)'),
				 )
				:
				"Cargando..."
			)
		));
	}
})
