var timeId = null; //Vriavel que armazena a chamada da função Timeout

function iniciaJogo(){
   var url = window.location.search;
    var nivel_jogo = url.replace("?","");
  	var qt_baloes = 63;
    var tempo;
    
    if(nivel_jogo == 1) {//nivel fácil
        tempo =120;
 }

    if(nivel_jogo ==2){//nivel normal
        tempo = 60; 
  }

    if (nivel_jogo ==3) {//nivel dificl
        tempo = 30;
  }

      document.getElementById('cronometro').innerHTML = tempo;
    
    //quantidade de balões;
   
	cria_baloes(qt_baloes);
    contagem_tempo(tempo+1);

    document.getElementById('baloes_inteiros').innerHTML = qt_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;


}

//cria quantidade de balões
function cria_baloes(qt_baloes){
	for (var i = 1; i <= qt_baloes; i++){
		var balao = document.createElement("img");

		balao.src ='imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.style.padding ='5px';
		balao.id = 'b'+i;
		balao.onclick = function() {
			estourar(this);
		}
		document.getElementById('jogo').appendChild(balao);

	}

}

//cronometro
function contagem_tempo (segundos){
	
		segundos = segundos -1 ;
		if(segundos == -1){
			clearTimeout(timeId); //para a execução da função do setTimeout
			game_over();
			return false;
		}

	
	document.getElementById('cronometro').innerHTML = segundos;
	timeId=setTimeout("contagem_tempo("+segundos+")", 1000);

}


function game_over(){
	alert("Fim de jogo. Você não conseguiu estourar todos os balões a tempo.");
}

function estourar(e){
	var id_balao = e.id;
	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);

}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao ;
	baloes_estourados = baloes_estourados - acao;
	
	document.getElementById('baloes_inteiros').innerHTML =baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros) ;
	


}

function situacao_jogo(baloes_inteiros){
	if(baloes_inteiros ==0 ){
		alert("Parabéns, você conseguiu estourar todos os balões a tempo");
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timeId);
}