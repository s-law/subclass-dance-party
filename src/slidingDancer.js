var SlidingDancer = function(top, left, timeBetweenSteps) {
  this.ySpeed = 25;
  this.xSpeed = 25;
  Dancer.call(this, top, left, 25);
};

SlidingDancer.prototype = Object.create(Dancer.prototype);
SlidingDancer.prototype.constructor = SlidingDancer;

SlidingDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step

  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  
  var width = $("body").width();
  var height = $("body").height();

  if (this.left >= width || this.left <= 0) {
    this.xSpeed *= -1;
  }

  if (this.top >= height || this.top <= 0) {
    this.ySpeed *= -1;
  }

  this.left += this.xSpeed;
  this.top += this.ySpeed;
  
  this.setPosition();
};