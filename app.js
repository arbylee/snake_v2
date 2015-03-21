define(['jquery', 'underscore', 'snake', 'world', 'ui', 'food', 'snakeController'], function($, _, Snake, World, UI, Food, SnakeController){
  var letterA = 65,
      letterW = 87,
      letterD = 68,
      letterS = 83;
  var gameTickLength = 1000/12;
  var snakeContainer = $('#snake_container');
  var snakeController = SnakeController.new(letterW, letterD, letterS, letterA)
  snakeContainer.keydown(snakeController.handleKeys);

  var restart = function(ui, snake, world) {
    var snakeX = world.width / 2,
        snakeY = world.width / 2;

    world.clearSnakes();
    world.clearFood();
    var newSnake = Snake.new(ui);
    snakeController.setSnake(newSnake);
    world.addSnake(newSnake, snakeX, snakeY);
    snakeContainer.keydown(snakeController.handleKeys);
    main(ui, newSnake, world);
  };

  var main = function(ui, snake, world) {
    var alive = true;
    var gameLoop = function(){
      if(alive) {
        snake.move();
        world.feedSnakes();
        if(world.foodCount() < world.snakeCount()){
          var location = world.randomFreeLocation();
          var food = Food.new(ui, location.x, location.y);
          world.addFood(food);
        };

        world.draw();
        if(world.snakeCollidedWithWall(snake) || snake.collidedWithSelf()) {
          alive = false;
        };
        setTimeout(gameLoop, gameTickLength);
      } else {
        restart(ui, snake, world);
      };
    };
    setTimeout(gameLoop, gameTickLength);
  };

  var init = function() {
    var canvas = $('#snake_canvas');
    var context = canvas[0].getContext('2d');
    var pixelSize = 10;
    var ui = UI.new(context, pixelSize);
    var gameHeight = canvas.height() / pixelSize
    var gameWidth = canvas.width() / pixelSize
    var world = World.new(ui, gameWidth, gameHeight);
    var snake = Snake.new(ui);
    var snakeX = world.width / 2;
    var snakeY = world.height / 2;
    world.addSnake(snake, snakeX, snakeY)

    snakeController.setSnake(snake)
    main(ui, snake, world);
  };

  return {init: init}
});
