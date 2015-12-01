describe("blinkyDancer", function() {

  var blinkyDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new BlinkyDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a step function that makes its node blink", function() {
    sinon.spy(blinkyDancer.$node, 'toggle');
    blinkyDancer.step();
    expect(blinkyDancer.$node.toggle.called).to.be.true;
  });

  describe("dance", function() {
    it("should call step at least once per second", function() {
      sinon.spy(blinkyDancer, "step");
      expect(blinkyDancer.step.callCount).to.be.equal(0);
      //blinkyDancer = new BlinkyDancer(10, 20, timeBetweenSteps);
      clock.tick(timeBetweenSteps);

      expect(blinkyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(2);
    });
  });
});

describe("slidingDancer", function() {

  var slidingDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    slidingDancer = new SlidingDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function() {
    expect(slidingDancer.$node).to.be.an.instanceof(jQuery);
  });


  describe("dance", function() {
    it("should call step at least four times per second", function() {
      sinon.spy(slidingDancer, "step");
      expect(slidingDancer.step.callCount).to.be.equal(0);
      //slidingDancer = new slidingDancer(10, 20, timeBetweenSteps);
      clock.tick(timeBetweenSteps);

      expect(slidingDancer.step.callCount).to.be.equal(4);

      clock.tick(timeBetweenSteps);
      expect(slidingDancer.step.callCount).to.be.equal(8);
    });
  });
});