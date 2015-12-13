// Map each class of actor to a character
var levelP = 0;
//document.background.style.background = "red";
var actorChars = {
  "@": Player,
  "o": Coin, // A coin will wobble up and down
  "=": Lava, "|": Lava, "V": Lava,
  "*": Spike,  "+": Spike, "D": Spike,
  "%": Hostile, "~": Hostile, "#": Hostile,
  "H": HealthP, "Q": Bullet, "Y": HostileF,
  "z": BulletH, "q": BulletH2, "a": PhaseBlock,
  "s": HostileBlock, "U": HostileI, "t": TextO,
  "i": Key, "Z": HostileF2, "n": HostileF3, "N": HostileF4, 
  "j": HostileF5, "J": HostileF6, "G": Block, "g": TextIO,
  "v": Badguy
};

function Level(plan) {
  // Use the length of a single row to set the width of the level
  this.width = plan[0].length;
  // Use the number of rows to set the height

  this.height = plan.length;

  // Store the individual tiles in our own, separate array
  this.grid = [];

  // Store a list of actors to process each frame
  this.actors = [];
//console.log("running")
  // Loop through each row in the plan, creating an array in our grid
  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];

    // Loop through each array element in the inner array for the type of the tile
    for (var x = 0; x < this.width; x++) {
      // Get the type from that character in the string. It can be 'x', '!' or ' '
      // If the character is ' ', assign null.

      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      // Use if and else to handle the three cases
      if (Actor)
        // Create a new actor at that grid position.
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
	
	else if (ch == "X")
        fieldType = "wallX";
	
	else if (ch == "b")
        fieldType = "building";
      // Because there is a third case (space ' '), use an "else if" instead of "else"
      else if (ch == "!")
        fieldType = "lava";
	
	else if (ch == "^")
        fieldType = "spike";
	
	else if (ch == "I")
        fieldType = "bouncerblock";
	else if (ch == "r")
        fieldType = "wall2";
	else if (ch == "R")
        fieldType = "wall2X";

      // "Push" the fieldType, which is a string, onto the gridLine array (at the end).
      gridLine.push(fieldType);
    }
    // Push the entire row onto the array of rows.
    this.grid.push(gridLine);
	//console.log(this.actors)
  }
  //console.log(this.actors)
  // Find and assign the player character and assign to Level.player
  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
}
//console.log(this.actors)
//console.log(Level)

//console.log(Level.actors)
// Check if level is finished
Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

function Vector(x, y) {
  this.x = x; this.y = y;
}

// Vector arithmetic: v_1 + v_2 = <a,b>+<c,d> = <a+c,b+d>
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

// Vector arithmetic: v_1 * factor = <a,b>*factor = <a*factor,b*factor>
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};


// A Player has a size, speed and position.
function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
  this.direction = "right";
}
Player.prototype.type = "player";

// Add a new actor type as a class
function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";

function Key(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2;
}
Key.prototype.type = "key";

function TextO(pos) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
TextO.prototype.type = "texto";

function TextIO(pos) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
TextIO.prototype.type = "textio";

function Badguy(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}
Badguy.prototype.type = "badguy";

function HealthP(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2;
}
HealthP.prototype.type = "healthP";

function Hostile(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "%") {
    this.speed = new Vector(2, 0);	
  } else if (ch == "#")  {	
    this.speed = new Vector(-2, 0);
  } else if (ch == "~") {
    this.speed = new Vector(4, 0);
  }
}
Hostile.prototype.type = "hostile";

function HostileF(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
HostileF.prototype.type = "hostilef";

function HostileF2(pos, ch) {
 this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
HostileF2.prototype.type = "hostilef2";

function HostileF3(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
HostileF3.prototype.type = "hostilef3";

function HostileF4(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
HostileF4.prototype.type = "hostilef4";

function HostileF5(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
HostileF5.prototype.type = "hostilef5";

function HostileF6(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
HostileF6.prototype.type = "hostilef6";

function HostileI(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(4, 0);
}
HostileI.prototype.type = "hostilei";

function HostileBlock(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
HostileBlock.prototype.type = "hostileblock";

function BulletH(pos) {
	//console.log("fired")
  this.pos = new Vector(posH.x + 1, posH.y);
  this.size = new Vector(.6, .6);
  this.speed = new Vector ( 8, 0)
  }
BulletH.prototype.type = "bulleth";

function BulletH2(pos) {
	//console.log("fired")
  this.pos = new Vector(posH2.x - 1, posH2.y);
  this.size = new Vector(.6, .6);
  this.speed = new Vector ( -8, 0)
  }
BulletH2.prototype.type = "bulleth2";

function BulletH3(pos) {
	//console.log("fired")
  this.pos = new Vector(posH3.x - 1, posH3.y);
  this.size = new Vector(.6, .6);
  this.speed = new Vector ( -8, 0)
  }
BulletH3.prototype.type = "bulleth3";

function BulletH4(pos) {
	//console.log("fired")
  this.pos = new Vector(posH4.x - 1, posH4.y);
  this.size = new Vector(.6, .6);
  this.speed = new Vector ( -8, 0)
  }
BulletH4.prototype.type = "bulleth4";

function BulletH5(pos) {
	//console.log("fired")
  this.pos = new Vector(posH5.x + 1, posH5.y);
  this.size = new Vector(.6, .6);
  this.speed = new Vector ( 8, 0)
  }
BulletH5.prototype.type = "bulleth5";

function BulletH6(pos) {
	//console.log("fired")
  this.pos = new Vector(posH6.x + 1, posH6.y);
  this.size = new Vector(.6, .6);
  this.speed = new Vector (  8, 0)
  }
BulletH6.prototype.type = "bulleth6";

function PhaseBlock(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
PhaseBlock.prototype.type = "phaseblock";

function Block(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}
Block.prototype.type = "block";

function Bullet(pos, direction) {
	//console.log("bullet 3")
	
	this.size = new Vector(.6, .6)
	if (direction == "right"){
	this.pos = new Vector(posZ.x + 1,posZ.y + .5)
	this.speed = new Vector(14, 0)
	} else if (direction == "left"){
	this.speed = new Vector(-14, 0)
	this.pos = new Vector(posZ.x - 1,posZ.y + .5)
	}
	//console.log(Level.actors)
}
Bullet.prototype.type = "bullet";

// Lava is initialized based on the character, but otherwise has a
// size and position
function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "=") {
    // Horizontal lava
    this.speed = new Vector(2, 0);
  } else if (ch == "|") {
    // Vertical lava
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    // Drip lava. Repeat back to this pos.
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";

function Spike(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "+") {
    // Horizontal lava
    this.speed = new Vector(2, 0);
		
  } else if (ch == "*")  {
	  	
    // Vertical lava
    this.speed = new Vector(2, 0);
  } else if (ch == "D") {
    // Drip lava. Repeat back to this pos.
    this.speed = new Vector(4, 0);
   
  }
}
Spike.prototype.type = "spike";

// Helper function to easily create an element of a type provided 
function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

// Main display class. We keep track of the scroll window using it.
function DOMDisplay(parent, level) {

// this.wrap corresponds to a div created with class of "game"
  this.wrap = parent.appendChild(elt("div", "game"));
  this.level = level;

  // In this version, we only have a static background.
  this.wrap.appendChild(this.drawBackground());

  // Keep track of actors
  this.actorLayer = null;

  // Update the world based on player position
  this.drawFrame();
  //console.log(this.actorLayer)
}
//console.log(this.actorLayer)
var scale = 20;

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  table.style.width = this.level.width * scale + "px";

  // Assign a class to new row element directly from the string from
  // each tile in grid
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

// All actors are above (in front of) background elements.  
DOMDisplay.prototype.drawActors = function() {
  // Create a new container div for actor dom elements
  var wrap = elt("div");

  // Create a new element for each actor each frame
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  // Update the status each time with this.level.status"
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;

  // We want to keep player at least 1/3 away from side of screen
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var player = this.level.player;
  // Change coordinates from the source to our scaled.
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

// Remove the wrap element when clearing the display
// This will be garbage collected
DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

// Return the first obstacle found given a size and position.
Level.prototype.obstacleAt = function(pos, size) {
  // Find the "coordinate" of the tile representing left bound
  var xStart = Math.floor(pos.x);
  // right bound
  var xEnd = Math.ceil(pos.x + size.x);
  // top bound
  var yStart = Math.floor(pos.y);
  // Bottom bound
  var yEnd = Math.ceil(pos.y + size.y);

  // Consider the sides and top and bottom of the level as walls
  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wallX";
  if (yEnd > this.height)
    return "lava";

  // Check each grid position starting at yStart, xStart
  // for a possible obstacle (non null value)
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if (fieldType) return fieldType;
    }
  }
};

// Collision detection for actors is handled separately from 
// tiles. 
Level.prototype.actorAt = function(actor) {
  // Loop over each actor in our actors list and compare the 
  // boundary boxes for overlaps.
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    // if the other actor isn't the acting actor
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      // check if the boundaries overlap by comparing all sides for
      // overlap and return the other actor if found
      return other;
  }
};

// Update simulation each step based on keys & step size
Level.prototype.animate = function(step, keys) {
  // Have game continue past point of win or loss
  if (this.status != null)
    this.finishDelay -= step;

  // Ensure each is maximum 100 milliseconds 
  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      // Allow each actor to act on their surroundings
      actor.act(thisStep, this, keys);
    }, this);
   // Do this by looping across the step size, subtracing either the
   // step itself or 100 milliseconds
    step -= thisStep;
  }
};

Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

Bullet.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
  var obstacle = level.obstacleAt(newPos, this.size);
  if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
  }else if(obstacle){
	 level.bulletTouched(obstacle);
	 //console.log("bullet touched")
	 //removeSelf();
	 //this.actors = this.actors.filter(function(bullet) {
    //  return bullet != actor;
   // });
   level.bD(this)
  }
  if (otherActor){
	  level.bulletTouched(otherActor.type, otherActor)
	  level.bD(this)
  }
  
};

Level.prototype.bD = function(name){

	this.actors = this.actors.filter(function(actor) {
      return name != actor;
    });
	
	//console.log(this.actors)
}

Spike.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};
function timerR(){
		reset = 0
		//console.log("bullet touched")
		console.log(reset)
	}
	
var reset = 0

Hostile.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
 }else if (this.repeatPos){
    this.pos = this.repeatPos;
  }
  else{
    this.speed = this.speed.times(-1);
  }
};

TextO.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else if (otherActor)
	  this.speed = this.speed.times(-1);
  else
    this.speed = this.speed.times(-1);
};

TextIO.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else if (otherActor)
	  this.speed = this.speed.times(-1);
  else
    this.speed = this.speed.times(-1);
};

Badguy.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else if (otherActor)
	  this.speed = this.speed.times(-1);
  else
    this.speed = this.speed.times(-1);
};

var posH = [];
var hF = 0
var mHF = 0
HostileF.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
 if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
 }else if (this.repeatPos){
    this.pos = this.repeatPos;
  }
  else{
    this.speed = this.speed.times(-1);
  }
  posH = this.pos
  //console.log(posH)
  if (mHF == 0){
  bulletH()
  mHF = 1
  setTimeout(timerHF, 3000)
  }
};

function timerHF(){
	mHF = 0
}

function bulletH(){
	//console.log("fired")
	hF = 1
   // console.log(hF)	
}

var posH2 = [];
var hF2 = 0
var mHF2 = 0
HostileF2.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
 if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
 }else if (this.repeatPos){
    this.pos = this.repeatPos;
  }
  else{
    this.speed = this.speed.times(-1);
  }
  posH2 = this.pos
  //console.log(posH)
  if (mHF2 == 0){
	bulletH2()
	mHF2 = 1
	setTimeout(timerHF2, 3000)
 }
};

function timerHF2(){
	mHF2 = 0
}

function bulletH2(){
	hF2 = 1 
}

var posH3 = [];
var hF3 = 0
var mHF3 = 0
HostileF3.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
 if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
 }else if (this.repeatPos){
    this.pos = this.repeatPos;
  }
  else{
    this.speed = this.speed.times(-1);
  }
  posH3 = this.pos
  //console.log(posH)
  if (mHF3 == 0){
	bulletH3()
	mHF3 = 1
	setTimeout(timerHF3, 3000)
 }
};

function timerHF3(){
	mHF3 = 0
}

function bulletH3(){
	hF3 = 1 
}

var posH4 = [];
var hF4 = 0
var mHF4 = 0
HostileF4.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
 if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
 }else if (this.repeatPos){
    this.pos = this.repeatPos;
  }
  else{
    this.speed = this.speed.times(-1);
  }
  posH4 = this.pos
  //console.log(posH)
  if (mHF4 == 0){
	bulletH4()
	mHF4 = 1
	setTimeout(timerHF4, 3000)
 }
};

function timerHF4(){
	mHF4 = 0
}

function bulletH4(){
	hF4 = 1 
}

var posH5 = [];
var hF5 = 0
var mHF5 = 0
HostileF5.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
 if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
 }else if (this.repeatPos){
    this.pos = this.repeatPos;
  }
  else{
    this.speed = this.speed.times(-1);
  }
  posH5 = this.pos
  //console.log(posH)
  if (mHF5 == 0){
	bulletH5()
	mHF5 = 1
	setTimeout(timerHF5, 3000)
 }
};

function timerHF5(){
	mHF5 = 0
}

function bulletH5(){
	hF5 = 1 
}

var posH6 = [];
var hF6 = 0
var mHF6 = 0
HostileF6.prototype.act = function(step, level) {
  var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
 if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
 }else if (this.repeatPos){
    this.pos = this.repeatPos;
  }
  else{
    this.speed = this.speed.times(-1);
  }
  posH6 = this.pos
  //console.log(posH)
  if (mHF6 == 0){
	//bulletH6()
	mHF6 = 1
	setTimeout(timerHF6, 3000)
 }
};

function timerHF6(){
	mHF6 = 0
}

function bulletH6(){
	hF6 = 1 
}

HostileI.prototype.act = function(step, level) {
	var otherActor = level.actorAt(this)
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size)){
    this.pos = newPos;
 }else if (this.repeatPos){
    this.pos = this.repeatPos;
  }
  else{
    this.speed = this.speed.times(-1);
  }
};

HostileBlock.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

PhaseBlock.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

Block.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

BulletH.prototype.act = function(step, level) {
	//console.log("fired")
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    level.bD(this);
};

BulletH2.prototype.act = function(step, level) {
	//console.log("fired")
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    level.bD(this);
};

BulletH3.prototype.act = function(step, level) {
	//console.log("fired")
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    level.bD(this);
};

BulletH4.prototype.act = function(step, level) {
	//console.log("fired")
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    level.bD(this);
};

BulletH5.prototype.act = function(step, level) {
	//console.log("fired")
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    level.bD(this);
};

BulletH6.prototype.act = function(step, level) {
	//console.log("fired")
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    level.bD(this);
};

var maxStep = 0.05;

var wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};

Key.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};

HealthP.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};


var maxStep = 0.05;

var playerXSpeed = 7;

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;
  if (keys.left) this.direction = "left";
  if (keys.right) this.direction = "right";

  var motion = new Vector(this.speed.x * step, 0);
  // Find out where the player character will be in this frame
  var newPos = this.pos.plus(motion);
  // Find if there's an obstacle there
  var obstacle = level.obstacleAt(newPos, this.size);
  // Handle lava by calling playerTouched
  
  /*if (otherActor == "PhaseBlock" && phase == 0){
	  this.pos = pos
  }*/
  if (obstacle)
    level.playerTouched(obstacle);
  else
    // Move if there's not an obstacle there.
    this.pos = newPos;
};

function playerXSpeedReset(){
	playerXSpeed = 7;
	//jumpSpeed = 17;
}

function playerBlocked(phase){
	playerXSpeed = -7;
	//jumpSpeed = -17;
	setTimeout(playerXSpeedReset, 60);
}

function playerXSpeedReset1(){
	playerXSpeed = 7;
	//jumpSpeed = 17;
}

function playerBlocked1(phase){
	if (ending == 1 || ending == 2){
		
	}else{
	playerXSpeed = -7;
	}
	//jumpSpeed = -17;
	setTimeout(playerXSpeedReset1, 60);
}

function timeReset(){
	//console.log(time)
	time = 0
	//console.log(time)
	//console.log("firedTR")
}

function timeResetB(){
	//console.log(time)
	timeB = 0
	//console.log(time)
	//console.log("firedTR")
}

var time = 0
var gravity = 30;
var jumpSpeed = 14;
var jumpCount = 0;
var timeB = 0

Player.prototype.moveY = function(step, level, keys) {
  // Accelerate player downward (always)
  var otherActor = level.actorAt(this)
  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  var fieldType = level.obstacleAt(newPos, this.size);

  if (otherActor == "phaseblock" && phase == 0)
	  this.pos = pos
  
 if (mBullet == 1){
	 level.makeBullet(directionZ)
	 mBullet = 0
	 //console.log(mBullet)
 }
 
 if ( hF == 1){
	 //console.log("fired")
	 level.makeBulletH()
	hF = 0
 }
 
 if ( hF2 == 1){
	 level.makeBulletH2()
	hF2 = 0
 }
 
 if ( hF3 == 1){
	 level.makeBulletH3()
	hF3 = 0
 }
 
 if ( hF4 == 1){
	 level.makeBulletH4()
	hF4 = 0
 }
 
 if ( hF5 == 1){
	 level.makeBulletH5()
	hF5 = 0
 }
 
 if ( hF6 == 1){
	 level.makeBulletH6()
	hF6 = 0
 }
 
 if (obstacle == "wall" || obstacle == "lava" || obstacle == "wall2"){
	 level.playerTouched(obstacle);
	  jumpCount = 0;
	  //console.log(level.makeBullet)
	  //console.log(jumpCount)
  }
  if(obstacle == "bouncerblock" && phase == 0){
	  level.playerTouched(obstacle);
	  this.speed.y = -jumpSpeed - 10;
	  timeB = 1
	  setTimeout(timeResetB, 200)
	  //console.log("fired")
  }
  // The floor is also an obstacle -- only allow players to 
  // jump if they are touching some obstacle.
  if (jumpCount < 2 && keys.up && time == 0){
	 this.speed.y = -jumpSpeed;
      setTimeout(timeReset, 300);
	  time ++;
	  jumpCount ++;
	  //console.log(jumpCount);
  }else if(obstacle && timeB == 0){
	  level.playerTouched(obstacle);
	  this.speed.y = 0;
  }else {
	 this.pos = newPos; 
	 //console.log("fall")
  }
};

function timeResetP(){
	//console.log(time)
	timeP = 0
	//console.log(time)
	//console.log("firedTR")
}

function phaseT (){
	//console.log(time)
	phase = 0
	//console.log(time)
	//console.log("firedTR")
}

var timeP = 0
var phase = 0

Player.prototype.phasing = function(keys){
	if (keys.x && phase == 0 && timeP == 0){
		phase = 1;
		//console.log(phase);
		timeP ++
		//console.log(timeP)
		setTimeout(timeResetP, 300)
		setTimeout(phaseT, 3000)
		//console.log(health);
	}else if (keys.x && phase == 1 && timeP == 0) {
		phase = 0;
		//console.log(phase);
		timeP ++
		//console.log(timeP)
		setTimeout(timeResetP, 300)
	}
}

function timeResetS(){
	//console.log(timeS)
	timeS = 0
	//console.log(timeS)
	//console.log("firedTR")
}

var timeS = 0
var mBullet = 0
var posZ =  [];
var directionZ = "";
Player.prototype.shootBullet = function(pos, direction, keys) {
	if(keys.space && timeS == 0){
	    mBullet = 1
		//level.makeBullet(pos, direction);
		timeS ++;
		setTimeout(timeResetS, 300);
		//console.log("bullet made");
		//console.log(health);
		posZ = pos;
		directionZ = direction;
		//console.log(posZ);
		//console.log(directionZ);
	}
}

Level.prototype.makeBullet = function(direction){
	//console.log("fired")
	//var bullet = new Bullet(posZ, directionZ);
	//console.log(bullet)
	this.actors.push(new Bullet(posZ, directionZ));
	//console.log(Bullet)
	//if (mBullet == 1)
	//console.log(this.actors)
}

Level.prototype.makeBulletH = function(){
	//console.log("fired")
	//var bullet = new Bullet(posZ, directionZ);
	//console.log(bullet)
	this.actors.push(new BulletH(posH));
	//console.log(Bullet)
	//if (mBullet == 1)
	//console.log(this.actors)
}

Level.prototype.makeBulletH2 = function(){
	//console.log("fired")
	//var bullet = new Bullet(posZ, directionZ);
	//console.log(bullet)
	this.actors.push(new BulletH2(posH2));
	//console.log(Bullet)
	//if (mBullet == 1)
	//console.log(this.actors)
}

Level.prototype.makeBulletH3 = function(){
	//console.log("fired")
	//var bullet = new Bullet(posZ, directionZ);
	//console.log(bullet)
	this.actors.push(new BulletH3(posH3));
	//console.log(Bullet)
	//if (mBullet == 1)
	//console.log(this.actors)
}

Level.prototype.makeBulletH4 = function(){
	//console.log("fired")
	//var bullet = new Bullet(posZ, directionZ);
	//console.log(bullet)
	this.actors.push(new BulletH4(posH4));
	//console.log(Bullet)
	//if (mBullet == 1)
	//console.log(this.actors)
}

Level.prototype.makeBulletH5 = function(){
	//console.log("fired")
	//var bullet = new Bullet(posZ, directionZ);
	//console.log(bullet)
	this.actors.push(new BulletH5(posH5));
	//console.log(Bullet)
	//if (mBullet == 1)
	//console.log(this.actors)
}

Level.prototype.makeBulletH6 = function(){
	//console.log("fired")
	//var bullet = new Bullet(posZ, directionZ);
	//console.log(bullet)
	this.actors.push(new BulletH6(posH6));
	//console.log(Bullet)
	//if (mBullet == 1)
	//console.log(this.actors)
}
var ending = 0;
Player.prototype.goodE = function(keys){
	if (keys.good){
		ending = 1;
		console.log(startImage);
	}
}

Player.prototype.badE = function(keys){
	if (keys.bad){
		ending = 2;
		console.log(startImage);
	}
}

Player.prototype.act = function(step, level, keys) {
	pos = this.pos
	direction = this.direction
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);
  this.shootBullet(pos, direction, keys);
  this.phasing(keys);
  //this.goodE(keys);
  //this.badE(keys);
   //console.log(keys)

  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Losing animation
  if (level.status == "lost") {
    this.pos.y += step;
    this.size.y -= step;
  }
};

function timeResetH(){
	//console.log(time)
	timeH = 0
	//console.log(time)
	//console.log("firedTR")
}

var timeH = 0
var health = 3
Level.prototype.playerTouched = function(type, actor) {
	
	if (health == 0){
	this.status = "lost";
    this.finishDelay = .1;
	}

  // if the player touches lava and the player hasn't won
  // Player loses
  if (type == "lava" && this.status == null && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "spike" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "hostilef" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  }  if (type == "hostilef2" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "hostilef3" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "hostilef4" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "hostilef5" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "hostilef6" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "bulleth" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "bulleth2" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } if (type == "bulleth3" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
	pHurt.play()
  } if (type == "bulleth4" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
	pHurt.play()
  } if (type == "bulleth5" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
	pHurt.play()
  } if (type == "bulleth6" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
	pHurt.play()
  }if (type == "hostilei" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
	pHurt.play()
  } if (type == "hostile" && this.status == null && phase == 0 && timeH == 0) {
    health = health - 1
	timeH = 1
	setTimeout(timeResetH, 300)
	//console.log(health)
  } else if (type == "coin" && phase == 0) {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
    // If there aren't any coins left, player wins
    if (!this.actors.some(function(actor) {
           return actor.type == "coin";
         })) {
      this.status = "won";
      this.finishDelay = 1;
    }
  }else if (type == "healthP" && phase == 0) {
	health = health + 2
	//console.log(health)
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }else if (type == "phaseblock" && phase == 0){
	  playerBlocked(phase)
  }else if (type == "block"){
	  playerBlocked1(phase)
  }else if (type == "texto") {
	text ++
	//console.log(health)
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }else if (type == "textio") {
	text = 10
	//console.log(health)
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }else if (type == "key" && phase == 0) {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }
};

Level.prototype.bulletTouched = function(type, actor) {
	  if (type == "hostile") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });

	  } if (type == "hostilef2") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }if (type == "hostilef") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }if (type == "hostilef3") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }if (type == "hostilef4") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }if (type == "hostilef5") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }if (type == "hostilef6") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  } if (type == "spike") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  }
}

// Arrow key codes for readibility
var arrowCodes = {65: "left", 87: "up", 68: "right", 32: "space", 69: "x", 37: "good", 39: "bad"};

// Translate the codes pressed from a key event
function trackKeys(codes) {
  var pressed = Object.create(null);

  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down; 
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

// frameFunc is a function called each frame with the parameter "step"
// step is the amount of time since the last call used for animation
function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      // Set a maximum frame step of 100 milliseconds to prevent
      // having big jumps
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// This assigns the array that will be updated anytime the player
// presses an arrow key. We can access it from anywhere.
var arrows = trackKeys(arrowCodes);

// Organize a single level and begin animation
function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);

  runAnimation(function(step) {
    // Allow the viewer to scroll the level
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}

function runGame(plans, Display) {
  function startLevel(n) {
    // Create a new level using the nth element of array plans
    // Pass in a reference to Display function, DOMDisplay (in index.html).
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost"){
        startLevel(levelP);
		health = 3;
		text = 0;
      }else if (status == "won"){
        levelP ++;
		health = 3 
		status = '';
		startImage ++;
		document.getElementById('canvas').height = 600;
		stutus = ''
      }else{
        startLevel(levelP)
		health = 3;
	  }
    });
  }
  startLevel(levelP);
}
