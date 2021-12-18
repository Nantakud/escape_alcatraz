//Francesco

let inmate;
let enemy;
let bg;

let guardSprite;
let isJumping = false;
let inmateImg;
let enemycounter = 0;
let prisonerSprite;
let dogSprite;
let knifeImg;
let gruntSound;
let growlSound;

function preload() {
  guardSprite = loadImage("../assets/images/enemies/guardSprite.png");
  bg = loadImage("assets/images/backgrounds/help_bg.jpeg");
  inmateImg = loadImage("assets/images/characters/bonnie.png");
  prisonerSprite = loadImage("../assets/images/enemies/prisonerSprite.png");
  dogSprite = loadImage("../assets/images/enemies/dogsprite.png");
  knifeImg = loadImage("../assets/images/knife.png");
  gruntSound = loadSound('../assets/sounds/pain_grunt.mp3');
  growlSound = loadSound('../assets/sounds/dog_growl.wav');
}

function setup() {
  var canvas = createCanvas(800, 600);
  canvas.parent("helpCanvas");

  inmate = new Inmate(110, 120);
  inmate.img = inmateImg;
  inmate.jumpPower = 12;
  inmate.y = 480;
  inmate.startY = 480;
  enemy = new Guard(800, 480, guardSprite);
}

function draw() {
  background(bg);
  inmate.show();
  enemy.show();
  handleEnemyMovement();
  if (isJumping) {
    isJumping = inmate.jump();
  }
}

function handleEnemyMovement(){
    enemy.move();
    if(enemy.checkCollision() || (enemy.x < 0)){
        changeEnemy();
      }
}

function changeEnemy(){
    enemycounter++;
    switch (enemycounter){
        case 1:
            enemy = new Prisoner(800, 500, prisonerSprite);
            main_msg.innerHTML = 'that knife looks sharp';
            second_msg.innerHTML = 'if it touches you, you loose a life. The guy cannot do you any arm.'
        break;
        case 2:
            enemy = new Dog(800,520, dogSprite, growlSound);
            main_msg.innerHTML =  'Beware of the dog';
            second_msg.innerHTML = 'if it bites you, you lose time and a life';
        break;
        case 3:
            main_msg.innerHTML =  'You did well';
            second_msg.innerHTML = 'Time to play now';
            setTimeout(()=>{
                window.location.replace('help.html');
            },4000);
        break;
    }
}

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

function keyPressed() { // event triggered every time a user hits a key
  if (key === " " && !isJumping) {
    isJumping = true;
  }
}

function setGameOver(){
    main_msg.innerHTML = 'In the real game, this was a Game Over';
}


