const book = document.getElementById("book");
const result =  document.getElementById("result");

const letsValidate = document.getElementById("letsValidate");
const back = document.getElementById("back");

const inTarget = document.getElementById("target");
const error_message = document.getElementById("error");

inTarget.addEventListener("input", function() {
    inTarget.value = inTarget.value.orderTarget();

    inputOk(inTarget.value.replaceAll(" ", ""));
})

letsValidate.addEventListener("click", function(e) {
    e.preventDefault();

    let target = inTarget.value.replaceAll(" ", "");

    if( inputOk(target) ){
        
        const tN = result.querySelector(".targetNumber")
        const v = result.querySelector(".verdit")
        
        admin_pages(book, "#result");
        tN.innerText = inTarget.value.criptedNumber();

        if( validate(target) ){
            replace(result, "noValid", "valid");
            v.innerText = " es valida";
        }
        else{
            replace(result, "valid", "noValid");
            v.innerText = "no es valida";
        }
    }
    else{
        alertError();
    }
})

back.addEventListener("click", function(e) {
    e.preventDefault();
    admin_pages(book, "#homePage");
    
})


function inputOk(target){
    if( target === ""){
        replace(error_message, "vanish", "visible");
        inTarget.classList.add("errorInput");
        error_message.innerText = "El campo no debe estar vacio";
        return false;
    }
    else{
        if ( !onlyDigits(target) || target.includes(".")){
            replace(error_message, "vanish", "visible");
            inTarget.classList.add("errorInput");
            error_message.innerText = "El campo solo debe contener digitos";
            return false;
        }
        else{
            replace(error_message, "visible", "vanish");
            inTarget.classList.remove("errorInput");
            return true;
        }
    }
}

String.prototype.criptedNumber = function(){
    let cripted = Array.from(this.replaceAll(" ", ""));

    for (let i = 0; i < (cripted.length-4); i++) {
        cripted[i] = "#";
    }
    
    cripted = cripted.toString().replaceAll(",", "");

    return cripted.orderTarget();
}
String.prototype.orderTarget = function(){
    const cadena = this.replaceAll(" ", "")
    let shipshape= "";

    for (let i = 0; i < cadena.length; i++) {
        if((i) % 4  == 0 && i != 0){
            shipshape += " ";
        }
        shipshape += cadena.charAt(i);
    }
    
    return shipshape;
}

function admin_pages(book, bookmark){
    let pag = book.querySelector(".visible");
    let thepage = book.querySelector(bookmark);

    replace(pag, "visible", "vanish");
    
    replace(thepage, "vanish", "visible");

}

function validate( target){
    let sumatoria = 0;
    let digit;

    target = Array.from(target);
    target.reverse();

    for (let i = 0; i < target.length; i++){
        
        digit = parseInt(target[i], 10);

        if( i % 2 == 1){

            digit *= 2;

            if((digit >= 10)){

                digit -= 9;
            }
        }

        sumatoria += digit;
    }
    return sumatoria % 10 == 0;
}


function alertError(){
    error_message.classList.add("alert");
    setTimeout(function(){ error_message.classList.remove("alert"); }, 250);
}

function replace(object, oldClass, newClass){
    object.classList.remove(oldClass);
    object.classList.add(newClass);
}

function onlyDigits(cadena){
    return cadena == parseInt(cadena);
}
