const ORDER_ASC_BY_PRICE = "priceUp";
const ORDER_DESC_BY_PRICE = "priceDown";
const ORDER_BY_PROD_SOLD_COUNT = "Precio";
let products_url = "";
let currentProductsArray = [];
let subtitle = document.getElementById("subtitle-container");
let currentProductsSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let email = localStorage.getItem('email');

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_BY_PRICE)
    {
        result = array.products.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.products.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD_COUNT){
        result = array.products.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function getProductsUrl() {
    let catID = localStorage.getItem("catID");
    return products_url = `${PRODUCTS_URL}${catID}${EXT_TYPE}`;
}

function showProductsList(){
    subtitle.innerHTML = `Verás aquí todos los productos de la categoría <strong>${currentProductsArray.catName}</strong>`;
    
    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductsArray.products.length; i++){ 
        let product = currentProductsArray.products[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){
        
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                                <p> `+ product.description + `</p> 
                                </div>
                                <small class="text-muted">` + product.soldCount + ` artículos</small> 
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; 
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentProductsSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray.products = productsArray;
    }

    currentProductsArray.products = sortProducts(currentProductsSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(getProductsUrl()).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentProductsArray = resultObj.data;
            showProductsList();
        }
    });

    document.getElementById("navbarList").innerHTML += `<li class="nav-item"><a class="nav-link">${email}</a></li>`;

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minCount = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });
});
