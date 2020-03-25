var express  = require('express') ;
var app  = express();
var http = require('http').createServer(app);
var io   = require('socket.io')(http) ;



var conn = [] ;

function setNickname(socket , nome){
    conn.forEach(value => {
        if(value.socket == socket) {
            value.nickname = nome ;
            return ;
        }
    });
}

function setDisconnectSocket(socket){
    conn.forEach(value => {
        if(value.socket == socket) {
            conn.pop(value);
            return ;
        }
    });
}

function renderUserConectados(io){
    var arrayNick = conn.map((value) => {
        return {nickname : value.nickname } 
    })


    io.emit('users', arrayNick );
}

app.use(express.static(__dirname + '/view'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/view/index.html') ;
});

io.on('connection', function(socket){

    var time = setTimeout(()=>{
        socket.broadcast.emit('digitando', '');
    },3000);

    let nickname = "user <<" + Math.random().toString(36).substring(7).toUpperCase() + ">>"  ;   

    //Novo usuário entrou
    socket.broadcast.emit('chat message', nickname + ' entrou na sala.');

   // socket.emit('nick',nickname);  

    conn.push({socket,nickname});

    renderUserConectados(io);


    socket.on('chat message',(msg)=>{
        io.emit('chat message',nickname+ ' fala: ' + msg);
        console.log(conn.length);
    }) 
    
    socket.on('nickname',(msg)=>{     
        io.emit('chat message',nickname+ ' agora é :' + msg);
        nickname = msg ;
        setNickname(socket,msg);
        renderUserConectados(io);
        io.emit('nick',msg);        
        
    }) 

    socket.on('digitando',(msg)=>{

        if (msg == false){
            socket.broadcast.emit('digitando', '') ; 
            return
        } 
        clearTimeout(time) ;
        socket.broadcast.emit('digitando', nickname+' está digitando');
        time = setTimeout(()=>{
            socket.broadcast.emit('digitando', '');
        },2000);
     
    })

    socket.on('disconnect',function(){        
        setDisconnectSocket(socket);
        io.emit('chat message',nickname+' saiu da sala.');
        console.log('desconetou!');
    })

})


http.listen(3000,()=>{
    console.log('Ouvindo na porta 3000')
})