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

};


window.onload = aleatoryIncubadoras();
