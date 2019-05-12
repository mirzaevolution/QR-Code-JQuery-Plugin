/// <reference path="../jquery-3.3.1.min.js" />

(function ($) {
    $.fn.greenify = function () {
        this.css("backgroundColor", "green");
        return this;
    };
}(jQuery));

