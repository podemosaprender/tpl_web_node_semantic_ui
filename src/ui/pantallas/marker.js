import { h, Component } from 'preact';
import linkState from 'linkstate';

import Pagina from '../../components/pagina';

import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import Select from 'preact-material-components/Select';
import 'preact-material-components/Select/style.css';
import 'preact-material-components/List/style.css'; //Para Select
import 'preact-material-components/Menu/style.css';
import style from './style';

export default class Marker extends Component {
	state= {
	}
	
	render({ xy, elemento }, { }) {
		return ( 
			<Pagina dsc="Marcas" ref={ (el) => { this.el_page= el && el.base }}>
			<p>Esta marca {JSON.stringify(xy)}</p>
			</Pagina>
		);
	}
}
