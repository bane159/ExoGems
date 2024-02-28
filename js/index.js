// $(function() {
//   "use strict";

//   //------- Parallax -------//
//   skrollr.init({
//     forceHeight: false
//   });

//   //------- Active Nice Select --------//
//   $('select').niceSelect();

//   //------- hero carousel -------//
//   $(".hero-carousel").owlCarousel({
//     items:3,
//     margin: 10,
//     autoplay:false,
//     autoplayTimeout: 5000,
//     loop:true,
//     nav:false,
//     dots:false,
//     responsive:{
//       0:{
//         items:1
//       },
//       600:{
//         items: 2
//       },
//       810:{
//         items:3
//       }
//     }
//   });

//   //------- Best Seller Carousel -------//
//   if($('.owl-carousel').length > 0){
//     $('#bestSellerCarousel').owlCarousel({
//       loop:true,
//       margin:30,
//       nav:true,
//       navText: ["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"],
//       dots: false,
//       responsive:{
//         0:{
//           items:1
//         },
//         600:{
//           items: 2
//         },
//         900:{
//           items:3
//         },
//         1130:{
//           items:4
//         }
//       }
//     })
//   }

//   //------- single product area carousel -------//
//   $(".s_Product_carousel").owlCarousel({
//     items:1,
//     autoplay:false,
//     autoplayTimeout: 5000,
//     loop:true,
//     nav:false,
//     dots:false
//   });

//   //------- mailchimp --------//  
// 	function mailChimp() {
// 		$('#mc_embed_signup').find('form').ajaxChimp();
// 	}
//   mailChimp();
  
//   //------- fixed navbar --------//  
//   $(window).scroll(function(){
//     var sticky = $('.header_area'),
//     scroll = $(window).scrollTop();

//     if (scroll >= 100) sticky.addClass('fixed');
//     else sticky.removeClass('fixed');
//   });

//   //------- Price Range slider -------//
//   if(document.getElementById("price-range")){
  
//     var nonLinearSlider = document.getElementById('price-range');
    
//     noUiSlider.create(nonLinearSlider, {
//         connect: true,
//         behaviour: 'tap',
//         start: [ 500, 4000 ],
//         range: {
//             // Starting at 500, step the value by 500,
//             // until 4000 is reached. From there, step by 1000.
//             'min': [ 0 ],
//             '10%': [ 500, 500 ],
//             '50%': [ 4000, 1000 ],
//             'max': [ 10000 ]
//         }
//     });
  
  
//     var nodes = [
//         document.getElementById('lower-value'), // 0
//         document.getElementById('upper-value')  // 1
//     ];
  
//     // Display the slider value and how far the handle moved
//     // from the left edge of the slider.
//     nonLinearSlider.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
//         nodes[handle].innerHTML = values[handle];
//     });
  
//   }
  
// });

    var PRODUCTS;
    var TRENDINGPRODUCTS;
    var TOPSELLERS;
    Promise.all([
        fetch("data/trendingProducts.json").then(data => data.json()),
        fetch("data/products.json").then(data => data.json()),
        fetch("data/topSellers.json").then(data =>data.json())
    ])
    .then(([trendingProducts, products, topSellers]) => {

      setTimeout(() => {document.querySelector("#spinner-holder").remove()}, 100)
                                  // document.getElementsByTagName("body").style = "overflow: scroll!important;"
      $("body").css("overflow", "scroll")

        TRENDINGPRODUCTS = trendingProducts;
        PRODUCTS = products;
        TOPSELLERS = topSellers;
        
        let trendingProductsAllData = PRODUCTS.filter(x => TRENDINGPRODUCTS.some(t => t.id == x.id));

        displayTrendingProducts(trendingProductsAllData)
        
        let topSellersAllData = PRODUCTS.filter(x => TOPSELLERS.some(t => x.id == t.id))

        displayTopSellers(topSellersAllData);

        indexCartCodeExec()// this code is written in a function in main.js but is called here so it happends only when data has arrieved
    }).catch(x => console.log(x))

window.onload = () => {

    
        
    





}
function displayTrendingProducts(data){
    let html = ''
    let trendingHolder = document.querySelector("#trendingProducts")
    for (let x of data) {
        html += `
    <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="card text-center card-product">
          <div class="card-product__img">
            <img class="card-img" src="${x.img.src}" alt="${x.img.alt}" />
            <ul class="card-product__imgOverlay">
              <li><button class="relocateTrening"><i class="ti-search"></i></button></li>
            </ul>
          </div>
          <div class="card-body">
            <p>${x.category}</p>
            <h4 class="card-product__title">${x.text}</h4>
            <p class="card-product__price">$${x.price}</p>
            
          </div>
        </div>
      </div>
      `;
        
    }
    trendingHolder.innerHTML = html
    

}

function displayTopSellers(data){
  let html = ``
  let holder = document.querySelector("#bestSellersHolder")
  for (let x of data) {
    html += 
    `
    <div class="card text-center card-product">
            <div class="card-product__img">
              <img class="img-fluid" src="${x.img.src}" alt="${x.img.alt}" />
              <ul class="card-product__imgOverlay">
                <!-- <li><button><i class="ti-search"></i></button></li> -->
                <li><button class="relocateTop"><i class="ti-shopping-cart"></i></button></li>
                <!-- <li><button><i class="ti-heart"></i></button></li> -->
              </ul>
            </div>
            <div class="card-body">
              <p>${x.category}</p>
              <h4 class="card-product__title">${x.text}</h4>
              <p class=" br-sm-text-sellers">${x.unitsSold} Units Sold!</p>
              <p class="card-product__price">$${x.price}</p>
            </div>
      </div>

    `
  }
  holder.innerHTML = html
}
