//Francesco

function Item(x, y, w, h, img) {
  this.x = x;
  this.y = y;
  this.xdir = -3;
  this.w = w;
  this.h = h;
  this.dead = false;
  this.radius = 5;



  this.show = function () {
    image(img, this.x, this.y, this.w, this.h);
  }


  this.move = function () {
    this.x = this.x + this.xdir;
  }

  this.setX = function (position) {
    this.x = position;
  }

  this.checkCollision = function () {

    var distance = dist(inmate.x + inmate.w / 2, inmate.y, this.x, this.y);
    if (distance < inmate.radius + this.radius) {
      this.dead = true;
      inmate.getDamage();
    }
    return false;
  }

}

