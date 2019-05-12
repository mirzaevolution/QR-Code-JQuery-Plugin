/// <reference path="../jquery-3.3.1.min.js" />
/// <reference path="../cryptojs/rollups/aes.js" />
(function ($) {
    $.fn.encryptor = function (options) {
        var usedOptions = $.extend({}, $.fn.encryptor.default, options);
        var nodeType = this.prop("nodeName");
        var key = "!@#1RSFSDF!$dfsd211%@#@#!#!%R@FDASFEWQG@#R#REW";
        if (nodeType === "INPUT") {
            if (usedOptions.action.toLowerCase() === "encrypt") {
                this.val(CryptoJS.AES.encrypt(this.val(), key));
            } else if (usedOptions.action.toLowerCase() === "decrypt") {
                this.val(CryptoJS.AES.decrypt(this.val(), key));
            } else {
                throw new Error("Unsupported action!");
            }
            return this;
        } else {
            
            if (usedOptions.action.toLowerCase() === "encrypt") {
                this.text(CryptoJS.AES.encrypt(this.html(), key));
            } else if (usedOptions.action.toLowerCase() === "decrypt") {
                this.html(CryptoJS.AES.decrypt(this.html(), key).toString(CryptoJS.enc.Utf8));
            } else {
                throw new Error("Unsupported action!");
            }
            return this;
            
        }
    };
    $.fn.encryptor.default = {
        action: "encrypt"
    };
}(jQuery));