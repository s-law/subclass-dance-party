var Zamboni = function(top, left, timeBetweenSteps) {
  var image = new Image();
  image.src = 'images/zamboni.jpg';

  Dancer.call(this, top, 5 * image.height, 25);
  this.role = "Zamboni";
  this.$node = $('<span class="dancer"><img src="images/zamboni.gif" /></span>');

  this.img = image;
};

Zamboni.prototype = Object.create(Dancer.prototype);
Zamboni.prototype.constructor = Zamboni;

Zamboni.prototype.clean = function() {
  this.left = -1 * this.img.width;
  this.setPosition();

  $('body').append(this.$node)

  var pass = function(dest) {
    this.$node.toggleClass('flipped');
    this.$node.animate({ 
    top: this.top,
    left: dest
    }, 2000, function() {
      this.top += this.img.height;
      this.left = dest;
      this.setPosition();
      if (this.top < $('body').height()) {
        pass(-1*dest);
      } else {
        window.wasZamboniCalled = true;
        $(".lineUpButton").click();
      };

    }.bind(this));
  }.bind(this);

  pass($('body').width() + 100);
};