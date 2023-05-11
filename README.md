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

- checkGameOver();
- resetGlobalVariables();
- score();
- updateGameArea();

States 

- Start Screen
- Game Screen (Canva)
- End Screen 

Task

1. Setup Github Repo
2. Create HTML, CSS and Javascript pages
3. Create Start Screen
4. Create Main Screen (Canva)
5. Create End Screen
6. Style Start Screen
7. Create Instructions 
8. Create Start Button
9. Add Functionality to Start Button
10. Make Plane
11. Make Plane move
12. Make Clouds and Birds
13. Make birds and clouds move
14. Make birds crash with plane
15. Create Shooting and bullets
16. Make bullets crash with birds
17. Add audio
18. Create Score
19. Create Endscreen 
20. Make Try again button
21. Style Endscreen 
22. Deploy game on Gitpages



Links
[Trello Link](https://trello.com/invite/b/QNt74Z0W/ATTIa8f7c485288693b05e848f4b9525a8ca8CEB89E6/project-tasks)

Slides Link

[Github repository Link](https://github.com/JelleWallenburg/FlyLikeABird.git)

Deployment Link