let productName = document.getElementById('productName')
let productPrice = document.getElementById('productPrice')
let productCategory = document.getElementById('productCategory')
let productDesc = document.getElementById('productDesc')

let products = [];
let isUpdate = 0;
let updateIndex = 0;

if (localStorage.getItem('Products') != null) {
    products = JSON.parse(localStorage.getItem('Products'));
    displayProducts();
}

function addProduct() {

    if (validationProdName() && valaidationProdPrice()
        && valaidationProdCategory() && valaidationProdDesc()) {
        let product = {
            prodName: productName.value,
            prodPrice: productPrice.value,
            prodCategory: productCategory.value,
            prodDescription: productDesc.value,
        }
        if (isUpdate == 0) {
            products.push(product);
            displayProducts();
            clearForm();
        }
        else {
            products[updateIndex].prodName = productName.value;
            products[updateIndex].prodPrice = productPrice.value;
            products[updateIndex].prodCategory = productCategory.value;
            products[updateIndex].prodDescription = productDesc.value;
            document.getElementById('add-button').innerHTML = 'Add Product';
            displayProducts();
            clearForm();
            updateIndex = 0;
            isUpdate = 0;
        }
        localStorage.setItem('Products', JSON.stringify(products))
    }
    else {
        alert('please enter valid information')
    }





}

function displayProducts() {
    let x = ``;
    for (let i = 0; i < products.length; i++) {
        x +=
            `<tr>
            <td>${i + 1}</td>
    <td>${products[i].prodName}</td>
    <td>${products[i].prodPrice} $</td>
    <td>${products[i].prodCategory}</td>
    <td>${products[i].prodDescription}</td>
    <td><button class="btn-sm border-danger" onclick="update(${i})">Update</button></td>
    <td><button class="btn-sm border-success" onclick="deleteProduct(${i})">Delete</button></td>
</tr>`
    }
    document.getElementById('tableBody').innerHTML = x;
}


function clearForm() {
    productName.value = ''
    productPrice.value = ''
    productCategory.value = ''
    productDesc.value = ''
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('Products', JSON.stringify(products))
    displayProducts();
}

function update(index) {
    productName.value = products[index].prodName;
    productPrice.value = products[index].prodPrice;
    productCategory.value = products[index].prodCategory;
    productDesc.value = products[index].prodDescription;
    document.getElementById('add-button').innerHTML = 'Update Product';
    isUpdate = 1;
    updateIndex = index;
    localStorage.setItem('Products', JSON.stringify(products))

}

function validationProdName() {
    let regx = /^[A-Z][a-zA-Z]{3,6}$/
    if (regx.test(productName.value)) {
        document.getElementById('productName').classList.remove('is-invalid')
        document.getElementById('productName').classList.add('is-valid')
        document.getElementById('productName').nextElementSibling.classList.add('d-none')
        return true

    }
    else {
        document.getElementById('productName').classList.add('is-invalid')
        document.getElementById('productName').classList.remove('is-valid')
        document.getElementById('productName').nextElementSibling.classList.remove('d-none')
        return false
    }

}

function valaidationProdPrice() {
    let regx = /^([1-9][0-9][0-9]|1000)$/
    if (regx.test(productPrice.value)) {
        document.getElementById('productPrice').classList.remove('is-invalid')
        document.getElementById('productPrice').classList.add('is-valid')
        document.getElementById('productPrice').nextElementSibling.classList.add('d-none')

        return true
    }
    else {
        document.getElementById('productPrice').classList.add('is-invalid')
        document.getElementById('productPrice').classList.remove('is-valid')
        document.getElementById('productPrice').nextElementSibling.classList.remove('d-none')
        return false
    }

}

function valaidationProdCategory() {
    let regx = /^([mM][oO][bB][iI][lL][eE]|[Tt][Vv]|[Dd][eE][Vv][iI][Cc][eE])$/
    if (regx.test(productCategory.value)) {
        document.getElementById('productCategory').classList.remove('is-invalid')
        document.getElementById('productCategory').classList.add('is-valid')
        document.getElementById('productCategory').nextElementSibling.classList.add('d-none')
        return true

    }
    else {
        document.getElementById('productCategory').classList.add('is-invalid')
        document.getElementById('productCategory').classList.remove('is-valid')
        document.getElementById('productCategory').nextElementSibling.classList.remove('d-none')
        return false
    }

}

function valaidationProdDesc() {
    let regx = /^[A-Za-z]{0,500}$/
    if (regx.test(productDesc.value)) {
        document.getElementById('productDesc').classList.remove('is-invalid')
        document.getElementById('productDesc').classList.add('is-valid')
        document.getElementById('productDesc').nextElementSibling.classList.add('d-none')
        return true

    }
    else {
        document.getElementById('productDesc').classList.add('is-invalid')
        document.getElementById('productDesc').classList.remove('is-valid')
        document.getElementById('productDesc').nextElementSibling.classList.remove('d-none')
        return false
    }

}


function searchProduct(text) {
    let y = ``
    for (let i = 0; i < products.length; i++) {
        if (products[i].prodName.toLowerCase().includes(text.toLowerCase())) {
            y +=
                `<tr>
            <td>${i + 1}</td>
    <td>${products[i].prodName}</td>
    <td>${products[i].prodPrice} $</td>
    <td>${products[i].prodCategory}</td>
    <td>${products[i].prodDescription}</td>
    <td><button class="btn-sm border-danger" onclick="update(${i})">Update</button></td>
    <td><button class="btn-sm border-success" onclick="deleteProduct(${i})">Delete</button></td>
</tr>`

        }
       
    }
    document.getElementById('tableBody').innerHTML = y;

}

