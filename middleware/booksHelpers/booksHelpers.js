// const getAllBooksDetails = async (req, res) => {



// }
// const processingCharge = async (paidAmount, noOfBooks) => {
//     if (paidAmount) {
//         const processingCharges = (paidAmount / noOfBooks) + 50;
//         return processingCharges
//     } else {
//         return 0
//     }
// }

// function calculatePrice(booksDetails) {
//     console.log(bookDetails);
//     if (booksDetails) {
//         const price = (booksDetails.totalPrice / booksDetails.stock) + booksDetails.processingCharge;
//         console.log(price, "price");
//         switch (price) {
//             case (price <= 50):
//                 return "donation"
//             case (price <= 100):
//                 return "processing Charge"
//             case (price <= 200):
//                 return "Delivery Charge"
//             case (price <= 500):
//                 return "Pay Amount"
//             default:
//                 return "free"
//         }
//     }
// }

// const calculateDeliveryPrice = async (booksDetails) => {
//     if (booksDetails) {

//     } else {

//     }


// }

// module.exports = {
//     calculatePrice,
//     processingCharge,
//     calculateDeliveryPrice,
//     getAllBooksDetails
// }