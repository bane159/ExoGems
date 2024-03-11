var TOPSELLERS;
window.onload = () => {


    $("#sortCriterium").on("change", () => {
        displayProcuts(TOPSELLERS)
        
    })

    
    $("#saveSort").on("change", () => {
        let checked  = document.querySelector("#saveSort").checked
        if(checked){
            setLS("sort", $("#sortCriterium").val())
        }
    })
    let search = $("#searchBar")
    search.on("keyup", () => {
        displayProcuts(TOPSELLERS)
    })

}


// fetch("data/products.json").then(data => data.json()).then(products => {

//     $("body").css("overflow", "scroll")
//     console.log(products);
// })
    
Promise.all([
    fetch("data/products.json").then(prod => prod.json()),
    fetch("data/topSellers.json").then(topSellers => topSellers.json()),
])
.then(([prod, topsellers]) => {


     TOPSELLERS = prod.filter(x => topsellers.some( t => t.id == x.id))
   
    

    console.log(prod);
    console.log(topsellers);

    console.log(TOPSELLERS);

    TOPSELLERS = sortLs(TOPSELLERS)

    displayProcuts(TOPSELLERS)

});


function displayProcuts(data){

    data = sortedData(data);

    data = searchedData(data);
    console.log(data);

    

    let html = ""

    for (const product of data) {

        html += `<div class="col-md-6 col-lg-4">
        <div class="card text-center card-product">
          <div class="card-product__img">
            <img class="card-img" src="${product.img.src}" alt="${product.img.alt}">
            <ul class="card-product__imgOverlay">
              <li><button class = "addToCard" data-id="${product.id}"><i class="ti-shopping-cart"></i></button></li>
              <li><button><i class="ti-heart"></i></button></li>
            </ul>
          </div>
          <div class="card-body">
            <p>${product.category}</p>
            <h4 class="card-product__title"><a href="#">${product.text}</a></h4>
            <del class = "card-product__price br-sm-text">$${product.old_price} </del>
            <p class="card-product__price">$${product.price}</p>
          </div>
        </div>
        </div>`
    }

// console.log(document.querySelector("#shop-products"));
    document.querySelector("#shop-products").innerHTML = html

}


function sortedData(data){

    let sortData = data;
    let sortCrit = $("#sortCriterium")
    let ls = getLS("sort")
 
   
    if(sortCrit.val() == "priceAsc"){
        sortData.sort((x,b) => x.price - b.price)
        console.log('asc');
    }
    if(sortCrit.val() == "priceDesc"){
        console.log("desc");
        sortData.sort((x,b) => b.price - x.old_price )
    }
    if(sortCrit.val() == "popularity"){
        console.log("desc");
        sortData.sort((x,z) => x.unitsSold - z.unitsSold  )
    }
    return sortData
}

function setLS(key, value){
    localStorage.setItem(key, value)
}
function getLS(key) {
    return localStorage.getItem(key)
  }



function sortLs(data){
   
    let sortData = data;
    let ls = getLS("sort")
    if(ls){
        if(ls == "priceAsc"){
            sortData.sort((x,b) => x.price - b.price)
            console.log('asc');
        }
        if(ls == "priceDesc"){
            console.log("desc");
            sortData.sort((x,b) => b.price - x.old_price )
        }
        if(ls == "popularity"){
            console.log("desc");
            sortData.sort((x,z) => x.unitsSold - z.unitsSold  )
        }
        console.log("SACUVANo");
    }
    return sortData
  }

function searchedData(data){
    let search = $("#searchBar")
    
        let val = search.val().trim() 
        console.log(val);
        // val = val.toLowerString()
        if(val){
            console.log(val);
            let searchedData = data.filter(x => x.keywords.includes(val))
            console.log(searchedData);
            return searchedData

        }
   

    return data
}