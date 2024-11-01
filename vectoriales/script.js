let currentChart = null; 

document.getElementById('dataSelect').addEventListener('change', function() {
    const selectedValue = this.value;
    let dataFile = selectedValue === "1" ? 'data1.json' : 'data2.json';
    
    fetch(dataFile) 
        .then(response => response.json())
        .then(data => {
        
            if (currentChart) {
                currentChart.destroy();
            }
            currentChart = renderBarChart(data);
            currentChart = renderDonutChart(data);
        })
        .catch(error => console.error('Error:', error));
});

function renderBarChart(data) {
    const options = {
        series: [{
            name: 'Valores',
            data: data.values
        }],
        chart: {
            height: 350,
            type: 'bar',
        },
        colors: ['#008FFB'],
        xaxis: {
            categories: data.labels,
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    return chart; 
}

function renderDonutChart(data) {
    const options = {
        series: data.values,
        chart: {
            height: 400,
            type: 'donut',
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
        labels: data.labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    return chart; 
}