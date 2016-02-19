(function ($) {
  Drupal.behaviors.bubblesort = {
    attach: function (context, settings) {

      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['label', 'value', { role: 'style' }],
          ['', 8175000, 'blue'],
          ['', 3792000, 'blue'],
          ['', 2695000, 'red'],
          ['', 2099000, 'blue'],
          ['', 1526000, 'blue']
        ]);

        var options = {
          title: '',
          chartArea: {width: '75%'},
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart'));
        chart.draw(data, options);

      }

    }
  };
})(jQuery);