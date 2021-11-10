$(document).ready(function () {
    $('form[name="geo"]').submit(function (e) {
        e.preventDefault();
        var province = $('.provi2 option:selected').text();
        var town = $('.muniSelect option:selected').text();
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + town + '&appid=e59ab0926515883c729cd878767f6b5f';
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        $.ajax({
            method: 'POST',
            url: url,
            success: function (data, status, object) {
                var wind = convertKmH(data.wind.speed);
                var humidity = data.main.humidity;
                var temp = celciusConverter(data.main.temp);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var description = data.weather[0].description
                var codeContry = data.sys.country;
                var area = areaConvert(lon, lat);

                $('#info-geo').html('<h3 style="color:blue">Información recibida día ' + today + ' </h3>' +
                    '<table class="table table-responsive">' +
                    '<thead><th>Provincia</th>' +
                    '<th>Municipio</th>' +
                    '<th>Humedad</th>' +
                    '<th>Temperatura</th>' +
                    '<th>Area</th>' +
                    '<th>Viento</th>' +
                    '<th>Latitud</th>' +
                    '<th>Longitud</th>' +
                    '<th>Códido País</th>' +
                    '<th>Descripción</th>' +
                    '</thead><tbody>' +
                    '<tr></tr>' +
                    '<td>' + province + '</td>' +
                    '<td>' + town + '</td>' +
                    '<td>' + humidity + ' %</td>' +
                    '<td>' + temp + ' ºC</td>' +
                    '<td>' + area + ' m2</td>' +
                    '<td>' + wind + ' Km/h</td>' +
                    '<td>' + lat + '</td>' +
                    '<td>' + lon + '</td>' +
                    '<td>' + codeContry + '</td>' +
                    '<td>' + description + '</td>' +
                    '</tbody></table>');
                $.ajax({
                    type: 'POST',
                    url: Routing.generate('ajax.g'),
                    data: {lat: lat, lon: lon, wind: wind, humidity: humidity},
                    async: true,
                    success: function (data, status, object) {
                        $('#select-info').replaceWith('<h3 style="color:green">' + data.message + '</h3><hr>');
                    },
                    error: function (data, status, object) {
                    }
                });
            },
            error: function (data, status, object) {
                console.log(status)
            }
        });
    });

    function celciusConverter(valNum) {
        valNum = parseFloat(valNum);
        var celius = valNum - 273.15;
        var celiusDefined = celius.toFixed(2);
        return celiusDefined
    }

    function convertKmH(value) {
        value = parseInt(value);
        return value * 3.6;
    }

    function areaConvert(lon, lat) {
        lat = parseFloat(lat);
        lon = parseFloat(lon);
        var area = lat * lon * 10;
        var areat = area.toFixed(2);
        return areat;
    }

//TODO: select for MUNICIPIO
    var municipio = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "../json/municipio.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
    var valuePro = $('.provi,.provi2').val();
    townValue(valuePro);
    $('.provi').change(function () {
        var valuePro1 = $('.provi option:selected').val();
        townValue(valuePro1);
    });

    $('.provi2').change(function () {
        var valuePro2 = $('.provi2 option:selected').val();
        townValue(valuePro2);
    })

    function townValue(valuePro) {
        $('.muniSelect').empty();//empty this select.
        $.each(municipio, function (key, value) {
            var optionsValue = value.id;
            var optionsText = value.nm;
            if (optionsValue.startsWith(valuePro)) {//id que empiezan por valor de optionsValue
                $('.muniSelect').append("<option value=" + optionsValue + ">" + optionsText + "</option>")
            }
        });
    }


});




