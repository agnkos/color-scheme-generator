const colorInput = document.getElementById('color-input')
const modeInput = document.getElementById('selected-mode')
const getSchemeBtn = document.getElementById('get-scheme-btn')
const colorsContainer = document.getElementById('colors-container')
const hexContainer = document.getElementById('hex-container')
const options = document.querySelectorAll('.option')
let mode = "monochrome";

getSchemeBtn.addEventListener('click', getScheme)

function getScheme() {
    let cleanHex = colorInput.value.slice(1)
    fetch(`https://www.thecolorapi.com/scheme?hex=${cleanHex}&mode=${mode}&count=5`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            let colorsHtml = ''
            let hexHtml = ''
            for (let color of data.colors) {
                colorsHtml += `
            <div class="color-div" style="background-color: ${color.hex.value}" onclick="copyColor('${color.hex.value}')">
            </div>
            `
                hexHtml += `
            <div class="hex-div" onclick="copyColor('${color.hex.value}')">
                ${color.hex.value}
            </div>
            `
            }
            colorsContainer.innerHTML = colorsHtml
            hexContainer.innerHTML = hexHtml
        })
}

function copyColor(hex) {
    navigator.clipboard.writeText(hex)
    document.getElementsByClassName('copy-info')[0].classList.add('show')
    setTimeout(function () {
        document.getElementsByClassName('copy-info')[0].classList.remove('show')
    }, 800)
}

// dropdown select menu:

document.querySelector('.select-wrapper').addEventListener('click', function () {
    document.querySelector('.select').classList.toggle('open')
})

for (const option of options) {
    option.addEventListener('click', function () {
        modeInput.textContent = option.textContent
        mode = option.getAttribute('data-value')
    })
}