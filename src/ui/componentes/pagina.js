/**
 *
 */

uiPagina= MkUiComponent(function (my) {
	my.showMsg= (msg) => {
		//XXX:MSG
		alert(msg);
	}

	my.render= function (props,state) {
		return (
				h('div',{className: 'page'},
					h('div',{className: 'page-header'},
						h(Button,{className: 'page-close', onClick: () => preactRouter.route('/')},'X'),
						h('h2',{style: {margin: 0}}, props.dsc),
					 ),
					props.children,
				 //MSG
				 )
		);
	}
});
