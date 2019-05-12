(function ($) {
    var modalHtml = '<div id="ModalScan" class="modal fade" role="dialog">\
                       <div class="modal-dialog">\
                           <div class="modal-content">\
                                <div id="ModalScanHeader" class="modal-header">\
                                    <h4 class="modal-title"><span class="fa fa-qrcode"></span> Scan QR Code</h4>\
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>\
                                </div>\
                                <div id="ModalScanContent" class="modal-body modal-full-content">\
                                    <div class="m-auto">\
                                       <div class="video-container" id="VideoDivStandard">\
                                       </div>\
                                    </div>\
                                </div>\
                           </div>\
                        </div>\
                    </div>';
    var videoHtml = '<video id="VideoCoreStandard" class="video-item" autoplay loop muted playsinline></video>';
    var canvasHtml = '<canvas id="qr-canvas" style="width: 800px; height: 600px;"></canvas>';
    var gContextStandard = null;
    var gCanvasStandard = null;
    var c = 0;
    var stype = 0;
    var gUM = false;
    var v = null;
    
    var RealtimeScanner = {
        
        StandardScanner: {
            CurrentId: undefined,
            InitScanner: function (callback) {
             
                if (RealtimeScanner.StandardScanner.IsCanvasSupported() && window.File && window.FileReader) {

                    RealtimeScanner.StandardScanner.InitCanvas(800, 600);
                    qrcode.callback = callback;
                    RealtimeScanner.StandardScanner.RefreshWebcam();
                }
                else {
                    alert("Sorry your browser doesn't support our QR Code Scanner");
                }
            },
            InitCanvas: function (width, height) {
                gCanvasStandard = document.getElementById("qr-canvas");
                gCanvasStandard.style.width = width + "px";
                gCanvasStandard.style.height = height + "px";
                gCanvasStandard.width = width;
                gCanvasStandard.height = height;
                gContextStandard = gCanvasStandard.getContext("2d");
                gContextStandard.clearRect(0, 0, width, height);
            },
            IsCanvasSupported: function () {
                var elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            },
            CallModal: function () {
                $("#ModalScan").modal({ backdrop: "static" });
            },
            CaptureToCanvas: function () {
                if (stype != 1)
                    return;
                if (gUM) {
                    try {
                        gContextStandard.drawImage(v, 0, 0);
                        try {
                            qrcode.decode();
                        }
                        catch (e) {
                            RealtimeScanner.StandardScanner.CurrentId = setTimeout(RealtimeScanner.StandardScanner.CaptureToCanvas, 500);
                        }
                    }
                    catch (e) {
                        RealtimeScanner.StandardScanner.CurrentId=  setTimeout(RealtimeScanner.StandardScanner.CaptureToCanvas, 500);
                    }
                }
            },
            RefreshWebcam: function () {
                $("#VideoDivStandard").html("");
                stype = 0;
                var options = true;
                if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                    try {
                        navigator.mediaDevices.enumerateDevices()
                            .then(function (devices) {
                                try {
                                    var containBackCamera = false;
                                    devices.forEach(function (device) {
                                        if (device.kind === 'videoinput') {
                                            if (device.label.toLowerCase().search("back") > -1) {
                                                options = { 'deviceId': { 'exact': device.deviceId }, 'facingMode': 'environment' };
                                                containBackCamera = true;
                                            }
                                        }
                                    });
                                    if (!containBackCamera) {

                                        for (var i = 0; i < devices.length; i++) {
                                            if (devices[i].kind === 'videoinput') {
                                                options = { 'deviceId': { 'exact': devices[i].deviceId }, 'facingMode': 'environment' };
                                                containBackCamera = true;
                                                break;
                                            }
                                        }
                                    }
                                    RealtimeScanner.StandardScanner.SetWebcam(options);

                                } catch (e) {
                                    console.log(e);
                                }
                            });
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                else {
                    alert("No navigator.mediaDevices.enumerateDevices");
                    RealtimeScanner.StandardScanner.SetWebcam(options);
                }
            },
            SetWebcam: function (options) {
                if (stype == 1) {
                    RealtimeScanner.StandardScanner.CurrentId =setTimeout(RealtimeScanner.StandardScanner.CaptureToCanvas, 500);
                    return;
                }
                var n = navigator;

                $("#VideoDivStandard").html(videoHtml);
                v = document.getElementById("VideoCoreStandard");

                if (options == true) {
                    //options = '{ facingMode: { exact: "environment" } }';
                    options = '{ facingMode: "environment"  }';

                }
                if (n.mediaDevices.getUserMedia) {
                    var optionsToUse = { video: options, audio: false };
                    if (options == true) {
                        optionsToUse = { video: { facingMode: { exact: "environment" } }, audio: false };

                    }
                    n.mediaDevices.getUserMedia(optionsToUse).
                        then(function (stream) {
                            RealtimeScanner.StandardScanner.OnSuccess(stream);
                        }).catch(function (error) {
                            RealtimeScanner.StandardScanner.OnError(error);
                        });

                }
                else {

                    var optionsToUse = { video: options, audio: false };
                    if (options == true) {
                        optionsToUse = { video: { facingMode: { exact: "environment" } }, audio: false };
                    }
                    if (n.getUserMedia) {
                        webkit = true;
                        n.getUserMedia(optionsToUse, RealtimeScanner.StandardScanner.OnSuccess, RealtimeScanner.StandardScanner.OnError);
                    }
                    else if (n.webkitGetUserMedia) {
                        webkit = true;
                        n.webkitGetUserMedia(optionsToUse, RealtimeScanner.StandardScanner.OnSuccess, RealtimeScanner.StandardScanner.OnError);
                    }

                }
                stype = 1;
                RealtimeScanner.StandardScanner.CurrentId =setTimeout(RealtimeScanner.StandardScanner.CaptureToCanvas, 500);

            },
            OnSuccess: function (stream) {
                v.srcObject = stream;
                v.play();
                gUM = true;
                RealtimeScanner.StandardScanner.CurrentId =setTimeout(RealtimeScanner.StandardScanner.CaptureToCanvas, 500);

            },
            OnError: function (error) {
                console.log(error);
                gUM = false;
                return;
            }
        }
    };
    $.fn.QRScanner = function (options) {
        var usedOptions = $.extend({}, $.fn.QRScanner.default, options);
        if (usedOptions.callback === undefined || usedOptions.callback == null) {
            throw new Error("[!] QRScanner-Error: You must provide a callback for callback type!");
        }

        if ($("#ModalScan").length === 0) {
            $(this).append(modalHtml);
            $("#ModalScanHeader").css("background-color", usedOptions.modalHeaderColor);
            $("#ModalScanContent").css("background-color", usedOptions.modalContentColor);
            $('#ModalScan').on('hidden.bs.modal', function () {
                setTimeout(function () {
                    clearTimeout(RealtimeScanner.StandardScanner.CurrentId);
                    if (v && v.srcObject) {
                        try {

                            v.srcObject.getTracks()[0].stop();
                            v.pause();
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }, 100);
            });
        }
        if ($("#qr-canvas").length === 0) {
            $(this).append(canvasHtml);
        }

        RealtimeScanner.StandardScanner.InitScanner(createCallback(usedOptions.autoClose, usedOptions.callback));
        RealtimeScanner.StandardScanner.CallModal();


    };

    $.fn.QRScanner.default = {
        callback: undefined,
        autoClose: false,
        modalHeaderColor: "#fff",
        modalContentColor: "#111"
    };
    function createCallback(autoClose, callback) {
        return function (e) {
            callback(e);
            if (autoClose) {
                $("#ModalScan").modal("hide");
            } else {
                RealtimeScanner.StandardScanner.CurrentId = setTimeout(RealtimeScanner.StandardScanner.CaptureToCanvas, 500);
            }
        };
    }
}(jQuery));