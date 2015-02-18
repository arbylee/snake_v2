define([], function() {
  var DIRECTIONS = {UP: 1, RIGHT: 2, DOWN: 3, LEFT: 4};
  var newSnake = function(ui, world, startingX, startingY) {
    var body = [
      {x: startingX, y: startingY, velocityX: 1, velocityY: 0},
      {x: startingX-1, y: startingY, velocityX: 1, velocityY: 0},
      {x: startingX-2, y: startingY, velocityX: 1, velocityY: 0},
    ]
    var draw = function() {
      _.each(body, function(bodyPart) {
        ui.drawPixel(bodyPart.x, bodyPart.y)
      });
    };

    var move = function() {
      _.each(body, function(bodyPart, i) {
        bodyPart.x += bodyPart.velocityX;
        bodyPart.y += bodyPart.velocityY;
      });

      for(var i=body.length-1; i>0; i--){
        body[i].velocityX = body[i-1].velocityX;
        body[i].velocityY = body[i-1].velocityY;
      };
    };

    var collidedWithWall = function() {
      if(body[0].x > world.width ||
         body[0].y > world.height ||
         body[0].x < 0 ||
         body[0].y < 0){
        return true;
      }
    };

    var dead = function() {
      return collidedWithWall();
    };

    var changeDirection = function(direction) {
      if(direction == DIRECTIONS.LEFT){
        body[0].velocityX = -1;
        body[0].velocityY = 0;
      } else if(direction == DIRECTIONS.UP){
        body[0].velocityX = 0;
        body[0].velocityY = -1;
      } else if(direction == DIRECTIONS.RIGHT){
        body[0].velocityX = 1;
        body[0].velocityY = 0;
      } else if(direction == DIRECTIONS.DOWN){
        body[0].velocityX = 0;
        body[0].velocityY = 1;
      };
    }

    return {
      body: body,
      draw: draw,
      move: move,
      dead: dead,
      changeDirection: changeDirection
    };
  };

  return {
    new: newSnake,
    DIRECTIONS: DIRECTIONS
  };
})
