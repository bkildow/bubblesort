(function ($) {
  Drupal.behaviors.bubblesort = {
    attach: function (context, settings) {
      $('#edit-step').click(function () {
        drawChart();
        return false;
      });

      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
        var ajax = $.ajax({
          url: "/bubblesort_step_data",
          dataType: "json",
          async: false
        });

        var sorted = ajax.getResponseHeader('X-sorted');

        if (sorted == 1) {
          $("#main-content").after('<div class="messages messages--status">Sorted!</div>');
          $('#edit-step').prop("disabled", true);
        }

        // Create our data table out of JSON data loaded from server.
        var data = new google.visualization.DataTable(ajax.responseText);

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