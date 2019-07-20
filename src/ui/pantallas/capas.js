import { h, Component } from 'preact';
import linkState from 'linkstate';

import Pagina from '../../components/pagina';

import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import IconButton from 'preact-material-components/IconButton';
import 'preact-material-components/IconButton/style.css';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import style from './style';

export default class Buscar extends Component {
	state= {
		capas: null,
	}; 

	componentDidMount() {
		RedMovil.get_estado_capas_p()
			.then(kv => this.setState({capas: kv}));
	}

	capaRef= {};

	onCapaRef= (k, ref) => {
		this.capaRef[k]= ref;
	}

	onCapaChange= (k) => {
		console.log("onCapaChange",k,this.state[k]);
		this.state.capas[k]= !this.state.capas[k];
		this.setState({capas: this.state.capas})
		RedMovil.set_estado_capas(this.state.capas);
	}
	
	render({ }, {capas}) {
		return ( 
			<Pagina dsc="¿Qué mostrar?" ref={ (el) => { this.el_page= el && el.base }}>
			<List>
			{ capas==null ?
				(<p>Cargando</p>) :

				Object.keys(capas).map( k => 
				<List.LinkItem onClick={ () => this.onCapaChange(k) }>
					{ k }
					<List.ItemMeta style={ "color: "+(capas[k] ? "inherit" : "#111")}>{capas[k] ? "visibility" : "visibility_off"}</List.ItemMeta>
				</List.LinkItem>
			) }
			</List>
			</Pagina>
		);
	}
}
