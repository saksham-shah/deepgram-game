function Button(x,y, width, height, text,onClick) {
    this.pos = createVector(x, y);
    this.text = text;
    this.width = width;
    this.height = height;
    this.onClick = onClick;
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
    textAlign(CENTER);
    fill(0,0,0);
    rect(this.pos.x, this.pos.y, this.width, this.height);
    fill(255,255,255);
    text(this.text, this.pos.x, this.pos.y);
    
}