// create images 
const backgroundImg= new Image();
backgroundImg.src= './images/background.png';

const planeImg1= new Image();
planeImg1.src= './images/plane/Fly (1).png';
const planeImg2= new Image();
planeImg2.src= './images/plane/Fly (2).png';

const birdImg= new Image();
birdImg.src= './images/birds/bird1.png';

const cloudImg= new Image();
cloudImg.src= './images/clouds/cloud1.png';

const bulletImg1= new Image();
bulletImg1.src='images/bullet/Bullet (1).png'
const bulletImg2= new Image();
bulletImg2.src='images/bullet/Bullet (2).png'
const bulletImg3= new Image();
bulletImg3.src='images/bullet/Bullet (3).png'
const bulletImg4= new Image();
bulletImg4.src='images/bullet/Bullet (4).png'
const bulletImg5= new Image();
bulletImg5.src='images/bullet/Bullet (5).png'

// audio
let audio = document.getElementById("audio");
let gameOverAudio = document.getElementById("game-over-audio");


// setting size of the canvas
canvas.width = window.innerWidth-4;
canvas.height = window.innerHeight-4;

// create game area
const myGameArea ={
    canvas: document.getElementById('canvas'),
    context: this.canvas.getContext('2d'),
    frames: 0,
    width: this.canvas.width,
    height: this.canvas.height,
    interval: null,

    start: function(){
        this.interval= setInterval(updateGameArea, 10);
    },

    clear: function (){
        this.context.clearRect(0, 0, this.width, this.height);
    },

    stop: function(){
        clearInterval(this.interval);
    },
};


//create class for plane and birds
class component {
    constructor(x, y, width, height ){
        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;

        this.speedX = 0;
        this.speedY = 0;
    }

    updatePlane(){




        if (myGameArea.frames % 2 === 0) {
            myGameArea.context.drawImage(planeImg2, this.x, this.y, this.width, this.height);
           } else {
            myGameArea.context.drawImage(planeImg1, this.x, this.y, this.width, this.height);
           };

    }

    updateBirds(){
        myGameArea.context.drawImage(birdImg, this.x, this.y, this.width, this.height);
    }

    updateClouds(){
        myGameArea.context.drawImage(cloudImg, this.x, this.y, this.width, this.height);
    } 

    updateBullets(){
        if (myGameArea.frames % 5 === 0){
            myGameArea.context.drawImage(bulletImg1, this.x, this.y, this.width, this.height);
        } else if (myGameArea.frames % 4 === 0){
            myGameArea.context.drawImage(bulletImg2, this.x, this.y, this.width, this.height);
         }else if (myGameArea.frames % 3 === 0){
            myGameArea.context.drawImage(bulletImg3, this.x, this.y, this.width, this.height);
        } else if (myGameArea.frames % 2 === 0){
            myGameArea.context.drawImage(bulletImg4, this.x, this.y, this.width, this.height);
        } else {
            myGameArea.context.drawImage(bulletImg5, this.x, this.y, this.width, this.height);
        }
    }  

    newPos(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    left (){
        return this.x;
    }
    right(){
        return this.x+ this.width;
    }
    top (){
        return this.y;
    }
    bottom(){
        return this.y+ this.height;
    }

    crashWith (bird){
        return !(this.bottom() < bird.top() || this.top() > bird.bottom() || this.right() < bird.left() || this.left() > bird.right());
    }
}

//create plane
let plane = new component(80, myGameArea.height/2, 443/2,302/2);

//create birds
let myBirds = [];
function updateBirds(){
    myGameArea.frames +=1;

    if (myGameArea.frames % 150 === 0) {
        let y= Math.random()*myGameArea.height;
        myBirds.push(new component(myGameArea.width, y, 100 ,70))
    }

    for(let i=0; i <myBirds.length; i++){
        myBirds[i].x -= 1;
        myBirds[i].updateBirds();
    }
}


let myClouds = [];
function updateClouds(){
    // myGameArea.frames +=1;

    if(myGameArea.frames % 120 == 0){
        let y= Math.random()*myGameArea.height;
        myClouds.push(new component(myGameArea.width, y, 150, 100))
    }

    for(let i=0; i< myClouds.length; i++){
        myClouds[i].x -=1;
        myClouds[i].updateClouds();
    }
    let y= Math.random()*myGameArea.height;
}

// create bullets
let myBullets =[];
function updateBullets(){
    for(let i=0; i < myBullets.length; i++){
        myBullets[i].x +=2;
        myBullets[i].updateBullets();
    }
}


//controls
document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
        if(plane.y <=0){
            plane.y= 0;
        } else{
            plane.speedY -= 1;
        }
        break;
      case 40: // down arrow
        if(plane.y >= myGameArea.canvas.height - plane.height) {
            plane.speedY= myGameArea.canvas.height - plane-height;
        } else{
            plane.speedY +=1;
        }
        break;
      case 37: // left arrow
        if(plane.x <= 0){
            plane.x= 0;
        } else{
            plane.speedX -= 1;
        }
        break;
      case 39: // right arrow
        if(plane.x >= myGameArea.canvas.width- plane.width){
            plane.x= myGameArea.canvas.width - plane.width;
        } else {
            plane.speedX = 1;  
        }
        break;
      case 32: // spacebar
        myBullets.push(new component((plane.x+0.7*plane.width), (plane.y+0.65*plane.height), 40, 40))
        break; 
    }
});


// document.addEventListener('keydown', (e) => {
//     switch (e.keyCode) {
//         case 32:

//     }


document.addEventListener('keyup', (e) => {
    plane.speedX = 0;
    plane.speedY = 0;
});

// check if plane hit birds
function checkGameOver(){
    const crashed = myBirds.some(function (bird) {
      return plane.crashWith(bird);
    })
  
    if (crashed) {
      myGameArea.stop();
      document.getElementById('end-screen').style.display ='block';
      document.getElementById('game-board').style.display = 'none';
      document.getElementById('endscore').innerHTML= points;
      document.getElementById("audio").muted = true;
      gameOverAudio.play();
      
      

    }
}
console.log(gameOverAudio);

// reset global variables
function resetGlobalVariables(){
    myClouds= [];
    myBirds= [];
    myGameArea.frames=0;
    plane = new component(80, myGameArea.height/2, 443/2,302/2);
}

// score
let points= null;
function score(){
    points = Math.floor(myGameArea.frames/5);
    myGameArea.context.font= '30px serif';
    myGameArea.context.fillStyle = 'black';
    myGameArea.context.drawImage(cloudImg, myGameArea.width - 250, 20, 220, 100);
    myGameArea.context.fillText(`Score: ${points}`, myGameArea.width - 200, 70);
}

//update game area
function updateGameArea(){
    myGameArea.clear();
    myGameArea.context.drawImage(backgroundImg, 0, 0, myGameArea.width, myGameArea.height);
    plane.newPos();
    plane.updatePlane();
    updateBirds();
    updateClouds();
    updateBullets();
    checkGameOver();
    score();
};


// buttons
document.getElementById('game-board').style.display = 'none';

// start button
window.onload = () => {
    document.getElementById('start-button').onclick= () => {
       myGameArea.start()
       document.getElementById('game-board').style.display = 'block';
       document.getElementById('game-intro').style.display = 'none';
       audio.play();
    }

// try again button
     document.getElementById('restart-button').onclick= () =>{
        document.getElementById('game-board').style.display = 'block';
        document.getElementById('end-screen').style.display = 'none';
        document.getElementById("game-over-audio").muted = true;
        document.getElementById("audio").muted = false;
        resetGlobalVariables();
        myGameArea.start();
    }
}