var FigureSkater = function(top, left, timeBetweenSteps) {
  var image = new Image();
  image.src = 'images/flying.gif';
  this.img = image;
  Dancer.call(this, top, left, timeBetweenSteps);

  this.$node = $('<span class="dancer flipped"><img class="flying"/></span>');
  this.role = 'figure-skater';
};

FigureSkater.prototype = Object.create(Dancer.prototype);
FigureSkater.prototype.constructor = FigureSkater;

// FigureSkater.prototype.step = function() {
//   Dancer.prototype.step.call(this);

//   // 
//   // moving code here
// };

FigureSkater.prototype.skateAround = function(x, y) {
  var t = 0;
  var circling = false;

  var circle = function() {
    if (circling) {
      this.$node.find('img').removeClass('flying');
      this.$node.find('img').addClass('spinning');
    }
    var delay = circling ? 1:2000; 
    circling=true;
    t += 0.05;

    var r = 75;         // radius
    var centerX = x; 
    var centerY = y;

    var newLeft = Math.floor(centerX + (r * Math.cos(t)));
    var newTop = Math.floor(centerY + (r * Math.sin(t)));

    this.$node.animate({
        top: newTop,
        left: newLeft,
    }, delay, function() {
      if(window.halftime) {
        circle();
      } else {
        this.$node.find('img').removeClass('spinning');
        this.$node.find('img').addClass('flying');
        this.leaveIce();
      };
    }.bind(this));
  }.bind(this);

  circle();
};