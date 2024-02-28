


    if(!JSON.parse(localStorage.getItem("cart"))){
        document.querySelector("#cartNumberOfProducts").innerHTML = "0"
    }
    else{
        cartItemCount = JSON.parse(localStorage.getItem("cart")).length
        document.querySelector("#cartNumberOfProducts").innerHTML = cartItemCount
    }
    $("#cartButton").on("click", () => window.location = "cart.html");


































function indexCartCodeExec() { 
        let btns = document.getElementsByClassName("relocateTrening")
        for (let i of btns) {
            console.log(i)
            i.addEventListener("click", () => {
                window.location = "category.html"
            })
        }
        let selerbtns = document.getElementsByClassName("relocateTop")
        for (let i of selerbtns) {
            i.addEventListener("click", () => {
                window.location = "category.html"
            })
        }
}
