'use strict';

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');

        $.material.init();

        window.open = cordova.InAppBrowser.open;

        this.clearInfo();

        if (device.platform.toLowerCase() == 'android') {
            $('.watch-block').removeClass('hidden');
        }

        this.toast = window.plugins.toast;
        this.bindToast(this.toast);
    },

    bindToast: function (toast) {
        $('[data-toast]').on('click', function () {
            var $el = $(this);
            var pos = $el.attr('data-toast');
            var msg = $el.attr('data-toast-msg');
            var time = $el.attr('data-toast-time');

            if (!$el.attr('data-toast-style')) {
                toast.show(msg, time, pos);
            } else {
                toast.showWithOptions({
                    message: msg,
                    duration: time, // 2000 ms
                    position: pos,
                    styling: {
                        opacity: 0.75, // Default 0.8
                        backgroundColor: '#eeeeee', // Default #333333
                        textColor: '#333333', // Default #FFFFFF
                        // textSize: 20.5, // Default is approx. 13.
                        cornerRadius: 16 // minimum is 0 (square). iOS default 20, Android default 100
                        // horizontalPadding: 20, // iOS default 16, Android default 50
                        // verticalPadding: 16 // iOS default 12, Android default 30
                    }
                });
            }
        });
    },

    alert: function (args) {
        var msg = args[0];
        var cb = args[1];

        if (navigator.notification) {
            if (args.length > 2) {
                var title = args[2];
                var btn = args[3];
                navigator.notification.alert(msg, cb, title, btn);
            } else {
                navigator.notification.alert(msg, cb);
            }
        } else {
            window.alert(msg);
        }
    },

    confirm: function (args) {
        var msg = args[0];
        var cb = args[1];

        if (navigator.notification) {
            if (args.length > 2) {
                var title = args[2];
                var btn = args[3];
                navigator.notification.confirm(msg, cb, title, btn);
            } else {
                navigator.notification.confirm(msg, cb);
            }
        } else {
            window.confirm(msg);
        }
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

        return states[networkState];
    }
};

app.initialize();

(function () {
    var watchID;
    var $gpsInfo = $('.gps-info');

    var gpsOptions = {
        enableHighAccuracy: true,
        timeout: 15000
    };

    function gpsSuccess(position) {
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

    $('.watch-gps').on('click', () => {
        watchID = navigator.geolocation.watchPosition(gpsSuccess, gpsError, gpsOptions);

        $('.watch-gps').addClass('hidden');
        $('.stop-watch-gps').removeClass('hidden');
    });

    $('.stop-watch-gps').on('click', () => {
        navigator.geolocation.clearWatch(watchID);

        $('.stop-watch-gps').addClass('hidden');
        $('.watch-gps').removeClass('hidden');

        $gpsInfo.html('');
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

(function () {
    var $connectionInfo = $('.connection-info');

    $('.get-connection').on('click', () => {
        var connectionInfo = app.checkConnection();

        $connectionInfo.html('Connection type: ' + connectionInfo);
        app.toast.show('Вот вам сеть, она ' + connectionInfo, 1500, 'bottom');
    });
})();

(function () {
    $('[data-event="vibrate"]').on('click', function () {
        var vibrateArg = $(this).attr('data-vibrate-arg');
        console.log(vibrateArg);

        navigator.vibrate(3000);
    });
})();

(function () {
    $('[data-dialog="alert"]').on('click', function () {
        var alertArgs = [];

        var dialogType = $(this).attr('data-dialog');
        console.log(dialogType);

        var dialogMsg = $(this).attr('data-alert-msg');
        console.log(dialogMsg);

        if (dialogMsg === undefined) {
            throw new Error('Message is required!');
        } else {
            alertArgs.push(dialogMsg);
        }

        var dialogCallback = $(this).attr('data-alert-callback');
        console.log(dialogCallback);

        if (dialogCallback === undefined) {
            alertArgs.push(null);
        } else {
            var cb = () => {
                app.alert(['This is callback', null]);
            };
            alertArgs.push(cb);
        }

        var dialogTitle = $(this).attr('data-alert-title');
        console.log(dialogTitle);

        var dialogBtn = $(this).attr('data-alert-btn');
        console.log(dialogBtn);

        if (dialogTitle !== undefined && dialogBtn !== undefined) {
            alertArgs.push(dialogTitle);
            alertArgs.push(dialogBtn);
        }

        app.alert(alertArgs);
    });
})();

(function () {
    $('[data-dialog="confirm"]').on('click', function () {
        var args = [];

        var dialogType = $(this).attr('data-dialog');

        var dialogMsg = $(this).attr('data-msg');
        if (dialogMsg === undefined) {
            throw new Error('Message is required!');
        } else {
            args.push(dialogMsg);
        }

        var dialogCallback = $(this).attr('data-callback');
        console.log(dialogCallback);

        if (dialogCallback === undefined) {
            args.push(null);
        } else {
            var cb = buttonIndex => {
                let msg = buttonIndex == 0 ? 'Окно заигнорено' : buttonIndex == 1 ? 'Ответ утвердительлный' : 'Ответ отрицательный';
                app.toast.show(msg, 1500, 'bottom');
            };
            args.push(cb);
        }

        var dialogTitle = $(this).attr('data-title');
        console.log(dialogTitle);

        var dialogBtn = $(this).attr('data-btn');
        console.log(dialogBtn);

        if (dialogTitle !== undefined && dialogBtn !== undefined) {
            args.push(dialogTitle);

            let btns = dialogBtn.split('::');
            args.push(btns);
        }

        app.confirm(args);
    });
})();

/*(function () {
    $('[data-toast]').on('click', function () {
        var toast = window.plugins.toast;
        var $el = $(this);
        var pos = $el.attr('data-toast');
        var msg = $el.attr('data-toast-msg');
        var time = $el.attr('data-toast-time');

        toast.show(msg, time, pos);
    });
})();*/

$(document).on('ready', function () {});