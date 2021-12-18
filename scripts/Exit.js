//Francesco

function Exit(sprite, x, y) {
  this.x = x;
  this.y = y;
  this.xdir = -3;
  this.onSight = false;
  this.exitTaken = false;
  this.radius = 30;
  this.sprite = sprite;
  this.spriteW = 120;
  this.spriteH = 160;
  this.numSprites = 3;
  this.spriteIndex = 3;
  this.img = takeImgFromSprite(this.sprite, 4, this.spriteIndex, this.spriteW, this.spriteH);
  this.counter = 0;




  this.show = function () {
    image(this.img, this.x, this.y, this.spriteW, this.spriteH);
  }


  this.escaping = function () {
    this.changeImg();
    var distance = dist(inmate.x, inmate.y, this.x, this.y);
    if (distance < inmate.radius + this.radius) {
      this.exitTaken = true;
    }
    return this.exitTaken;
  }

  this.reset = function () {
    this.onSight = false;
    this.exitTaken = false;
    this.counter = 0;
    this.spriteIndex = 3;
    this.img = takeImgFromSprite(this.sprite, 4, this.spriteIndex, this.spriteW, this.spriteH);
  }

  this.changeImg = function () {
    this.counter++;
    if (this.counter % 7 === 0) {
      this.img = takeImgFromSprite(this.sprite, 4, this.spriteIndex, this.spriteW, this.spriteH);
      if (this.spriteIndex > 1)
        this.spriteIndex--;
    }
  }

  this.sound = function (s) {
    s.play();
  }
}


