document.getElementById('inputText').addEventListener('input', updateOutput);
document.getElementById('direction').addEventListener('change', updateOutput);
document.getElementById('fontFamily').addEventListener('change', updateOutput);
document.getElementById('fontSize').addEventListener('change', updateOutput);
document.getElementById('darkMode').addEventListener('change', toggleDarkMode);
document.getElementById('colorfulLines').addEventListener('change', updateOutput);
document.getElementById('splitters').addEventListener('input', updateOutput);

const defaultSplitters = ['.', '\n', '۔'];

function updateOutput() {
    const inputText = document.getElementById('inputText').value;
    const direction = document.getElementById('direction').value;
    const fontFamily = document.getElementById('fontFamily').value;
    const fontSize = document.getElementById('fontSize').value;
    const colorfulLines = document.getElementById('colorfulLines').checked;
    const customSplittersInput = document.getElementById('splitters').value;

    const splitters = defaultSplitters.concat(
        customSplittersInput.split(',').map(s => s.trim()).filter(s => s)
    );

    const outputText = document.getElementById('outputText');
    outputText.innerHTML = '';
    outputText.style.direction = direction;
    outputText.style.fontFamily = fontFamily;
    outputText.style.fontSize = `${fontSize}px`;


    const regex = new RegExp(`(${splitters.map(s => escapeRegExp(s)).join('|')})`, 'g');
    const segments = inputText.split(regex);

    segments.forEach((segment, index) => {
        const span = document.createElement('span');
        span.textContent = segment;
        if (splitters.includes(segment)) {
            span.classList.add('splitter');
        } else {
            if (colorfulLines) {
                span.classList.add('colorful-line', `color-${Math.floor(index / 2) % 7}`);
            }
        }
        outputText.appendChild(span);
    });
}

function toggleDarkMode() {
    const isChecked = document.getElementById('darkMode').checked;
    const body = document.body;
    const outputText = document.getElementById('outputText');

    if (isChecked) {
        body.classList.add('dark-mode');
        outputText.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        outputText.classList.remove('dark-mode');
    }
}

// Utility function to escape special characters for use in regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Implement pinch to zoom functionality
let lastTouchEnd = 0;
const outputText = document.getElementById('outputText');

outputText.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
        const scaleAmount = event.deltaY > 0 ? 0.9 : 1.1;
        const currentFontSize = parseFloat(window.getComputedStyle(outputText).fontSize);
        document.getElementById('fontSize').value = `${parseInt(currentFontSize * scaleAmount)}`
        updateOutput()
    }
});

function initialize (){
    let defaultValues = examples[document.URL.split("html#")[1]];
    console.log(defaultValues)
if(!defaultValues){
    defaultValues = {
        text: "Hello World!",
        direction: "ltr",
        fontFamily: "Arial",
        splitters: ".,\\n,۔",
        fontSize: 140,
        colors: true
    }
}
document.getElementById('inputText').value = defaultValues.text ; 
document.getElementById('direction').value = defaultValues.direction ; 
document.getElementById('fontFamily').value = defaultValues.fontFamily ; 
document.getElementById('splitters').value = defaultValues.splitters ; 
document.getElementById('fontSize').value = defaultValues.fontSize ; 
document.getElementById('colorfulLines').checked = defaultValues.colors ; 
updateOutput()
}

initialize()