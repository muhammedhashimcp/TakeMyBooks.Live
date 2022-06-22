const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
const confirmPassword = document.querySelector("#confirmPassword");

togglePassword.addEventListener("click", function() {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("mdi mdi-eye");
});

toggleConfirmPassword.addEventListener("click", function() {
    // toggle the type attribute
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("mdi mdi-eye");
});

$("#addToCart").hover(function(){

    $(this).css('cursor', 'pointer').attr('title', 'add to cart');
},function(){
    $(this).css('cursor', 'auto')
})