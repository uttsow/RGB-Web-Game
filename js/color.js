//GLOBAL VARIABLES
var main = document.querySelector("#container");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var heading = document.querySelector("h1");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var randomButton = document.getElementById("randomGame");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var extremeBtn = document.querySelector("#extremeBtn");
var pickedColor;
var lifePoints = 3;

initalSquareChange();
easyBtn.addEventListener("click", easyMode);
hardBtn.addEventListener("click", hardMode);
extremeBtn.addEventListener("click", extremeMode);

//Inital Square color change and header based on difficulty
function initalSquareChange() {
    main.style.visibility = "hidden";
    randomButton.addEventListener("click", function() {
        var randoGame = Math.floor(Math.random() * 175);
        main.style.visibility = "visible";
        if (randoGame % 3 == 0) {

            easyMode();
        } else if (randoGame % 2 == 0) {

            hardMode();
        } else {
            extremeMode();
        }

    });
}

//Function that returns a randomized RGB color
function randomizeColor() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var yellow = Math.floor(Math.random() * 255);
    var newColor = "rgb(" + red + "," + " " + green + "," + " " + yellow + ")";
    console.log(newColor);
    return newColor.toString();
}


//function that fades element;
function fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.visibility = 'hidden';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 15);
}


//Opposite of unfade
function unfade(element) {
    var op = 0.1; // initial opacity
    element.style.visibility = 'visible';
    var timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);

        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 5);
}


//Resets the header color, display message, and "New Colors button"
function reset() {
    main.style.display = "block";

    heading.style.backgroundColor = "steelblue";
    resetButton.innerHTML = "New Colors";
    messageDisplay.innerHTML = "";
    messageDisplay.style.color = "black";

}


//Change all the remaing unfaded square colors to the asking color once user has picked the asking color
function changeAllSquareColors(colorPicked) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colorPicked;

    }

}



//Easy Mode of the Game
function easyMode() {

    if (lifePoints <= 0) {
        alert("Game over! Press 'Play Again'");
    } else {
        main.style.display = "block";

        //Sets background color of the button tag and removes it for the other buttons
        hardBtn.classList.remove("selected");
        extremeBtn.classList.remove("selected");
        easyBtn.classList.add("selected");

        for (var i = 3; i < squares.length; i++) {
            squares[i].style.visibility = "hidden";
        }
        for (var x = 0; x <= 2; x++) {
            if (squares[x].style.visibility == "hidden") {
                unfade(squares[x]);
            }
            squares[x].style.visibility = "visible";
            squares[x].style.backgroundColor = randomizeColor();
        }
        pickedColor = randomizeColor();
        var randomSquare = Math.floor(Math.random() * 2);
        squares[randomSquare].style.backgroundColor = pickedColor;
        colorDisplay.innerHTML = pickedColor;
        reset();
    }
}

//Hard Mode of the game.
function hardMode() {

    if (lifePoints <= 0) {
        alert("Game over! Press 'Play Again'");
    } else {


        main.style.display = "block";

        easyBtn.classList.remove("selected");
        extremeBtn.classList.remove("selected");
        hardBtn.classList.add("selected");

        //makes all squares visible
        for (var i = 0; i < 3; i++) {
            if (squares[i].style.visibility == "hidden") {
                unfade(squares[i]);
            }
            squares[i].style.visibility = "visible";
            squares[i].style.backgroundColor = randomizeColor();
        }

        for (var x = 3; x < 6; x++) {
            if (squares[x].style.visibility == "hidden") {
                unfade(squares[x]);
            }
            squares[x].style.visibility = "visible";
            squares[x].style.backgroundColor = randomizeColor();
        }

        //hides last 6 blocks
        for (var y = 6; y < squares.length; y++) {
            fade(squares[y]);
            squares[y].style.visibility = "hidden";
        }
        pickedColor = randomizeColor();
        var randomSquare = Math.floor(Math.random() * 5);
        squares[randomSquare].style.backgroundColor = pickedColor;
        colorDisplay.innerHTML = pickedColor;
        reset();
    }
}

function extremeMode() {
    if (lifePoints <= 0) {
        alert("Game over! Press 'Play Again'");
    } else {
        main.style.display = "block";
        easyBtn.classList.remove("selected");
        hardBtn.classList.remove("selected");
        extremeBtn.classList.add("selected");

        for (var i = 0; i < squares.length; i++) {
            if (squares[i].style.visibility == "hidden") {
                unfade(squares[i]);
            } else {
                squares[i].style.visibility = "visible";
            }
            squares[i].style.visibility = "visible";
            squares[i].style.backgroundColor = randomizeColor();
        }
        pickedColor = randomizeColor();
        var randomSquare = Math.floor(Math.random() * 11);
        squares[randomSquare].style.backgroundColor = pickedColor;
        colorDisplay.innerHTML = pickedColor;
        reset();
    }
}

resetButton.addEventListener("click", function() {
    //generate all new colors and update everything;
    reset();
    lifePoints = 3;
    if (easyBtn.classList.contains("selected")) {
        easyMode();
    } else if (hardBtn.classList.contains("selected")) {
        hardMode();
    } else {
        extremeMode();
    }
});


function lifeReset(el) {

    if (lifePoints !== 0) {
        if (easyBtn.classList.contains("selected")) {
            // unfade(el);
            fade(el);
            messageDisplay.innerHTML = "Try Again!";
            lifePoints--
        } else if (hardBtn.classList.contains("selected")) {
            unfade(el);
            for (var i = 0; i < 6; i++) {
                hardMode();
                messageDisplay.innerHTML = "Try Again!";
            }
            lifePoints--;
        } else {
            extremeMode();
            messageDisplay.innerHTML = "Try Again!";
            lifePoints--;
        }
    } else {
        messageDisplay.innerHTML = "Game Over!";
        resetButton.innerHTML = "Try Again?";
        main.style.display = "none";



    }
}



//LOGIC OF THE GAME
for (var i = 0; i < squares.length; i++) {
    //add click listener to square
    squares[i].addEventListener("click", function() {


        //grab the color of clicked Square
        var clickedColor = this.style.backgroundColor;


        //compare color to pickedColor
        if (clickedColor === pickedColor) {
            messageDisplay.innerHTML = "Correct!";
            changeAllSquareColors(clickedColor);
            heading.style.backgroundColor = clickedColor;
            resetButton.innerHTML = "Play Again?";
            // for (var i = 0; i < allButtons.length; i++) {
            //     allButtons[i].style.backgroundColor = clickedColor;
            // }

            messageDisplay.style.color = pickedColor;
            lifePoints = 3;

        } else {
            //fade(this);

            messageDisplay.innerHTML = "Try Again!";
            //alert(lifePoints);
            lifeReset(this)

        }



    });
}