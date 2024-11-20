
function mostrarMensagens(){
    var mensagens = obterMensagens()

    for (const msg of mensagens) {
        $('#mensagens').append(
            `
            <tr>
            <td>${msg.nome}</td>
            <td>${msg.email}</td>
            <td>${msg.mensagem}</td>
            </tr>
            `
        )
    }
}


function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function enviarMensagem() {
    var mensagem = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        mensagem: $('#msg').val()
    }
    inserirMensagem(mensagem)
}

function inserirMensagem(mensagem) {


  
    var inserir = $.ajax({

        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function autenticar(){
    var objLoginSenha = {
        email: $('#email').val(),
        senha: $('#senha').val(),
    }

    validarUsuario(objLoginSenha)
}

function validarUsuario(objLoginSenha) {

 
    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    return retorno;
}

$('#contato-form').on('submit', function (event) {
    event.preventDefault();
    enviarMensagem();
});

$('#login-form').on('submit', function (event) {
    event.preventDefault();
    autenticar();
});


$('#mensagens').ready(mostrarMensagens)