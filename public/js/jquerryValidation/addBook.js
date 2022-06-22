
// // Wait for the DOM to be ready
// $(function () {
//     // Initialize form validation on the registration form.
//     // It has the name attribute "registration"
//     $("form[name='addBooks']").validate({
//         // Specify validation rules
//         rules: {
//             // The key name on the left side is the name attribute
//             // of an input field. Validation rules are defined
//             // on the right side
//             bookTitle: "required",
//             bookAuthor: "required",
//             ISBN: {
//                 required: true,
//                 // Specify that email should be validated
//                 // by the built-in "email" rule
//                 minlength: 10,
//                 maxlength: 10,
//             },

//         },
//         // Specify validation error messages
//         messages: {
//             bookTitle: "Please enter your bookTitle",
//             bookAuthor: "Please enter your bookAuthor",
//             ISBN: {
//                 required: "Please provide a password",
//                 minlength: "Your password must be at least 10 characters long",
//                 maxlength: "Your password must be at least 10 characters long",
//             }

//         },
//         // Make sure the form is submitted to the destination defined
//         // in the "action" attribute of the form when valid
//         submitHandler: function (form) {
//             form.submit();
//         }
//     });
// });