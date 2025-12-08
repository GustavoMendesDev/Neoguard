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

function entrarSala(idSala) {

    sessionStorage.ID_SALA = idSala;
    console.log(idSala)

    window.location = "monitoramento.html";


}

function listarSalas(idHospital) {

    fetch(`/salasNeoNatais/buscar/${idHospital}`)
        .then(resposta => resposta.json())
        .then(salas => {

            console.log("Salas encontradas:", salas);

            const navContainer = document.getElementById("select-radio");
            navContainer.innerHTML = ""; // limpar o conteúdo antigo

            salas.forEach(sala => {
                navContainer.innerHTML += `
                <div class="option">
                    <input type="radio" name="escolha" id="sala_${sala.id}" onclick="entrarSala(${sala.id})">
                    <label for="sala_${sala.id}">
                        <img class="iconeUTI" src="assets/dashboard-img/icone-header/Sala.svg">
                        Sala UTI - ${sala.id}
                    </label>
                </div>
                `;
            });
        })
        .catch(err => {
            console.log("Erro ao carregar salas:", err);
        });
}
