// create images 
const backgroundImg = new Image();
backgroundImg.src = './images/background.png';
const planeImg = new Image();
planeImg.src = './images/plane/Fly (1).png';

// create game area
const myGameArea ={
    canvas: document.getElementById('canvas'),
    frames: 0,
    width: this.canvas.width,
    height: this.canvas.height,
    context: null,

    start: function(){
        this.context=this.canvas.getContext('2d');
                this.interval= setInterval(updateGameArea, 20);
    },

    clear: function (){
        this.context.clearRect(0, 0, this.width, this.height);
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

    update(){
    const ctx = myGameArea.context;
    ctx.drawImage(planeImg, this.x, this.y, this.width, this.height)
    }

    newPos(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

const plane = new component(80,80, 443/2,302/2)

function updateGameArea(){
    myGameArea.clear();
    myGameArea.context.drawImage(backgroundImg, 0, 0, myGameArea.width, myGameArea.height);

    plane.update()
};

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
      // trigger the jump
        player.speedY -= 1;
        break;
      case 40: // down arrow
        player.speedY += 1;
        break;
      case 37: // left arrow
        player.speedX -= 1;
        break;
      case 39: // right arrow
        player.speedX += 1;
        break;
    }
});

document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0;
});

// window.onload = () => {
//     document.getElementById('start-button').onclick= () = {
//         myGameArea.start()
//     }
// }

myGameArea.start()