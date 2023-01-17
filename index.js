// Global Declarations

const getColorBtn = document.getElementById("get-scheme-btn");
const colorBox = document.getElementById("color-box")
const colorCodeBox = document.getElementById("color-code-box")

// Event listeners

getColorBtn.addEventListener("click", render);
colorBox.addEventListener("click", (e) => {
    copyToClipboard(e);
});
colorCodeBox.addEventListener("click", (e) => {
    copyToClipboard(e);
});

// Functions

function render() {
    getColorScheme();
}

function getColorScheme() {
    // Slice removes "#" from hex value, so it can be read by the color API.
    const seedColor = document.getElementById("color").value.slice(1);
    const mode = document.getElementById("mode").value;
    // Calls API to get color Scheme.
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
        .then(response => response.json())
        .then(data => printColors(data));
}

function getColorValues(colorData) {
    return colorsArray = colorData.colors.map(color => color.hex.value);
}

function printColors(colorData) {
    const colorValues = getColorValues(colorData);
    let colorsHtml = "";
    let codesHtml = "";

    for (let color of colorValues) {
        colorsHtml += `<div style="background-color:${color}" data-color="${color}"></div>`
        codesHtml += `<p class="color-code">${color}</p>`
    }

    colorBox.innerHTML = colorsHtml;
    colorCodeBox.innerHTML = codesHtml;
}

function copyToClipboard(event) {
    let copiedText = "";

    if (event.target.parentElement.id === "color-box") {
        copiedText = event.target.dataset.color;
    }
    else if (event.target.parentElement.id === "color-code-box") {
        copiedText = event.target.textContent;
    }

    navigator.clipboard.writeText(copiedText);
    alert("Copied the color: " + copiedText);
}

render();