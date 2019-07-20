import { h, Component } from 'preact';

import Menu from '../../components/menu';
import '../../components/menu/style.css';

import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import Icon from 'preact-material-components/Icon';


export default class Home extends Component {
	menuOpen= () => { this.cmp_menu.openDrawer() }

	render({menu}) {
		return (
			<div> 
				<Button primary raised className="menu-open" onClick={this.menuOpen}>
					<Icon>apps</Icon>
				</Button>
				<Menu items={menu} ref={ (el) => this.cmp_menu= el }/>
			</div>
		);
	}
}
