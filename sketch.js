var balloon,balloonImage1,balloonImage2;
//var coin,coinImage;
// create database and position variable here
var database;
var position;
var sound;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  
   sound = loadSound("sound.mp3");
   sound2 = loadSound("sound2.mp3");
   sound3 = loadSound("sound3.mp3");
   //coinImage = loadImage("gameCoin.png");
  }
 

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  //coin = createSprite(300,300,20,20);
  //coin.image("coinImage");

//reading the position of balloon from database
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readPosition,showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updateHeight(-10,0);
     if (!sound3.isPlaying()){
       sound3.play();
     }
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updateHeight(10,0);
     if (!sound3.isPlaying()){
       sound3.play();
     }
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    updateHeight(0,-10);
    balloon.scale = balloon.scale -0.01
     if (!sound2.isPlaying()){
       sound2.play();
     }
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updateHeight(0,10);
    balloon.scale = balloon.scale +0.01
    if (!sound.isPlaying()){
      sound.play();
    }
  }

  drawSprites();

//code for writing text at the top right corner
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

//reading and then updating the height of the balloon from database
function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

//to display the following text in console if there is any error
function showError(){
  console.log("error in writing to tha database")
}