const togglePasswordEye = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

const toggleConfirmPasswordEye = document.querySelector("#toggleConfirmPassword");
const confirmPassword = document.querySelector("#confirmPassword");

togglePasswordEye.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("mdi mdi-eye");
});

toggleConfirmPasswordEye.addEventListener("click", function () {
    // toggle the type attribute
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("mdi mdi-eye");
});

$("#addToCart").hover(function () {

    $(this).css('cursor', 'pointer').attr('title', 'add to cart');
}, function () {
    $(this).css('cursor', 'auto')
})