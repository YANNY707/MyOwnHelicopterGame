// Reference Code:
var bg, bgImg
var bottomGround
var topGround
var helicopter, helicopterImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var gameOver, gameOverImg
var restart, restartImg

var score = 0;

//game states      
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
bgImg = loadImage("Assets/BG.png")

helicopterIMG = loadAnimation("Assets/helicopter.jpg")

gameOverImg= loadImage("Assets/gameOver.png")
restartImg = loadImage("Assets/restart.png")
obs1 = loadImage("Assets/rubicon.jpg")
obs2 = loadImage("Assets/bob.png")

}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3
      
//creating helicopter     
helicopter = createSprite(100,200,20,50);
helicopter.addAnimation("helicopter",helicopterIMG);
helicopter.scale = 0.2;
helicopter.debug = true;

//initialising groups
topObstaclesGroup = new Group();
barGroup = new Group();

//creating game over and restart sprites
gameOver = createSprite(220,200);
restart = createSprite(220,240);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(restartImg);
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false;
}

function draw() {
  
  background("black");

  

  if(gameState === PLAY){

    //making the hot air helicopter jump
    if(keyDown("space")) {
      helicopter.velocityY = -6 ;
      
    }

    //adding gravity
     helicopter.velocityY = helicopter.velocityY + 2;

     
    Bar();

    //spawning top and bottom obstacles
    spawnObstaclesTop();

//condition for END state
if(topObstaclesGroup.isTouching(helicopter) ){

gameState = END;

}
  }

  if(gameState === END) 
    {
          gameOver.visible = true;
          gameOver.depth = gameOver.depth+1
          restart.visible = true;
          restart.depth = restart.depth+1
          
          //all sprites should stop moving in the END state
          helicopter.velocityX = 0;
          helicopter.velocityY = 0;
          topObstaclesGroup.setVelocityXEach(0);
          barGroup.setVelocityXEach(0);
  
          //setting -1 lifetime so that obstacles don't disappear in the END state
          topObstaclesGroup.setLifetimeEach(-1);
         
          helicopter.y = 200;
          
          //resetting the game
          if(mousePressedOver(restart)) 
          {
                reset();
          }

    } 

    drawSprites();
    Score();     
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();

  score=0;
}


function spawnObstaclesTop() 
{
  if(World.frameCount % 60 === 0) {
    obstacleTop = createSprite(400,50,40,50);

//obstacleTop.addImage(obsTop1);

obstacleTop.scale = 0.1;
obstacleTop.velocityX = -4;

//random y positions for top obstacles
obstacleTop.y = Math.round(random(10,100));

//generate random top obstacles
var rand = Math.round(random(1,2));
switch(rand) {
  case 1: obstacleTop.addImage(obs1);
          break;
  case 2: obstacleTop.addImage(obs2);
          break;
  default: break;
}

 //assign lifetime to the variable
obstacleTop.lifetime = 100;

helicopter.depth = helicopter.depth + 1;

topObstaclesGroup.add(obstacleTop);

  }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
        
          
          bar.velocityX = -6
          bar.depth = helicopter.depth;
          bar.lifetime = 70;
          bar.visible = false;

          barGroup.add(bar);
         }
}

function Score()
{
         if(helicopter.isTouching(barGroup))
         {
           score = score + 1;
         }
        textFont("calibri");
        textSize(30);
        fill("yellow");
        text("Score: "+ score, 250, 50);
       
  
}