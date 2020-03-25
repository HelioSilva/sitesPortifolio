$(document).ready(()=>{
    
    $(window).scroll(()=>{
        console.log($(this).scrollTop());

        if ($(this).scrollTop() > 100){
            $('#titulo>h1').addClass('sumir');
        }else{
            $('#titulo>h1').removeClass('sumir');
        }

        if ($(this).scrollTop() > 430 ){
            $('#topo').addClass('fixar');
            $('#topo').removeClass('topo');
           // $('#menuFixo').removeClass('ocultar');
        }else{
            $('#topo').addClass('topo');
            $('#topo').removeClass('fixar');
           // $('#menuFixo').addClass('ocultar');
        }
    })
})

function gotoHome(){
    console.log('Rolando o scroll até contato')
    $('html').animate({scrollTop: 0  }, 500);
 
}

function gotoContato(){
    // $( "html" ).scrollTop( $("#contato").scrollHeight );

    console.log('Rolando o scroll até contato')
    $('html').animate({scrollTop: $('.contato').offset().top  }, 500);

}

function gotoSkill(){
    // $( "html" ).scrollTop( $("#contato").scrollHeight );

    console.log('Rolando o scroll até contato')
    $('html').animate({scrollTop: $('.skills').offset().top  }, 500);

}

function gotoPortifolio(){
    // $( "html" ).scrollTop( $("#contato").scrollHeight );

    console.log('Rolando o scroll até contato')
    $('html').animate({scrollTop: $('.portifolio').offset().top  }, 500);

}

function gotoRodape(){
    // $( "html" ).scrollTop( $("#contato").scrollHeight );

    console.log('Rolando o scroll até contato')
    $('html').animate({scrollTop: $('aside').offset().top  }, 500);

}