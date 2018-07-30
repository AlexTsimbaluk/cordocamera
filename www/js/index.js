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

        this.clearInfo();
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    clearInfo: function () {
        $('[data-clear]').on('click', function () {
            var $clearTarget = $(this).attr('data-clear');
            $clearTarget += '-info';

            $($clearTarget).html('');
        });
    },

    // получаем информацию о сетевом соединении
    checkConnection: function () {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown';
        states[Connection.ETHERNET] = 'Ethernet';
        states[Connection.WIFI] = 'WiFi';
        states[Connection.CELL_2G] = 'Cell 2G';
        states[Connection.CELL_3G] = 'Cell 3G';
        states[Connection.CELL_4G] = 'Cell 4G';
        states[Connection.CELL] = 'Cell generic';
        states[Connection.NONE] = 'No network';

        return 'Connection type: ' + states[networkState];
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
        $('.gps-info').html('GPS ERROR(' + error.code + '): ' + error.message);

        console.log('GPS Error!');
        console.log(error);
    }

    $('.get-gps').on('click', () => {
        navigator.geolocation.getCurrentPosition(gpsSuccess, gpsError, gpsOptions);
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

(function () {
    var $deviceInfo = $('.device-info');

    $('.get-device').on('click', () => {
        var deviceInfo = 'Device Model: ' + device.model + '<br />' + 'Device Manufacturer: ' + device.manufacturer + '<br />' + 'Device Platform: ' + device.platform + '<br />' + 'Device Version: ' + device.version + '<br />' + 'Device Serial number: ' + device.serial + '<br />' + 'Device UUID: ' + device.uuid + '<br />' + 'Device Cordova: ' + device.cordova + '<br />';

        $deviceInfo.html(deviceInfo);
    });
})();

(function checkConnection() {
    var $connectionInfo = $('.connection-info');

    $('.get-connection').on('click', () => {
        var connectionInfo = app.checkConnection();

        $connectionInfo.html(connectionInfo);
    });
})();

$(document).on('ready', function () {});