//James and Francesco
function Knife(x, y, img) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.show = function () {
        image(img, this.x, this.y, 40, 10);
    }
    this.move = function () {
        this.x -= 10; // this is how many pixels it will move up each time
    }
    this.hits = function () {
        // check the distance between the fire and the enemy (distance between centre points)
        var distance = dist(this.x, this.y, inmate.x, inmate.y);
        // calculate whether they are overlapping taking into consider their radius
        if (distance < this.radius + inmate.radius) {
            inmate.getDamage('knife');
            return false;  // do not show anymore the knife imb
        }
        return true;  //keep showing the img
    }
}