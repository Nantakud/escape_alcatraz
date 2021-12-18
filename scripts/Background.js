//Fransesco

function Background(img, x, y, w, h) {
  this.x = x;
  this.y = y;
  this.speed = 3;
  this.w = w;
  this.h = h;
  this.img = img;
  this.startX = x;


  this.show = function () {
    image(this.img, this.x, this.y, this.w, this.h);
  }


  this.move = function () {
    this.x -= this.speed;
  }

  this.resetX = function () {
    this.x = this.startX;
  }

}

