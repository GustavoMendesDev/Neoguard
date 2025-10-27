var botaoCadastrar;
var modalOverlay;
var botaoFecharModal;
var inputNumeroIncubadora;
var botaoCadastrarModal;
var corpoTabela;
var tituloModal;
var linhaEmEdicao;          // Campo oculto que guarda o índice da linha           


function mostrarModal() {
    modalOverlay.style.display = 'flex';
    inputNumeroIncubadora.value = '';
    inputNumeroIncubadora.focus();
}

function fecharModal() {
    modalOverlay.style.display = 'none';
}

// parâmetro do tipo objeto
function removerLinha(botaoExcluir) {
    if (confirm('Tem certeza que deseja excluir esta incubadora?')) {
        // Encontra o <tr> (linha) a partir do botão clicado:
        // 1º parentNode: sobe para o <td>
        // 2º parentNode: sobe para o <tr>
        var linha = botaoExcluir.parentNode.parentNode;
        linha.remove();
        alert('Incubadora excluída.');
    }
}


// parâmetro do tipo string
function salvarIncubadora(nomeIncubadora) {
    if (nomeIncubadora.trim() === '') {
        alert('Por favor, insira o número da incubadora.');
        return;
    }

    var indiceLinha = linhaEmEdicao.value;

    if (indiceLinha !== '') {

        // pega todas as linhas do corpo da tabela
        var linhas = corpoTabela.getElementsByTagName('tr');

        var linhaASerEditada = linhas[indiceLinha - 1];

        linhaASerEditada.getElementsByTagName('td')[1].innerHTML = nomeIncubadora;

        alert('Incubadora editada com sucesso!');

    } else {
        var novoId = corpoTabela.getElementsByTagName('tr').length + 1; // adição no ID (como um AUTO_INCREMENT)
        var novaLinha = document.createElement('tr'); // adição de uma nova linha (tr)
        novaLinha.innerHTML = `
        <td>${novoId}</td>
        <td>${nomeIncubadora}</td>
            <td>
                <button class="botaoAcao editarLinha" onclick="editarLinha(this)">
                    <span class="iconeAcao"><img class="iconesEditarExcluir" src="/imagens/editar.png"></span>
                </button>
            </td>
        <td>
            <button class="botaoAcao botaoExcluir" onclick="removerLinha(this)">
                <span class="iconeAcao"><img class="iconesEditarExcluir" src="/imagens/excluir.png"></span>
            </button>
        </td>
    `;

        corpoTabela.appendChild(novaLinha);
    }
}

function inicializarEventos() {
    botaoCadastrar = document.getElementById('botaoCadastrar');
    modalOverlay = document.getElementById('modalOverlay');
    botaoFecharModal = document.getElementById('botaoFecharModal');
    inputNumeroIncubadora = document.getElementById('numeroIncubadora');
    botaoCadastrarModal = document.getElementById('botaoCadastrarModal');
    // referência do corpo da tabela de forma simples:
    corpoTabela = document.getElementById('tabelaIncubadoras').getElementsByTagName('tbody')[0];
    tituloModal = document.getElementById('tituloModal');
    linhaEmEdicao = document.getElementById('linhaEmEdicao');

    if (botaoCadastrar) {
        botaoCadastrar.onclick = function () {
            tituloModal.innerHTML = 'Cadastrar incubadora';
            botaoCadastrarModal.innerHTML = 'Cadastrar';
            linhaEmEdicao.value = '';
            mostrarModal();
        };
    }

    // E a chamada no botão do modal deve usar salvarIncubadora
    if (botaoCadastrarModal) {
        botaoCadastrarModal.onclick = function () {
            var nomeDigitado = inputNumeroIncubadora.value;

            salvarIncubadora(nomeDigitado);
            fecharModal();
        };
    }

    if (botaoFecharModal) {
        botaoFecharModal.onclick = fecharModal;
    }

    if (botaoCadastrarModal) {
        botaoCadastrarModal.onclick = function () {
            let nomeDigitado = inputNumeroIncubadora.value;

            salvarIncubadora(nomeDigitado);
            fecharModal();
        };
    }
}

function editarLinha(botao) {
    // Sobe: Botão -> TD -> TR.
    var linha = botao.parentNode.parentNode;

    // Encontra o valor da célula do nome (segunda célula, índice [1])
    var celulas = linha.getElementsByTagName('td');
    var nomeAtual = celulas[1].innerHTML;

    // Guarda a POSIÇÃO (índice) da linha na tabela no campo oculto
    // 'rowIndex' é a propriedade que nos diz onde a linha está.
    linhaEmEdicao.value = linha.rowIndex;

    // Prepara o Modal para Edição
    tituloModal.innerHTML = 'Editar incubadora';
    botaoCadastrarModal.innerHTML = 'Salvar Edição';

    // Preenche o campo de texto do modal com o valor atual
    inputNumeroIncubadora.value = nomeAtual;

    mostrarModal();
}

// Inicia o site após o carregamento
document.addEventListener('DOMContentLoaded', inicializarEventos);
