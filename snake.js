define([], function() {
  var DIRECTIONS = {UP: 1, RIGHT: 2, DOWN: 3, LEFT: 4};
  var newSnake = function(ui) {
    var body;

    var setLocation = function(x, y){
      body = [
        {x: x, y: y, velocityX: 1, velocityY: 0},
        {x: x-1, y: y, velocityX: 1, velocityY: 0},
        {x: x-2, y: y, velocityX: 1, velocityY: 0},
      ];
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
      var head = body[0];
      return _.some(body, function(bodyPart, i){
        if(i == 0){
          return false;
        };
        if(bodyPart.x == head.x && bodyPart.y == head.y){
          return true;
        };
      });
    };

    var facing = function(direction) {
      if(direction == DIRECTIONS.LEFT) {
        return body[0].velocityX == -1;
      } else if(direction == DIRECTIONS.UP) {
        return body[0].velocityY == -1;
      } else if(direction == DIRECTIONS.RIGHT) {
        return body[0].velocityX == 1;
      } else if(direction == DIRECTIONS.DOWN) {
        return body[0].velocityY == 1;
      }
    }

    var changeDirection = function(direction) {
      if(direction == DIRECTIONS.LEFT && !facing(DIRECTIONS.RIGHT)){
        body[0].velocityX = -1;
        body[0].velocityY = 0;
      } else if(direction == DIRECTIONS.UP && !facing(DIRECTIONS.DOWN)){
        body[0].velocityX = 0;
        body[0].velocityY = -1;
      } else if(direction == DIRECTIONS.RIGHT && !facing(DIRECTIONS.LEFT)){
        body[0].velocityX = 1;
        body[0].velocityY = 0;
      } else if(direction == DIRECTIONS.DOWN && !facing(DIRECTIONS.UP)){
        body[0].velocityX = 0;
        body[0].velocityY = 1;
      };
    }

    var handleKeys = function(event){
      var letterA = 65,
          letterW = 87,
          letterD = 68,
          letterS = 83;
      if(event.keyCode == letterA){
        changeDirection(DIRECTIONS.LEFT);
      } else if(event.keyCode == letterW){
        changeDirection(DIRECTIONS.UP);
      } else if(event.keyCode == letterD){
        changeDirection(DIRECTIONS.RIGHT);
      } else if(event.keyCode == letterS){
        changeDirection(DIRECTIONS.DOWN);
      };
    };

    var head = function() {
      return body[0];
    };

    return {
      head: head,
      draw: draw,
      move: move,
      collidedWithSelf: collidedWithSelf,
      changeDirection: changeDirection,
      handleKeys: handleKeys,
      setLocation: setLocation
    };
  };

  return {
    new: newSnake,
    DIRECTIONS: DIRECTIONS
  };
})
