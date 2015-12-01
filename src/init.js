$(document).ready(function() {
  window.dancers = [];
  window.players = [];

  $(".addDancerButton").on("click", function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    if (dancer.role === "player") {
      window.players.push(dancer);
    } else {
      window.dancers.push(dancer);
    }
  });

  $(".lineUpButton").on("click", function(event) {
    var gap = $("body").width() / (window.players.length);
    var mark = 20;
    for (var i = 0; i < window.players.length; i++) {
      var node = window.players[i];
      var last = window.players.length - 1 === i ? true : false;
      node.lineUp(mark, last);
      mark += gap;
    }
    if ($(".lineUpButton").text() === "come back") {
      $(".lineUpButton").text("line up");
      $(".skateButton").show();
      $(".leaveButton").show();
    }
  });

  $(".skateButton").on("click", function(event) {
    for (var i = 0; i < window.players.length; i++) {
      var node = window.players[i];
      node.linedUp = false;
      node.step();
    }
  });

  $(".leaveButton").on("click", function(event) {
    for (var i = 0; i < window.players.length; i++) {
      var node = window.players[i];
      node.leaveIce();
    }
    $(".skateButton").hide();
    $(".leaveButton").hide();
    $(".lineUpButton").text("come back");
  });
  
  $(".zamboniButton").on("click", function(event) {
    $(".leaveButton").click();

    var snoopy = new Zamboni(0);

    snoopy.clean();

    // for (var i = 0; i < $('body').height()/snoopy.imag; i++) {
      // snoopy.$node.animate({ 
      // top: snoopy.top,
      // left: $("body").width() + snoopy.img.width
      // }, 2000 );

    //   snoopy.top = snoopy.top + snoopy.img.height;
    //   snoopy.left = $("body").width() + snoopy.img.width;
      
    //   snoopy.$node.animate({ 
    //   top: snoopy.top,
    //   left: -1 * snoopy.img.width
    //   }, 2000 );

    //   snoopy.top = snoopy.top + snoopy.img.height;
    //   snoopy.left = -1 * snoopy.img.width;      
    // }
  });
});

