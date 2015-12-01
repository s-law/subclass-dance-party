var SlidingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, 25);
  this.ySpeed = 10 + (10 * Math.random());
  this.xSpeed = 10 + (10 * Math.random());
};

SlidingDancer.prototype = Object.create(Dancer.prototype);
SlidingDancer.prototype.constructor = SlidingDancer;

SlidingDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of setPosition
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  
  var width = $("body").width();
  var height = $("body").height();

  if (this.left >= width - this.img.width || this.left <= 0) {
    this.xSpeed *= -1;
  }

  if (this.top >= height - this.img.height || this.top <= 0) {
    this.ySpeed *= -1;
  }

  this.left += this.xSpeed;
  this.top += this.ySpeed;
  
  this.setPosition();
};