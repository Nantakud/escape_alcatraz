//Francesco 

function Inmate(w, h) {
  this.xDir = 0;
  this.radius = 45;  // to check collisions.
  this.h = h;
  this.w = w;
  this.startY = 400;
  this.startX = 70;
  this.x = this.startX;
  this.y = this.startY;
  this.img;
  this.jumpCounter = 0;
  this.jumpPower;
  this.lives = 3;
  this.sprite;
  this.spriteW = w;
  this.spriteH = h;
  this.numSprites = 5;
  this.spriteIndex = 0;

  this.show = function () {
    image(this.img, this.x, this.y, this.w, this.h);
  }


  this.reset = function () {
    this.x = this.startX;
    this.y = this.startY;
  }


  this.jump = function () {
    if (this.jumpCounter < this.jumpPower) {    //going up
      this.jumpCounter++;
      this.y -= 20;
    } else {                   //going down
      this.y += 10;
    }

    if (this.startY == this.y)   //foot on the ground
      this.jumpCounter = 0;

    return (this.startY != this.y);   //return true if is still jumping
  }

  this.move = function () {
    this.x += 8;
  }

  this.setImg = function () {
    if (isJumping)
      setJumpImg();
    else
      setRunImg();
  }

  this.getDamage = function (weapon) {
    this.lives--;
    lives.innerHTML = 'Lives: ' + inmate.lives;
    if (weapon === 'knife') {
      gruntSound.play();
    }
    if (this.lives < 1) {
      setGameOver();
    }
  }

}

function setJumpImg() {
  let img = takeImgFromSprite(inmate.sprite, 0, 2, inmate.spriteW, inmate.spriteH);
  inmate.img = img;
}

function setRunImg() {
  let img = takeImgFromSprite(inmate.sprite, inmate.spriteIndex, 1, inmate.spriteW, inmate.spriteH);
  inmate.img = img;
  inmate.spriteIndex = updateSpriteCounter(inmate.numSprites, inmate.spriteIndex);
}



