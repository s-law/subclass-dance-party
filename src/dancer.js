// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {
  this.linedUp = false;
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"><img src="images/head.gif" /></span>');
  this.$node.on('click', function(event) {
    if (this.oldImg === '') {
      this.oldImg = this.$node.find('img').attr('src');
      this.$node.find('img').attr('src', 'images/penguin.gif');
    }
    else {
      this.$node.find('img').attr('src', this.oldImg);
      this.oldImg = '';
    }
  }.bind(this));
  this.timeBetweenSteps = timeBetweenSteps;

  var height = $("body").height();
  var width = $("body").width(); 
  
  var adjustY = Math.max(top + this.img.height - height , 0); 
  var adjustX = Math.max(left + this.img.width - width , 0); 

  this.xSpeed = 0;
  this.ySpeed = 0;

  this.top = top - adjustY;
  this.left = left - adjustX;

  this.role = "";
  this.oldImg = '';
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition();
  this.step();
};

Dancer.prototype.constructor = Dancer;

Dancer.prototype.step = function() {
  // the basic Dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  if (!this.linedUp) {
    setTimeout(function() {
      this.step();
    }.bind(this), this.timeBetweenSteps);
  }
};

Dancer.prototype.setPosition = function() {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.leaveIce = function() {
  this.linedUp = true;
  var width = $("body").width();

  if (this.left < width/2) {
    this.$node.animate({ 
      left: -1000
    }, 2000 );
    this.left = -1000;
  } else {
    this.$node.animate({ 
      left: width + 1000
    }, 2000 );
    this.left = width + 1000;
  }
};