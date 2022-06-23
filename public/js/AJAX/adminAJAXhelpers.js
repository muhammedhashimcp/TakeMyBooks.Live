const addCategory = document.querySelector("#addCategory");
const addCategoryButton = document.querySelector("#addCategoryButton");
const selectCategory = document.querySelector("#categorySelect");
const deleteCategoryButton = document.querySelector("#deleteCategoryButton");
const selectCategory4Sub = document.querySelector("#selectCategory4Sub");
const addSubCategory = document.querySelector("#addSubCategory");
const addSubCategoryButton = document.querySelector("#addSubCategoryButton");
const selectCategory4Sub2 = document.querySelector("#selectCategory4Sub2");
const subCategoryOption = document.querySelector("#subCategoryOption");
const deleteSubCategoryButton = document.querySelector("#deleteSubCategoryButton");
const subCategorySelect1 = document.querySelector("#subCategorySelect");
const addLanguageButton = document.querySelector("#addLanguageButton");
const addLanguage = document.querySelector("#addLanguage");
const addPricingTypeButton = document.querySelector("#addPricingTypeButton");
const addPricingType = document.querySelector("#addPricingType");
const addVendorTypeButton = document.querySelector("#addVendorTypeButton");
const addVendorType = document.querySelector("#addVendorType");
// const selectCategory4SubAddBook = document.querySelector("#selectCategory4SubAddBook");

function containsNumber(str) {
    return /\d/.test(str);
}

function idMatch(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        return true
    } else {
        return false
    }
}


addCategoryButton.onclick = () => {
    const newCategory = addCategory.value
    if (newCategory == null || newCategory == "") {
        Swal.fire(
            "Oops!",
            "Category can't be blank!",
            'error'
        )
    } else if (typeof newCategory != 'string' && containsNumber(newCategory)) {
        Swal.fire("Oops!", "Not allowed any number in Category!", "error");
    } else {
        fetch("http://www.takemybooks.live/admin/addCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category: newCategory,
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data === true) {
                    // window.location.reload();
                    location.reload();
                }
                else if (data === false) {
                    Swal.fire("Opps!", "This category already in list", "error");
                }
            })
    }
    addCategory.value = "";
    return
}

deleteCategoryButton.onclick = () => {
    const categoryId = selectCategory.value
    if (!categoryId) {
        Swal.fire(
            "Oops!",
            "Category not selected to delete!",
            'error'
        )
    } else if (idMatch(categoryId)) {
        fetch(`http://www.takemybooks.live/admin/deleteCategory/${categoryId}`)
            .then((res) => res.json())
            .then((data) => {
                Swal.fire(
                    'Deleted!',
                    'Deleted Successfully!',
                    'success'
                )
            })
    }
    location.reload();
    categorySelect.value = "";
    return
}

addSubCategoryButton.onclick = () => {
    const newSubCategory = addSubCategory.value
    const categoryId = selectCategory4Sub.value
    if (newSubCategory == null || newSubCategory == "") {
        Swal.fire(
            "Oops!",
            "Sub-category field can't be blank!",
            'error'
        )
    } else if (!(typeof newSubCategory === 'string') && containsNumber(newSubCategory)) {
        Swal.fire("Oops!", "Not allowed any number in sub-category!", "error");
    } else if (idMatch(categoryId)) {
        fetch(`http://www.takemybooks.live/admin/addSubCategory/${categoryId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subCategory: newSubCategory,
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data === true) {
                    Swal.fire(
                        'Success!',
                        'subcategory Added Successfully!',
                        'success'
                    ).then(function () {
                        setTimeout(function () {
                            window.location.reload();
                        }, 500);
                    });

                }
                else if (data === false) {
                    Swal.fire("Opps!", "This Sub Category already in list", "error");
                }
            })
    }
    addSubCategory.value = "";
    return
}

deleteSubCategoryButton.onclick = () => {
    deleteSubCategory()
}

displaySubCategory = () => {
    subCategorySelect4Delete.value = "";
    const categoryId = selectCategory4Sub2.value
    console.log("called");
    console.log(categoryId);
    if (categoryId == null || categoryId == "") {
        Swal.fire(
            "Oops!",
            "Category can't be blank!",
            'error'
        )
    }
    fetch(`http://www.takemybooks.live/admin/displaySubCategory/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
            select = document.getElementById('subCategorySelect4Delete');
            data.subCategories.forEach((subCategory) => {
                var opt = document.createElement('option');
                opt.value = subCategory._id;
                opt.id = "subCategoryOption"
                opt.innerHTML = subCategory.subCategory;
                select.appendChild(opt);
            });
        })
    Swal.fire('Correct!', 'select a subcategory to delete!', 'success')
    return
}


function checkCategorySelect() {
    const categoryId = selectCategory4Sub2.value
    if (categoryId) {
        return
    } else {
        Swal.fire(
            "Oops!",
            "Category can't be blank!",
            'error'
        )
    }
}

deleteSubCategory = () => {
    const categoryId = selectCategory4Sub2.value
    const subCategoryId = subCategorySelect4Delete.value

    if (categoryId == null || categoryId == "" || subCategoryId == null || subCategoryId == "") {
        Swal.fire(
            "Oops!",
            "Category or sub category can't be blank!",
            'error'
        )
    } else {
        fetch(`http://www.takemybooks.live/admin/deleteSubCategory/${subCategoryId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                categoryId: categoryId,
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data) {
                } else {
                }
            })
        subCategorySelect4Delete.value = "";
        return
    }
}


addLanguageButton.onclick = () => {
    const newLanguage = addLanguage.value
    if (newLanguage == null || newLanguage == "") {
        Swal.fire(
            "Oops!",
            "Category can't be blank!",
            'error'
        )
    } else if (typeof newLanguage != 'string' && containsNumber(newLanguage)) {
        Swal.fire("Oops!", "Not allowed any number in Language!", "error");
    } else {
        fetch("http://www.takemybooks.live/admin/addLanguage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language: newLanguage,
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data === true) {
                    Swal.fire(
                        'Success!',
                        'New Language Added Successfully!',
                        'success'
                    )
                }
                else if (data === false) {
                    Swal.fire("Opps!", "This Language already in list", "error");
                }
            })
    }
    addLanguage.value = "";
    return
}

addPricingTypeButton.onclick = () => {
    const newPricingType = addPricingType.value
    if (newPricingType == null || newPricingType == "") {
        Swal.fire(
            "Oops!",
            "Pricing Type can't be blank!",
            'error'
        )
    } else if (typeof newPricingType != 'string' && containsNumber(newPricingType)) {
        Swal.fire("Oops!", "Not allowed any number in Pricing type!", "error");
    } else {
        fetch("http://www.takemybooks.live/admin/addPricingType", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pricingType: newPricingType,
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data === true) {
                    Swal.fire(
                        'Success!',
                        'Pricing Type Added Successfully!',
                        'success'
                    )
                }
                else if (data === false) {
                    Swal.fire("Opps!", "This Language already in list", "error");
                }
            })
    }
    addPricingType.value = "";
    return
}

addVendorTypeButton.onclick = () => {
    const newVendorType = addVendorType.value
    if (newVendorType == null || newVendorType == "") {
        Swal.fire(
            "Oops!",
            "Vendor Type can't be blank!",
            'error'
        )
    } else if (typeof newVendorType != 'string' && containsNumber(newVendorType)) {
        Swal.fire("Oops!", "Not allowed any number in Category!", "error");
    } else {
        fetch("http://www.takemybooks.live/admin/addVendorType", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                vendorType: newVendorType,
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data === true) {
                    Swal.fire(
                        'Success!',
                        'New Vendor Type Added Successfully!',
                        'success'
                    )
                }
                else if (data === false) {
                    Swal.fire("Opps!", "This Vendor Type already in list", "error");
                }
            })
    }
    addVendorType.value = "";
    return
}





