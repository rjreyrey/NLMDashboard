document.addEventListener('DOMContentLoaded', function () {
    if (document.location.pathname.indexOf('/login') > -1) {
        String.prototype.startsWith = function(search, pos) {
            return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
        };
    }
}, false);
