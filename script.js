// create grid
function createGrid(num)
{
    document.querySelector(".container").innerHTML = "";
    for (let i = 0; i < num; i++)
    {
        let rowContainer = document.createElement('div');
        rowContainer.classList.add("row-container");

        for (let j = 0; j < num; j++)
        {
            let pixel = document.createElement('div');
            pixel.classList.add("pixel");

            rowContainer.appendChild(pixel);
        }

        document.querySelector(".container").appendChild(rowContainer);
    }
}

let options = document.querySelector(".special-options");
let customColor = document.querySelector(".color-picker");

function addPixelHandlers()
{  
    pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        pixel.addEventListener('mouseover', () => {
            if (options.value == 'rainbow')
            {
                let color = randomRGB();
                pixel.style['background-color'] = color;
                pixel.style['border-color'] = color;
                pixel.style['border-size'] = '1px';
            }
            else
            {
                pixel.style['background-color'] = customColor.value;
                pixel.style['border-color'] = customColor.value;
                pixel.style['border-size'] = '1px';
            }
        });
    });

}

function randomRGB()
{
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function setUpGrid(num)
{
    createGrid(num);
    addPixelHandlers();
}

setUpGrid(32);


function resetPixels()
{
    pixels.forEach((pixel) => {
        pixel.style['background-color'] = 'white';
        pixel.style['border'] = "1px solid gainsboro";
    })
}

// event handler for clear button
let clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', () => {
    resetPixels();
})

// event handler for slider change
let slider = document.querySelector(".slider");
let sliderVal = document.querySelector(".slider-value");
slider.addEventListener('input', () => {
    sliderVal.textContent = slider.value;
})

// event handler for new grid button
let newGrid = document.querySelector(".new-grid");
newGrid.addEventListener('click', () => {
    setUpGrid(slider.value);
})

customColor.addEventListener('input', customColorListener);
customColor.addEventListener('click', customColorListener);

function customColorListener()
{
    document.querySelector(".special-options").value = 'custom-color';
    addPixelHandlers();
}



options.addEventListener('change', () => {
    addPixelHandlers();
})



