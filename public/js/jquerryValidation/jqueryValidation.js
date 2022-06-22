

$(function () {

    $("form[name='registration']").validate({

        rules: {

            firstname: "required",


        },
        // Specify validation error messages
        messages: {
            firstname: "Please enter your firstname",

        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });
});


