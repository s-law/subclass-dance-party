var MovingDancer = function(top, left, timeBetweenSteps) {
  this.xOrYFlag = Math.random() < 0.5; // if true, horizontal
  Dancer.call(this, top, left, timeBetweenSteps);
  this.xSpeed = Math.random() * 15 + 10;
  this.ySpeed = this.xSpeed;
  this.range = Math.random() * 200 + 30;
  this.leftOG = left;
  this.topOG = top;
};

MovingDancer.prototype = Object.create(Dancer.prototype);
MovingDancer.prototype.constructor = MovingDancer;

MovingDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step

  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  
  if (this.xOrYFlag) {
    if (this.left >= this.leftOG + this.range || this.left <= this.leftOG - this.range) {
      this.xSpeed *= -1;
    }
    this.left += this.xSpeed;
  }
  else {
    if (this.top >= this.topOG + this.range || this.top<= this.topOG - this.range) {
      this.ySpeed *= -1;
    }
    this.top += this.ySpeed;
  }

  this.setPosition();
};