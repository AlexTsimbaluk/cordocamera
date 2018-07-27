'use strict';

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');

        $.material.init();

        window.open = cordova.InAppBrowser.open;
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

(function () {
    var gpsOptions = {
        enableHighAccuracy: true,
        timeout: 15000
    };

    function gpsSuccess(position) {
        var $gpsInfo = $('.gps-info');
        var crd = position.coords;

        var gpsInfo = 'Широта: ' + crd.latitude + '<br/>Долгота: ' + crd.longitude + '<br/>Высота: ' + crd.altitude + '<br/>Точность: ' + crd.accuracy + '<br/>Точность высоты: ' + crd.altitudeAccuracy + '<br/>Направление: ' + crd.heading + '<br/>Скорость: ' + crd.speed + '<br>Timestamp: ' + position.timestamp;

        $gpsInfo.html(gpsInfo);
    }

    function gpsError(error) {
        $('.gps-error').html('GPS ERROR(' + error.code + '): ' + error.message);

        console.log('GPS Error!');
        console.log(error);
    }

    $('.get-coords').on('click', () => {
        navigator.geolocation.getCurrentPosition(gpsSuccess, gpsError, gpsOptions);
    });

    $('.clear-coords').on('click', () => {
        $('.gps-error, .gps-info').html('');
    });
})();

(function () {
    $('a[target]').on('click', function () {
        var $link = $(this);
        var url = $link.attr('href');
        var target = $link.attr('target');

        cordova.InAppBrowser.open(url, target);

        return false;
    });
})();

$(document).on('ready', function () {});