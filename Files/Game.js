var can= document.getElementById("can").getContext("2d");
can.font= '40px Italic';
can.fillStyle = "white";

var frameCount =0;
var WIDTH=1000;
var HEIGHT=800;
var count=0;
var score = 0;
var collisionCount =0;
var waveCount =0;
var up = false;
var down = false;
var left = false;
var right = false;

var upm = false;
var downm = false;
var leftm = false;
var rightm = false;

var player;
var HighestScore= null;
var paused = false;
var Gameover = false;
var replay = false;


var Img= {};

Img.player = new Image();
Img.player.src = "IMG/player.png";

Img.enemy = new Image();
Img.enemy.src = "IMG/enemy1.png";

Img.upgrade = new Image();
Img.upgrade.src = "IMG/water.gif";

Img.bullet = new Image();
Img.bullet.src = "IMG/bullet.png";

Img.hp = new Image();
Img.hp.src = "IMG/hp.png";

Img.p = new Image();
Img.p.src = "IMG/wave.png";

Img.enemy1 = new Image();
Img.enemy1.src = "IMG/enemy2.png";

Img.enemy2 = new Image();
Img.enemy2.src = "IMG/bottle.png";

Img.enemy3 = new Image();
Img.enemy3.src = "IMG/garbage.png";

Img.enemy4 = new Image();
Img.enemy4.src = "IMG/can.png";

Gos= new Audio("Audio/Go.wav");
Gos.repeat = false;

enemyCol= new Audio("Audio/enemyCol.mp3");
hp= new Audio("Audio/hp.wav");
upgrade= new Audio("Audio/upgrade.mp3");
wave= new Audio("Audio/wave.mp3");
backgroundSound = new Audio("Audio/bgS.mp3");

createPlayer =function(){
  player ={
    type:'player',
    x:500,
    y:500,
    spdX:15,
    spdY:15,
    name:"P",
    hp:20,
    width:80,
    height:80,
    img: Img.player,
    aimAngle:0,
	MovingCounter :0,

    pressigRight : false,
    pressigLeft : false,
    pressigUp : false,
    pressigDown : false,
    };
}
var enemyList = {};
var upgradeList = {};
var bulletList = {};


collidesornot = function(entity1,entity2){
   var rect1= {
        x:entity1.x-entity1.width/2,
        y:entity1.y-entity1.height/2,
        width:entity1.width,
        height:entity1.height,
	}
	var rect2= {
	    x:entity2.x-entity2.width/2,
        y:entity2.y-entity2.height/2,
        width:entity2.width,
        height:entity2.height,
	}
	return testCollisionRect(rect1,rect2);
}

Enemy= function(name,x,y,spdX,spdY,width,height,category,img) {
var enemy={
type:'enemy',
x:x,
y:y,
spdX:spdX,
spdY:spdY,
name:name,
width:width,
height:height,
category:category,
img:img,
};
enemyList[name]=enemy;
}

Upgrade= function(name,x,y,spdX,spdY,width,height,category,img) {
var upgrade={
type:'upgrade',
x:x,
y:y,
spdX:spdX,
spdY:spdY,
name:name,
width:width,
height:height,
category:category,
img:img,

};
upgradeList[name]=upgrade;
}

bullet= function(name,x,y,spdX,spdY,width,height,img) {
var bullet={
type:'bullet',
x:x,
y:y,
spdX:spdX,
spdY:spdY,
name:name,
width:width,
height:height,
img:img,
timer:0,
};
bulletList[name]=bullet;
}

randomlyGenerateBullet =function(actor,overwriteAngle){
Math.random()
   var x= actor.x;
   var y= actor.y;
   var height= 40;
   var width= 40;
   var name= Math.random();
   var angle= actor.aimAngle;
   var img = Img.bullet;
   
   if (overwriteAngle !== undefined){
    angle = overwriteAngle;
   }
   var spdX=Math.cos(angle/180*Math.PI)*5;
   var spdY=Math.sin(angle/180*Math.PI)*5;
   
   bullet(name,x,y,spdX,spdY,width,height,img);
}


document.oncontextmenu = function(mouse) {  
    if (collisionCount >0){

	  for (var angle =0; angle<360; angle++){
	    randomlyGenerateBullet(player,angle);
	  }
	  wave.play();
	  waveCount++;
	  collisionCount--;
    }
	mouse.preventDefault(); 
}

Movement= function(x){   
  if (x=="Up"){
    
	upm = true;
    downm = false;
    leftm = false;
    rightm = false;
	
	up = true;
	down = false;
	left = false;
	right = false;
  }
  
  if (x=="Down"){
  
    upm = false;
    downm = true;
    leftm = false;
    rightm = false;

    down = true;
	up = false;
	left = false;
	right = false;
  }
  
  if (x=="Left"){
	
	upm = false;
    downm = false;
    leftm = true;
    rightm = false;

    left = true;
	up = false;
	down = false;
	right = false;
  }
  
   if (x=="Right"){
	
	upm = false;
    downm = false;
    leftm = false;
    rightm = true;

	right = true;
	up = false;
	down = false;
	left = false;
  }
  
  if(x=="attack"){
    if (collisionCount >0){

	for (var angle =0; angle<360; angle++){
	  randomlyGenerateBullet(player,angle);
	  }
	  wave.play();
	  waveCount++;
	  collisionCount--;
    }
  }
  
  if (x=="Pause"){
     paused = !paused;
  }
  
  if (x=="Play"){
    location.reload();
  }

}


document.onkeydown = function(event){
   if (event.keyCode ===87){
       up = true;
       player.pressigUp =true;}
    else if (event.keyCode ===83){
       down = true;
       player.pressigDown =true;}
	else if (event.keyCode ===65){
	   left = true;
       player.pressigLeft =true;}
	else if (event.keyCode ===68){
	   right = true;
       player.pressigRight =true;}
	   
    else if (event.keyCode ===80){
       paused = !paused;}
	else if (event.keyCode ===32){
       replay = false;}
} 

document.onkeyup = function(event){
   if (event.keyCode ===68){
       right = false;
       player.pressigRight =false;}
    else if (event.keyCode ===83){
	   down = false;
       player.pressigDown =false;}
	else if (event.keyCode ===65){
	   left = false;
       player.pressigLeft =false;}
	else if (event.keyCode ===87){
	   up = false;
       player.pressigUp =false;}
} 

updateEntity = function(entity){
   updatingEntity(entity);
   if (entity.type == 'player'){
      drawEntityPlayer(entity);
    }else{
    drawEntity(entity);}
}

updatingEntity=function(entity){
    if (entity.type ==='player'){
		
	    if (player.pressigRight)
           player.x +=15;
	    if (player.pressigLeft)
            player.x -=15;
	    if (player.pressigDown)
            player.y +=15;
	    if (player.pressigUp)
            player.y -=15;
			
	    if (rightm == true)
           player.x +=15;
	    if (leftm == true)
            player.x -=15;
	    if (downm == true)
            player.y +=15;
	    if (upm == true)
            player.y -=15;
	
	    if (player.x < player.width/2)
            player.x=player.width/2;			
        if (player.x > currentMap.width-player.width/2 ) 
            player.x= currentMap.width -player.width/2;
        if (player.y < player.height/2)
	        player.y = player.height/2;
        if (player.y > currentMap.height-player.height/2) 
            player.y = currentMap.height-player.height/2;
		
        if (player.pressigDown || player.pressigLeft || player.pressigRight || player.pressigUp ){
		  player.MovingCounter+=1;
		}
		
		if (rightm || leftm || downm || upm ){
          player.MovingCounter+=1;
        }
			
	} else {
	    entity.x += entity.spdX;
	    entity.y += entity.spdY;	
		
	    if (entity.x<0 || entity.x>currentMap.width){
	        entity.spdX = -entity.spdX;
	    }
	    if (entity.y<0 || entity.y>currentMap.height){
	        entity.spdY =-entity.spdY;
	    }	
	}
} 

testCollisionRect = function(rect1,rect2){
   return rect1.x <= rect2.x+rect2.width
         && rect1.x <= rect2.x+rect2.width
         && rect2.x <= rect1.x+rect1.width
         && rect1.y <= rect2.y+rect2.height
         && rect2.y <= rect1.y+rect1.height;
}

drawEntity = function(entity){
    can.save();
     
    var x = entity.x - player.x;	 
    var y  = entity.y - player.y;
	
	x += WIDTH/2;
	y += HEIGHT/2;
	
	x -= entity.width/2;
	y -= entity.height/2;
	
	can.drawImage(entity.img,
	    0,0,entity.img.width, entity.img.height,
		x,y, entity.width,entity.height
	);
	can.restore();
}



drawEntityPlayer = function(entity){
    can.save();
     
    var x = entity.x - player.x;	 
    var y  = entity.y - player.y;
	
	x += WIDTH/2;
	y += HEIGHT/2;
	
	x -= entity.width/2;
	y -= entity.height/2;
	
	var frameWidth = entity.img.width/3;
	var frameHeight = entity.img.height/4;
	
	var aimAngle = entity.aimAngle;
	if (aimAngle < 0)
	   aimAngle = 360 + aimAngle;
	
	var directionMod =0;
	
	if (right==true)
	    directionMod = 2;
	else if (left==true)
	    directionMod = 1;
    else if (up==true)
	    directionMod =3;
    else if (down==true)
	    directionMod =0;
		
	var movingMod = entity.MovingCounter %3;
	
	can.drawImage(entity.img,
	    movingMod*frameWidth,directionMod*frameHeight,frameWidth, frameHeight,
		x,y, entity.width,entity.height
	);
}

checkHs = function(){
    var HS = localStorage.getItem('HS');
    
	if (HS){
	   if (Number(HS) < score){
	      localStorage.removeItem('HS');
	      localStorage.setItem('HS',score);
		  HS = localStorage.getItem('HS');
	   }
	    return HS;  
	}else{
	   HS = localStorage.setItem('HS',score);
	   HS = localStorage.getItem('HS');
	   return HS;
	}
}

update = function(){
  
  if (paused){
    can.fillText('Paused',300, 250);
    return;
  }
  
   if (Gameover==true){
    collisionCount=0;
    can.font = "80px Italic";
    can.fillText('Game Over',150, 250);
	can.font = "30px Italic";
    can.fillText('Score: '+score,300, 300);
    can.fillText('Waves: '+waveCount,300, 350);
	HighestScore = checkHs();
	can.fillText('Top Score : '+HighestScore,280,400)
	can.fillText("Press Space or Re-load to Play again ",150,600);
	
	if (replay==true){
	   return;
	}else if (replay==false){
	  Gameover = false;
	  startNewGame();
	}
  }else{
   backgroundSound.play();
  }
  
  if (count == 5){
    collisionCount+= 1;
	count-= 5;
	
  }
  can.clearRect(0,0,WIDTH,HEIGHT);
  currentMap.draw();
  frameCount++;
  
  if (frameCount%100 == 0){randomlyGenerateEnemy();}
  if (frameCount%200 == 0){randomlyGenerateUpgrade();}
  
  
   for (var i in upgradeList) {
       updateEntity(upgradeList[i]);
	   
	   var colliding= collidesornot(player,upgradeList[i]);
	    if (colliding){
		  if (upgradeList[i].category =='1'){
		     score++;
			 upgrade.play();
			 count++;
		    }else{
			  player.hp += 5;
			  hp.play();
			}
		  delete upgradeList[i];
	    }
    }
	
	for (var i in bulletList) {
      updateEntity(bulletList[i]);
	  
	  bulletList[i].timer++;
	  if (bulletList[i].timer>75){
	     delete bulletList[i];
		 continue;
	  }
	  
	  for (var j in enemyList) {
	  	var colliding= collidesornot(bulletList[i],enemyList[j]);
	    if (colliding){
		  delete bulletList[i];
		  delete enemyList[j];
		  break;
	    }
      }
	}
  
  for (var i in enemyList) {
    updateEntity(enemyList[i]);
	
	var colliding= collidesornot(player,enemyList[i]);
	if (colliding){
	    player.hp=player.hp-1;
		enemyCol.play();
	}
  }
    if (player.hp<=0){
		EndGame();
	}
    updateEntity(player);
	can.fillText(player.hp,20,30);
	can.drawImage(Img.hp,80,-5,40,45);
	can.fillText("Score: " +score,280,30);
	can.drawImage(Img.upgrade,450,0,35,35);
	can.fillText(collisionCount,660,30);
	can.drawImage(Img.p,690,0,45,40);
}

EndGame = function() {
   Gos.play();
   replay = true;
   Gameover = true;
}

startNewGame =function() {
player.hp=20;
frameCount=0;
score=0;
count=0;
collisionCount=0;
waveCount=0;
enemyList={};
upgradeList={};

randomlyGenerateEnemy();
randomlyGenerateEnemy();
randomlyGenerateEnemy();
}

randomlyGenerateEnemy =function(){
Math.random()
   var x= Math.random()*currentMap.width;
   var y= Math.random()*currentMap.height;
   var height= 50;
   var width= 40;
   var name= Math.random();
   var spdX= 2 + Math.random()*5;
   var spdY= 2 + Math.random()*5;
   
   switch (Math.floor(Math.random() * 5)) {
    case 0:
       category = '1';
	   img = Img.enemy;
       break;
    case 1:
       category ='2';
	   img = Img.enemy1;
       break;
    case 2:
      category ='2';
	  img = Img.enemy2;
      break;
    case 3:
	  category ='4';
	  img = Img.enemy3;
      break;
    case 4:
      category ='5';
	  img = Img.enemy4;
      break;
	}
   
   Enemy(name,x,y,spdX,spdY,width,height,category,img);
}

randomlyGenerateUpgrade =function(){
Math.random()
   var x= Math.random()*currentMap.width;
   var y= Math.random()*currentMap.height;
   var height= 40;
   var width= 40;
   var name= Math.random();
   var spdX=0;
   var spdY=0;
   
   if (Math.random()<0.99 ){
      var category = '1';
	  var img = Img.upgrade;
    }else{
	  var category = '2';
	  var img = Img.hp;
	}
   
   Upgrade(name,x,y,spdX,spdY,width,height,category,img);
}

Maps = function(name,imgSrc, width, height){
   var entity = {
      name:name,
      image: new Image(),
      width:width,
      height:height,
   }
   entity.image.src = imgSrc;
   
   entity.draw = function() {
   var x = WIDTH/2 - player.x;
   var y = HEIGHT/2 - player.y;
   can.drawImage(entity.image,0,0,entity.image.width,entity.image.height,x,y,entity.image.width*4,entity.image.height*4)
   }
   return entity;
}

currentMap = Maps('feild','img/map.png',2450,2640);

createPlayer();
startNewGame();


setInterval(update,40);