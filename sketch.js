var bg, bgimg;
var balloon, balloonimg;
var bottomGround, topGround;
var obstacleTop, obstop1, obstop2;
var obstacleBottom, obsbottom1, obsbottom2, obsbottom3;
var bottomObstacleGroup, topObstacleGroup;
var gameOver, gameOverimg;
var restart, restartimg;
//gamestate
var play = 1
var end = 0
var gamestate = play
var score = 0
var bargroup;


function preload() {
  bgimg = loadImage("assets/bg.png")
  balloonimg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  obstop1 = loadImage("assets/obsTop1.png")
  obstop2 = loadImage("assets/obsTop2.png")
  obsbottom1 = loadImage("assets/obsBottom1.png")
  obsbottom2 = loadImage("assets/obsBottom2.png")
  obsbottom3 = loadImage("assets/obsBottom3.png")
  gameOverimg = loadImage("assets/gameOver.png")
  restartimg = loadImage("assets/restart.png")
  jumpsound = loadSound("assets/jump.mp3")
  diesound = loadSound("assets/die.mp3")

}

function setup() {
  bg = createSprite(165, 700, 10, 10);
  bg.addImage(bgimg)
  bg.scale = 2

  balloon = createSprite(100, 200, 20, 50)
  balloon.addAnimation("balloon", balloonimg)
  balloon.scale = 0.2
  //creating bottomGround
  bottomGround = createSprite(200, 395, 800, 20)
  bottomGround.visible = false
  //creating topGround
  topGround = createSprite(200, 10, 800, 20)
  topGround.visible = false
  //defining group
  bottomObstacleGroup = new Group();
  topObstacleGroup = new Group();
  bargroup = new Group();
  //creating sprite for gameOver and restart
  gameOver = createSprite(220, 200)
  restart = createSprite(220, 240)
  gameOver.addImage(gameOverimg)
  gameOver.scale = 0.5
  restart.addImage(restartimg)
  restart.scale = 0.5
  gameOver.visible = false
  restart.visible = false

}

function draw() {
  background("black")
  //executing code according to gamestate
  if (gamestate == play) {
    //making the hotair balloon jump
    if (keyDown("space")) {
      balloon.velocityY = -6
      jumpsound.play()
      
    }
    //adding gravity
    balloon.velocityY += 2
    //calling function
    Bar();
    //calling function
    spawnObstaclesTop()
    spawnObstaclesBottom()
    //checking condition for gamestate end
    if (topObstacleGroup.isTouching(balloon) || balloon.isTouching(topGround) || bottomObstacleGroup.isTouching(balloon)
      || balloon.isTouching(bottomGround)
    ) {
      //change gamestate from play to end
      gamestate = end
      diesound.play()

    }


  }
  if (gamestate == end) {
    console.log("game ended")
    //all sprites should stop moving in the end state
    balloon.velocityX = 0
    balloon.velocityY = 0
    topObstacleGroup.setVelocityXEach(0)
    bottomObstacleGroup.setVelocityXEach(0)
    //set lifetime - 1 so the obstacles don't disappear in the gamestate end
    topObstacleGroup.setLifetimeEach(-1)
    bottomObstacleGroup.setLifetimeEach(-1)
    balloon.y = 200
    //change the visible property
    gameOver.visible = true
    restart.visible = true
    //resetting the game
    if (mousePressedOver(restart)) {
      reset()

    }

  }
  drawSprites()
  Score()

}

function reset(){
  gamestate=play
  gameOver.visible=false
  restart.visible=false
  topObstacleGroup.destroyEach()
  bottomObstacleGroup.destroyEach()
  score=0

}

function spawnObstaclesBottom() {
  if (frameCount % 60 == 0) {
    obstacleBottom = createSprite(400, 350, 40, 50)
    obstacleBottom.velocityX = -4
    var r = Math.round(random(1, 3))
    switch (r) {
      case 1: obstacleBottom.addImage(obsbottom1)
        break;
      case 2: obstacleBottom.addImage(obsbottom2)
        break;
      case 3: obstacleBottom.addImage(obsbottom3)
        break;
    }
    obstacleBottom.scale = 0.1
    obstacleBottom.lifetime = 100
    bottomObstacleGroup.add(obstacleBottom)
  }
}

function spawnObstaclesTop() {
  if (frameCount % 60 == 0) {
    obstacleTop = createSprite(400, 50, 40, 50)
    obstacleTop.velocityX = -4;
    //selecting random pictures
    var r = Math.round(random(1, 2))
    switch (r) {
      case 1: obstacleTop.addImage(obstop1)
        break;
      case 2: obstacleTop.addImage(obstop2)
        break;
    }
    //scale the size
    obstacleTop.scale = 0.1
    //random vertical position for obstacles
    obstacleTop.y = Math.round(random(10, 100))
    obstacleTop.lifetime = 100
    //upending sprite in the group
    topObstacleGroup.add(obstacleTop)

  }


}

function Bar() {
  if (frameCount % 60 == 0) {
    var bar = createSprite(400, 200, 10, 800)
    bar.velocityX = -6
    bar.lifetime = 70
    bar.visible = false
    bargroup.add(bar)


  }
}

function Score() {
  if (balloon.isTouching(bargroup)) {
    score = score + 1
  }
  textFont("algerian")
  textSize(30)
  fill("black")
  text("score=" + score, 250, 50)
}