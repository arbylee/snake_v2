define([], function(){
  var newUI = function(context, pixelSize){
    var drawPixel = function(unweightedX, unweightedY) {
      var x = unweightedX * pixelSize;
      var y = unweightedY * pixelSize;
      context.fillStyle = "#000";
      context.fillRect(x, y, pixelSize, pixelSize);
      context.fill();
      context.strokeStyle = "#FFFFFF";
      context.strokeRect(x, y, pixelSize, pixelSize);
    };

    var drawBox = function(unweightedWidth, unweightedHeight){
      var height = unweightedHeight * pixelSize,
          width = unweightedWidth * pixelSize
      context.fillStyle = "#FFF";
      context.fillRect(0, 0, width, height);
      context.fill();
      context.strokeStyle = "#000";
      context.strokeRect(0, 0, width, height);
    };

    return {
      drawPixel: drawPixel,
      drawBox: drawBox
    };
  };

  return {new: newUI};
});
