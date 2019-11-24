const firePixelArray = [];
const fireWidth = 60;
const fireHeight = 60;
const fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 },
{ "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

let maxIntensity = 36
let debug = false

function start() {
    createFireDataStructure();
    createFireSource();
    renderFire();

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure() {
    const numberOfPixels = fireHeight * fireHeight;

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelArray[i] = 0;
    }
}

function updateFirePropagationPerPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth;

    if (belowPixelIndex > fireWidth * fireHeight)
        return

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ?
        belowPixelFireIntensity - decay : 0;

    firePixelArray[currentPixelIndex + decay] = newFireIntensity

}

function calculateFirePropagation() {
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + (fireWidth * row)
            updateFirePropagationPerPixel(pixelIndex)

        }
    }
    renderFire()
    console.log(maxIntensity)
}

function renderFire() {
    let html = '<table cellpadding = 0 cellspacing = 0>'

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'

        for (let column = 0; column < fireWidth; column++) {
            const pixalIndex = column + (fireWidth * row);
            const fireIntensity = firePixelArray[pixalIndex]

            if (debug === true) {
                html += '<td>'
                html += '<div class ="pixel-index">'
                html += pixalIndex
                html += '</div>'
                html += fireIntensity
                html += '</td>'
            } else {
                const color = fireColorsPalette[fireIntensity]
                const colorString = color.r + ',' + color.g + ',' + color.b
                html += '<td class = "pixel" style = "background-color: rgb('
                html += colorString
                html += ')">'
                html += '</td>'
            }
        }

        html += '</tr>'
    }

    html += '</table>'
    html += 'Fire intensity : ' + maxIntensity
    document.querySelector('#fireCanvas').innerHTML = html;
}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column
        firePixelArray[pixelIndex] = maxIntensity
    }
}
function plusIntensity() {
    console.log("+")
    if (maxIntensity == 36)
        return

    maxIntensity += 1
    createFireSource();
}
function minusIntensity() {
    console.log("-")
    if (maxIntensity == 0)
        return

    maxIntensity = maxIntensity - 1
    createFireSource();
}

function setDebug(){
    debug = !debug
}

start()