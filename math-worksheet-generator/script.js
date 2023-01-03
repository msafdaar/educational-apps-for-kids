//default display
displayQuestions(makeQuestions(1,100,20, "+"))
document.querySelector("#reloadQuestions").addEventListener("click", reloadQuestions);

function makeQuestions(min,max,length,symbol){
let output = [];
for(let i = 0; i<length; i++){
    let num1 = Math.floor(Math.random() * (max - min + 1) + min);
    let num2 = Math.floor(Math.random() * (max - min + 1) + min);
    let num3 = 0;
    //num1 should be always bigger than num2
    if(num2>num1){
        num3 = num1;
        num1 = num2;
        num2 = num3;
    }
    output.push([num1,num2,symbol])
}
return output;
}


function displayQuestions(questions){
    let page = document.querySelector(".page")
    let output = "";

    questions.forEach((question)=>{
        let newHtml = `
        <div class="question">
        <div class="line">
        <div class="symbol">${question[2]}</div>
        <div class="number">${question[0]}</div>
        </div>
        <div class="line">
        <div class="symbol visible">${question[2]}</div>
        <div class="number">${question[1]}</div>
        </div>
        <div class="answer"></div>
        </div>
        `
        output = output + newHtml
    })

    page.innerHTML = output;
}


function reloadQuestions(){
    let min = parseInt(document.querySelector("#min").value);
    let max = parseInt(document.querySelector("#max").value);
    let length = parseInt(document.querySelector("#length").value);
    let symbol = "";
    if(document.querySelector("#addRadio").checked){
        symbol = "+";
    } else{
        symbol = "-"
    }
    let questions = makeQuestions(min,max,length,symbol);
    displayQuestions(questions);
}