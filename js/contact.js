window.onload = () => {

    $("body").css("overflow", "scroll")
    let nameInput = $("#name");


    // ===========================   name validaiton    ===================================

    const nameRegEx = /^[A-Z][a-z]{1,10}([ ][A-Z][a-z]{3,15}){0,2}$/;
    const emailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    nameInput.on("blur", () => {
        
        if(nameInput.val() == ''){
            removeBorder("name")
            removeError("nameError")
            return
        }
    if(!nameRegEx.test(nameInput.val())){
            dangerBorder("name")
            displayError("Name is in wrong format", "nameError")
            return
        }

        successBorder("name")
        removeError("nameError")
    })


    // ===========================   mail validaiton    ===================================

    let emailInput = $("#email");
    emailInput.on("blur", () => {
        
        if(emailInput.val() == ''){
            removeBorder("email")
            removeError("emailError")
            return
        }
    if(!emailRegEx.test(emailInput.val())){
            dangerBorder("email")
            displayError("email is in wrong format", "emailError")
            return
        }
        successBorder("email")
        removeError("emailError")
    })


    // ===========================   country validaiton    ===================================

    let countrySelect = $("#country")
    countrySelect.on("change", () => {

        if(countrySelect.val() == "Choose"){
            dangerBorder("country")
            displayError("country is required", "countryError")
            return
        }

        successBorder("country")
        removeError("countryError")

    })


    // ===========================   submit validaiton    ===================================

    $("#submitBtn").on("click", (e) => {
        console.log("click")
        
    
            e.preventDefault()
        

        if(!nameRegEx.test(nameInput.val())){
            dangerBorder("name")
            displayError("Name is in wrong format", "nameError")
            
        }
        if(!emailRegEx.test(emailInput.val())){
            dangerBorder("email")
            displayError("email is in wrong format", "emailError")
        }

        if(countrySelect.val() == "Choose"){
            dangerBorder("country")
            displayError("country is required", "countryError")
        }
        let radios = $("input[name=sex]")
        var br = 0;
        for(let i of radios){
            if(i.checked){
            br++; 
            }
        }
        if(br === 0){
            $("#sexError").html("Choose sex").removeClass("d-none").addClass("d-block")
        }
        else{
            $("#sexError").removeClass("d-block").addClass("d-none")
        }


        // ========= Check regex then send the form if true =============

        if(nameRegEx.test(nameInput.val()) && emailRegEx.test(emailInput.val()) && countrySelect.val() != "Choose" && br == 1){
            document.querySelector("#contactForm").submit() 
        
        }

    })


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
