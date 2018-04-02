function onLoad() {
    formvalidate();
    fetchtrainMaster();
}

function formvalidate() {
    var form = $("#frmlogin");

    form.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // do not focus the last invalid input

        rules: {


            txtTrainnumber: {
                required: true

            },
            txtCoachNumber: {
                required: true,
                number: true
            },
            txtProblemType: {
                required: true
                
            },
            txtProbDescription: {
                required: true
                
            },
            txtengineerName: {
                required: true
            }

        },

        messages: { // custom messages for radio buttons and checkboxes
            regschtnc: {
                required: "Please accept TNC first."
            }

        },

        invalidHandler: function (event, validator) { //display error alert on form submit   

        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },


        submitHandler: function (form) {


            InsUpdComplaints();
        }
    });
}



function InsUpdComplaints() {

    var AttachementFileName = jQuery('#fileToUpload').val().substring(jQuery('#fileToUpload').val().lastIndexOf('\\') + 1);
    var reguser = {
        'SupervisorID': sessionStorage.getItem('SupervisorID'),
        'TrainNo': sessionStorage.getItem('hdnTrainID'),
        'CoachNumber': $('#txtCoachNumber').val(),
        'ProblemType': $('#txtProblemType option:selected').val(),
        'ProblemDescription': $('#txtProbDescription').val(),
        'Attachment': AttachementFileName,
        'AssignedTo': $("#txtengineerName").val()
    }
    //alert(JSON.stringify(reguser))
    jQuery.ajax({
      url: allurlapi + "Complaintmaster/InsUpdComplaints",
        data: JSON.stringify(reguser),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            // alert(data[0].Flag)
            if (data[0].Flag == '1') {
                fileUploader('fileToUpload', sessionStorage.getItem('hdnTrainID'), $('#txtCoachNumber').val());

                //$('#regusrsuccessdiv').show()
                //$('#regusrsuccessdiv').fadeOut(7000, function () {
                //    $("#modalUserRegister").modal('hide');
                //    resetregistrationForm();
                //});
                
            }
            else if (data[0].Flag == '-1') {
                //$('#regusrerrordiv').show();
                //$('#regscherror').html('A user with same email has been already registered.');
                //$('#regusrerrordiv').fadeOut(7000);

            }
            else if (data[0].Flag == '0') {
                $('#diverrlogin').show();
                $('#diverrlogin').find("span").html('Internal Server Error.');
                $('#diverrlogin').fadeOut(7000)

            }
        }

    });
}

function resetcomplaintform() {
    $("#txtTrainnumber").val('');
    $("#txtCoachNumber").val('');
    $("#txtProblemType").val('');
    $("#txtProbDescription").val('');
    $("#fileToUpload").val('');
    $("#txtengineerName").val('')
}

function capturImg() {
    //alert('success')
   // navigator.camera.getPicture(
   //     function (imageUri) {
   //         var image = document.getElementById('myImage');
   //         image.src = imageUri
   //     },
   //     function (message) {
   //         alert('Failed because: ' + message);
   //     }
   //     //,{
   //     //    quality: 50,
   //     //    destinationType: Camera.DestinationType.FILE_URI
   //     //}
   //);
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });

}



function onSuccess(imageURI) {
    //alert("success 2")
    var image = document.getElementById('myImage');
    image.src = imageURI;
    //fileUploaderCam(imageURI, sessionStorage.getItem('hdnTrainID'), $('#txtCoachNumber').val())
}

function onFail(message) {
    alert('Failed because: ' + message);
}

// For the best user experience, make sure the user is ready to give your app 
// camera access before you show the prompt. On iOS, you only get one chance. 

//QRScanner.prepare(onDone); // show the prompt 

//function onDone(err, status) {
//    if (err) {
//        // here we can handle errors and clean up any loose ends. 
//        console.error(err);
//    }
//    if (status.authorized) {
//        // W00t, you have camera access and the scanner is initialized. 
//        // QRscanner.show() should feel very fast. 
//    } else if (status.denied) {
//        // The video preview will remain black, and scanning is disabled. We can 
//        // try to ask the user to change their mind, but we'll have to send them 
//        // to their device settings with `QRScanner.openSettings()`. 
//    } else {
//        // we didn't get permission, but we didn't get permanently denied. (On 
//        // Android, a denial isn't permanent unless the user checks the "Don't 
//        // ask again" box.) We can ask again at the next relevant opportunity. 
//    }
//}

//// Start a scan. Scanning will continue until something is detected or 
//// `QRScanner.cancelScan()` is called. 
//QRScanner.scan(displayContents);

//function displayContents(err, text) {
//    if (err) {
//        // an error occurred, or the scan was canceled (error code `6`) 
//    } else {
//        // The scan completed, display the contents of the QR code: 
//        alert(text);
//    }
//}

//// Make the webview transparent so the video preview is visible behind it. 
//QRScanner.show();
//// Be sure to make any opaque HTML elements transparent here to avoid 
//// covering the video. 


//var done = function (err, status) {
//    if (err) {
//        console.error(err._message);
//    } else {
//        console.log('QRScanner is initialized. Status:');
//        console.log(status);
//    }
//};

//QRScanner.prepare(done);

//var callback = function (err, contents) {
//    if (err) {
//        console.error(err._message);
//    }
//    alert('The QR Code contains: ' + contents);
//};

//QRScanner.scan(callback);

//QRScanner.cancelScan(function (status) {
//    console.log(status);
//});

//QRScanner.enableLight(function (err, status) {
//    err && console.error(err);
//    console.log(status);
//});

//QRScanner.useFrontCamera(function (err, status) {
//    err && console.error(err);
//    console.log(status);
//});
//QRScanner.useBackCamera(function (err, status) {
//    err && console.error(err);
//    console.log(status);
//});
