const net = require('net');

var connections = [];
var ins = 0 ;

const server = net.createServer( (socket) => {
   ins++ ;
   console.info(ins+'\n');

   socket.write('Servidor está pronto...\n')
   socket.pipe(socket)

   socket.on('error', function(err) {
      console.log('Cliente sem sinal!\n')
   })

   socket.on('close', ()=>{
      console.log('Desconectou!\n');
   });    

   var conexao = 'Número de Conexões: '+ socket._server._connections  ;   

   socket.on('data',(message)=>{
      message = message.toString();

      if (message === 'end'){
         socket.end() ;
      }

      if (message.indexOf('name:') === 0){
         let nickname =  message.replace("name:", "");

         console.log('Função de Adicionar Nome:  ' + nickname+'\n');

         connections.push({conn:socket,nickname:nickname});

         console.log('>>>Nome:  ' + nickname + '\n');

         socket.write( nickname +' foi conectado com sucesso!\n');
         var msg = `${nickname} entrou >>>>> `+'\n'  ;
         broadcast(msg, socket);

         return ;
      }


      function broadcast(message,sender){
         var stringMessage = message;
         console.log(stringMessage);
        
         // connections.forEach((client)=>{
         //    if (client.conn === sender) return;
         //    client.conn.write(stringMessage+'\n','utf8');
         // })
      }
   

         

   });

});

server.listen('3000','127.0.0.1');

