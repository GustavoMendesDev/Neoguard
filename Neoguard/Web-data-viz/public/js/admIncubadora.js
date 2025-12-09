let botaoCadastrar;
let modalOverlay;
let botaoFecharModal;
let numeroPeso;
let inputNumeroIg;
let botaoCadastrarModal;
let corpoTabela;
let tituloModal;
let linhaEmEdicao;


function mostrarModal() {
    modalOverlay.style.display = 'flex';
    numeroPeso.value = '';
    numeroPeso.focus();
    inputNumeroIg.value = inputNumeroIg.value
    inputNumeroIg.focus();
}

function fecharModal() {
    modalOverlay.style.display = 'none';
}

// parâmetro do tipo objeto
function removerLinha(botaoLimpar) {
    if (confirm('Tem certeza que deseja limpar esta incubadora?')) {
        // Encontra o <tr> (linha) a partir do botão clicado:
        // 1º parentNode: sobe para o <td>
        // 2º parentNode: sobe para o <tr>
        var linha = botaoLimpar.parentNode.parentNode;

        // Encontra todas as células <td> da linha
        var celulas = linha.getElementsByTagName('td');

        // célula [1] peso
        celulas[1].innerHTML = '0';

        // célula [2] idade gestacional
        celulas[2].innerHTML = '0';

        alert('Dados da incubadora limpos com sucesso!');
    }
}


// parâmetro do tipo string
function salvarIncubadora(numeroPeso, inputNumeroIg) {
    if (numeroPeso.trim() === '') {
        alert('Por favor, insira o número da incubadora.');
        return;
    }

    var indiceLinha = linhaEmEdicao.value;

    if (indiceLinha !== '') {

        // pega todas as linhas do corpo da tabela
        var linhas = corpoTabela.getElementsByTagName('tr');

        var linhaASerEditada = linhas[indiceLinha - 1];

        linhaASerEditada.getElementsByTagName('td')[1].innerHTML = numeroPeso;
        linhaASerEditada.getElementsByTagName('td')[2].innerHTML = inputNumeroIg;

        alert('Incubadora editada com sucesso!');

    } else {
        alert("Erro: A edição falhou. Nenhuma linha alterada!")
    }
}

let idSala = 0

idSala = sessionStorage.ID_SALA;

function gerarIncubadorasIniciais() {
    console.log('Sala Selecionada:', idSala);
    i++;
    console.log(i)
    // 1. Cadastrar incubadora no backend

        corpoTabela.innerHTML = "";

    fetch('/incubadoras/cadastrar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idSalaServer: idSala,
            idSensorServer: i
        })
    }).then(resposta => resposta.json())
        .then(cadInc => {
            listarIncubadoras(idSala)
           console.log('CADASTRO FEITO COM SUCESSO (incubadora)', cadInc)


        }).catch(err => {
            console.log("Erro ao cadastrar incubadora:", err);
        });


}

let i = 0;

function listarIncubadoras(idSala) {

    fetch(`/incubadoras/buscar/${idSala}`)
        .then(resposta => resposta.json())
        .then(inc => {
            console.log("Incubadora criada:", inc);

            // 2. Criar linha na tabela

     inc.forEach((incubadora, i) => {
                
    document.getElementById("novaLinha").innerHTML += `
        <td>${i + 1}</td>
        <td>0</td>
        <td>0</td>
        <td>
            <button class="botaoAcao editarLinha" onclick="editarLinha(this)">
                <span class="iconeAcao">
                    <img class="iconesEditarExcluir" src="./assets/dashboard-img/admIncubadoras/editar.svg">
                </span>
            </button>
        </td>
        <td>
            <button class="botaoAcao botaoExcluir" onclick="removerLinha(this)">
                <span class="iconeAcao">
                    <img class="iconesEditarExcluir" src="./assets/dashboard-img/admIncubadoras/remover.svg">
                </span>
            </button>
        </td>
    `;
});






        })

}



function inicializarEventos() {
    botaoCadastrar = document.getElementById('botaoCadastrar');
    inputNumeroIg = document.getElementById('numeroIg');
    modalOverlay = document.getElementById('modalOverlay');
    botaoFecharModal = document.getElementById('botaoFecharModal');
    numeroPeso = document.getElementById('numeroPeso');
    botaoCadastrarModal = document.getElementById('botaoCadastrarModal');

    corpoTabela = document.getElementById('tabelaIncubadoras').getElementsByTagName('tbody')[0];
    tituloModal = document.getElementById('tituloModal');
    linhaEmEdicao = document.getElementById('linhaEmEdicao');


    corpoTabela.innerHTML = '';





    // chamada no botão do modal deve usar salvarIncubadora
    if (botaoCadastrarModal) {
        botaoCadastrarModal.onclick = function () {
            var pesoDigitado = numeroPeso.value;
            var idadeDigitada = inputNumeroIg.value;

            salvarIncubadora(pesoDigitado, idadeDigitada);
            fecharModal();
        };
    }

    if (botaoFecharModal) {
        botaoFecharModal.onclick = fecharModal;
    }
}

function editarLinha(botao) {
    // Procura botão -> TD -> TR. (avô)
    var linha = botao.parentNode.parentNode;

    // encontra o valor da célula do nome (índice [1])
    var celulas = linha.getElementsByTagName('td');
    var pesoAtual = celulas[1].innerHTML; // célula do peso
    var idadeGestacionalAtual = celulas[2].innerHTML // célula da idade gestacional

    // guarda a a posição da linha na tabela no campo oculto (que iniciei no html com o tipo "hidden")
    linhaEmEdicao.value = linha.rowIndex; // 'rowIndex' é a propriedade do html <tr> que nos diz onde a linha está.

    // prepara o Modal para Edição
    tituloModal.innerHTML = 'Editar incubadora';
    botaoCadastrarModal.innerHTML = 'Salvar Edição';

    // preenche o campo de texto do modal com o valor atual
    numeroPeso.value = pesoAtual;
    inputNumeroIg.value = idadeGestacionalAtual;

    mostrarModal();
}

// Inicia o site após o carregamento
document.addEventListener('DOMContentLoaded', inicializarEventos);

window.onload = listarIncubadoras(idSala);


