define(['jquery', 'underscore', 'snake', 'world', 'ui', 'food'], function($, _, Snake, World, UI, Food){
  var gameTickLength = 1000/6;
  var snakeContainer = $('#snake_container');

  var restart = function(ui, snake, world) {
    var snakeX = world.width / 2,
        snakeY = world.width / 2;

    snakeContainer.off('keydown', snake.handleKeys)
    world.clearSnakes();

    var newSnake = Snake.new(ui);
    world.addSnake(newSnake, snakeX, snakeY);
    snakeContainer.keydown(newSnake.handleKeys);
    main(ui, newSnake, world);
  };

  var main = function(ui, snake, world) {
    var alive = true;
    var gameLoop = function(){
      if(alive) {
        snake.move();
        if(world.foodCount() < world.snakeCount()){
          var location = world.randomFreeLocation();
          var food = Food.new(ui, location.x, location.y);
          world.addFood(food);
        };

        world.draw();
        if(world.snakeCollidedWithWall(snake) || snake.collidedWithSelf()) {
          alive = false;
        };
        intervalId = setTimeout(gameLoop, gameTickLength);
      } else {
        restart(ui, snake, world);
      }
    };
    intervalId = setTimeout(gameLoop, gameTickLength);
  };

  var init = function() {
    var canvas,
        context,
        pixelSize = 10;
    canvas = $('#snake_canvas');
    context = canvas[0].getContext('2d');
    var ui = UI.new(context, pixelSize);
    var gameHeight = canvas.height() / pixelSize
    var gameWidth = canvas.width() / pixelSize
    var world = World.new(ui, gameWidth, gameHeight);
    var snake = Snake.new(ui);
    var snakeX = world.width / 2;
    var snakeY = world.height / 2;
    world.addSnake(snake, snakeX, snakeY)

    snakeContainer.keydown(snake.handleKeys);
    main(ui, snake, world);
  };

  return {init: init}
});
