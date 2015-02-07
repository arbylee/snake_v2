$(function() {
  var pixelSize = 10;

  var drawWorld = function(context, height, width) {
    context.fillStyle = "#FFF";
    context.fillRect(0, 0, width, height);
    context.fill();
    context.strokeStyle = "#000";
    context.strokeRect(0, 0, width, height);
  };

  var drawPixel = function(context, x, y) {
    context.fillStyle = "#000";
    context.fillRect(x, y, pixelSize, pixelSize);
    context.fill();
    context.strokeStyle = "#FFFFFF";
    context.strokeRect(x, y, pixelSize, pixelSize);
  };

  var drawInitialSnake = function(context, height, width) {
    var centerOfCanvasX = width/2;
    var centerOfCanvasY = height/2;
    var initialSnakeBody = [
      {x: width/2, y: height/2},
      {x: width/2-pixelSize, y: height/2},
      {x: width/2-2*pixelSize, y: height/2},
    ]
    _.each(initialSnakeBody, function(bodyPart) {
      drawPixel(context, bodyPart.x, bodyPart.y);
    });
  };

  var main = function(context, height, width) {
  };

  var init = function() {
    var canvas, context, height, width;
    canvas = $('#snake_canvas');
    context = canvas[0].getContext('2d');
    height = canvas.height();
    width = canvas.width();

    drawWorld(context, height, width);
    drawInitialSnake(context, height, width);
    main(context, height, width);
  };

  init();
});
