
const cors = require("cors");

const input = document.querySelector("input");
const addToCartButton = document.querySelector("button");
const addWishLIstButton = document.querySelector("button");
const detailsContainer = document.querySelector(".details");


// addUserButton.onclick = () => {
//     fetch("http://localhost:3001/addUser", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             id: Date.now(),
//             name: input.value,
//         }),
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             displayUser();
//         });

//     input.value = "";
// };

// function getAllCount() {
//     fetch(`http://localhost:3000/user/getAllCount`)
//         .then((res) => res.json())
//         .then((data) => {
//             document.getElementById("myDIV").style.display = "none";
//         })
// }
