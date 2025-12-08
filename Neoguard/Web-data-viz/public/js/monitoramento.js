

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [''],
        datasets: [{
            label: 'Ideal',
            data: [5],
            backgroundColor: [
                '#75C900',  // ideal
            ],
            borderWidth: 1
        },
        {
            label: 'Critico',
            data: [3],
            backgroundColor: [
                '#FF0000',  // ideal
            ],
            borderWidth: 1
        },
        {
            label: 'Atenção',
            data: [2],
            backgroundColor: [
                '#FF8400',  // ideal
            ],
            borderWidth: 1
        }],

    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                stacked: true,
                min: 0,
                max: 10
            },
            y: {
                stacked: true,
                ticks: {
                    display: false   // remove os valores do eixo Y
                },
                grid: {
                    display: false   // opcional: remove as linhas do grid do eixo Y
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "TOTAL INCUBADORAS POR CADA ESTADO",
                font: {
                    size: 16
                }
            }
        },

    }
}

);

let idHospital; 0
let idSala = 0
let i = 0
idHospital = sessionStorage.ID_HOSPITAL;

console.log(idHospital)
function entrarSala(idSala) {
    sessionStorage.ID_SALA = idSala;
    console.log("Sala selecionada:", idSala);

    window.location = "monitoramento.html";
}


function listarSalas(idHospital) {

    fetch(`/salasNeoNatais/buscar/${idHospital}`)
        .then(resposta => resposta.json())
        .then(salas => {

            console.log("Salas encontradas:", salas);
            const navContainer = document.getElementById("select-radio");

            // Salvar o HTML original (que inclui o botão Monitoramento)
            const htmlPadrao = `
<div class="nav-item selecionado">
  <img src="assets/dashboard-img/icone-header/IconeDashboard.svg">
  <a href="analitycs.html">Monitoramento</a>
</div>
`;

            // Reescreve com o padrão + as salas
            navContainer.innerHTML = htmlPadrao;

            salas.forEach(sala => {
                i++

                console.log(sala)
                navContainer.innerHTML += `

        <div class="option">
            <input type="radio" name="escolha" id="sala_${i}"
                   onclick="entrarSala(${sala.id})">
            <label for="sala_${i}">
                <img class="iconeUTI" src="assets/dashboard-img/icone-header/Sala.svg">
                Sala UTI - ${i}
            </label>
        </div>
    `;
            });
        }).catch(err => {
            console.log("Erro ao carregar salas:", err);
        });

}


function listarIncubadoras() {
    fetch(`/buscar/${idSala}`)
        .then(resposta => resposta.json())
        .then(inc => {
            console.log("Incubadora criada:", inc);

            // 2. Criar linha na tabela

            inc.forEach(incs => {
                i++
                containerAlerta.innerHTML = `
            

            <div class="alertaItem">
        <span class="numeroIncubadora">Incubadora #<b>${i}</b></span>
        <span class="containerTemperatura">
          <img src="./assets/dashboard-img/icone-alerta/Critico.svg">
          <div id="inc1"> °C</div>
        </span>
        <span>Critico</span>
        <span>Há <b>0</b> minuto</span>
      </div>
            `;


            });
        })

}


function aleatoryIncubadoras() {

    var aleatorio2 = Number((Math.random() * 2 + 36).toFixed(1));
    var aleatorio3 = Number((Math.random() * 2 + 36).toFixed(1));
    var aleatorio4 = Number((Math.random() * 2 + 36).toFixed(1));
    var aleatorio5 = Number((Math.random() * 2 + 36).toFixed(1));
    var aleatorio6 = Number((Math.random() * 2 + 36).toFixed(1));
    var aleatorio7 = Number((Math.random() * 2 + 36).toFixed(1));
    var aleatorio8 = Number((Math.random() * 2 + 36).toFixed(1));
    var aleatorio9 = Number((Math.random() * 2 + 36).toFixed(1));
    var aleatorio10 = Number((Math.random() * 2 + 36).toFixed(1));


    inc2.innerHTML = `${aleatorio2}`;
    inc3.innerHTML = `${aleatorio3}`;
    inc4.innerHTML = `${aleatorio4}`;
    inc5.innerHTML = `${aleatorio5}`;
    inc6.innerHTML = `${aleatorio6}`;
    inc7.innerHTML = `${aleatorio7}`;
    inc8.innerHTML = `${aleatorio8}`;
    inc9.innerHTML = `${aleatorio9}`;
    inc10.innerHTML = `${aleatorio10}`;

    window.onload = () => {
        aleatoryIncubadoras();

        setInterval(aleatoryIncubadoras, 60000);

    }

};


window.onload = aleatoryIncubadoras();
window.onload = listarSalas(idHospital);




