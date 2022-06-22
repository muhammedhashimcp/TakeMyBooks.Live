const cartCount = document.querySelector("#cartCount");


function addToCart(bookId) {
    console.log("called");
    // document.getElementById('cartCount').innerHTML = 100;
    // const count = document.getElementById('cartCount').innerHTML
    // console.log(count);
    console.log(bookId);
    fetch(`http://localhost:3000/user/addToCart/${bookId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                // document.getElementById("myDIV").style.display = "none";
                document.getElementById('cartCount').innerHTML = data.count;
                Swal.fire(
                    'Success!',
                    'Books Added into Cart Successfully!',
                    'success'
                )
            } else {
                top.location.href = "/user/userLogin";
                return
            }
        })
    return
}

function addToWishList(bookId) {
    console.log("called");
    console.log(bookId);
    fetch(`http://localhost:3000/user/addToWishList/${bookId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                document.getElementById('cartCount').value = data.cartCount;
                Swal.fire(
                    'Success!',
                    'Books Add into Cart Successfully!',
                    'success'
                )
            } else {
                console.log("redirection success");
                top.location.href = "/user/userLogin";
            }
        })
    return
}

function addToGift(bookId) {
    console.log("called");
    console.log(bookId);
    fetch(`http://localhost:3000/user/addToGift/${bookId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                document.getElementById('cartCount').value = data.cartCount;
                Swal.fire(
                    'Success!',
                    'Books Add into Cart Successfully!',
                    'success'
                )
            } else {
                console.log("redirection success");
                top.location.href = "/user/userLogin";
            }
        })
    return
}

function getBookDetails(bookId) {
    console.log("called");
    // document.getElementById('cartCount').innerHTML = 100;
    // const count = document.getElementById('cartCount').innerHTML
    // console.log(count);
    console.log(bookId);
    fetch(`http://localhost:3000/user/getBookDetails/${bookId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                // document.getElementById("myDIV").style.display = "none";
                document.getElementById('cartCount').innerHTML = data.count;
                Swal.fire(
                    'Success!',
                    'Books Added into Cart Successfully!',
                    'success'
                )
            } else {
                top.location.href = "/user/userLogin";
                return
            }
        })
    return
}