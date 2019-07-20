//INFO: servidor, estandar, separar en modulos

var express = require('express');
var bodyParser = require('body-parser');
var os = require('os'); //A: para interfases

//------------------------------------------------------------------
//S: util
function net_interfaces() { //U: conseguir las interfases de red
	//SEE: https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
	var r= {};

	var ifaces = os.networkInterfaces();
	Object.keys(ifaces).forEach(function (ifname) {
		var alias = 0;

		ifaces[ifname].forEach(function (iface) {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				return; //A: skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
			}

			if (alias >= 1) { //A this single interface has multiple ipv4 addresses
					r[ifname + ':' + alias]= iface.address;
			} else { //A: this interface has only one ipv4 adress
					r[ifname]= iface.address;
			}
			++alias;
		});
	});

	// en0 -> 192.168.1.101
	// eth0 -> 10.0.0.101
	return r;
}

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

//VER: http://expressjs.com/en/starter/static-files.html
app.use('/ui', express.static(__dirname + '/../ui'));
app.use('/app', express.static(__dirname + '/../app'));
app.use('/node_modules', express.static(__dirname + '/../../node_modules'));

// init sqlite db
var fs = require('fs');

//SEE: http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
		res.redirect('/ui/');
		});

//SEE: listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	var if2addr= net_interfaces();
	var k;
	for (k in if2addr) {
	 	console.log(k+' : '+'http://'+if2addr[k]+':'+listener.address().port);
	}
});

