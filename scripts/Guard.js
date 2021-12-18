//Francesco

class Guard {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.xdir = 5;
    this.w = 70;
    this.h = 110;
    this.dead = false;
    this.sprite = sprite;
    this.spriteW = 70;
    this.spriteH = 110;
    this.numSprites = 0;
    this.img = takeImgFromSprite(this.sprite, this.numSprites, 1, this.spriteW, this.spriteH);
    this.counter = 0;
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.h);
    this.counter++;
    if (this.counter % 7 === 0) {
      this.changeImg();
    }
  }


  move() {
    this.x = this.x - this.xdir;
  }

  die() {
    this.dead = true;
  }

  changeImg() {
    this.img = takeImgFromSprite(this.sprite, this.numSprites, 1, this.spriteW, this.spriteH);
    this.numSprites++;
    if (this.numSprites === 3) {
      this.numSprites = 0;
    }
  }

  checkCollision() {
    var distance = dist(inmate.x + inmate.w / 2, inmate.y, this.x, this.y);
    if (distance < inmate.radius + this.radius) {
      this.die();
      return true;
    }
  }

}