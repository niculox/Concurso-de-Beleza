let i = 1;

function addBotao() {
        let container = document.getElementById('separa_campo');
        //container.innerHTML = ''; // Limpa a div antes de adicionar novos botões

        for (i; i < 100; i++) {

            if(i<10){

                let botao = `<button id="${i}" class="num" onclick="selectBotao(${i})">0${i}</button>`;
                container.innerHTML += botao; // Adiciona o botão na div, porém com um 0 na frente dos número de um dígito para padronizar

            }else{

                let botao = `<button id="${i}" class="num" onclick="selectBotao(${i})">${i}</button>`;
                container.innerHTML += botao; // Adiciona o botão na div

            }
        }
}

window.onload = addBotao;


//seleciona o botão e muda sua cor
function selectBotao(idelement){
    
    let cont = 0;
    let button = document.getElementById(idelement);  //pega o elemento pelo id
    button.style.backgroundColor = '#610000';  // muda a cor de fundo
    button.style.color = '#ccc';  // muda a cor do número do botão

    cont++;
    result(cont,idelement); //chama a função do resultado da primeria rodada
}


// Imprime resultado da rodada na tela
function result(contador, element) {
    let container = document.getElementById("body"); 
    let soma = 0;
    let resultList = "";
    let numresultado = 0;
    let lista = [];
    //realiza sorteio
    for (let a = 0; a < 3; a++) {
        let nSorteado = (Math.floor((Math.random()) * 100)); 
        soma += nSorteado;
        lista[a] = nSorteado;
        let sorteioText = `<li class="list-sorteio">Jogador ${a+1}: ${nSorteado}</li>`;
        resultList += sorteioText; // Adiciona o resultado na variável temporária
    }

    numresultado = ((soma + element)/4)*0.8;
    numresultado = (Math.floor(numresultado)); 

    let div = `<div id="result">
            <h2 id="titulo-resultado">Resultado da Partida ${contador}</h2>
            <h3 id="subtitulo-resultado">x</h3>
            <ul id="result-list">
                ${resultList}
                <li id="list-sorteio-jogador">Você: ${element < 10 ? '0' : ''}${element}</li>
            </ul>
            <h3 id="subtitulo-resultado-2">Resultado:</h3>
            <h2 id="num-rsultado">${numresultado}</h2>
            <button id="button-resultado" onclick="nextRodada()">próxima rodada</button>
        </div>`;

    container.innerHTML += div; // Adiciona o resultado

    const listaComElement = [...lista, element]; // incluir o número do jogador na lista

    let closest = [listaComElement[0]];
    let smallestDiff = Math.abs(numresultado - listaComElement[0]);
    
    for (let i = 1; i < listaComElement.length; i++) {
        const diff = Math.abs(numresultado - listaComElement[i]);
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closest = [listaComElement[i]]; // Resetar a lista de mais próximos
        } else if (diff === smallestDiff) {
            closest.push(listaComElement[i]); // Adicionar à lista de mais próximos
        }
    }
    
    if (closest.length > 1) {//se tiver mias de um elemento, é empate
        if (closest.includes(element)) {//se tiver elemento igual e o do jogador estiver entre eles
            console.log("Empate, o jogador está entre os mais próximos:", closest);
        } else {//se o jogador não estiver entre o empate
            console.log("Empate entre os números mais próximos, o jogador não está entre eles:", closest);
        }
    } else {
        if (closest[0] === element) {//se o ganahdor ganhar
            console.log("O jogador ganhou, o número mais próximo é", closest[0]);
        } else {//se o ganhador perder e não houver
            console.log("O jogador perdeu, o número mais próximo é", closest[0]);
        }
    }    

}




//inicia uma nova rodada
function nextRodada(){
    
    addBotao();

}