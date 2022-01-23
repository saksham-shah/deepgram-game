function Button(x,y, width, height, text,onClick) {
    this.pos = createVector(x, y);
    this.text = text;
    this.width = width;
    this.height = height;
    this.onClick = onClick;
    this.bgCOLOR = color(0,0,0);
    this.clickCOLOR = color(40,40,100);
    this.disabledCOLOR = color(0,0,0,150);
    this.hover = false;
    this.active = true;
    this.textSize = 13;
}

Button.prototype.enable = function () {
    this.active = true;
}

Button.prototype.disable = function () {
    this.active = false;
}


Button.prototype.update = function () {
    if (mouseX < this.pos.x + this.width /2 &&
        mouseX > this.pos.x - this.width /2 &&
        mouseY < this.pos.y + this.height /2 &&
        mouseY > this.pos.y - this.height /2 ) {
        this.hover = true;
    }
    else {
        this.hover = false;
    }

}

Button.prototype.mouseClicked = function () {
    if (this.hover && this.active) {
        this.onClick();
    }
}

Button.prototype.draw = function() {
    textSize(this.textSize);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(0,0,0);
    if (this.active) {
        if (this.hover) {
            fill(this.clickCOLOR);
        }else {
            fill(this.bgCOLOR);
        }
    } 
    else {
        fill(this.disabledCOLOR);
    }
    
    
    rect(this.pos.x, this.pos.y, this.width, this.height);
    fill(255,255,255);
    text(this.text, this.pos.x, this.pos.y);
    
}