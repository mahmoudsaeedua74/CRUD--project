
// // start of selected element from HTML
var productNameInpu = document.getElementById("productname");
var productPriceInput = document.getElementById("productprice");
var productCategoryInput = document.getElementById("productcategory");
var productDescriptionInput = document.getElementById("productdescription");
var productImageInput = document.getElementById("productimge");
var containerproducts = document.getElementById("containerproducts")
var defualtOptin = document.getElementById("defualtOptin");
var addproductsToInput = document.getElementById("addProducts")
var updataproductsToInput = document.getElementById("updataproducts")
var prdouctsOfIndex

// // end of selected element from HTML

//i make arry to puch data  atfer that i need to make condtion to ask broser if there any loca display it first 
var productList = [];
if (localStorage.getItem("ourProducts")) {
    productList = JSON.parse(localStorage.getItem("ourProducts"))
    displayProductsList(productList)
}


//i make button to add products so i make object with ant kay and the name is the selected var i do with value i want from user 
//then i push this value in arry 
function addProduct() {
    if (    isVaildPrdoucts(productNameInpu, PrdouctNameRegex) &
            isVaildPrdoucts(productPriceInput, productpriceinputRegex) &
            isVaildPrdoucts(productCategoryInput, productcategoryinputRegex) &
            isVaildPrdoucts(productDescriptionInput, productdescriptionnputRegex) &
            isVaildPrdouctImage()
        ) {
    var products = {
        prdouctName: productNameInpu.value,
        prdouctPriec: productPriceInput.value,
        prdouctCategory: productCategoryInput.value,
        prdoucttDescrip: productDescriptionInput.value,
        prdouctImage: productImageInput.files[0].name

    }
    productList.push(products);
    console.log(productList)
    displayProductsList(productList)
    restProducts()
    localStorage.setItem("ourProducts", JSON.stringify(productList)) // to save my data in local and for save array i need to make it string first 
}
    else {
                alert("this is invaild")
            }
}
// i make display for item i puch the div in empty sring with the vakye
function displayProductsList(arr) {
    var conteinerelmen = ''
    for (var i = 0; i < arr.length; i++) {
        conteinerelmen += `    <div class="col">
     <div class=" border shadow-sm  px-3 py-2">
       <div class="photo mb-3 ">  
       <img src="./image/${arr[i].prdouctImage}" class="w-100 h-100 object-fit-contain" alt="">
       </div>
       <h3>${arr[i].prdouctName}</h3>
       <p>${arr[i].prdouctPriec}</p>
       <p>${arr[i].prdouctCategory}</p>
       <p>${arr[i].prdoucttDescrip}</p>
     <div class="text-end">
        <i onclick="deletProducts(${i})"  class="fa-solid fa-trash-can fa-shake fs-5  text-danger"></i>
         <i  onclick="moveUpData(${[i]})" class="fa-solid fa-pen-to-square fa-shake fs-5 text-success"></i> </div>
     </div>
    </div>
    `;

    }
    containerproducts.innerHTML = conteinerelmen
}
//reset all item after add 
function restProducts() {
    productNameInpu.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    defualtOptin.selected = true;
    productImageInput.value = null;
    productNameInpu.classList.remove("is-valid", "is-invalid");
    productPriceInput.classList.remove("is-valid", "is-invalid");
    productCategoryInput.classList.remove("is-valid", "is-invalid");
    productDescriptionInput.classList.remove("is-valid", "is-invalid");
    productImageInput.classList.remove("is-valid", "is-invalid");
}

//make delet button with pramter from i 
function deletProducts(deletInext) {
    productList.splice(deletInext, 1)
    localStorage.setItem("ourProducts", JSON.stringify(productList))
    displayProductsList(productList)
}

//for serch item i nee new arry to puch it new data what i serch
// i make pramter that i send it from html and serch in arrry is that indlced it of no if yes then i puch in my new arry
// after that display new arry
function searchByProducts(term) {
    var filteredProduct = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].prdouctName.toLowerCase().includes(term.toLowerCase()) == true) {

            filteredProduct.push(productList[i])
        }

    }
    displayProductsList(filteredProduct)
}
// i need to put in uptat my data move up and diplay new button
function moveUpData(index) {

        productNameInpu.value = productList[index].prdouctName
        productPriceInput.value =productList[index].prdouctPriec
        productCategoryInput.value =productList[index].prdouctCategory
        productDescriptionInput.value =productList[index].prdoucttDescrip
        addproductsToInput.classList.replace("d-block", "d-none")
        updataproductsToInput.classList.replace("d-none", "d-block")
        prdouctsOfIndex = index;

}
// atfer move data to up i can updata it and click to updata and after that displau a new prdocucts
function updataProduct() {
    if (    isVaildPrdoucts(productNameInpu, PrdouctNameRegex) &
    isVaildPrdoucts(productPriceInput, productpriceinputRegex) &
    isVaildPrdoucts(productCategoryInput, productcategoryinputRegex) &
    isVaildPrdoucts(productDescriptionInput, productdescriptionnputRegex) 
    
)
   {
     productList[prdouctsOfIndex].prdouctName= productNameInpu.value
    productList[prdouctsOfIndex].prdouctPriec=  productPriceInput.value
    productList[prdouctsOfIndex].prdouctCategory= productCategoryInput.value 
    productList[prdouctsOfIndex].prdoucttDescrip=  productDescriptionInput.value
    if (productImageInput.files.length!=0){
        productList[prdouctsOfIndex].prdouctImage=  productImageInput.files[0].name
    }
    localStorage.setItem("ourProducts", JSON.stringify(productList))
    displayProductsList(productList)
    restProducts()
    addproductsToInput.classList.replace("d-none", "d-block")
    updataproductsToInput.classList.replace("d-block", "d-none")
}
}
//regex 
var PrdouctNameRegex =/^[A-Z].+/;
var productpriceinputRegex =/^[^--0]\d+$/;
var productcategoryinputRegex =/^Mobile phone|laptop|camera|printer|tv$/;
var productdescriptionnputRegex = /^.{5,}$/;

function isVaildPrdoucts(elemnt, regex) {
    if (regex.test(elemnt.value) == true) {
        elemnt.classList.add("is-valid");
        elemnt.classList.remove("is-invalid");
        elemnt.nextElementSibling.classList.replace("d-block", "d-none")
        return true;
    }
    else {
        elemnt.classList.add("is-invalid");
        elemnt.classList.remove("is-valid");
        elemnt.nextElementSibling.classList.replace("d-none", "d-block")
        return false;
    }
}

function isVaildPrdouctImage() {

    if (productImageInput.files.length != 0) {
        productImageInput.nextElementSibling.classList.replace("d-block", "d-none")
        return true;
    }
    else {
        productImageInput.nextElementSibling.classList.replace("d-none", "d-block")
        return false;
    }
}