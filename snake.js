define([], function() {
  var DIRECTIONS = {UP: 1, RIGHT: 2, DOWN: 3, LEFT: 4};
  var newSnake = function(ui) {
    var body, head;

    var setLocation = function(x, y){
      body = [
        {x: x, y: y, velocityX: 1, velocityY: 0},
        {x: x-1, y: y, velocityX: 1, velocityY: 0},
        {x: x-2, y: y, velocityX: 1, velocityY: 0},
      ];
      head = body[0];
    };

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

    var collidedWithSelf = function(){
      return _.some(body, function(bodyPart, i){
        if(i == 0){
          return false;
        };
        if(bodyPart.x == head.x && bodyPart.y == head.y){
          return true;
        };
      });
    };

    var turning_180 = function(direction) {
      if(direction == DIRECTIONS.LEFT) {
        return body[1].y == head.y &&
               body[1].x == head.x - 1
      } else if(direction == DIRECTIONS.UP) {
        return body[1].x == head.x &&
               body[1].y == head.y - 1
      } else if(direction == DIRECTIONS.RIGHT) {
        return body[1].y == head.y &&
               body[1].x == head.x + 1
      } else if(direction == DIRECTIONS.DOWN) {
        return body[1].x == head.x &&
               body[1].y == head.y + 1
      }
    }

    var changeDirection = function(direction) {
      if(direction == DIRECTIONS.LEFT && !turning_180(DIRECTIONS.LEFT)){
        body[0].velocityX = -1;
        body[0].velocityY = 0;
      } else if(direction == DIRECTIONS.UP && !turning_180(DIRECTIONS.UP)){
        body[0].velocityX = 0;
        body[0].velocityY = -1;
      } else if(direction == DIRECTIONS.RIGHT && !turning_180(DIRECTIONS.RIGHT)){
        body[0].velocityX = 1;
        body[0].velocityY = 0;
      } else if(direction == DIRECTIONS.DOWN && !turning_180(DIRECTIONS.DOWN)){
        body[0].velocityX = 0;
        body[0].velocityY = 1;
      };
    }

    var getHead = function() {
      return head;
    };

    var grow = function() {
      var lastBodyPart = body[body.length-1];
      body.push({
        x: lastBodyPart.x - lastBodyPart.velocityX,
        y: lastBodyPart.y - lastBodyPart.velocityY,
        velocityX: lastBodyPart.velocityX,
        velocityY: lastBodyPart.velocityY
      });
    };

    var getBody = function() {
      return body;
    };

    return {
      head: getHead,
      body: getBody,
      draw: draw,
      move: move,
      collidedWithSelf: collidedWithSelf,
      changeDirection: changeDirection,
      setLocation: setLocation,
      grow: grow
    };
  };

  return {
    new: newSnake,
    DIRECTIONS: DIRECTIONS
  };
})
