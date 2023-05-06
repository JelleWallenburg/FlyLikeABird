// create images 
const backgroundImg= new Image();
backgroundImg.src= './images/background.png';
const planeImg= new Image();
planeImg.src= './images/plane/Fly (1).png';
const birdImg= new Image();
birdImg.src= './images/birds/bird1.png';
const cloudImg= new Image();
cloudImg.src= './images'

// create game area
const myGameArea ={
    canvas: document.getElementById('canvas'),
    frames: 0,
    width: this.canvas.width,
    height: this.canvas.height,
    context: null,
    interval: null,

    start: function(){
        this.context=this.canvas.getContext('2d');
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
        const ctx = myGameArea.context;
        ctx.drawImage(planeImg, this.x, this.y, this.width, this.height);
    }

    updateBirds(){
        const ctx = myGameArea.context;
        ctx.drawImage(birdImg, this.x, this.y, this.width, this.height);
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

//create
const plane = new component(80, myGameArea.height/2, 443/2,302/2)

//create birds
myBirds = [];
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
myClouds = [];
function updateClouds(){
    myGameArea.frames +=1;

    if(myGameArea.frames % 120 == 0){
        let y= Math.random()*myGameArea.height;
        myClouds.push(new component(myGameArea.width, y, 100, 90))
    }

    for(let i=0; i< myClouds.length; i++){
        myClouds[i].x -=1;
        myClouds[i].updateClouds();
    }
    let y= Math.random()*myGameArea.height;
    myClouds

}


// check if plane hit birds
function checkGameOver(){
    const crashed = myBirds.some(function (bird) {
      return plane.crashWith(bird);
    })
  
    if (crashed) {
      myGameArea.stop();
    }
  }





//update game area
function updateGameArea(){
    myGameArea.clear();
    myGameArea.context.drawImage(backgroundImg, 0, 0, myGameArea.width, myGameArea.height);
    plane.newPos();
    plane.updatePlane();
    updateBirds();
    checkGameOver();
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
    }

});

document.addEventListener('keyup', (e) => {
    plane.speedX = 0;
    plane.speedY = 0;
});

// window.onload = () => {
//     document.getElementById('start-button').onclick= () => {
//         myGameArea.start()
//     }
// }

myGameArea.start();