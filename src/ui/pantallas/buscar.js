import { h, Component } from 'preact';
import linkState from 'linkstate';

import Pagina from '../../components/pagina';

import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style';

export default class Buscar extends Component {
	INFO= RedMovil.defBusquedas();
	
	// gets called when this route is navigated to
	componentDidMount() {
		this.state= {
			result: null,
			buscar_ctl: 'open',
		};
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		console.log('Buscar unmount');
		this.state.result= null; //A: Liberamos memoria
	}

	traer_mas = (cuantos = 20) => {
		console.log('Traer mas', this.result_st);
		if (!this.state.terminado && this.result_st.ended) {
			this.setState({ terminado: this.result_st.ended })
			return
		};
		if (this.state.terminado) { return };
		this.setState({ esperando_datos: true });
		this.result_st.fork().take(cuantos).batchWithTimeOrCount(1000, cuantos)
			.each( a => { this.setState({
				result: (this.state.result || []).concat(a)
			}); })
			.done( () => { this.setState({
				esperando_datos: false,
				terminado: this.result_st.ended
			}); });
	};

	buscar = (e) => {
		e.preventDefault();
		this.setState({
			result: [],
			buscar_ctl:'colapsed',
			terminado:false
		});
		console.log('Buscar', this.state, this.el_page);

		this.state._url= localStorage.getItem("CfgServidorUrl");
		this.result_st= this.INFO[this.estaBusqueda].funcion(this.state);
		var cuantos= Math.ceil(this.el_page.getBoundingClientRect().height/10);
		//A: OjO el_result esta escondido y tiene height 0
		//XXX: Ir mostrando los resultados de a uno porque si quiero juntar un array de 20 y 19 están al final de todo no muestro nada hasta encontrarlos. (¿Usar pull?)
		console.log('REF', window.el= this.el_page, cuantos);
		this.traer_mas(cuantos);
		return false;	
	};

	onScroll = (e) => {
//DBG		console.log('onScroll', e);
		var el= e.target;
		var miFin= el.getBoundingClientRect().height + el.scrollTop;
		if (miFin > (el.scrollHeight - 2)){
			this.traer_mas();
		}
	}
	//A: Busqueda viene del router
	//OjO: Para que se actualice linkState tiene que cambiar alguna propiedad reactiva por eso agregamos id.
	render({ busqueda }, { result, buscar_ctl, esperando_datos, terminado }) {
		var cfg= this.INFO[busqueda];
		if (busqueda != this.estaBusqueda) {
			this.state.buscar_ctl= 'open';
			cfg.params.forEach( (t) => { this.state[t.clave] = '' });
		}
		this.estaBusqueda= busqueda;
		return ( 
			<Pagina dsc={cfg.descripcion} ref={ (el) => { this.el_page= el && el.base }}>
				<div style={ 'min-height: 100%; height: 100%;'+(buscar_ctl=='colapsed' ? 'display:none;' : 'display:block;') }>
					<form onSubmit={this.buscar}>
					<Fab value="buscar" type="submit" style="float:right;">
						<Fab.Icon>search</Fab.Icon>
					</Fab>
						{ cfg.params.map( (t) => 
							<p>
								<TextField id={ busqueda+'_'+t.nombre } label={ t.nombre } value={ this.state[t.clave] } type={ t.tipo ? t.tipo : "text" } onInput={ linkState(this, t.clave) }/>
							</p>
						) }
					</form>
				</div>

				<div style={ 'min-height: 100%; height: 100%;'+(buscar_ctl!='colapsed' ? 'display:none;' : 'display:block;') }> 
					<Fab style="float:right;" onClick={ () => this.setState({ buscar_ctl: 'open'}) }>
						<Fab.Icon>search</Fab.Icon>
					</Fab>
					<div style="overflow-y: scroll; height: 90%;" ref={ (el) => { this.el_results= el }} onScroll={ this.onScroll }>
						{ result != null && result.map( fila =>
								<p> { fila } </p>
							)
						}
					</div>
					<div>
						<span style={ (esperando_datos ?  "display:block" : "display:none") }>
						(Esperando datos)
						</span>
						<span style={ (terminado ? "display:block" : "display:none") }>
						(Terminado)
						</span>
					</div>
				</div>

			</Pagina>
		);
	}
}
