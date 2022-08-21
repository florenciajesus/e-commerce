const CARS_URL = `${PRODUCTS_URL}101${EXT_TYPE}`;

let carsArray = [];

function showCarsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let car = array[i];
        
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${car.image}" alt="${car.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4 class="mb-1">${car.name} - ${car.currency} ${car.cost}</h4>
                            <p> `+ car.description + `</p> 
                            </div>
                            <small class="text-muted">` + car.soldCount + ` artículos</small> 
                        </div>
                    </div>
                </div>
            </div>
        ` 
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; 
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carsArray = resultObj.data;
            showCarsList(carsArray.products);
        }
    });
});

