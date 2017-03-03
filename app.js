window.onload = function () {
  var s = new Snap('#machine');
  var bubble1 = s.select('#bubble1');
  var bubble1Box = bubble1.getBBox(1);
  var bubblePath = s.path('M371.44 596.67l280.88-.29s-12.57-259.35 21-336.49c14.09-32.37 39.2-55.47 109.86-55.47 69.87 0 100.68 25.14 106.86 55.36 18.56 90.74-1.18 336.89-1.18 336.89l267.3.71').attr({
    'fill': 'none',
    'stroke': 'none'
  });
  function animate() {
    animateAlongPath(bubble1, bubblePath, 8000, function() {
      animate();
    });
  }

  animate();
};

function animateAlongPath(element, path, time, callback){
  var pathLength = Snap.path.getTotalLength(path);
  var bbox = element.getBBox(1);
  Snap.animate(0, pathLength, function (step) {
    var moveToPoint = Snap.path.getPointAtLength(path, step);
    var x = moveToPoint.x - (element.getBBox(1).width / 2) - bbox.x;
    var y = moveToPoint.y - (element.getBBox(1).height / 2) - bbox.y;
    element.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 180) + ', ' + element.cx + ', ' + element.cy + ')');
  }, time, mina.easeinout, function () {
    callback && callback();
  });
}


