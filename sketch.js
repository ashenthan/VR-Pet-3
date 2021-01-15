//Create variables here
var dog, dogImg,happyDogImg, database, foodS, foodStock;
var feedBtn, addFoodBtn,fedTime, lastFed,foodObj ;
var bedroom, garden, washroom,gameState;
var isFed = false;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
  //LOAD THE IMAGES OF THE 3 ROOMS
 washroom = loadImage("images/Wash Room.png")
 bedroom = loadImage("images/Bedroom.png")
garden  = loadImage("images/Garden.png")
}

function setup() {
  createCanvas(600, 500);
  database = firebase.database();
  dog = createSprite(250,250)
  dog.addImage("dog",dogImg)
  dog.addImage("doghappy",happyDogImg)
  dog.scale = 0.1;
  getFoodStock();
  
  
  feedBtn = createButton("Feed Dog")
  feedBtn.position(700,75)
  addFoodBtn = createButton("Add Food")
  addFoodBtn.position(800,75)
  foodObj = new Food();
  
  // read the value of gamestate from Db
  database.ref("gameState").on("value",function(data){
    gameState = data.val()
  })
}


function draw() {  

  background(46, 139, 87);
  fill("red")
  stroke("white")
  text("Press UP ARROW TO FEED DOG", 150, 50);
  
  
  foodObj.foodStock = foodS;
  
  readTime();
  showTime(lastFed);
  addFoodBtn.mousePressed(function(){
    getFoodStock();
    addFood(foodS);
  });
  feedBtn.mousePressed(function(){
    getFoodStock();
    feedDog();
  })
  
  if(gameState !== "hungry"){
// hide feedbtn, addFoodBtn and dog
    addFoodBtn.hide()
    dog.visible = false
    feedBtn.hide()
  }
  else{
    addFoodBtn.show()
    dog.visible = true
    feedBtn.show()  }

  if(hour()===lastFed+1){
    // show Garden
    foodObj.showGarden()

    //update Game State to playing
    updategameState("play")
  }
  else if(hour()>=lastFed+2 && hour()<=lastFed+4){
    //show Wash Room();
    foodObj.showWashRoom()
    //update GameState to bathing
    updateGameState("bathing")
  }
  else{
    //update Game State to hungry
    updateGameState("hungry")
    foodObj.display();
  }
  drawSprites();
  

}

function showTime(time){
if(time>=12){
  text("LastFeed :"+time%12 +"PM",350,300)
}
else if(time===0){
  text("LastFeed : 12 AM",350,300)
}else{
  text("LastFeed :"+time +"PM",350,300)
}
}

function addFood(f){
  f++;
  database.ref('/').update({
    Food : f
  })
}
function getFoodStock(){
  database.ref("Food").on("value",function(data){
    foodS = data.val();
  })
}
function feedDog(){
  foodS--;
  isFed = true;
  dog.changeImage("doghappy",happyDogImg);
  database.ref("/").update({
    FeedTime:hour(),
    Food:foodS
  })
}
function readTime(){
  database.ref('FeedTime').on("value",function(data){
    lastFed = data.val();
    
  });
}
function readGameState(){
//write function to read gamestate
database.ref("gameState").on("value", function(data){
gameState=data.val()

})

}
function updateGameState(state){
  //write function to update gamestate
  database.ref("/").update({
    gameState: state
  })
}