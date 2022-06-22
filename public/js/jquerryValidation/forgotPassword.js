// // $(function() {
// //     $("#emailForm").validate({
// //         errorClass:"error",
// //      rules:{
// //          email:{
// //             required:true,
// //             email:true
// //         }   
// //      },
// //      messages:{       
// //          email:{
// //              required:"Please enter your email id",
// //              email:"Enter a valid email"
// //          },
// //      }
// //     }) 
// // })


//     // ​jQuery(function() { })

//     // $(document).ready(function(){
//     //     $("#emailForm").validate({
//     //         errorClass:"error",
//     //      rules:{
//     //          email:{
//     //             required:true,
//     //             email:true
//     //         }      
//     //      },
//     //      messages:{       
//     //          email:{
//     //              required:"Please enter your email id",
//     //              email:"Enter a valid email"
//     //          },
//     //      }
//     //     }) 
//     // })


//     // Wait for the DOM to be ready
// $(function() {
//     // Initialize form validation on the registration form.
//     // It has the name attribute "registration"
//     $("form[name='emailForm']").validate({
//       // Specify validation rules
//       rules: {
//         // The key name on the left side is the name attribute
//         // of an input field. Validation rules are defined
//         // on the right side
      
//         email: {
//           required: true,
//           // Specify that email should be validated
//           // by the built-in "email" rule
//           email: true
//         }
       
//       },
//       // Specify validation error messages
//       messages: {
//         email: "Please enter a valid email address"
//       },
//       // Make sure the form is submitted to the destination defined
//       // in the "action" attribute of the form when valid
//       submitHandler: function(form) {
//         form.submit();
//       }
//     });
//   });
  