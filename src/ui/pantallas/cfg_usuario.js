import { h, Component } from 'preact';
import { route } from 'preact-router';
import linkState from 'linkstate';
import Snackbar from 'preact-material-components/Snackbar';
import 'preact-material-components/Snackbar/style.css';

import Pagina from '../../components/pagina';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style';

export default class CfgFuente extends Component {
	state = {
		UsrOptions: localStorage.CfgUsrOptions,
	};

	configurar= () => {
		localStorage.CfgUsrOptions= this.state.UsrOptions+'_'+this.state.NewUsr;

		this.bar.MDComponent.show({
            message: "Buscar datos en '"+this.state.url+"'"
    });
		setTimeout( () => route('/'), 1000);
	}

	render({}, {}) {
		return (
			<Pagina dsc="Usuarios" ref={ (el) => { this.el_page= el && el.base }}>
				<div>
					<p>
						<TextField label='Nombre' onInput={ linkState(this, 'NewUsr') }/>
					</p>
				</div>
				<div>
					<p>
						<Button raised onClick={this.configurar}>Guardar</Button>
					</p>
				</div>
			</Pagina>
		);
	}
}
