function onLoad() {
    formvalidate();
}

sessionStorage.clear();
function formvalidate() {
    var form = $("#frmlogin");

    form.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // do not focus the last invalid input

        rules: {

            
            txtuserLoginid: {
                required: true

            },
            txtuserLoginpwd: {
                required: true,
                email: true
            },
           

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
            

            userLogin();
        }
    });
}


function userLogin() {

    //alert(JSON.stringify(data))
    jQuery.ajax({
        contentType: "application/json; charset=utf-8",
        url: allurlapi + "Login/ValidateUser?LoginID=" + $("#txtuserLoginid").val() + "&Password=" + $("#txtuserLoginpwd").val(),
        type: "GET",
        cache: false,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            //alert(JSON.stringify(data));
            if (data[0].Validuser == 'Y') {
                sessionStorage.setItem('SupervisorID', data[0].SupervisorID);
                sessionStorage.setItem('Name', data[0].SupervisorName);
                //sessionStorage.setItem('UType', data[0].UserType);
                //$("#otpEnter").modal('show');
                window.location.href="dashboard.html"
            }
            else if (data[0].Validuser == 'N') {
                $("#diverrlogin span").html('Not a valid user.!');
                $("#diverrlogin").show();
                $('#diverrlogin').fadeOut(7000)
            }
        }

    });
}
