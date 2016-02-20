(function ($) {
  Drupal.behaviors.bubblesort = {
    attach: function (context, settings) {
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      $('#edit-step').click(function () {
        $('.messages').hide();
        drawChart();
        return false;
      });

      $('#edit-play').click(function () {
        $('.messages').hide();
        $('#edit-step').attr('disabled', true);
        $('#edit-play').attr('disabled', true);
        drawChart();
        startLoop();
        return false;
      });

      function startLoop() {
        interval = window.setInterval(function () {
          drawChart();
        }, 200);
      }

      function bubblesortAjaxRequest() {
        return $.ajax({
          url: "/bubblesort_step_data",
          dataType: "json",
          async: false
        });
      }


      function drawChart() {
        var ajax = bubblesortAjaxRequest()
        var sorted = ajax.getResponseHeader('X-sorted');

        if (sorted == 1) {
          $("#main-content").after('<div class="messages messages--status">Sorted!</div>');
          $('#edit-step').attr('disabled', true);
          $('#edit-play').attr('disabled', true);
          if (typeof interval !== 'undefined') {
            clearInterval(interval);
          }
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

        return sorted;
      }
    }
  };
})(jQuery);