//make array with english letters
let engString = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
let engArray = engString.split("");

//display all letters that user has requested.
function refresh() {
    //make filtered array from user input, ignore non eng symbols.
    let filteredArray = [];
    let userInput = input.value;
    userInput = userInput.split("");
    userInput.forEach((letter) => {
        let index = engArray.indexOf(letter);
        if (index != -1) {
            filteredArray.push(engArray[index]);}});    
    display.innerHTML = ""; //remove old letters from display
    filteredArray.forEach((letter) => displayLetter(letter)); //display filtered array
}
    
//add a single letter to dom
function displayLetter(letter) {
    let colorGroup = engArray.indexOf(letter);
    if (colorGroup%2 == 1){colorGroup-=1}
    let imageStyle = `
    style = "
    background-color: hsl(${colorGroup*75}, 100%, 95%);
    "
    `
    let buttonStyle = `
    style = "
    background-color: hsl(${colorGroup*75}, 100%, 80%);
    "
    `
    let letterId = letter.toLowerCase();
    let letterDiv = document.createElement("div");
    letterDiv.classList.add("letter");
    let clickEvent = `onmousedown="playAudio(event)"`
    let audioDiv= `<div ${imageStyle} class= "divImg" data-targetaudio="audio-${letterId}Full" ${clickEvent}><div data-targetaudio="audio-${letterId}Full">${letter}</div></div>`;
    let audioButton = `<button ${buttonStyle} data-targetaudio="audio-${letterId}" ${clickEvent}>${letter}</button>`
    let audioFull = `<audio src="media/fullSounds/${letterId}.mp3" id="audio-${letterId}Full"></audio>`;
    let audioHalf = `<audio src="media/sounds/${letterId}.mp3" id="audio-${letterId}" ></audio>`;

    letterDiv.innerHTML = `
        ${audioDiv}
        ${audioButton}
        ${audioHalf}
        ${audioFull}`
    display.appendChild(letterDiv);
}   

    function playAudio(e){
        let id = e.target.dataset.targetaudio;
        console.log(id)
        let audio = document.getElementById(`${id}`);
        audio.play();
    }    

    function pasteGroup(e){
        let text = e.target.textContent;
        if(text == "lowercase"){text = "abcdefghijklmnopqrstuvwxyz"}
        else if(text == "uppercase"){text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"}
        else if(text == "mixed"){text = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"}
        input.value = text;
        refresh();
    }
//set dom references
let input = document.querySelector("input");
let display = document.querySelector("#main");
let filters = document.querySelectorAll(".filter")

//set event listeners
    input.addEventListener("change", refresh)
    filters.forEach(filter=> filter.addEventListener("click", pasteGroup))

//for debuging
input.value = "Hi";
refresh();
