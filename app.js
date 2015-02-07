$(function() {
  var pixelSize = 10;
  var gameTickLength = 1000/6;

  var newWorld = function(context, height, width) {
    var draw = function() {
      context.fillStyle = "#FFF";
      context.fillRect(0, 0, width, height);
      context.fill();
      context.strokeStyle = "#000";
      context.strokeRect(0, 0, width, height);
    };
    return {
      draw: draw,
      width: width,
      height: height
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

    var collidedWithWall = function() {
      if(body[0].x > width){
        return true;
      }
    };

    var dead = function() {
      return collidedWithWall();
    };

    return {
      body: body,
      draw: draw,
      move: move,
      dead: dead
    };
  };

  var restart = function(context, world) {
    var snake = newSnake(context, world.height, world.width);
    main(context, snake, world);
  };

  var main = function(context, snake, world) {
    var alive = true;
    var gameLoop = function(){
      if(alive) {
        world.draw();
        snake.move();
        snake.draw();
        if(snake.dead()) {
          alive = false;
        };
        intervalId = setTimeout(gameLoop, gameTickLength);
      } else {
        restart(context, world);
      }
    };
    intervalId = setTimeout(gameLoop, gameTickLength);
  };

  var init = function() {
    var canvas, context;
    canvas = $('#snake_canvas');
    context = canvas[0].getContext('2d');

    var world = newWorld(context, canvas.height(), canvas.width());
    var snake = newSnake(context, world.height, world.width);
    main(context, snake, world);
  };

  init();
});
