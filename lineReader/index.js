function addLinks(){
  let newHtml = ``;
  examples.map((data, index) => {
    newHtml += `
    <div class="example-link" dir="${data.direction}">
    <a href="./read.html#${index}">
    ${data.title}
    </a>
    <p>${data.text.substring(0,250)}....</p>
    </div>
    </div>
    </div>
    `
  }
)

document.querySelector("#exampleTexts"). innerHTML += newHtml;
}

addLinks()