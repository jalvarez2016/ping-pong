var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var btc = 4108.24; //USD or U.S. dollar
var dropBTC = false;
var btcY = 0;
var btcGotten = 0;

//power costs and positions

//comp reduce points
var powReduce = 3;
var powReduceX = 20;
var powReduceY = canvas.height -60;
var powReduceHeight = 40;
var powReduceWidth = 40;

//comp reduce size
var powSmall = 2;
var powSmallX = 80;
var powSmallY = canvas.height - 60;
var powSmallHeight = 40;
var powSmallWidth = 40;

//comp reduce speed
var powSpeed = 4;
var powSpeedX = 140;
var powSpeedY = canvas.height - 60;
var powSpeedHeight = 40;
var powSpeedWidth = 40;

var overallScore = 0;
var youScore = 0;
var compScore = 0;

var paddleHeight = 100;
var paddleY = 450;

var paddle2Y = 450;
var paddle2Speed = 8;
var paddle2Height = 100;

var ballX = canvas.width/2;
var ballSpeedX = 8;
var ballY = canvas.height/2;
var ballSpeedY = 5;

var showWinScreen = false;
var startScreen = true;

const winningScore = 8;

var framePerSecond = 50;

window.onload = function() {
  drawEverything();
  setInterval(function(){

    drawEverything();

   }, 1000/framePerSecond);

   canvas.addEventListener("mousedown", startGame);
   canvas.addEventListener("mousedown", handleMouseClick);
   canvas.addEventListener("mousedown", reducePoints);
   canvas.addEventListener("mousedown", reduceSize);
   canvas.addEventListener("mousedown", reduceSpeed);
   canvas.addEventListener("mousemove",
    function(evt){
      var mousePos = mousePosition(evt);
      paddleY = mousePos.y - (paddleHeight/2);
    }
   )
};

function startGame(evt){
  startScreen = false;
}

function reducePoints(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top -root.scrollTop;
  if( mouseX >= powReduceX && mouseX <= (powReduceX + powReduceWidth) ){
    if(mouseY >= powReduceX && mouseY <= (powReduceY + powReduceHeight)) {
      if(btcGotten >= powReduce){
        btcGotten -= powReduce;
        $("#btc").html(btcGotten + " btc");
        compScore = Math.floor(compScore/2);
      }
    }

  }
}


function reduceSize(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top -root.scrollTop;
  if( mouseX >= powSmallX && mouseX <= (powSmallX + powSmallWidth) ){
    if(mouseY >= powSmallX && mouseY <= (powSmallY + powSmallHeight)) {
      if(btcGotten >= powSmall){
        btcGotten -= powSmall;
        $("#btc").html(btcGotten + " btc");
        paddle2Height = paddle2Height/2;
      }
    }

  }
}

function reduceSpeed(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top -root.scrollTop;
  if( mouseX >= powSpeedX && mouseX <= (powSpeedX + powSpeedWidth) ){
    if(mouseY >= powSpeedX && mouseY <= (powSpeedY + powSpeedHeight)) {
      if(btcGotten >= powSpeed){
        btcGotten -= powSpeed;
        $("#btc").html(btcGotten + " btc");
        paddle2Speed = paddle2Speed/1.5;
      }
    }

  }
}



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
  if(startScreen){
    beginGame();
  } else {
    if(showWinScreen){
      win();
      return;
    }
    if(dropBTC){
      drawBTC();
    }
    score(youScore, compScore);
    coins();
    drawNet();
    drawPaddle();
    drawReducePow();
    drawSmallPow();
    drawSpeedPow();
    moveBall();
    draw2Paddle();
    resetBall();
  }
}

//begin game
function beginGame(){
  drawRect(canvas.width/2 - 200, canvas.height/2 - 60, 480, 100, "silver");
  drawRect(canvas.width/2 - 220, canvas.height/2 - 80, 480, 100, "grey");
  ctx.fillStyle = "white"
  ctx.font = "80px Arial";
  ctx.fillText("Click to start", canvas.width/2 - 200, canvas.height/2);
}

//draw net
function drawNet(){
  for(var i = 0; i<canvas.height; i+=40){
    drawRect(canvas.width/2 -1, i, 2, 20, "white");
  }
}

//drawing the click area for reduce compScore by floor of half
function drawReducePow(){
  if(powReduce <= btcGotten){
    drawRect(powReduceX, powReduceY, powReduceWidth, powReduceHeight, "#11890d");
    base_image.src = 'coin.png';
    ctx.drawImage(base_image, powReduceX + 12.5, powReduceY + 10);
  } else {
    drawRect(powReduceX, powReduceY, powReduceWidth, powReduceHeight, "#bf251e");
    base_image = new Image();
    base_image.src = 'coin.png';
    ctx.drawImage(base_image, powReduceX + 12.5, powReduceY + 10);
  }
}

function drawSmallPow(){
  if(powSmall <= btcGotten){
    drawRect(powSmallX, powSmallY, powSmallWidth, powSmallHeight, "#11890d");
    base_image.src = 'CoinPowersRed.png';
    ctx.drawImage(base_image, powSmallX + 12.5, powSmallY + 10);
  } else {
    drawRect(powSmallX, powSmallY, powSmallWidth, powSmallHeight, "#bf251e");
    base_image = new Image();
    base_image.src = 'CoinPowersRed.png';
    ctx.drawImage(base_image, powSmallX + 12.5, powSmallY + 10);
  }
}

function drawSpeedPow(){
  if(powSpeed <= btcGotten){
    drawRect(powSpeedX, powSpeedY, powSpeedWidth, powSpeedHeight, "#11890d");
    base_image.src = 'CoinPowersCold.png';
    ctx.drawImage(base_image, powSpeedX + 12.5, powSpeedY + 10);
  } else {
    drawRect(powSpeedX, powSpeedY, powSpeedWidth, powSpeedHeight, "#bf251e");
    base_image = new Image();
    base_image.src = 'CoinPowersCold.png';
    ctx.drawImage(base_image, powSpeedX + 12.5, powSpeedY + 10);
  }
}


function win(){
  ctx.fillStyle = "white"
  ctx.font = "30px Trajan";
  if(youScore >= winningScore){
    ctx.fillText("You won!!!", canvas.width/2 -50, canvas.height/3);
    ctx.fillText("Click To Continue", canvas.width/5 * 2, canvas.height/3 *2);
    updateScoreBoard();
  }
  if(compScore >= winningScore){
    ctx.fillText("The Computer Won", canvas.width/5 * 2, canvas.height/3);
    ctx.fillText("Click To Continue", canvas.width/5 * 2, canvas.height/3 *2);
  }



}

//ball functions

function drawBall(){
  drawCircle(ballX, ballY, 10, "white");
}

function resetBall(){
  if(ballX > canvas.width){
    var signX = Math.sign(ballSpeedX);
    var signY = Math.sign(ballSpeedY);
    ballSpeedX = 8 * signX;
    ballSpeedY = 5 * signY;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    overallScore = Math.floor(overallScore + 1);
    youScore++;
  }
  if(ballX < 0){
    var signX = Math.sign(ballSpeedX);
    var signY = Math.sign(ballSpeedY);
    ballSpeedX = 8 * signX;
    ballSpeedY = 5 * signY;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    compScore++;
  }
  if(youScore >= winningScore || compScore >= winningScore){
    showWinScreen = true;
  }
}

function moveBall(){
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if(paddleY < ballY && ballY < paddleHeight + paddleY && ballX <=0){
    ballSpeedX = -ballSpeedX;
    var delta = ballY - (paddleY + paddle2Height/2);
    ballSpeedY = delta * 0.35;
    drawCircle(ballX, ballY, 10, "white");
  }
  if(paddle2Y < ballY && ballY < (paddle2Height + paddle2Y) && ballX === canvas.width ){
    var delta = ballY - (paddle2Y + paddle2Height/2);
    ballSpeedY = delta * 0.35;
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
  var paddle2Center = paddle2Y + (paddle2Height/2);
  if( paddle2Center < ballY && (paddle2Y + paddle2Height) < canvas.height) {
    paddle2Y += paddle2Speed;
  } else if( paddle2Center > ballY && (paddle2Y + paddle2Height) < canvas.height) {
    paddle2Y -= paddle2Speed;
  } else {
    paddle2Y -= paddle2Speed;
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
  ctx.fillText(score1, canvas.width/5, canvas.height/4);

  ctx.font = "30px Arial";
  ctx.fillText(score2, canvas.width/4 * 3, canvas.height/4 );
}

//drop coins

var coinAmount = 5;

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
var coin2 = new coin(randx2Val, 0, 2, 3, 12);
var randx3Val = Math.floor(Math.random() * canvas.width);
var coin3 = new coin(randx3Val, 0, 2, 8, 12);
var randx4Val = Math.floor(Math.random() * canvas.width);
var coin4 = new coin(randx4Val, 0, 2, 7, 12);
var randx5Val = Math.floor(Math.random() * canvas.width);
var coin5 = new coin(randx5Val, 0, 2, 6, 12);

var currentCoin = [
      coin1,
      coin2,
      coin3,
      coin4,
      coin5
]

function drawCoins(x){
  for(var i = 0; i<x ; i++){
    //console.log(currentCoin[i]);
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
    if(ballX >= (currentCoin[i].coinX - currentCoin[i].coinHeight) && ballX <= (currentCoin[i].coinX + currentCoin[i].coinHeight)){
      if(ballY >= (currentCoin[i].coinY - currentCoin[i].coinHeight) && ballY <= (currentCoin[i].coinY + currentCoin[i].coinHeight)){
        console.log("hit!!!");
        btcGotten ++;
        $("#btc").html(btcGotten + " btc");
        drawBTC();
        dropBTC = true;
        //youScore += btc;
        currentCoin[i].coinHeight = 0;
      }
    }
  }
}

function drawBTC(){
  ctx.fillStyle = "white"
  ctx.font = "30px Arial";
  if(btcGotten == 1){
    ctx.fillText("You Got A Bit Coin!", canvas.width/2 -100, btcY);
    ctx.fillText("They're worth " + String(btc), canvas.width/2 -100, btcY- 100);
  } else if( btcGotten > 1){
    ctx.fillText("You Got "+ String(btcGotten) +" Bit Coins!", canvas.width/2 -100, btcY);
    ctx.fillText("They're worth " + String(btc), canvas.width/2 -100, btcY- 100);
  }



  btcY += 5;
  if(btcY > canvas.width){
    dropBTC = false;
    btcY = 0;
  }
}

//mouse click
function handleMouseClick(evt){
  if(showWinScreen){
    youScore = 0;
    compScore =0;
    paddle2Height = 100;
    paddle2Speed = 8;
    for(var i = 0; i<coinAmount ; i++){
    //console.log(currentCoin[i]);
      currentCoin[i].coinHeight = 12;
  }
    showWinScreen = false;
  }
}

//udate scoreboard outside of canvas
function updateScoreBoard(){
  $("#score").html(Math.floor(overallScore/winningScore) + " wins");
}
