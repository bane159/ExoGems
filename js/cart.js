window.onload = () => {




// console.log("Uspeg");



}


Promise.all([
    
    fetch("data/products.json").then(data => data.json())
])
.then(([products]) => {

    setTimeout(() => {document.querySelector("#spinner-holder").remove()}, 10)
                                  // document.getElementsByTagName("body").style = "overflow: scroll!important;"
    $("body").css("overflow", "scroll")

    PRODUCTS = products;
    if(getLS('cart') == null){ //nema proizvoda u lc
        displayEmptyCart();

    }
    else{ //ima proizvoda u lc u cart
        displayCartProducts(PRODUCTS, getLS('cart'))

        changeQuantity()//apdejtuje ls nakon promene quantity 
        refreshCart() // rekurzivna funkcija za refreshovanje korpe.
        removeItemFromCart()
        // refreshCartAfterRemove()

       

        

    }


    $("#clearCart").on("click", () => {
        console.log("KKLICK")
        clearCart();
    })
   
}).catch(x => console.log(x))




function displayCartProducts(data, cart){
    document.querySelector("#cartItemsHolder").innerHTML = "" 
    var total = 0
    let html = 
    `
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
        </tr>
    </thead>
    <tbody>
    `;  

    for(let cartItem of cart){
            
        product = data.find(x => x.id == cartItem.id)
        html += 
        `
        <tr>
            <td>
                <div class="media">
                    <div class="d-flex">
                        <img src="${product.img.src}" alt="${product.img.alt}">
                    </div>
                    <div class="media-body">
                        <p id="textProduct">${product.text}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5 id="price">$${product.price}</h5>
            </td>
            <td>
                <div class="product_count">
                
                        <input type="number" maxlength="12" minlength="0" class="quantityInput"  data-id = "${product.id}" value="${cartItem.quantity}"/>
                </div>
            </td>
            <td>
                <h5 class="totalPrice">$${parseInt(product.price)  * parseInt(cartItem.quantity)}</h5>
            </td>
            <td>
            <button class="removeItem btn" data-id = "${product.id}"> <i class="fa-solid fa-x "></i> </button>
        </td>
        </tr>
        `
        total += parseInt(product.price)  * parseInt(cartItem.quantity)
        
    }
    console.log(total)
    html += `</tbody>`

    html +=
    `
    <tr>
                              <td>

                              </td>
                              <td>

                              </td>
                              <td>
                                  <h5>Subtotal</h5>
                              </td>
                              <td>
                                  <h5 id = "totalPrice">$${total}</h5>
                              </td>
                          </tr>
    `

    html += 
    `
    <tr class="out_button_area">
                              <td class="d-none-l">

                              </td>
                              <td class="">

                              </td>
                              <td>

                              </td>
                              <td>
                                  <div class="checkout_btn_inner d-flex align-items-center">
                                      <a class="gray_btn" href="category.html">Continue Shopping</a>
                                      <button id = "clearCart" class = "btn btn-primary">Clear Cart </button>
                                      <a class="primary-btn ml-2" href="#">Proceed to checkout</a>
                                  </div>
                              </td>
                          </tr>
                          
    `
    document.querySelector("#cartItemsHolder").innerHTML += html


}




function getLS(name){
    return JSON.parse(localStorage.getItem(name))
  }
  
  function setLS(name, value){
    localStorage.setItem(name, JSON.stringify(value)) 
  }
  
function clearCart(){
    localStorage.removeItem("cart")
    displayEmptyCart(PRODUCTS, getLS("cart"))
    document.querySelector("#cartNumberOfProducts").innerHTML = "0"
} 

function displayEmptyCart() {




   
        document.querySelector("#cartItemsHolder").innerHTML = "" 
        
        let html = 
        `
        <thead>
            <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th> There are no products in the cart </th>
            </tr>
       
        <tr class="out_button_area">
                              <td class="d-none-l">

                              </td>
                              <td class="">

                              </td>
                              <td>

                              </td>
                              <td>
                                  <div class="checkout_btn_inner d-flex align-items-center">
                                      <a class="primary-btn ml-2" href="category.html">Continue Shopping</a>
                                  </div>
                              </td>
                          </tr>

                          </tbody>
        `;  
    
        
                          
        
        document.querySelector("#cartItemsHolder").innerHTML += html
    
    
    
  }


  function changeQuantity() {

    let quantityBtns = document.querySelectorAll(".quantityInput")

    for(let btn of quantityBtns){
            

        btn.addEventListener("change", () => {
            let wholeCart = getLS("cart")
            console.log(wholeCart)
            let cartItemToChange = wholeCart.find(x => x.id == $(btn).data("id"))
            console.log(cartItemToChange)
         
            let val = btn.value

            if(val <= 0){
                btn.value = 1
            }
            
            console.log(val)
            cartItemToChange.quantity = parseInt(btn.value) //plitka kopija menja se svuda 
            console.log(cartItemToChange)
            console.log("CHANGE")
            console.log(wholeCart)

            localStorage.setItem('cart', JSON.stringify(wholeCart))
        })
        refreshCart()
        


    }

    
}



function  refreshCart(){ //Koriscenje rekurzije kako bi se uvek refresovali itemi nakon svake promene quantity da bi se refresh.
    let quantityBtns = document.querySelectorAll(".quantityInput")
    $(quantityBtns).on("blur",() => {
        displayCartProducts(PRODUCTS, getLS("cart"))
        changeQuantity()
        removeItemFromCart()
        refreshCart()
    })
}

function removeItemFromCart(){
    var removeFromCartBtns =  document.querySelectorAll(".removeItem")
    for (let item of removeFromCartBtns){
            item.addEventListener("click", () => {
            let wholeCart = getLS('cart')
            console.log(wholeCart)
            let productWithout = wholeCart.filter(x => x.id != $(item).data('id'))
            
            console.log(productWithout)
            if(productWithout.length > 0){
                setLS('cart', productWithout)
                displayCartProducts(PRODUCTS, getLS("cart"))
                refreshCartAfterRemove()
            }
            else{
                clearCart()
            }

            // if(getLS('cart') == null){ //nema proizvoda u lc
            //     displayEmptyCart();
        
            // }
            // else{
            //     displayCartProducts(PRODUCTS, getLS('cart'))
            // }
            
        })
    }
}
function refreshCartAfterRemove() {
    displayCartProducts(PRODUCTS, getLS("cart"))
    changeQuantity()
    removeItemFromCart()

    // refreshCartAfterRemove()
}