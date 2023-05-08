// create images 
const backgroundImg= new Image();
backgroundImg.src= './images/background.png';

const planeImg1= new Image();
planeImg1.src= './images/plane/Fly (1).png';
const planeImg2= new Image();
planeImg2.src= './images/plane/Fly (2).png';

const bullets= new Image();
bullets.src='images/bullet/Bullet (1).png'

const birdImg= new Image();
birdImg.src= './images/birds/bird1.png';

const cloudImg= new Image();
cloudImg.src= './images/clouds/cloud1.png';

const bulletImg= new Image();
bulletImg.src= './images/bullet/Bullet (1).png';;

let audio = document.getElementById("audio");
audio.autoplay = true;


// setting size of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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


//create plane
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

// class bullet {
  //  constructor(x,y,width,height, velocity){
    //    this.x=x;
      //  this.y=y;
       // this.width=width;
       // this.height=height;
       // this.velocity=velocity;
     //   this.radius=3
     //}

     //updateBullets(){
     //myGameArea.context.drawImage(bullets, plane.x, plane.y, this.width, this.height, 3);
    // }
//}
 

//create
let plane = new component(80, myGameArea.height/2, 443/2,302/2);

//create birds
let myBirds = [];
function updateBirds(){
    myGameArea.frames +=1;

    if (myGameArea.frames % 120 === 0) {
        let y= Math.random()*myGameArea.height;
        myBirds.push(new component(myGameArea.width, y, 133 ,100))
    }

    for(let i=0; i <myBirds.length; i++){
        myBirds[i].x -= 1;
        myBirds[i].updateBirds();
    }
}

//create clouds
let myClouds = [];
// function updateClouds(){
//     myGameArea.frames +=1;

//     if(myGameArea.frames % 120 == 0){
//         let y= Math.random()*myGameArea.height;
//         myClouds.push(new component(myGameArea.width, y, 100, 90))
//     }

//     for(let i=0; i< myClouds.length; i++){
//         myClouds[i].x -=1;
//         myClouds[i].updateClouds();
//     }
//     let y= Math.random()*myGameArea.height;
// }


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
      audio.autoplay = false;
    }
}

// reset global variables
function resetGlobalVariables(){
    myClouds= [];
    myBirds= [];
    myGameArea.frames=0;
    plane = new component(80, myGameArea.height/2, 443/2,302/2);
}

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
    checkGameOver();
    score();
};

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
        //case 49: // spacebar
        //myGameArea.context.drawImage(bullets, plane.x, plane.y, 10, 10, 0);
       //break;
        
    }
});

document.addEventListener('keyup', (e) => {
    plane.speedX = 0;
    plane.speedY = 0;
});

document.getElementById('game-board').style.display = 'none';

window.onload = () => {
    document.getElementById('start-button').onclick= () => {
       myGameArea.start()
       document.getElementById('game-board').style.display = 'block';
       document.getElementById('game-intro').style.display = 'none';
       audio.load();
    }
     document.getElementById('restart-button').onclick= () =>{
        document.getElementById('game-board').style.display = 'block';
        document.getElementById('end-screen').style.display = 'none';
        resetGlobalVariables();
        myGameArea.start();
    }
}