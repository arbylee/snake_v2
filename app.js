$(function() {
  var pixelSize = 10;

  var newWorld = function(context, height, width) {
    var draw = function() {
      context.fillStyle = "#FFF";
      context.fillRect(0, 0, width, height);
      context.fill();
      context.strokeStyle = "#000";
      context.strokeRect(0, 0, width, height);
    };
    return {
      draw: draw
    }
  };

  var drawPixel = function(context, x, y) {
    context.fillStyle = "#000";
    context.fillRect(x, y, pixelSize, pixelSize);
    context.fill();
    context.strokeStyle = "#FFFFFF";
    context.strokeRect(x, y, pixelSize, pixelSize);
  };

  var newSnake = function(context, height, width) {
    var centerOfCanvasX = width/2;
    var centerOfCanvasY = height/2;
    var body = [
      {x: width/2, y: height/2, velocityX: 1, velocityY: 0},
      {x: width/2-pixelSize, y: height/2, velocityX: 1, velocityY: 0},
      {x: width/2-2*pixelSize, y: height/2, velocityX: 1, velocityY: 0},
    ]
    var draw = function() {
      _.each(body, function(bodyPart) {
        drawPixel(context, bodyPart.x, bodyPart.y);
      });
    };

    var move = function() {
      _.each(body, function(bodyPart, i) {
        bodyPart.x += bodyPart.velocityX * pixelSize;
        bodyPart.y += bodyPart.velocityY * pixelSize;
        if(i < body.length-1){
          bodyPart.velocityX = body[i+1].velocityX;
          bodyPart.velocityY = body[i+1].velocityY;
        }
      });
    };

    return {
      body: body,
      draw: draw,
      move: move
    };
  };

  var main = function(snake, world) {
    world.draw();
    snake.move();
    snake.draw();
  };

  var init = function() {
    var canvas, context, height, width;
    canvas = $('#snake_canvas');
    context = canvas[0].getContext('2d');
    height = canvas.height();
    width = canvas.width();

    var world = newWorld(context, height, width);
    var snake = newSnake(context, height, width);
    main(snake, world);
  };

  init();
});
