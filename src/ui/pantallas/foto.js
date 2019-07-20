import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Profile extends Component {
	state = {
		datos_foto: null
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
	}

	sacarFoto = () => {
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
		}
		function cameraError(msg) {
			console.log("FOTO ERROR",msg);
		}
		window.navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
	};

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { datos_foto }) {
		return (
			<div class={`${style.profile} page`}>
				<h1>Sacar foto</h1>
				<p>
					<Button raised onClick={this.sacarFoto}>sacar foto</Button>
				</p>
				<img style="width: 200px; height: 400px;" src={'data:image/jpg;base64,'+datos_foto}/>
			</div>
		);
	}
}
