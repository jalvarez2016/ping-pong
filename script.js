var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var btc = 4108.24; //USD or U.S. dollar

var youScore = 0;
var compScore = 0;

var paddleHeight = 100;
var paddleY = 450;

var paddle2Y = 200;
var paddle2Speed = 10;
var paddle2Height = 200;

var ballX = 50;
var ballSpeedX = 8;
var ballY = 50;
var ballSpeedY = 5;

var framePerSecond = 50;

window.onload = function() {
  drawEverything();
  setInterval(function(){

    drawEverything();

   }, 1000/framePerSecond);

   canvas.addEventListener("mousemove",
    function(evt){
      var mousePos = mousePosition(evt);
      paddleY = mousePos.y - (paddleHeight/2);
    }
   )
};

//gets mouse position

function mousePosition(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top -root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  }
}

//what it sounds like (calls all other functions)

function drawEverything(){
  drawRect(0, 0, canvas.width, canvas.height, "black");
  score(youScore, compScore);
  coins();
  drawPaddle();
  moveBall();
  draw2Paddle();
  resetBall();
}

//ball functions

function drawBall(){
  drawCircle(ballX, ballY, 10, "white");
}

function resetBall(){
  if(ballX > canvas.width){
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    youScore++;
  }
  if(ballX < 0){
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    compScore++;
  }
}

function moveBall(){
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if(paddleY < ballY && ballY < paddleHeight + paddleY && ballX <=0){
    console.log(paddleY, ballY, paddleHeight + paddleY);
    ballSpeedX = -ballSpeedX;
    drawCircle(ballX, ballY, 10, "white");
  }
  if(paddle2Y < ballY && ballY < (paddle2Height + paddle2Y) && ballX === canvas.width ){
    console.log(paddle2Y, paddle2Y + paddle2Height, ballY);
    ballSpeedX = -ballSpeedX;
    drawCircle(ballX, ballY, 10, "white");
  }
  if(ballY >= canvas.height || ballY <= 0){
    ballSpeedY = -ballSpeedY;
    drawCircle(ballX, ballY, 10, "white");
  }

  drawBall();
}

//paddle funcitons

function drawPaddle(){
  drawRect(0, paddleY, 10, paddleHeight, "white");
}
function draw2Paddle(){
  drawRect(canvas.width-10, paddle2Y, 10, paddle2Height, "white");
  movePaddle2();
}

function movePaddle2(){
  paddle2Y += paddle2Speed;
  if(paddle2Y + paddle2Height >= canvas.height || paddle2Y <= 0){
    paddle2Speed = -paddle2Speed;
  }
}

//draw rect and circle funcitons

function drawRect(topX, topY, width, height, drawColor){
  ctx.fillStyle= drawColor;
  ctx.fillRect(topX, topY, width, height);
}

function drawCircle(topX, topY, radius, drawColor){
  ctx.fillStyle = drawColor;
  ctx.beginPath();
  ctx.arc(topX, topY, radius, 0, 2 * Math.PI);
  ctx.fill();
}

//adds scores

function score(score1, score2){
  ctx.fillStyle = "white"

  ctx.font = "30px Arial";
  ctx.fillText(score1, canvas.width/4, canvas.height/4);

  ctx.font = "30px Arial";
  ctx.fillText(score2, canvas.width/4 * 3, canvas.height/4 );
}

//drop coins

var coinAmount = 2;

function coin(coinX, coinY, coinSpeedX, coinSpeedY, coinHeight){
  this.coinX = coinX;
  this.coinY = coinY;
  this.coinSpeedX = coinSpeedX;
  this.coinSpeedY = coinSpeedY
  this.coinHeight = coinHeight;
}

var randx1Val = Math.floor(Math.random() * canvas.width);
var coin1 = new coin(randx1Val, 0, 1, 5, 12);
var randx2Val = Math.floor(Math.random() * canvas.width);
var coin2 = new coin(randx2Val, 0, 2, 6, 12);

var currentCoin = [
      coin1,
      coin2
]

function drawCoins(x){
  for(var i = 0; i<x ; i++){
    console.log(currentCoin[i]);
    drawCircle(currentCoin[i].coinX, currentCoin[i].coinY, currentCoin[i].coinHeight, "yellow");
    drawCircle(currentCoin[i].coinX, currentCoin[i].coinY, currentCoin[i].coinHeight/2, "orange");
  }
}

function coins(){
  drawCoins(coinAmount);
  for(var i = 0; i<coinAmount ; i++){
    currentCoin[i].coinX += currentCoin[i].coinSpeedX;
    currentCoin[i].coinY += currentCoin[i].coinSpeedY;
    if((currentCoin[i].coinY + currentCoin[i].coinHeight) >= canvas.height || currentCoin[i].coinY <= 0 ){
      currentCoin[i].coinSpeedY = -currentCoin[i].coinSpeedY;
    }
    if(currentCoin[i].coinX >= canvas.width || currentCoin[i].coinX <= 0){
      currentCoin[i].coinSpeedX = -currentCoin[i].coinSpeedX;
    }
    if(ballX >= currentCoin[i].coinX && ballX <= (currentCoin[i].coinX + currentCoin[i].coinHeight)){
      if(ballY >= currentCoin[i].coinY && ballY <= (currentCoin[i].coinY + currentCoin[i].coinHeight)){
        console.log("hit!!!");
        youScore += btc;
        currentCoin[i].coinHeight = 0;
      }
    }
  }
}
