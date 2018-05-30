const log = require('electron-log');

window.onerror = function (error, url, line) {
    log.error('error at ', url, ' on line ', line, ' :: ', error);
}