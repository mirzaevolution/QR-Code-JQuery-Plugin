/// <reference path="../../jsqrcode/plugin/qrscanner.js" />

$(document).ready(function () {
    $("#ButtonScan1").click(function () {
        $("#QRContainer").QRScanner({
            callback: function (content) {          //required
                alert("QR Content: " + content);
                console.log(content);
            },
            autoClose:false,                        //optional
            modalHeaderColor: "white",              //optional
            modalContentColor: "#110"               //optional
        });
    });
    $("#ButtonScan2").click(function () {
        $("#QRContainer").QRScanner({
            callback: function (content) {          //required
                alert("QR Content: " + content);
                console.log(content);
            },
            autoClose: true,
            modalHeaderColor: "white",              //optional
            modalContentColor: "#110"               //optional
        });
    });
    $("#ButtonScan3").click(function () {
        $("#QRContainer").QRScanner({
            callback: function (content) {          //required
                $("#QRContent").val(content);
            },
            autoClose: true,
            modalHeaderColor: "white",              //optional
            modalContentColor: "#110"               //optional
        });
    });
})