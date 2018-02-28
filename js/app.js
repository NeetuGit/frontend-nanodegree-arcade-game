
// Enemies our player must avoid
let score=0;

var Enemy = function(x, y, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	 this.x = -100;

    // randomly assign a row to enemy
    setRow = function() {
   
	 let factor=Math.random();
      if (factor < 0.33)
        this.y = 60;  // first row
      else if (factor > 0.66)
        this.y = 150;  // second row
      else
        this.y = 230;  // third row
      return this.y;
    };

    this.y = setRow();

    // set randomized speed between limits 50 to 150
   
	this.speed=Math.floor(Math.random() * ((150 - 50) + 1));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	 this.x = this.x + this.speed * dt;
     if (this.x > 505)  // reset enemy once off-screen
      this.reset();
};
Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = setRow();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite){ 
	this.sprite ='images/char-pink-girl.png';
	this.x=202;
	this.y=404;
};
// reset location of player
Player.prototype.reset = function() {
    this.x = 202;  // reset to starting location
    this.y = 404; 
};

Player.prototype.win = function() {
  alert("YOU WON! Your score is :" +score); 
};

Player.prototype.update = function(x, y) {
	
  //  this.handleInput();	
    this.checkCollisions();

	if (this.y < -10) {
	    console.log("you win");
	    score=score+5;
        this.win(); 	  
        this.reset();
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

// define actions of key inputs on player
Player.prototype.handleInput = function(arrow) {
	
    if (arrow == 'left' && this.x > 100)
      this.x = this.x - 101;

    else if (arrow == 'up' && this.y > -11)  // y = -11 sets player in top row
      this.y = this.y - 83; 
	
    else if (arrow == 'right' && this.x < 404)
      this.x = this.x + 101;

    else if (arrow == 'down' && this.y < 404)
      this.y = this.y + 83;
};

Player.prototype.checkCollisions = function() {
  
    for (e = 0; e < 3; e++) {
      if (allEnemies[e].x < this.x + 65 &&
        allEnemies[e].x + 80 > this.x &&
        allEnemies[e].y < this.y + 65 &&
        65 + allEnemies[e].y >this.y) {
        console.log("Collision!");		
		score=score-1; // score is reducing by 1 every time player collides with bug
        this.reset();
      }
    } 
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(),new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	if (e.defaultPrevented ) { 	
    return; // Do nothing if the event was already processed
  }
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
	e.preventDefault();
	 
},false);
