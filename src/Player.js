var Player = function(top, left, timeBetweenSteps) {
  var image = new Image();
  image.src = 'images/head.gif';
  this.img = image;
  Dancer.call(this, top, left, 25);
  this.ySpeed = 10 + (10 * Math.random());
  this.xSpeed = 10 + (10 * Math.random());
  this.role = "player";
};

Player.prototype = Object.create(Dancer.prototype);
Player.prototype.constructor = Player;

Player.prototype.step = function() {
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
  this.collisionCheck();
};

Player.prototype.lineUp = function(left, last) {
  this.linedUp = true;
  var top = $("body").height() / 2 ;

  this.$node.animate({ 
    top: top,
    left: left
  }, 2000, function() {
    if (last && window.wasZamboniCalled) {
      setTimeout(function() {
        $('.skateButton').click();
      }, 3000);
      window.wasZamboniCalled = false;
    }
  } );

  this.top = top;
  this.left = left;
}

Player.prototype.collisionCheck = function() {
  var source =  {x: this.left + this.img.width/2, y: this.top + this.img.height/2, width: this.img.width/4 , height: this.img.height/4};

  var detectCollision = function(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
      return true;
    }

    return false;
  };

  for (var i = 0; i < window.players.length; i++) {
    var node = window.players[i];
    var target = {x: node.left + node.img.width/2, y: node.top + node.img.height/2, width: node.img.width/4, height: node.img.height/4};
    
    if (detectCollision(source,target)) {
      var elasticAngle = Math.random() * -1;
      this.xSpeed *=-1;
      this.ySpeed *=-1;

      node.xSpeed *=-1;
      node.ySpeed *=-1;
      return;
    }
  }
};

