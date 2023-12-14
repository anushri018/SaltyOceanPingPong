let imgBall;
let imgBG;
let imgSchlaeger1;
let imgSchlaeger2;
let sizeBall;
let imgStart;
let imgGameOver;
let myFont;

let spielerLx, spielerLy;
let spielerRx, spielerRy;

let posX, posY;
let speedBall;

let scoreLeft = 0;
let scoreRight = 0;
let screenCounter = 0;
let lastCollisionFrame = 0;
let leftScored = false;
let rightScored = false;

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  sizeBall = 30;

  posX = width / 2;
  posY = height / 2;

  speedBall = createVector(5, random(-5, 5));
  speedBall.setMag(7);

  spielerLx = 60;
  spielerRx = 740;
  spielerLy = height / 2;
  spielerRy = height / 2;
}

function preload() {
  imgBall = loadImage("assets/splash.png");
  imgBG = loadImage("assets/new1.png");
  imgSchlaeger1 = loadImage("assets/player2.png");
  imgSchlaeger2 = loadImage("assets/player1.png");
  imgStart = loadImage("assets/gamestart.png");
  imgGameOver = loadImage("assets/end.png");
  myFont = loadFont("assets/SaltyOcean.ttf");
}

function draw() {
  image(imgBG, 400, 300);
  if (screenCounter == 0) startScreen();
  if (screenCounter == 1) playGame();
  if (screenCounter == 2) gameOver();
}

function startScreen() {
  image(imgStart, width / 2, height / 2);
}

function gameOver() {
  image(imgGameOver, width / 2, height / 2);
  // Display scores
  textFont(myFont);
  textSize(34);
  textAlign(CENTER);
  fill(255);
  text("Left: " + scoreLeft, 100, 40);
  text("Right: " + scoreRight, width - 100, 40);
}

function mousePressed() {
  if (screenCounter === 0) {
    screenCounter = 1;
    resetGame();
  }
}

function resetGame() {
  posX = width / 2;
  posY = height / 2;
  scoreLeft = 0;
  scoreRight = 0;
}

function playGame() {
  leftScored = false;
  rightScored = false;

  posX += speedBall.x;
  posY += speedBall.y;

  // Draw ball
  image(imgBall, posX, posY, sizeBall * 5, sizeBall * 5);

  // Draw paddles
  image(imgSchlaeger2, spielerLx, spielerLy);
  image(imgSchlaeger1, spielerRx, spielerRy);

  
  // Check collisions with paddles
  if (
    posX + sizeBall / 2 > spielerRx - 25 &&
    posX - sizeBall / 2 < spielerRx + 25 &&
    posY + sizeBall / 2 > spielerRy - 75 &&
    posY - sizeBall / 2 < spielerRy + 75 &&
    !rightScored &&
    frameCount !== lastCollisionFrame
  ) {
    speedBall.x = -abs(speedBall.x);
    scoreRight++;
    rightScored = true;
    lastCollisionFrame = frameCount;
  }

  if (
    posX - sizeBall / 2 < spielerLx + 25 &&
    posX + sizeBall / 2 > spielerLx - 25 &&
    posY + sizeBall / 2 > spielerLy - 75 &&
    posY - sizeBall / 2 < spielerLy + 75 &&
    !leftScored &&
    frameCount !== lastCollisionFrame
  ) {
    speedBall.x = abs(speedBall.x);
    scoreLeft++;
    leftScored = true;
    lastCollisionFrame = frameCount;
  }


  // Check collisions with top and bottom walls
  if (posY + sizeBall / 2 > height || posY - sizeBall / 2 < 0) {
    speedBall.y = -speedBall.y;
  }

  // Check if the ball goes out of bounds
  if (posX + sizeBall / 2 < 0 || posX - sizeBall / 2 > width) {
    // No player caught the ball
    screenCounter = 2;
  }

  // Move paddles
  if (keyIsDown(87) && spielerLy > 40) spielerLy -= 5;
  if (keyIsDown(83) && spielerLy < height - 60) spielerLy += 5;

  if (keyIsDown(38) && spielerRy > 70) spielerRy -= 5;
  if (keyIsDown(40) && spielerRy < height - 50) spielerRy += 5;

  // Display scores
  textFont(myFont);
  textSize(34);
  textAlign(CENTER);
  fill(255);
  text("Left: " + scoreLeft, 100, 40);
  text("Right: " + scoreRight, width - 100, 40);

  // Check for game over
  if (scoreLeft >= 100 || scoreRight >= 100) {
    screenCounter = 2;
  }
}

function keyPressed() {
  // Restart the game when R key is pressed
  if (key === "R" || key === "r") {
    screenCounter = 0;
    resetGame();
  }
}

