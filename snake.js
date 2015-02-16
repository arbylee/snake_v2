define([], function() {
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
        if(i < body.length-1){
          bodyPart.velocityX = body[i+1].velocityX;
          bodyPart.velocityY = body[i+1].velocityY;
        }
      });
    };

    var collidedWithWall = function() {
      if(body[0].x > world.width){
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

  return {new: newSnake};
})
