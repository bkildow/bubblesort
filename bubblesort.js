(function ($) {
  Drupal.behaviors.bubblesort = {
    attach: function (context, settings) {
      $('#edit-step').click(function() {
        drawChart();
        return false;
      });

      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
        var jsonData = $.ajax({
          url: "/bubblesort_step_data",
          dataType: "json",
          async: false
        }).responseText;

        // Create our data table out of JSON data loaded from server.
        var data = new google.visualization.DataTable(jsonData);

        var options = {
          legend: 'none',
          title: '',
          chartArea: {width: '75%'}
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart'));
        chart.draw(data, options);

      }

    }
  };
})(jQuery);