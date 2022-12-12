//game contant and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("1 (2).wav");
const gameOverSound = new Audio("gameover.wav");
const moveSound = new Audio("1 (1).wav");
const musicSound = new Audio("backMusic.mp3");

//
let speed = 10;
let score = 0;
let lastPaintTime = 0;
//
let snakeArr = [
  {
    x: 13,
    y: 15,
  },
];

//
let food = { x: 3, y: 5 };

//gamme functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
//isCollide function
function isCollide(snake) {
  //if the snake bump by own
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //if the snake bump in wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y > 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  //Upadating snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 }; //reset inputDir
    alert("Game over. Please press any key to play again!.");
    snakeArr = [{ x: 13, y: 15 }]; //when user press any key then game starts again then start the snake from inputDir to this
    // musicSound.play(); //play music sound
    score = 0;
  }
  //if you have eaten the food , increment the score the regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    //this conditon denote that if both food and snake coordinate match then the snake eat the food
    foodSound.play();
    score += 1; //to display score
    //high score ----------------------------
    if(score>highscore){
      highscoreValue = score;
      localStorage.setItem("highscore",JSON.stringify(highscoreValue));
      highScoreBox.innerHTML= "High score : "+highscoreValue;
    }
    //---------------------------
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    }); //increase the snake
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }; //generating new food on random position
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //Display the snake
  board.innerHTML = ""; //clean whatever present in the body
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here

//high score
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
  highscoreValue = 0;
  localStorage.setItem("highscore", JSON.stringify(highscoreValue));
} else {
  highscoreValue = JSON.parse(highscore);
  highScoreBox.innerHTML = "High Score :" + highscore;
}
//
window.requestAnimationFrame(main); //syntax :- window.requestAnimationFrame(function) and it call the function only one time that's why we put same inside main() also its present paint the window because we also need to paint the screen during the game play.
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
