// Pega os elementos do html
const inputNome = document.querySelector('.input-nome');
const txtAreaMensagem = document.querySelector('.text-area-mensagem');
const btnAddRecado = document.querySelector('.btn-add-recado');
const recados = document.querySelector('.recados');

// Cria uma li
function criaLi() {
    const li = document.createElement('li');
    return li;
}

// Setta os campos como vazios
function limparCampos() {
    inputNome.value = '';
    txtAreaMensagem.value = '';
    inputNome.focus();
}

// Cria um botão para exluir
function criaBotaoExcluir(li) {
    li.innerText += ' ';
    // Cria um botão
    const botaoExcluir = document.createElement('button');
    // Adiciona 'Exluir' no botão
    botaoExcluir.innerText = 'Excluir';
    // Adiciona as classes 'btn-excluir' e 'excluir' ao botão
    botaoExcluir.classList.add('btn-excluir', 'excluir');
    // Torna filho da li
    li.appendChild(botaoExcluir);
}

// Criar recados
function criaRecado(textInput) {
    // Cria uma li
    const li = criaLi();
    //  Adiciona o texto do input
    li.innerText = textInput;
    // li se torna filho de recados
    recados.appendChild(li);
    // Limpa o input
    limparCampos();
    // Chama a função para criar o botão excluir
    criaBotaoExcluir(li);
    // Chama a função para salvar em cache
    salvarRecados();
}

// Se o botão adicionar for clicado executada cria o recado
btnAddRecado.addEventListener('click', function() {
    // Verifica se os campos estão vazios
    if(!inputNome.value) return;
    if(!txtAreaMensagem.value) return;
    // Chama a função que vai criar os recados
    criaRecado(`${inputNome.value}: ${txtAreaMensagem.value}`);
});

// Irá capturar o clique e verificar se é o excluir
document.addEventListener('click', function(e) {
    // Captura o elemtento clicado
    const element = e.target;
    // Verifica se existe o excluir na classe
    if(element.classList.contains('excluir')) {
        // Remove o elemento
        element.parentElement.remove();
        // Salva a atualização em cache
        salvarRecados();
    }
});

// Salva em cache
function salvarRecados() {
    const liRecados = recados.querySelectorAll('li');
    const listaDeRecados = [];
    // Percorre as li com os recados
    for (let recado of liRecados) {
        let recadoText = recado.innerText;
        // Remove o excluir
        recadoText = recadoText.replace('Excluir', '').trim();
        // Adiciona o recado ao array
        listaDeRecados.push(recadoText);
    }
    // Converte em JSON
    const recadosJSON = JSON.stringify(listaDeRecados);
    // Salva
    localStorage.setItem('recados', recadosJSON);
}

function addRecadosSalvos() {
    // Pega os recados salvos
    const recados = localStorage.getItem('recados');
    // Converte
    const listaDeRecados = JSON.parse(recados);

    // Pecorre o a lista de recados
    for (let recado of listaDeRecados) {
        // Cria os recados que foram salvos
        criaRecado(recado);
    }
}

addRecadosSalvos();

// Função que cria um pop-up
function creditos(){
    window.open ('creditos.html', 'creditos')
}
