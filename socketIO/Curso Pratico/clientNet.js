const net = require('net');
//const readline = require('readline');

var nome = '';

var client = new net.Socket({writeable: true});

client.connect(3000, '127.0.0.1',()=>{
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('connect',(m)=>{
	if(nome==''){
		console.log('Bem vindo ao chatNode. Digite seu nome:');
	}
});

client.on('data',(m)=>{
	if(nome=='') return ;
    console.log(m.toString('utf8'));
});

process.stdin.on('readable',()=>{
	
	while(nome==''){		
		var m = process.stdin.read();
		if (!m) return ;
		m = m.toString().replace(/\n/,'');
		nome = m ;
		client.write('name:'+nome);

	}
	while(true) {
		var m = process.stdin.read();
		if (!m) return ;
		m = m.toString().replace(/\n/,'');
		client.write(m);
	  }
	
});