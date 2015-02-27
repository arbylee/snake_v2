define([], function(){
  var newUI = function(context, pixelSize){
    var drawPixel = function(unweightedX, unweightedY, fillColor) {
      if(fillColor === undefined){
        fillColor = "#000";
      };
      var x = unweightedX * pixelSize;
      var y = unweightedY * pixelSize;
      context.fillStyle = fillColor;
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
