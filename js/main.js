


































function indexCartCodeExec() { 
        let btns = document.getElementsByClassName("relocateTrening")
        for (let i of btns) {
            // console.log(i)
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
