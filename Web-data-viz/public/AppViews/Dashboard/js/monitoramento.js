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
