const containerAlerta = document.getElementById("containerAlerta");
const ctx = document.getElementById('myChart');

// 👇 Agora você tem uma variável chamada grafico
const grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [''],
        datasets: [{
            label: 'Ideal',
            data: [],
            backgroundColor: ['#75C900'],
        },
        {
            label: 'Crítico',
            data: [],
            backgroundColor: ['#FF0000'],
        },
        {
            label: 'Atenção',
            data: [],
            backgroundColor: ['#FF8400'],
        }],
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {},
            y: { stacked: false, ticks: { display: false }, grid: { display: false } }
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

function inserirAleratorio(idSensor) {
    const temp = Number((Math.random() * 2 + 36).toFixed(1));

    let alerta = gerarAlerta(temp);

    fetch(`/historicos/cadastrar`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            tempServer: temp,
            alertaServer: alerta,
            idSensorServer: idSensor

        })

    }).then(res => res.json())
        .then(res => {
            listarTempFinal(idSensor)
        })



}

function atualizarGrafico(idSala) {

    fetch(`/historicos/contagem/${idSala}`)
        .then(res => res.json())
        .then(count => {
            let ideal = 0;
            let critico = 0;
            let atencao = 0;



            console.log(count)

            count.forEach(alert => {
                if (alert.alerta == 'Critico') {
                    critico = alert.qtd_alerta;
                } else if (alert.alerta == 'Ideal') {
                    ideal = alert.qtd_alerta;
                } else {
                    atencao = alert.qtd_alerta;
                }

            });

            console.log(ideal)
            console.log(critico)
            console.log(atencao)

            grafico.data.datasets[0].data = [ideal]
            grafico.data.datasets[1].data = [critico]
            grafico.data.datasets[2].data = [atencao]

            grafico.update()
        })


}

function logHistorico() {
    fetch(`/historicos/log/${idSala}`).then(res => res.json()).then(logs => {


        logs.forEach(log => {
            document.getElementById('historicoTabela').innerHTML += `
         
           <tr>
                    <td>${log.alerta}</td>
                    <td >${log.temperatura}</td>
                    <td > ${log.incubadora}</td>
                    <td > ${log.data_formatada}</td>
              </tr>      

                    `;



        });
    })
}

// logHistorico()
const sensoresIds = [];
let intervalInsert = null;

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

function listarTempFinal(idSensor) {
    fetch(`/historicos/ultimaTemperatura/${idSensor}`,).then(res => res.json().then(res => {
        const divSensor = document.getElementById(`sensor-${res[0].fkSensor}`)
        const divAlerta = document.getElementById(`desc-${res[0].fkSensor}`)
        const divHora = document.getElementById(`hora-${res[0].fkSensor}`)


        divSensor.innerHTML = `${res[0].Temperatura}º`
        divAlerta.innerHTML = `${res[0].alerta}`
        divHora.innerHTML = `${res[0].segundos_atras}`


    }))
}
function aleatoryIncubadoras() {

    fetch(`/incubadoras/buscar/${idSala}`)
        .then(r => r.json())
        .then(lista => {

            containerAlerta.innerHTML = "";
            let contadorInc = 0;

            lista.forEach(inc => {
                listarTempFinal(idSensor)


                contadorInc++;

                const temp = Number((Math.random() * 2 + 36).toFixed(1));


                const alerta = gerarAlerta(temp);

                sensoresIds.push(inc.idSensor)



                containerAlerta.innerHTML += `
                    <div class="alertaItem">
                        <span class="numeroIncubadora">Incubadora #${contadorInc}</span>
                        <span class="containerTemperatura">
                            <img src="./assets/dashboard-img/icone-alerta/${alerta}.svg">
                            <div id="sensor-${inc.idSensor}">${temp} </div>
                        </span>
                        <span id="desc-${inc.idSensor}">${alerta}/</span>
                        <span>Há <b id="hora-${inc.idSensor}"> 0 </b> Segundos</span>
                    </div>
                `;
            });


            intervalInsert = setInterval(() => {
                sensoresIds.forEach(sens => {
                    inserirAleratorio(sens)


                });
            }, 6000)
            logHistorico()

            atualizarGrafico(idSala);
            setInterval(() => atualizarGrafico(idSala), 60 * 1000)
        });
}
function ultimaTemperatura() {

    fetch(`http://localhost:3333/historicos/ultimaTemperatura`, { cache: 'no-store' }).then(res => res.json()).then(ultima => {
        console.log(`dados obtidos:${ultima[0]["Temperatura"]}`)

        [C.innerHTML = `aiiiiiiiiii ${ultima[0]["Temperatura"]}`
        ]
    }).catch(function (error) {
        console.error(`Erro na obtenção de dados ${error.message}`)
    })
    setInterval(ultimaTemperatura, 2000)


}

let idSensor = 0;
function registrarHistorico(temp, idSensor) {
    const alerta = gerarAlerta(temp);

    console.log(alerta)
    console.log(temp)
    console.log(idSensor)
    fetch("/historicos/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tempServer: temp,
            alertaServer: alerta,
            idSensorServer: idSensor
        })
    })

}



// ------------------------ ONLOAD ---------------------------------

window.onload = () => {
    listarSalas(idHospital);
    aleatoryIncubadoras();
    setInterval(aleatoryIncubadoras, 60000);
}


