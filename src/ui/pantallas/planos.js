import { h, Component } from 'preact';
import { route } from 'preact-router';
import linkState from 'linkstate';

import Pagina from '../../components/pagina';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import Icon from 'preact-material-components/Icon';

import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import style from './style';

export default class Planos extends Component {
	state = {
		planos: {},
		cargando: true,
	};

	componentWillMount () {
		RedMovil.planos_entries_st()
		.ratelimit(2,0) //A: setTimeout para actualizar ui
		.each( id_d => {
			var p= this.state.planos || {};
			if (id_d[1].planosEnUrl) { id_d[1].planosEnUrl.forEach( name => {
				var k= name+'/'+id_d[0];
				p[k]= p[k] || {};
				p[k].enUrl= true;
			})}	
			if (id_d[1].planosEnDir) { id_d[1].planosEnDir.forEach( name => {
				var k= name+'/'+id_d[0];
				p[k]=p[k] || {};
				p[k].enDir= true;
			})}	

			this.setState( {
				planos: p,		
			});
		})
		.done(x => this.setState({ cargando: false }))
	}

	onControlClick= (k) => {
		console.log("planos control click", k);
		this.state.planos[k].quiereSync= !this.state.planos[k].quiereSync;
		this.setState({
			planos: this.state.planos,
		});
	}

	onElementoClick= (k) => {
		console.log("planos elemento click", k);
		RedMovil.set_plano_activo_p(k)
			.then(() => RedMovil.get_menu_p())
			.then(() => route('/'))
	}

	render({ }, { cargando, planos }) {
		console.log("planos", cargando, planos);
		return (
			<Pagina dsc="Planos disponibles" ref={ (cmp) => { this.cmp_page= cmp }}>
			<div className="form-botones">
				<Button raised onClick={ () => route('/cfg_proveedores') }>
					<Icon>
						folder_shared
					</Icon>	
				</Button>
			</div>
			{ cargando && <p>Cargando</p> }
			{ planos && (
					<List>
						{ Object.keys(planos).sort().map( k => ( 
							<List.LinkItem >
								<List.ListTextContainer onClick={ () => this.onElementoClick(k) }>
									{ k }
								</List.ListTextContainer>
								<List.ItemMeta onClick={ () => this.onControlClick(k) }>
									<span style={ planos[k].enUrl ? "" :"color: #111;"}>
										{ planos[k].enUrl ? 
												(planos[k].quiereSync ? "cloud_download" : "cloud") 
												: "cloud_off" 
										}
									</span>
									&nbsp;
									<span style={ planos[k].enDir ? "" :"color: #111;"}>
										{ planos[k].enDir ? "work" : "work_off" }
									</span>
								</List.ItemMeta>
							</List.LinkItem>
						))} 
					</List> )
			}
			</Pagina>
		);
	}
}
