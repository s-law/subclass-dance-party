var Zamboni = function(top, left, timeBetweenSteps) {
  var image = new Image();
  image.src = 'images/zamboni.jpg';
  this.img = image;

  Dancer.call(this, top, 5 * image.height, 25);
  this.role = "Zamboni";
  this.$node = $('<span class="dancer"><img src="images/zamboni.gif" /></span>');
};

Zamboni.prototype = Object.create(Dancer.prototype);
Zamboni.prototype.constructor = Zamboni;

Zamboni.prototype.clean = function() {
  this.left = -1 * this.img.width;
  this.setPosition();

  $('body').append(this.$node);

  var pass = function(dest) {
    var move = dest + $('body').width()/2;
    this.$node.toggleClass('flipped');
    this.$node.animate({ 
    top: this.top,
    left: move
    }, 2000, function() {
      this.top += this.img.height;
      this.left = move;
      this.setPosition();
      if (this.top + this.img.height < $('body').height()) {
        pass(-1*(dest+this.img.width));
      } else {
        window.wasZamboniCalled = true;
        $(".lineUpButton").click();
      };

    }.bind(this));
  }.bind(this);

  pass($('body').width()/2 + this.img.width);
};