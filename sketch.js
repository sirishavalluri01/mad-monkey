var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score ,back_Image , backgr

function preload(){
  
  back_Image = loadImage("jungle.jpg");
  monkey_running = loadImage("kittu.png");
  
  bananaImage = loadImage("bottle2.png");
  obstaceImage = loadImage("cactus.png");
 
}



function setup() {
  createCanvas(800,400);
  
  
  backgr=createSprite(0,0,300,300);
  backgr.addImage("back",back_Image);
  backgr.scale=1.2;
  backgr.x=backgr.width/4;
  backgr.velocityX=-6;


  var survivalTime=0;
  
   
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addImage("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.15;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background("black");
  
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
    if(backgr.x < 100){
    backgr.x=backgr.width/2;
  }
  
  
   if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
   
  drawSprites();
  
    if(obstaclesGroup.isTouching(monkey)){
       
     
        ground.velocityX = 0;
        monkey.velocityY = 0;
      backgr.velocityX = 0;
       obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
          fill("white");
      textSize(50);
      text("gameover",250,200);
       
           }
   
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.09;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}