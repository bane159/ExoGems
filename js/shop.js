var PRODUCTS;
var cartItemCount;

window.onload = () => {

  

    $("#sortCriterium").on("change", () => {
        displayProduts(PRODUCTS)
        cartInit();
    })
    // document.querySelector("")
    $("input[name*='category']").on("click",  () => {
      displayProduts(PRODUCTS)
      cartInit();

    })
    $("input[name*='material']").on("click", ()=>{
      displayProduts(PRODUCTS)
      cartInit();
    })
    $("#searchBar").on("keyup", () =>{
      console.log("KURAC")
      displayProduts(PRODUCTS)
      cartInit();
    })
    $("#initSeatchBtn").on("click", () => {
      displayProduts(PRODUCTS)
      cartInit();
    })
    // $("#cartButton").on("click", () => window.location = "cart.html");
    

    if(!getLS('cart')){
      document.querySelector("#cartNumberOfProducts").innerHTML = "0"
    }
    else getCartNumber()
    

}

fetch('data/products.json').then(data => data.json())// /data/products.json
                              .then(products => {

                                  document.querySelector("#spinner-holder").remove()
                                  // document.getElementsByTagName("body").style = "overflow: scroll!important;"
                                  $("body").css("overflow", "scroll")
                                    PRODUCTS = products
                                    displayProduts(products)
                                    calculateNumberOfCategories(products)


                                    // if(getLS("cart"))
                                    //    getCartNumber()                                    
                                    cartInit();

                                    
                                    

                              })
                              .catch(x => console.log(x.message));


  function cartInit() {
    let cartBtns = document.getElementsByClassName("addToCard")
    console.log(cartBtns)
        for (let i of cartBtns) {
            console.log(i)
            i.addEventListener("click", (e) => {
              e.preventDefault()
              // console.log("START")
              let modal = document.getElementById("br-appear-modal")
              let productId = $(i).data("id")
              modal.innerHTML = `<p>Added ${PRODUCTS.find(x => x.id == parseInt($(i).data("id"))).name} to cart!</p>`
                modal.classList.add('animAppear');
                setTimeout( () => {
                  modal.classList.remove('animAppear');
                }, 1000)
               
                console.log(productId)
                
                if(getLS('cart')){
                  let cart = getLS('cart');
      
                  if(cart.find(c => c.id == productId)){
                      let product = cart.find(c => c.id == productId)
                      product.quantity++;
                  }else{
                      let newItem = {
                          id: productId,
                          quantity: 1
                      }
                      cart.push(newItem)
                  }
                  setLS('cart', cart);
              }else{ //set for the first time
                  let item = {
                      id: productId,
                      quantity: 1
                  }
      
                  setLS('cart', [item])
              }
              getCartNumber()   

            })
          }

}


function getCartNumber(){
  cartItemCount = getLS('cart').length
  document.querySelector("#cartNumberOfProducts").innerHTML = cartItemCount
}
function getLS(name){
  return JSON.parse(localStorage.getItem(name))
}

function setLS(name, value){
  localStorage.setItem(name, JSON.stringify(value)) 
}


function displayProduts(data){
let html = ''
// data = filter(data)
    data = sortedData(data)
    data = filteredDataCategories(data)
    data = filteredDataMaterials(data)
    data = seatchedData(data)
    if(data.length == 0){

      document.querySelector("#shop-products").innerHTML = 
      `

      <div class="br-custom-none">
        <div class="br-custom-none-content">
          <h2> Sorry :(</h2>
          
          <p> For selected criteria there are none items. </p>
        </div>
      </div>

      `
      
      return
    }

    for(let x of data){
        html += `<div class="col-md-6 col-lg-4">
        <div class="card text-center card-product">
          <div class="card-product__img">
            <img class="card-img" src="${x.img.src}" alt="${x.img.alt}">
            <ul class="card-product__imgOverlay">
              <li><button class = "addToCard" data-id="${x.id}"><i class="ti-shopping-cart"></i></button></li>
              <li><button><i class="ti-heart"></i></button></li>
            </ul>
          </div>
          <div class="card-body">
            <p>${x.category}</p>
            <h4 class="card-product__title"><a href="#">${x.text}</a></h4>
            <del class = "card-product__price br-sm-text">$${x.old_price} </del>
            <p class="card-product__price">$${x.price}</p>
          </div>
        </div>
        </div>`
    }
    // document.querySelector("#shop-products").insertAdjacentHTML("afterbegin", html);
    document.querySelector("#shop-products").innerHTML = html;



}




function sortedData(data){
    let sortedData = [...data]
    let sortCriterium = document.querySelector("#sortCriterium")
    if(sortCriterium.value == 'priceAsc'){
        sortedData.sort((a,b) => a.price - b.price)
    }
    if(sortCriterium.value == 'priceDesc'){
        sortedData.sort((a,b) => b.price - a.price)
    }
    if(sortCriterium.value == 'popularity'){
      sortedData.sort((a,b) => b.unitsSold - a.unitsSold)
    }
    
    return sortedData
    
    
}

function filteredDataCategories(data){
  let filterCriteriums = $("input[name*='category']")
  let checkedValue;
  let filteredData = data;
  // console.log(filterCriteriums)
  for(let f of filterCriteriums){
    if(f.checked){
      checkedValue = f.value
      console.log(checkedValue)
    }
  }
  if(checkedValue == "Beauty"){
    filteredData = data.filter(x => x.category == "Beauty")
    $("#goldNumber").html(`(${data.filter(x => x.material == "gold" && x.category == "Beauty").length})`)
    $("#silverNumber").html(`(${data.filter(x => x.material == "silver" && x.category == "Beauty").length})`)
    $("#leatherNumber").html(`(${data.filter(x => x.material == "leather" && x.category == "Beauty").length})`)
  }
  if(checkedValue == "Elegant"){
    filteredData = data.filter(x => x.category == "Elegant")
    $("#goldNumber").html(`(${data.filter(x => x.material == "gold" && x.category == "Elegant").length})`)
    $("#silverNumber").html(`(${data.filter(x => x.material == "silver" && x.category == "Elegant").length})`)
    $("#leatherNumber").html(`(${data.filter(x => x.material == "leather" && x.category == "Elegant").length})`)
  }
  if(checkedValue == "Luxurious"){
    filteredData = data.filter(x => x.category == "Luxurious")
    $("#goldNumber").html(`(${data.filter(x => x.material == "gold" && x.category == "Luxurious").length})`)
    $("#silverNumber").html(`(${data.filter(x => x.material == "silver" && x.category == "Luxurious").length})`)
    $("#leatherNumber").html(`(${data.filter(x => x.material == "leather" && x.category == "Luxurious").length})`)
  }
  if(checkedValue =="All"){
    $("#goldNumber").html(`(${data.filter(x => x.material == "gold").length})`)
    $("#silverNumber").html(`(${data.filter(x => x.material == "silver").length})`)
    $("#leatherNumber").html(`(${data.filter(x => x.material == "leather").length})`)


    return filteredData
  }
  return filteredData;
}

function filteredDataMaterials(data) { 
  let filterCriteriums = $("input[name*='material']")
  let checkedValue;
  let filteredData = data;
  
  for(let f of filterCriteriums){
    if(f.checked){
      checkedValue = f.value
      console.log(checkedValue)
    }
  }
  if(checkedValue == "gold"){
    filteredData = data.filter(x => x.material == "gold")
    $("#goldNumber").html(`(${filteredData.length})`)
  }
  if(checkedValue == "silver"){
    filteredData = data.filter(x => x.material == "silver")
    $("#silverNumber").html(`(${filteredData.length})`)
  }
  if(checkedValue == "leather"){
    filteredData = data.filter(x => x.material == "leather")
    $("#leatherNumber").html(`(${filteredData.length})`)
  }
  if(checkedValue =="AllMat"){
    return filteredData
  }

  return filteredData
 }


function seatchedData(data) {  
  let keyword = $("#searchBar").val()
  if(keyword){
    keyword = keyword.toLocaleLowerCase()
    keyword = keyword.trim()
    let searchedData = data.filter(x => x.keywords.includes(keyword))
    return searchedData
  }
  return data;
}



















function calculateNumberOfCategories(PRODUCTS){
  let nodes = PRODUCTS.filter(x => x.category == "Beauty")
  br = 0;
  for (let i of nodes) {
    br++
  }
  document.querySelector("#BeautyNumber").innerHTML = `(${br})`
  br = 0;
  nodes = PRODUCTS.filter(x => x.category == "Elegant")
  for (let i of nodes) {
    br++
  }
  document.querySelector("#ElegantNumber").innerHTML = `(${br})`
  br = 0;
  nodes = PRODUCTS.filter(x => x.category == "Luxurious")
  for (let i of nodes) {
    br++
  }
  document.querySelector("#LuxuriousNumber").innerHTML = `(${br})`
  nodes = PRODUCTS
  br = 0
  for (let i of nodes) {
    br ++
  }
  document.querySelector("#AllNumber").innerHTML = `(${br})`
  // console.log(PRODUCTS.forEach(element => {
  //   element
  // }))
}