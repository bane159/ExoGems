


    if(!JSON.parse(localStorage.getItem("cart"))){
        document.querySelector("#cartNumberOfProducts").innerHTML = "0"
    }
    else{
        cartItemCount = JSON.parse(localStorage.getItem("cart")).length
        document.querySelector("#cartNumberOfProducts").innerHTML = cartItemCount
    }
    $("#cartButton").on("click", () => window.location = "cart.html");




    const emailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    let emailInputSubscribe = $("#email-subscribe");
    emailInputSubscribe.on("blur", () => {
        
        if(emailInputSubscribe.val() == ''){
            removeBorder("email-subscribe")
            removeError("email-subscribe-error")
            return
        }
    if(!emailRegEx.test(emailInputSubscribe.val())){
            dangerBorder("email-subscribe")
            displayError("email is in wrong format", "email-subscribe-error")

            
            return
        }
        successBorder("email-subscribe")
        removeError("email-subscribe-error")
    })

    $("#email-subscribe-success").on("click", (e) => {
        e.preventDefault()
        if(!emailRegEx.test(emailInputSubscribe.val())){
            
            displayError("email is in wrong format", "email-subscribe-error")
            
        }
        else{
            successBorder("email-subscribe")
            displayError("Successfully subscribed", "email-subscribe-error")
        }



        
    })





























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
function displayError(message,element) {
    document.querySelector(`#${element}`).classList.remove("d-none")
    document.querySelector(`#${element}`).classList.add("d-block")
    document.querySelector(`#${element}`).innerHTML = message

}
function removeError(element){
    document.querySelector(`#${element}`).classList.remove("d-block")
    document.querySelector(`#${element}`).classList.add("d-none")
    document.querySelector(`#${element}`).innerHTML = ``
}

function successBorder(element){
    document.querySelector(`#${element}`).classList.remove("border-danger")
    document.querySelector(`#${element}`).classList.add("border-success")
}
function dangerBorder(element){
    document.querySelector(`#${element}`).classList.remove("border-success")
    document.querySelector(`#${element}`).classList.add("border-danger")
}

function removeBorder(element) {
    document.querySelector(`#${element}`).classList.remove("border-success")
    document.querySelector(`#${element}`).classList.remove("border-danger")

  }
