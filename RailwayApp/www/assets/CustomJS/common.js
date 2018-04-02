//var allurlapi = 'http://localhost:63542/api/';
var allurlapi = 'http://66.199.232.34/TMSAPI/api/';

function fetchtrainMaster() {

    //alert(JSON.stringify(data))
    jQuery.ajax({
        contentType: "application/json; charset=utf-8",
        url: allurlapi + "RailMaintenance/fetchtrainMaster",
        type: "GET",
        cache: false,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            //alert(JSON.stringify(data));
           
            sessionStorage.setItem('hdnfetchTrains', JSON.stringify(data));
            
                      
        }

    });
    
}
sessionStorage.setItem('hdnTrainID', '0');

jQuery("#txtTrainnumber").typeahead({
    source: function (query, process) {
        var data = sessionStorage.getItem('hdnfetchTrains');
        trainnames = [];
        map = {};
        var trainAutoCompleteName = "";
        jQuery.each(jQuery.parseJSON(data), function (i, trainAutoCompleteName) {
            map[trainAutoCompleteName.TrainAutoCompleteName] = trainAutoCompleteName;
            trainnames.push(trainAutoCompleteName.TrainAutoCompleteName);
        });

        process(trainnames);

    },
    minLength: 2,
    updater: function (item) {

        if (map[item].TrainNo != '0') {

            sessionStorage.setItem('hdnTrainID', map[item].TrainNo);
            //fetchSchoolDetails(map[item].TrainNo);
        }
        else {
            alert('Please select correct Train !');

        }
        return item;
    }

});

jQuery("#txtTrainnumber").keyup(function () {
    sessionStorage.setItem('hdnTrainID', '0');
    //clearAllValue();
});

function fileUploader(frmctrlID, trainNo, coachno) {

    var formData = new window.FormData();

    var file = $('#' + frmctrlID).prop("files")[0];

    //var genregNo = sessionStorage.getItem('hdnvehicleID');

    formData.append("file", file);

    formData.append("Trainno", trainNo);

    formData.append("CoachNo", coachno);
    formData.append("UploadFor", "Web");

    $.ajax({
        type: 'POST',
        url: "http://66.199.232.34/TMSAPI/ConfigureFileAttachment.ashx",

        data: formData,

        processData: false,

        contentType: false,

        success: function (data) {
            bootbox.alert("Data Saved Successfully.");
        },

        error: function () {

            bootbox.alert("Attachment error.");

        }

    });
}

function fileUploaderCam(fileupload, trainNo, coachno) {

    var formData = new window.FormData();

    //var file = $('#' + frmctrlID).prop("files")[0];

    //var genregNo = sessionStorage.getItem('hdnvehicleID');

    formData.append("file", "");

    formData.append("Trainno", trainNo);

    formData.append("CoachNo", coachno);
    formData.append("UploadFor", "App");
    formData.append("appimg", fileupload);
    alert(JSON.stringify(formData));
    $.ajax({
        type: 'POST',
        url: "http://66.199.232.34/TMSAPI/ConfigureFileAttachment.ashx",

        data: formData,

        processData: false,

        contentType: false,

        success: function (data) {
            bootbox.alert("Data Saved Successfully. No need To worry!");
        },

        error: function () {

            bootbox.alert("Attachment error.");

        }

    });
}