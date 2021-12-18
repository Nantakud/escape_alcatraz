//Francesco

class Dog {
  constructor(x, y, sprite, sound) {
    this.x = x;
    this.y = y;
    this.xdir = -3;
    this.dead = false;
    this.radius = 7;
    this.sprite = sprite;
    this.spriteW = 140;
    this.spriteH = 75;
    this.numSprites = 5;
    this.img = takeImgFromSprite(this.sprite, this.numSprites, 1, this.spriteW, this.spriteH);
    this.counter = 0;
    this.sound = sound;
  }


  show() {
    image(this.img, this.x, this.y, this.w, this.h);
    this.counter++;
    if (this.counter % 5 === 0) {
      this.changeImg();
    }
  }

  move() {
    this.x = this.x + this.xdir;
    if (this.counter === 15) {
      this.growl();
    }
  }


  checkCollision() {
    var distance = dist(inmate.x + inmate.w / 2, inmate.y, this.x, this.y);
    if (distance < inmate.radius + this.radius) {
      this.dead = true;
      this.sound.stop();
      inmate.getDamage();
      return true;
    }
    return false;
  }

  changeImg() {
    this.numSprites--;
    this.img = takeImgFromSprite(this.sprite, this.numSprites, 1, this.spriteW, this.spriteH);
    if (this.numSprites === 0) {
      this.numSprites = 5;
    }
  }

  growl() {
    this.sound.play();
  }
}

