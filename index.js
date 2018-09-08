var colors = [];
var level = 6;
var pickedColor;


var squares = document.querySelectorAll(".square")
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("resetButton");
var modeButtons = document.getElementsByClassName("mode");


init();


function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpSquares() {
  // square listeners
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      // grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      // compare color to picked color
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        h1.style.background = pickedColor;
        changeColors(pickedColor)
        resetButton.textContent = "Play Again?"
      } else {
        this.style.transition = ".5s"
        this.style.background = "none";
        messageDisplay.textContent = "Try Again";
      }
    })
  }
}

function setUpModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? level = 3 : level = 6;
      reset();
    });
  }
}

// Reset Button Event Listener
resetButton.addEventListener("click", function() {
  reset();
})

// resets the game
function reset() {
  colors = generateRandomColors(level);
  pickedColor = pickColor()
  resetH1()
  messageDisplay.textContent = ""
  resetButton.textContent = "New Colors"
  changeSquareBackground(colors)

}



// generateRandomColors(num: int) => [rgb(int, int, int), rgb(int, int, int), etc. ]
function generateRandomColors(num) {
  // make an array
  var arr = []
  // add num random colors to an array
  for (var i = 0; i < num; i++) {
    arr.push(randomColor())
  }
  // return that array
  return arr
}


// pickColor() => "rgb(int, int, int)"
// pick color picks a color that we must find
function pickColor() {
  // will pick a number between 0 - 1 and not 1
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Resets all the values in the h1
function resetH1() {
  // changet the color display
  colorDisplay.textContent = pickedColor.toUpperCase();
  // make the background black again
  h1.style.background = "steelblue";
}

function changeSquareBackground(colors) {
  for (var i = 0; i < squares.length; i++) {
    if (level === 3) {
      if (i < 3) {
        squares[i].style.backgroundColor = colors[i]
      } else {
        squares[i].style.display = "none";
      }
    } else {
      squares[i].style.backgroundColor = colors[i]
      squares[i].style.display = "block";
    }
  }
}

// When the user wins this function changes all the
// sqaures to the background of the picked Color
function changeColors(pickedColor) {
  for (var i = 0; i < colors.length; i++) {
    squares[i].style.background = pickedColor;
  }
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}


// Module design pattern
