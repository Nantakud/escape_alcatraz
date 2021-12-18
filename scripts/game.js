//Francesco and James 


// declare variables for the game 

let canvasWidth = 800;
let canvasHeight = 600;

var backgroundImages = [];
// sounds variables
var runSound;
var blastSound;
var alarmSound;
var gruntSound;  //now all inmates make same sound.
var jumpSound;
var growlSound;
var doorSound;

let noises;  // interval for background noises

//sprite variables
let inmateSprites = [];
let exitSprite;
let dogSprite;
let prisonerSprite;
let guardSprite;

let dustSprite;
let dustSpriteW = 280;
let dustSpriteH = 240;
var dustNumSprites = 4;
var dustSpriteIndex = 0;


//background variables
let bg1;
let bg2;
//inmate variables
let inmate;
let isJumping = false;
let isCaptured = false;
let inmateImgInterval;

//enemies variables
let enemies = [];
let collisionCounter = 0;  //used to change the dust image when a collision occurs
let enemyTooClose = false;
let enemyDistance = 700;   // set the time between the creation of a new enemy, in milliseconds


//game variables
let clock;  //interval to keep the count down
let gameover = false;
let level = 0;
let exit;
let milesToRun;
let distance; //interval for counting miles

let time;


function preload() {
  //preload background images
  backgroundImages[0] = loadImage('../assets/images/backgrounds/gameOver.png');   //todo create gameover background!
  backgroundImages[1] = loadImage('../assets/images/backgrounds/level1.jpeg');
  backgroundImages[2] = loadImage('../assets/images/backgrounds/level2.png');
  backgroundImages[3] = loadImage('../assets/images/backgrounds/level3_optional.png');
  backgroundImages[4] = loadImage('../assets/images/backgrounds/win.png');
  backgroundImages[5] = loadImage('../assets/images/backgrounds/moon_bg.png');
  //preload exit images
  exitSprite = loadImage('../assets/images/backgrounds/doors_sprite.png');
  //preload inmates images
  inmateSprites[1] = loadImage("../assets/images/characters/Vincenzo/Vincenzo_sprite.png");
  inmateSprites[2] = loadImage("../assets/images/characters/Lucenzo/lucenzo_walking_animation.png");
  inmateSprites[3] = loadImage('../assets/images/characters/orange_clint.png');
  vicenzoJump = loadImage("../assets/images/characters/Vincenzo/Vincenzo_jump.png")
  lucezzoGrabbed = loadImage("../assets/images/characters/Lucenzo/lucenzo_arrested_right.png");
  //preload enemies images
  guardSprite = loadImage("../assets/images/enemies/guardSprite.png");
  prisonerSprite = loadImage("../assets/images/enemies/prisonerSprite.png");
  knifeImg = loadImage("../assets/images/knife.png");
  dogSprite = loadImage("../assets/images/enemies/dogsprite.png");
  dustSprite = loadImage('../assets/images/characters/dust_sprite.png');

  runSound = loadSound('../assets/sounds/run.mp3');
  blastSound = loadSound('../assets/sounds/shotgun_blast.mp3');
  alarmSound = loadSound('../assets/sounds/alarm_siren.mp3');
  gruntSound = loadSound('../assets/sounds/pain_grunt.mp3');
  jumpSound = loadSound('../assets/sounds/whistle_jump.mp3');
  growlSound = loadSound('../assets/sounds/dog_growl.wav');
  doorSound = loadSound('../assets/sounds/rusty_door.mp3');
}



function setup() {


  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("gameCanvas");

  runSound.loop();

  inmate = new Inmate(130, 175);

  exit = new Exit(exitSprite, canvasWidth - 70, 450);

  levels.innerHTML = 'Level: ' + level;
  levelUp();
  countDistanceFromExit();
  startBackgroundNoises();


  if (inmate.lives > 0) {
    lives.innerHTML = 'Lives: ' + inmate.lives;
  } else if (inmate.lives == 0) {
    lives.innerHTML = 'Lives: ' + 0;
  }

  if (gameOver && level <= 3) {

  }
}



function draw() {
  if (gameover) {       //when time is over
    background(backgroundImages[0]);
    noLoop();
    let homeBtn = document.getElementById("go_home");
    homeBtn.style.visibility = "visible";
    stopGameSounds()
    headerEndGame('Game Over');
  } else {
    moveBackGround(bg1);
    moveBackGround(bg2);

    if (isCaptured) {   //when the player is fighting the guards
      handleCapture();
    } else {
      inmate.show();
      if (exit.onSight && !isJumping) {     //when the level is over
        exit.show();
        inmate.move();
        clearInterval(noises);
        if (exit.escaping()) {
          exit.reset();
          levelUp();
        }
      } else {           //normal game cycle
        addEnemy();

        if (isJumping) {
          isJumping = inmate.jump();  //return true if jumping;
          handleRunSound();
        }

        showEnemies(enemies);
      }
    }
  }
}


//--------------Game logic------------------
function startTimer(t) {
  let seconds = 60;
  let minutes = t;
  let timer = document.getElementById('timer');
  clock = setInterval(() => {
    seconds--;
    let s = (seconds > 9) ? seconds : "0" + seconds;
    timer.innerHTML = 'Timer: ' + minutes + ':' + s;
    if (seconds < 1) {
      minutes--;
      seconds = 60;
    }
    if (minutes < 0) {
      clearInterval(clock);
      gameover = true;
    }
  }, 1000);
}

//sets timer and level header values to eithier escaped or to game over
function headerEndGame(outcome) {
  timer.innerHTML = outcome;
  levels.innerHTML = outcome;
}

function setGameOver() {
  gameover = true;
  clearInterval(clock);
  clearInterval(distance);
}

function countDistanceFromExit() {
  distance = setInterval(() => {
    if (!isCaptured) {
      milesToRun--;
    }
    if (milesToRun < 0) {
      exit.onSight = true;
      exit.sound(doorSound);
      clearInterval(distance);
    }
  }, 1000);
}

function levelUp() {
  level++;
  levels.innerHTML = 'Level: ' + level;
  switch (level) {
    case 1:
      startTimer(1);

      bg1 = new Background(backgroundImages[level], 0, 0, canvasWidth, canvasHeight);
      bg2 = new Background(backgroundImages[level], canvasWidth, 0, canvasWidth, canvasHeight);

      milesToRun = 95;     //can be captured around 7 times

      inmate.sprite = inmateSprites[level];
      inmate.setImg();

      inmateImgInterval = setInterval(inmate.setImg, 100);

      inmate.spriteW = 48;
      inmate.spriteH = 48;
      inmate.numSprites = 5;
      inmate.jumpPower = 20;
      inmate.lives = 3;

      break;
    case 2:
      clearInterval(clock);
      startTimer(1);
      resetBackground();
      startBackgroundNoises();
      countDistanceFromExit();

      milesToRun = 110;   //can be captured around 3 times

      inmate.sprite = inmateSprites[level];

      inmate.startY = 460;
      inmate.w = 70;
      inmate.h = 110;
      inmate.spriteW = 100;
      inmate.spriteH = 120;
      inmate.numSprites = 3;

      inmate.jumpPower = 18;
      inmate.lives = 2;
      lives.innerHTML = 'Lives: ' + inmate.lives;

      inmate.reset();
      break;
    case 3:
      clearInterval(clock);
      startTimer(0);
      background(backgroundImages[5]);
      resetBackground();
      startBackgroundNoises();
      countDistanceFromExit();


      milesToRun = 55; // can be captured one time

      inmate.sprite = inmateSprites[level];

      inmate.w = 100;
      inmate.h = 140;
      inmate.spriteW = 84;
      inmate.spriteH = 130;
      inmate.numSprites = 5;

      inmate.jumpPower = 15;
      inmate.lives = 2;
      lives.innerHTML = 'Lives: ' + inmate.lives;

      inmate.reset();
      break;
    case 4:
      clearInterval(clock);
      noLoop();
      // resetBackground();
      // inmate = '';
      // clearInterval(inmateImgInterval);
      canvas = document.getElementById('defaultCanvas0');
      canvas.remove();
      gameCanvas = document.getElementById('gameCanvas')
      winImg = document.createElement('img');
      winImg.id = 'winImg';
      winImg.setAttribute("src", "../assets/images/backgrounds/win.png");
      winImg.setAttribute("height", "600");
      winImg.setAttribute("width", "800");
      // winDiv.style.backgroundImage = beachBG;
      gameCanvas.append(winImg);
      setTimeout(() => {
        window.location.replace('credits.html');
      }, 10000);
      stopGameSounds();
      headerEndGame('You Won');
  }
}




//--------------Background Images------------------

function resetBackground() {
  bg1.resetX();
  bg2.resetX();
  bg1.img = backgroundImages[level];
  bg2.img = backgroundImages[level];
}

function moveBackGround(bg) {
  bg.show();
  if ((!isCaptured) && (!exit.onSight)) {
    bg.move();
    if (bg.x + canvasWidth < 0) {
      bg.x = canvasWidth;
    }
  }
}
//--------------Collision------------------

function setDustImg() {
  dustImg = takeImgFromSprite(dustSprite, dustSpriteIndex, 1, dustSpriteW, dustSpriteH);
  dustSpriteIndex = updateSpriteCounter(dustNumSprites, dustSpriteIndex);
}

function handleCapture() {
  if (collisionCounter % 10 === 0) {
    setDustImg();
  }
  if (collisionCounter % 31 === 0) {
    gruntSound.play();
  }
  collisionCounter++;

  image(dustImg, inmate.x, inmate.y - 75);

  if (collisionCounter > 100) {
    isCaptured = false;
    collisionCounter = 0;
  }
}

//--------------Sounds------------------
function handleRunSound() {
  if (isJumping) {
    runSound.pause();
  } else {
    runSound.play();
    jumpSound.stop();
  }
}
//every ten seconds, generates a random number. If multiple of 5 plays a noise, blast for odds and alarm for evens
function startBackgroundNoises() {
  noises = setInterval(() => {
    let n = Math.floor(Math.random() * 100);
    if (n % 5 === 0) {
      if (n % 2 === 0)
        alarmSound.play();
      else
        blastSound.play();
    }
  }, 10000);
}

function stopGameSounds() {
  runSound.stop();
  blastSound.stop();
  alarmSound.stop();
  gruntSound.stop();
  growlSound.stop();
  doorSound.stop();
  clearInterval(noises);
}

//--------------Sprites------------------

/*
  sprite: a image;
  num: how many frame in the file;
  i: keep track of which frame we are in
  row: which row you take the img from;
  w: frame width
  h: frame height
*/
function takeImgFromSprite(sprite, i, row, w, h) {
  let x = w * i;
  let y = h * (row - 1);
  let img = sprite.get(x, y, w, h);

  return img;
}
function updateSpriteCounter(num, i) {
  let index = (i < num) ? i + 1 : 0;
  return index;
}




//--------------Enemies------------------
function addEnemy() {
  if (!enemyTooClose) {
    let random = Math.floor(Math.random() * 300);
    if (random < 1 && !isJumping) {
      enemies.push(new Guard(canvasWidth, 450, guardSprite));
      controlEnemyDistance();
    }
    if (level >= 2 && random === 15 && !isJumping) {
      enemies.push(new Prisoner(canvasWidth, inmate.y, prisonerSprite));
      controlEnemyDistance();
    }
    if (level === 3 && random === 11 && !isJumping) {
      enemies.push(new Dog(canvasWidth, inmate.y, dogSprite, growlSound));
      controlEnemyDistance();
    }
  }
}

function controlEnemyDistance() {
  enemyTooClose = true;
  setTimeout(() => {
    enemyTooClose = false;
  }, enemyDistance);
}

function atEdge(a, i) {
  if (a[i].x < 0) {
    a.splice(i, 1);
  }
}

function showEnemies(a) {  //used to show enemies
  for (var i = 0; i < a.length; i++) {
    let e = a[i];
    e.show();
    e.move();
    isCaptured = e.checkCollision();
    if (e.dead)
      a.splice(i, 1);
    else
      atEdge(a, i);

  }
}


//--------------Events------------------

function keyPressed() { // event triggered every time a user hits a key

  if (key === " " && !isJumping && !exit.onSight) {
    isJumping = true;
    jumpSound.play();
  }
}











