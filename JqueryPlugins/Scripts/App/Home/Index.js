/// <reference path="../../plugins/greenify.js" />
$(document).ready(function () {
    $("#box1").greenify().css({
        "width": "200px",
        "height": "140px",
        "border":"2px solid black"
    });
    $("#md5msg").hash({
        data: "Hello World"
    });
    $("#sha1msg").hash({
        data: "Hello World",
        type: "sha1"
    });
    $("#sha256msg").hash({
        data: "Hello World",
        type: "sha256"
    });
    $("#sha512msg").hash({
        data: "Hello World",
        type: "sha512"
    });
    $("#md5msgInput").hash({
        data: "Hello World"
    });
    $("#sha1msgInput").hash({
        data: "Hello World",
        type: "sha1"
    });
    $("#sha256msgInput").hash({
        data: "Hello World",
        type: "sha256"
    });
    $("#sha512msgInput").hash({
        data: "Hello World",
        type: "sha512"
    });
    $("#btnEncrypt").click(function () {
        $("#block1").encryptor();
    });
    $("#btnDecrypt").click(function () {
        $("#block1").encryptor({ action: "decrypt" });
    });
});