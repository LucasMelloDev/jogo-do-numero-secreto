//Funções sem parametros
//let titulo = document.querySelector("h1");
//titulo.innerHTML = 'Jogo do número Secreto';

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um número entre 1 e 10 ";

let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = geradorNumeroAleatorio();
console.log(numeroAleatorio);
let tentativas = 1;

//Funções com parametros
function mostrarTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial(){
    mostrarTextoTela('h1', 'Jogo do número Secreto!');
    mostrarTextoTela('p', "Escolha um número entre 1 e 10: ");
}
exibirMensagemInicial();

function analisarChute() {
    let chute = document.querySelector("input").value;
    console.log(chute == numeroAleatorio);

    if (chute == numeroAleatorio){
        mostrarTextoTela ("h1", "Acertou!!");
        let palavraTentativas = tentativas> 1 ? "Tentativas" : "Tentativa";
        let mensagensTentativas = `Você descobriu e ganhou o jogo com ${tentativas} ${palavraTentativas}!`;
        mostrarTextoTela ("p", mensagensTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else{
        if (chute > numeroAleatorio){
            mostrarTextoTela("p", "O número secreto é menor que o chute.");
        } else {
            mostrarTextoTela("p","O número secreto é maior que o chute.");
        }
        tentativas++;
        limparCampo();
    }
}


function geradorNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;
    if(quantidadeElementosLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return geradorNumeroAleatorio();
    } else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
       
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroAleatorio = geradorNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    console.log(numeroAleatorio);
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}