let display = document.getElementById("display");
let buttons = Array.from(document.querySelectorAll(".btn"));


function setTextWidth(display) {
    if (display.innerText.length > 15) {
        display.style.fontSize = '1.5rem';
    }
    else {
        display.style.fontSize = '2rem';
    }
}

buttons.forEach((btn)=>btn.addEventListener("click",(e)=>{
    let val = e.target.innerText;
    switch(e.target.innerText){

        case "RESET": display.innerText="0";
            break;

        case "DEL": 
            display.innerText = display.innerText.slice(0,-1);
            if (display.innerText == "") display.innerText = 0;
            break;
        case "=": 
            display.innerText = display.innerText.replace(/x/g,'*');
            display.innerText = eval(display.innerText);
            break;
        
        default : 
            previousValue = display.innerText.slice(-1);
            if (isNaN(parseFloat(val)) && isNaN(parseFloat(previousValue))) {
                display.innerText = display.innerText.slice(0,-1);
                display.innerText += val;
            } else if(display.innerText=="0") {
                display.innerHTML=(0+ +val)
            }
            else {
                display.innerText += val;
            }
            break;
    }
    setTextWidth(display);
}))