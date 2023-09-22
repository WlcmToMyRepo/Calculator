let display = document.getElementById("display");
let buttons = Array.from(document.querySelectorAll(".btn"));


function setTextWidth(display) {
    if (display.textContent.length > 15) {
        display.style.fontSize = '1.5rem';
    }
    else {
        display.style.fontSize = '2rem';
    }
}

function getPreviousValue(str) {
    const operators = ["x","/","+","-"]
    let previousValue = "";
    for(let i=str.length-1; i >= 0; i--) {
        if (operators.indexOf(str[i]) != -1){
            //we found the operator
            return previousValue
        } else {
            previousValue = str[i] + previousValue
        }
    }
    //operator not found;
    return previousValue
}



function getData(display,currentValue) { 
    if (display.textContent == "0") {
        if (isNaN(currentValue)) {
            display.textContent += currentValue;
        }else {
            display.textContent = currentValue;
        }
    } else if (isNaN(currentValue)) {
        console.log("curren value is ",currentValue)
        if (
            !isNaN(display.textContent.slice(-1)) 
        ) {
            display.textContent += currentValue;
        } else {
            display.textContent = display.textContent.slice(0,-1) + currentValue;
        }
    }
    
    else {
        display.textContent += currentValue;
    }
}



            
    
    // if (isNaN(parseFloat(val)) && isNaN(parseFloat(previousValue))) {
    //             display.textContent = display.textContent.slice(0,-1);
    //             display.textContent += val;
    // } else if(display.textContent=="0") {
    //             display.innerHTML=(0+ +val)
    //         }
    //         else {
    //             display.textContent += val;
    // }

buttons.forEach((btn)=>btn.addEventListener("click",(e)=>{
    let val = e.target.textContent;
    let previousValue = getPreviousValue(display.textContent);
    switch(val){

        case "RESET": display.textContent="0";
            break;

        case "DEL": 
            display.textContent = display.textContent.slice(0,-1);
            if (display.textContent == "") display.textContent = 0;
            break;
        case "=": 
            try {
                display.textContent = display.textContent.replace(/÷/g, '/');
                display.textContent = display.textContent.replace(/×/g, '*');
                console.log("string to be evaluated", display.textContent);
                display.textContent = eval(display.textContent);
                previousValue = display.textContent;
            }
            catch(error) {
                if (error.name == "SyntaxError") {
                    display.textContent = "Format error";
                }
                else {
                    display.textContent = error.message;
                }
            }
            
            break;
        
        case ".": 
            if(previousValue === "" || previousValue.indexOf(".") == -1) {
                display.textContent += ".";
            }
            break;
        case "0":
            if(previousValue!= 0 || previousValue.indexOf(".") != -1) {
                display.textContent += "0";
            }
            break;
        default : 
            getData(display, val);
            break;
    }
    setTextWidth(display);
}));
    