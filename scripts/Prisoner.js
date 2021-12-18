// James 


class Prisoner {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.xdir = 5;
        this.w = 100;
        this.h = 80;
        this.dead = false;

        this.sprite = sprite;
        this.spriteW = 150;
        this.spriteH = 150;
        this.numSprites = 0;
        this.img = takeImgFromSprite(this.sprite, this.numSprites, 1, this.spriteW, this.spriteH);
        this.counter = 0;

        this.knife = null;
        this.hasShooted = false;
    }

    show() {
        image(this.img, this.x, this.y, this.w, this.h);
        this.counter++;
        if (this.counter % 13 === 0) {
            this.changeImg();
        }
        if (this.hasShooted) {
            this.knife.show();
        }
        else if (this.counter === 10)
            this.shootKnife();
    }


    move() {
        this.x = this.x - this.xdir;
        if (this.hasShooted)
            this.knife.move();
    }

    shootKnife() {
        this.knife = new Knife(this.x, this.y, knifeImg);
        this.hasShooted = true;
    }

    die() {
        this.dead = true;
    }


    checkCollision() {
        if (this.hasShooted) {
            this.hasShooted = this.knife.hits();
        }
        return false;   //prisoner never captures the inmate
    }

    changeImg() {
        this.numSprites++;
        this.img = takeImgFromSprite(this.sprite, this.numSprites, 1, this.spriteW, this.spriteH);
        if (this.numSprites === 3) {
            this.numSprites = 0;
        }
    }

}