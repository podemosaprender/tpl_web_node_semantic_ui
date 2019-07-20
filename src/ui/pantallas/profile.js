import { h, Component, render } from 'preact';
import { route } from 'preact-router';

import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Profile extends Component {
	state = {
		time: Date.now(),
		count: 10
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	increment = () => {
		this.setState({ count: this.state.count+1 });
	};

	popup = () => {
		var latlng= RedMovil.map.getCenter();

		L.popup()
    .setLatLng(latlng)
    .setContent('<p>Hello world!</p><p id="popup1">This is a nice popup.</p>')
    .openOn(RedMovil.map);

		var el= document.querySelector('#popup1');
		var el_parent= el.parentElement.parentElement.parentElement
		console.log("POPUP EL",el, el_parent);

		var el_dst= render(
				<div>
				<p>Click Me</p>
				<Button>Ponele un boton</Button>
				</div>,
				el_parent		
		);
		console.log("POPUP EL DEST", el_dst);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
			<div class={`${style.profile} page`}>
				<h1>Profile: {user}</h1>
				<p>This is the user profile for a user named { user }.</p>

				<div>Current time: {new Date(time).toLocaleString()}</div>

				<p>
					<Button raised ripple onClick={this.increment}>Click Me</Button>
					{' '}
					Clicked {count} times.
				</p>

				<p>
					<Button raised onClick={this.popup}>Popup</Button>
				</p>

				<p>
					<Button raised onClick={() => route('/nota/567176721/666812787/miElemento')}>Simular click en boton "informar" del popup</Button>
				</p>
			</div>
		);
	}
}
