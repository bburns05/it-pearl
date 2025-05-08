"use strict";

$(document).ready(function () {
  $("#getWeather").click(function () {
    let location = $("#location").val().trim();

    if (location === "") {
      $("#error").text("Location is required.");
      return;
    }

    $("#error").text("");

    let geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${location}`;

    $.getJSON(geoURL, function (msg1) {
      if (!msg1.results || msg1.results.length === 0) {
        $("#error").text("No location found.");
        return;
      }

      let loc = msg1.results[0];
      let lat = loc.latitude;
      let lon = loc.longitude;
      let name = loc.name;
      let admin = loc.admin1;
      let country = loc.country;

      $("#locationInfo").html(`<p>${name}, ${admin}, ${country}<br>Latitude = ${lat} - Longitude = ${lon}</p>`);

      let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit`;

      $.getJSON(weatherURL, function (msg2) {
        let temps = msg2.hourly.temperature_2m;
        let time = msg2.hourly.time;
        let tableHTML = "<tr><th>Date</th><th>Temp</th></tr>";

        let labels = [];
        let values = [];

        for (let i = 0; i < 12; i++) {
          let unixmillsec = Date.parse(time[i]);
          let tmpdate = new Date(unixmillsec);
          let friendlyTime = tmpdate.toLocaleString();

          tableHTML += `<tr><td>${friendlyTime}</td><td>${temps[i]}</td></tr>`;

          labels.push(friendlyTime);
          values.push(temps[i]);
        }

        $("#forecastTable").html(tableHTML);

        // Chart
        const ctx = document.getElementById('forecastChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Temperature (°F)',
              data: values,
              fill: false,
              borderColor: 'blue',
              tension: 0.1
            }]
          },
          options: {
            responsive: false,
            scales: {
              x: { ticks: { maxRotation: 90, minRotation: 45 } }
            }
          }
        });
      });
    });
  });

  $("#clear").click(function () {
    $("#location").val('');
    $("#locationInfo").empty();
    $("#forecastTable").empty();
    $("#forecastChart").remove();
    $("body").append('<canvas id="forecastChart" width="600" height="300"></canvas>');
    $("#error").text("");
  });
});
