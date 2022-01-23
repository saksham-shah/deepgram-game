function Button(x,y, width, height, text,onClick) {
    this.pos = createVector(x, y);
    this.text = text;
    this.width = width;
    this.height = height;
    this.onClick = onClick;
    this.bgCOLOR = color(0,0,0);
    this.clickCOLOR = color(100,100,100);
    this.hover = false;
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
    if (this.hover) {
        this.onClick();
    }
}

Button.prototype.draw = function() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(0,0,0);
    if (this.hover) {
        fill(this.clickCOLOR);
    }else {
        fill(this.bgCOLOR);
    }
    rect(this.pos.x, this.pos.y, this.width, this.height);
    fill(255,255,255);
    text(this.text, this.pos.x, this.pos.y);
    
}