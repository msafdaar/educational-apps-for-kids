
//make array with urdu letters
let urduCsv = `symbol	id	group
ا	alif	0
آ	alifmad	0
ب	bay	1
پ	pay	1
ت	tay	1
ٹ	stay	1
ث	say	1
ج	jeem	2
چ	chay	2
ح	hai	2
خ	khai	2
د	dal	3
ڈ	sdal	3
ذ	zal	3
ر	ray	4
ڑ	sray	4
ز	zay	4
ژ	sey	4
س	seen	5
ش	sheen	5
ص	suad	6
ض	zuad	6
ط	toen	7
ظ	zoen	7
ع	ain	8
غ	ghain	8
ف	fey	9
ق	qaf	9
ک	kaf	10
گ	gaf	10
ل	lam	11
م	meem	11
ن	noon	11
و	wao	12
ہ	hay	12
ھ	hey	12
ء	hamza	12
ی	cyei	13
ے	byei	13`
let urduArrayFull = makeArray(urduCsv);
let urduArray = urduArrayFull.map(letter => letter.symbol)

    function makeArray (source){
        let data = source.split(`\n`);
        data = data.map(element => element.split("\t"))
        let header = data.shift()
        data = data.map((element)=>{
            let object = {};
            object[header[0]] = element[0];
            object[header[1]] = element[1];
            object[header[2]] = element[2];
            return object
        })
        return data};

        //display all letters that user has requested.
    function refresh() {
        display.innerHTML = ""; //remove old letters from display
        if(!fullLetters.checked && !halfLetters.checked){ return }
        //make filtered array from user input, ignore non urdu symbols.
        let filteredArray = [];
        let userInput = input.value;
        userInput = userInput.split("");
        userInput.forEach((letter) => {
            let index = urduArray.indexOf(letter);
            if (index != -1) {
                filteredArray.push(urduArrayFull[index]);}});    
        filteredArray.forEach((letter) => displayLetter(letter)); //display filtered array
    }
    
//add a single letter to dom
function displayLetter(letter) {
    let letterDiv = document.createElement("div");
    let imageClass;
    if(fullLetters.checked && halfLetters.checked){
        letterDiv.classList.add("doubleLetter");
        imageClass = "class = 'imgHalf'"  
    } else {
        letterDiv.classList.add("letter");
        imageClass = "class = 'imgFull'"  
    }
    let audioImageStyle = `
    style = "
    background-color: hsl(${letter["group"]*100}, 100%, 90%);"
    `
    let audioDivStyle = `
    style = "
    background-color: hsl(${letter["group"]*100}, 100%, 95%);"
    `
    let clickEvent = `onclick="playAudio(event)"`
    let audioImage= `<img ${audioImageStyle} ${imageClass} draggable="false" src="media/fullImages/${letter.id}.png" data-targetaudio="audio-${letter.id}Full" ${clickEvent}>`;
    let audioDiv = `<img ${audioDivStyle} ${imageClass} draggable="false" src="media/halfImages/${letter.id}.png" data-targetaudio="audio-${letter.id}" ${clickEvent}>`
    let audioHalf = `<audio src="media/sounds/${letter.id}.mp3" id="audio-${letter.id}" ></audio>`;
    let audioFull = `<audio src="media/fullSounds/${letter.id}.mp3" id="audio-${letter.id}Full"></audio>`;
    if(fullLetters.checked){
        letterDiv.innerHTML = `${audioImage}${audioFull}`
    }
    if(halfLetters.checked){
        letterDiv.innerHTML += `${audioDiv}${audioHalf}`
    }
    display.appendChild(letterDiv);
}

    function playAudio(e){
        let id = e.target.dataset.targetaudio;
        let audio = document.getElementById(`${id}`);
        audio.play();
    }    

    function pasteGroup(e){
        input.value = e.target.textContent;
        refresh();
    }
//set dom references
let input = document.querySelector("input");
let display = document.querySelector("#main");
let filters = document.querySelectorAll(".filter")
let fullLetters = document.querySelector("#fullLetters")
let halfLetters = document.querySelector("#halfLetters")


//set event listeners
    input.addEventListener("change", refresh);
    fullLetters.addEventListener("change", refresh);
    halfLetters.addEventListener("change", refresh);
    filters.forEach(filter=> filter.addEventListener("click", pasteGroup))
    display.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
   };
//for debuging
input.value = "کتاب";
refresh();
