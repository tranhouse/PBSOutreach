
// ---- initiation of Chart 1 :: Top 10 ----
var ctx = document.getElementById('Top10').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['General', 'PIBS', 'IA', 'PSDCP', 'CLAIM SUBMITION', 'RATES', 'PAY CENTER','GRC', 'REACHING 65', 'RETIREMENT PREPARATION'],
        datasets: [{
            label: 'Frequency',
            backgroundColor: 'rgb(56, 150, 176)',
            borderColor: 'rgb(56, 150, 176)',
            data: [80, 33, 26, 101, 33, 22, 45, 100, 55, 3]
        }]
    },

    // Configuration options go here
    options: {}
});

// ---- initiation of Chart 2 :: ex: Top 5 ----
var ctx = document.getElementById('Top5').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['General', 'PIBS', 'IA', 'PSDCP', 'CLAIM SUBMITION'],
        datasets: [{
            label: 'Frequency',
            backgroundColor: 'rgb(211, 175, 55, 1)',
            borderColor: 'rgb(211, 175, 55, 1)',
            data: [80, 33, 26, 101, 33]
        }]
    },

    // Configuration options go here
    options: {}
});