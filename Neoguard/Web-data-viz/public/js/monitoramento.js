const containerAlerta = document.getElementById("containerAlerta");
const ctx = document.getElementById('myChart');

// 👇 Agora você tem uma variável chamada grafico
const grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [''],
        datasets: [{
            label: 'Ideal',
            data: [0],
            backgroundColor: ['#75C900'],
        },
        {
            label: 'Crítico',
            data: [0],
            backgroundColor: ['#FF0000'],
        },
        {
            label: 'Atenção',
            data: [0],
            backgroundColor: ['#FF8400'],
        }],
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: { stacked: true, min: 0, max: 10 },
            y: { stacked: true, ticks: { display: false }, grid: { display: false } }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "TOTAL INCUBADORAS POR CADA ESTADO",
                font: { size: 16 }
            }
        },
    }
});

// --------------------- VARIÁVEIS -------------------------
let idHospital = sessionStorage.ID_HOSPITAL;
let idSala = sessionStorage.ID_SALA;
let idIncubadora = 1; // NECESSÁRIO!
let contadorSalas = 0;

// --------------------- FUNÇÕES ----------------------------

function entrarSala(idSala) {
    sessionStorage.ID_SALA = idSala;
    window.location = "monitoramento.html";
}

function gerarAlerta(temp) {
    if (temp < 36.5) return "Critico";
    if (temp > 37.5) return "Atenção";
    return "Ideal";
}

function listarSalas(idHospital) {

    fetch(`/salasNeoNatais/buscar/${idHospital}`)
        .then(r => r.json())
        .then(salas => {

            const navContainer = document.getElementById("select-radio");

            navContainer.innerHTML = `
                <div class="nav-item selecionado">
                    <img src="assets/dashboard-img/icone-header/IconeDashboard.svg">
                    <a href="analitycs.html">Monitoramento</a>
                </div>
            `;

            salas.forEach(sala => {
                contadorSalas++;

                navContainer.innerHTML += `
                    <div class="option">
                        <input type="radio" name="escolha" id="sala_${contadorSalas}"
                               onclick="entrarSala(${sala.id})">
                        <label for="sala_${contadorSalas}">
                            <img class="iconeUTI" src="assets/dashboard-img/icone-header/Sala.svg">
                            Sala UTI - ${contadorSalas}
                        </label>
                    </div>
                `;
            });
        });
}

function registrarHistorico(temp, idSensor) {
    const alerta = gerarAlerta(temp);

    fetch("/historico/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            tempServer: temp,
            alertaServer: alerta,
            idSensorServer: idSensor
        })
    });
}

function aleatoryIncubadoras() {

    fetch(`/incubadoras/buscar/${idSala}`)
        .then(r => r.json())
        .then(lista => {

            containerAlerta.innerHTML = "";
            let contadorInc = 0;

            lista.forEach(inc => {

                contadorInc++;

                const temp = Number((Math.random() * 2 + 36).toFixed(1));
                const alerta = gerarAlerta(temp);

                registrarHistorico(temp, inc.fkSensor);

                containerAlerta.innerHTML += `
                    <div class="alertaItem">
                        <span class="numeroIncubadora">Incubadora #${contadorInc}</span>
                        <span class="containerTemperatura">
                            <img src="./assets/dashboard-img/icone-alerta/${alerta}.svg">
                            <div>${temp} °C</div>
                        </span>
                        <span>${alerta}</span>
                        <span>Há <b>0</b> minuto</span>
                    </div>
                `;
            });

            atualizarGrafico();
        });
}

function atualizarGrafico() {

    fetch(`/historico/contagem/${idHospital}/${idSala}/${idIncubadora}`)
        .then(r => r.json())
        .then(dados => {
            grafico.data.datasets[0].data = [dados.ideal];
            grafico.data.datasets[1].data = [dados.critico];
            grafico.data.datasets[2].data = [dados.atencao];
            grafico.update();
        });
}

// ------------------------ ONLOAD ---------------------------------

window.onload = () => {
    listarSalas(idHospital);
    aleatoryIncubadoras();
    setInterval(aleatoryIncubadoras, 60000);
};
