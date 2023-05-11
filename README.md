FLY LIKE A BIRD

// Click here to see deployed game

Description

Fly Like a Bird is a game where the player controls a plane and moves him in order to survive the longest amount of time while ducking/shooting the birds incoming. The game ends when a bird crashes with the plane. After the game ends, a score is calculate based on the amount of time the player survived.

MVP

The plane moves when the user presses the arrow keys
The plane shoots when the user presses spacebar
When the birds are hit with plane bullets, they disappear
Ships have a reload time for shooting cannonballs noticible by the change in flag color.
Birds and clouds appear randomly in the y axis
A score is calculated based on the amount of time the game lasted.

Backlog

Adding a one time only action
Adding other type of planes and enemies
Adding difficulty as game progresses
Adding a boss fight when a time is reached.
Improving the UI

Data structure

const myGameArea {
 - start();
 - clear();
 - stop();
}

class component {
     - this.x
     - this.y
     - this.width
     - this.height
     - this.speedX
     - this.speedY

- updatePlane();
- updateBirds();
- updateClouds();
- updateBullets();
- newPos();
- left();
- right();
- top();
- bottom();
- crashwith(bird);
}

checkGameOver();
resetGlobalVariables();
score();
updateGameArea();

States 

Start Screen
Game Screen (Canva)
End Screen 

// Task

Setup Github Repo
Create HTML, CSS and Javascript pages
Create Start Screen
Create Main Screen (Canva)
Create End Screen
Style Start Screen
Create Instructions 
Create Start Button
Add Functionality to Start Button
Make Plane
Make Plane move
Make Clouds and Birds
Make birds and clouds move
Make birds crash with plane
Create Shooting and bullets
Make bullets crash with birds
Add audio
Create Score
Create Endscreen 
Make Try again button
Style Endscreen 
Deploy game on Gitpages



// Links
Trello Link [https://trello.com/invite/b/QNt74Z0W/ATTIa8f7c485288693b05e848f4b9525a8ca8CEB89E6/project-tasks]

Slides Link

Github repository Link [https://github.com/JelleWallenburg/FlyLikeABird.git]

Deployment Link