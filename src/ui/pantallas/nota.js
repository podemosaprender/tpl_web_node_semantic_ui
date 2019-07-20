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

export default class Buscar extends Component {
	state= {
		usuarios: RedMovil.get_config().UsrOptions, 
		tipos: ['Falla', 'Agregar'],
		//XXX:GCAP: esconder en redmovil como lo va a traer de config, si es emulacion marcar con XXX:EMU
		idx_usuario_elegido: RedMovil.get_config().idxUsrSelected+1, 
		tipo_elegido: 'DEFAULT',
		idx_tipo_elegido: 0, 
		datos_foto: null,
	}
	
	guardar = () => { 
		var nota= { usr: localStorage.getItem('CfgUsrSelected'), xy: this.state.xy, elemento: this.state.elemento, tipo: this.state.tipo_elegido, texto: this.state.nota, foto: this.state.datos_foto };
		console.log('GUARDANDO NOTA', nota);
		RedMovil.guardar_nota(nota);
	}

	sacarFoto = () => { //XXX: Testear
    var my= this;
    // Camara
    var cameraOptions= {
      quality: 50,
      targetWidth: 200,
      targetHeight: 400,
      destinationType: Camera.DestinationType.DATA_URL,
    };
    function cameraSuccess(data) {
      my.setState({ datos_foto: data });
      console.log("FOTO DATA",data.length, data.substr(0,100));
			//XXX:GCAP: avisar correctamente de erroes, ej. en pantalla?
    }
    function cameraError(msg) {
      console.log("FOTO ERROR",msg);
			//XXX:GCAP: avisar correctamente de erroes, ej. en pantalla?
    }
    window.navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
  };

	onUsuarioChange= e => {
		this.setState({
			idx_usuario_elegido: e.target.selectedIndex
		});
		localStorage.setItem('CfgUsrSelected', this.state.usuarios[this.state.idx_usuario_elegido-1]);
	}

	onTipoChange= e =>{
		this.setState({
			idx_tipo_elegido: e.target.selectedIndex,
			tipo_elegido: tipos[idx_tipo_elegido],
		});
	}

	render({ xy, elemento }, { usuarios, tipos, idx_usuario_elegido, idx_tipo_elegido, datos_foto }) {
		return ( 
			<Pagina dsc="Tomar nota" ref={ (el) => { this.el_page= el && el.base }}>
				<div>
					<div>
						<Select
							hintText="Elegir usuario"
							selectedIndex={ idx_usuario_elegido }
							onChange={this.onUsuarioChange}>
								{ usuarios.map( usr => 
										<Select.Item>{ usr }</Select.Item>
								)}
						</Select>
						<Select
							hintText="Informar"
							selectedIndex={ idx_tipo_elegido }
							onChange={this.onTipoChange}>
								{ tipos.map( t => 
										<Select.Item>{ t }</Select.Item>
								)}
						</Select>
						<p/>
						<TextField
							textarea={true}
							label="Nota"
							onKeyUp={e => {
								this.setState({
									nota: e.target.value
								});
							}}
						/>{" "}
					</div>
					<div>
						Adjuntar foto
						<p/>
						<Button raised onClick={this.sacarFoto}>Sacar Foto</Button>
						<p/>
            <span style={ (datos_foto ?  "display:block" : "display:none") }>
							<img style="width: 200px; height: 400px;" src={'data:image/jpg;base64,'+datos_foto}/>
						</span>
					</div>
					<Button raised onClick={this.guardar}>Guardar</Button>
				</div>
			</Pagina>
		);
	}
}
