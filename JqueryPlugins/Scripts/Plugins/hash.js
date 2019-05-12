/// <reference path="../jquery-3.3.1.min.js" />
/// <reference path="../cryptojs/rollups/md5.js" />
/// <reference path="../cryptojs/rollups/sha1.js" />
/// <reference path="../cryptojs/rollups/sha256.js" />
/// <reference path="../cryptojs/rollups/sha512.js" />

(function ($) {
    $.fn.hash = function (options) {
        var usedHashOptions = $.extend({},$.fn.defaultHash, options);
        var nodeType = this.prop("nodeName");
        if (nodeType) {
            nodeType = nodeType.toLowerCase();

        } else {
            nodeType = "div";
        }

        if (usedHashOptions.data && usedHashOptions.type) {
            switch (usedHashOptions.type.toLowerCase()) {
                case "sha1":
                    return nodeType === "input" ? this.val(CryptoJS.SHA1(usedHashOptions.data)) : this.text(CryptoJS.SHA1(usedHashOptions.data));
                case "sha256":
                    return nodeType === "input" ? this.val(CryptoJS.SHA256(usedHashOptions.data)) : this.text(CryptoJS.SHA256(usedHashOptions.data));
                case "sha512":
                    return nodeType === "input" ? this.val(CryptoJS.SHA512(usedHashOptions.data)) : this.text(CryptoJS.SHA512(usedHashOptions.data));
                default:
                    return nodeType === "input" ? this.val(CryptoJS.MD5(usedHashOptions.data)) : this.text(CryptoJS.MD5(usedHashOptions.data));
            }
        }
    };
    $.fn.defaultHash = {
        data: "",
        type: "md5"
    };
}(jQuery));