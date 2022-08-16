
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 7;

class snakePart{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

let tileCount = 20;
let tileSize = canvas.width/ tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity  = 0;
let yVelocity = 0;

let score = 0;

let gulpSound = new Audio("gulp.mp3");
let failSound = new Audio("fail.mp3");

//game loop
function drawGame(){

changheSnakePosition();
let result = isGameOver();

if(result){
  return;
}


clearScreen();

checkAppleCollision();
drawApple();
drawSnake();

drawScore();

if(score > 2){
  speed = 11;
}
if(score > 5){
  speed = 15;
}

setTimeout(drawGame, 1000/speed);

}

function isGameOver(){
  let gameOver = false;

  if(yVelocity ===0 && xVelocity ===0 ){
    return false;
  }

if(yVelocity === 0 && xVelocity === 0){
  return false;
}

  if(headX < 0){
    gameOver = true;
    failSound.play();
  }

  else if(headX === tileCount){
  gameOver = true;
    failSound.play();
  }

  else if(headY < 0){
    gameOver = true;
      failSound.play();
  }

  else if(headY === tileCount){
    gameOver = true;
      failSound.play();
  }

  for( let i = 0; i < snakeParts.length; i++ ){
    let part = snakeParts[i];
    if(part.x === headX && part.y === headY){
      gameOver = true;
      break;
        failSound.play();
    }
  }

  if(gameOver) {

    ctx.fillStyle = "#726AF2";
    ctx.font = "50px Verdana";

    ctx.fillText("Game Over!", canvas.width/6.5, canvas.height/2);
  }

  return gameOver;

}

function drawScore(){
  ctx.fillStyle = "#8991DB";
  ctx.font = "10px Verdana";
  ctx.fillText("Score" + score, canvas.width-50, 10);
}

function clearScreen(){

ctx.fillStyle = "#F5BCFF";
ctx.fillRect(0,0, canvas.width, canvas.height);

}

function drawSnake(){

ctx.fillStyle = "#8991DB";
 for(let i = 0; i < snakeParts.length; i++){
let part = snakeParts[i];
ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
 }

 snakeParts.push(new snakePart(headX, headY));
 while(snakeParts.length > tailLength){
   snakeParts.shift();
 }

 ctx.fillStyle = "#7068FF";
 ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function changheSnakePosition(){
headX = headX + xVelocity;
headY = headY + yVelocity;

}

function drawApple(){

ctx.fillStyle = "#91CFDB";
ctx.fillRect(appleX* tileCount, appleY*tileCount, tileSize, tileSize);

}

function checkAppleCollision(){

if(appleX == headX && appleY == headY){
  appleX = Math.floor((Math.random() * 17 + 1));
  appleY = Math.floor((Math.random() * 15 + 3));
  tailLength++;
  score++;
  gulpSound.play();
}

}

document.body.addEventListener("keydown", keyDown);

function keyDown(event){
//up
  if( event.keyCode == 38 ){
    if(yVelocity == 1)
    return;
  yVelocity = -1;
  xVelocity = 0;
  }
//down
  if( event.keyCode == 40 ){
    if(yVelocity == -1)
    return;
    yVelocity = 1;
    xVelocity = 0;
  }
  //right
  if( event.keyCode == 39 ){
    if(xVelocity == -1)
    return;
  yVelocity = 0;
  xVelocity = 1;
  }
  //left
  if( event.keyCode == 37 ){
    if(xVelocity == 1)
    return;
  yVelocity = 0;
  xVelocity = -1;
  }
}

drawGame();
