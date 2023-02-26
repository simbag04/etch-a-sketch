///////////////////////////// SELECTORS /////////////////////////////
let options = document.querySelector(".special-options");
let slider = document.querySelector(".slider");
let sliderVal = document.querySelector(".slider-value");
let newGrid = document.querySelector(".new-grid");
let customColor = document.querySelector(".color-picker");
let clearButton = document.querySelector(".clear");
let pixels = null;

///////////////////////////// CODE /////////////////////////////
setUpGrid(32);

///////////////////////////// EVENT HANDLERS /////////////////////////////
// event handler for Clear All button
clearButton.addEventListener('click', () => {
    resetPixels();
})

// event handler to update text when slider changes
slider.addEventListener('input', () => {
    sliderVal.textContent = slider.value;
})

// event handler for Create New Grid button
newGrid.addEventListener('click', () => {
    setUpGrid(slider.value);
})

// event handler to change value in dropdown when color picker is clicked
customColor.addEventListener('click', () => {
    document.querySelector(".special-options").value = 'custom-color';
});


///////////////////////////// METHODS /////////////////////////////
function generateGrayColor(color)
{
    // extract rgba values into array
    let rgbColor = color.substring(color.indexOf("(") + 1, color.indexOf(")"));
    let colorArr = rgbColor.split(", ");

    // case that element is not a shade of gray 
    if ((colorArr[3] == undefined && colorArr[0] != '0' 
        && colorArr[1] != '0' && colorArr[2] != '0'))
    {
        color = 'rgba(0, 0, 0, 0.1)';
    }

    // case that element is a shade of gray, so add 10% to opacity
    else
    {
        colorArr[3] = "" + Math.min(parseFloat(colorArr[3]) + 0.1, 1);
        color = 'rgba(' + colorArr.join(", ") + ")";
    }

    return color;
}

// function to set up grid
function setUpGrid(num)
{
    createGrid(num);
    resetPixels();
    addPixelHandlers();
}

// function to generate random RGB value
function generateRandomRGB()
{
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgba(" + r + ", " + g + ", " + b + ", 1)";
}

// function to reset all pixels
function resetPixels()
{
    pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        pixel.style['background-color'] = 'rgba(0, 0, 0, 0)';
    })
}

// create grid
function createGrid(num)
{
    // reset container
    document.querySelector(".container").innerHTML = "";

    // create rows
    for (let i = 0; i < num; i++)
    {
        // create container for each row
        let rowContainer = document.createElement('div');
        rowContainer.classList.add("row-container");

        // add pixels to each row
        for (let j = 0; j < num; j++)
        {
            // create pixel
            let pixel = document.createElement('div');
            pixel.classList.add("pixel");

            // append to row
            rowContainer.appendChild(pixel);
        }

        // add row to container
        document.querySelector(".container").appendChild(rowContainer);
    }

}

// function to add event listener for each pixel
function addPixelHandlers()
{
    // for each pixel add event listener
    pixels.forEach((pixel) => {
        pixel.addEventListener('mouseenter', () => {

            // choose color to change to based on option provided
            let color = null;
            switch (options.value)
            {
                case 'rainbow':
                    color = generateRandomRGB();
                    break;

                case 'gray-scale':
                    color = generateGrayColor(pixel.style['background-color']);
                    break;

                default:
                    color = customColor.value;
            }

            // set color of pixel
            pixel.style['background-color'] = color;
        });
    });
}





















