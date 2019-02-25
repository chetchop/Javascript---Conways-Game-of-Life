/* 
1. Create a 2D array with 0 or 1 at each index
2. Create a grid based on the size of the 2D array. Make them black or white based on the 2D array value
3. Update the 2D array based on he indexes neighbor values
4. Redraw the grid
*/


const canvas = document.querySelector('#canvas'),
      ctx = canvas.getContext('2d'),
      UIbutton = document.querySelector('#pause-button');

const canvasWidth = canvas.width,
      canvasHeight = canvas.height,
      resolution = 5,
      columns = canvasWidth / resolution,
      rows = canvasHeight / resolution;

      let array = make2DArray();

let paused = false;

function loadEventListeners() {
    UIbutton.addEventListener('click', pause);
}


function make2DArray() {
    let array = [];
    for (let i = 0; i < columns; i++) {
        array.push([]);
        for (let j = 0; j < rows; j++) {
            array[i].push(Math.floor(Math.random() * 2));
        }
    }
    return array;
}

console.log(canvasWidth);
console.log(canvasHeight);

console.log(columns);
console.log(rows);
 

function drawGrid() {
    if (!paused) {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            array[i][j] === 1 ? ctx.fillStyle = 'black' : ctx.fillStyle = 'white';
            ctx.fillRect(i*resolution+1, j*resolution+1, resolution-1, resolution-1);
        }
    }

    let next = make2DArray();

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let state = array[i][j]
            let neighbors = calculateNeighbors(array, i, j);

            // Rule set 1
            
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state
            }
            

            // Rule set 2
            /*
            if (state === 1 && neighbors < 2) {
                next[i][j] = 0;
            } else if (state === 1 && (neighbors === 2 || neighbors === 3)) {
                next[i][j] = 1;
            } else if (state === 1 && neighbors < 3) {
                next[i][j] = 0;
            } else if (state === 0 && neighbors === 3) {
                next[i][j] = 1;
            }
            */


            //next[i][j] = calculateNeighbors(array, i, j);
            //console.log(next[i][j]);
        }
    }

    array = next;
    //requestAnimationFrame(drawGrid);
}
}




function calculateNeighbors(array, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + columns) % columns
            let row = (y + j + rows) % rows;
            sum += array[col][row];
        }
    }
    sum -= array[x][y];
    return sum;
}

function pause(e) {
    paused = !paused;
    console.log(e.target);
}


ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvasWidth, canvasHeight);

loadEventListeners();

setInterval(drawGrid, 100);

//requestAnimationFrame(drawGrid);















































