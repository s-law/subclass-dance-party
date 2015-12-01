// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {
  this.linedUp = false;
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"><img src="images/head.gif" /></span>');
  this.timeBetweenSteps = timeBetweenSteps;

  var image = new Image();
  image.src = 'images/head.gif';
  this.img = image;

  var height = $("body").height();
  var width = $("body").width(); 
  
  var adjustY = Math.max(top + this.img.height - height , 0); 
  var adjustX = Math.max(left + this.img.width - width , 0); 

  this.xSpeed = 0;
  this.ySpeed = 0;

  this.top = top - adjustY;
  this.left = left - adjustX;
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
  this.collisionCheck();
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

Dancer.prototype.lineUp = function(left) {
  this.linedUp = true;
  var top = $("body").height() / 2 ;

  this.$node.animate({ 
    top: top,
    left: left
  }, 2000 );

  this.top = top;
  this.left = left;
}

Dancer.prototype.collisionCheck = function() {
  var source =  {x: this.left + this.img.width/2, y: this.top + this.img.height/2, width: this.img.width/4 , height: this.img.height/4};

  var detectCollision = function(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
      return true;
    }

    return false;
  };

  for (var i = 0; i < window.dancers.length; i++) {
    var node = window.dancers[i];
    var target = {x: node.left + node.img.width/2, y: node.top + node.img.height/2, width: node.img.width/4, height: node.img.height/4};
    
    if (detectCollision(source,target)) {
      this.xSpeed *=-1;
      this.ySpeed *=-1;

      node.xSpeed *=-1;
      node.ySpeed *=-1;
      return;
    }
  }
}