(function (Snap) {
// drawings is array containing the lines of the drawing and len - its length
var drawings, drawingsLen;
// this variables are for storing mouse position and if the mouse is down
var mouseX, mouseY, prevX, prevY, mouseDown;
// rectangle for drawing
var rectDrawing;
var interval;

// action buttons
var btnEraseAll;
var btnEraseLast;

var drawingFieldAttrs = {
  fill: "white",
  stroke: "black"
};

function initDrawModule(selector, dimensions) {
  var element = $(selector);
  var innerSvgSelector = selector + " svg";
  var innerSvg = $(innerSvgSelector);
  if (!element || !innerSvg) throw new Error("Component to initialize missing.");

  var snapSvg = Snap(innerSvgSelector);
  var rectDrawing = snapSvg.rect.apply(snapSvg, dimensions);
  rectDrawing.attr(drawingFieldAttrs);

  btnEraseAll = $(selector + ' .erase-all');
  btnEraseLast = $(selector + ' .erase-last');

  drawings = [];
  drawingsLen = 0;
  mouseDown = false;

  // get drawing surface offset
  var rectOffset = $(rectDrawing.paper.node).offset();
  // we need a fully loaded document to get proper dimensions
  // Note: This can be skipped if the whole initialization fires up after document is loaded (see app.js)
  $(document).ready(function() {
    rectOffset = $(rectDrawing.paper.node).offset();
  });
  // update offsets on window resize
  window.onresize = function() {
    rectOffset = $(rectDrawing.paper.node).offset();
  }
  // draw
  // TODO: attach 'mouseover' event handler for the element itself, not the whole document?
  // Then it won't be necessary to calculate coordinates/offsets at all.
  document.onmousemove = function(data) {
    mouseX = data.pageX - rectOffset.left;
    mouseY = data.pageY - rectOffset.top;
    if (!mouseDown) {
      prevX = mouseX;
      prevY = mouseY;
      return;
    }

    var rectCoords = rectDrawing.getBBox();
    var mouseIsOnDrawing = (mouseX > rectCoords.x) && 
      (mouseX < rectCoords.x2) &&
      (mouseY > rectCoords.y) &&
      (mouseY < rectCoords.y2);

    if (mouseIsOnDrawing) {
      // draw a line between previous (if valid) and current mouse coordinates
      if (prevX < rectCoords.x) prevX = rectCoords.x + 1;
      else if (prevX > rectCoords.x2) prevX = rectCoords.x2 - 1;
      if (prevY < rectCoords.y) prevY = rectCoords.y + 1;
      else if (prevY > rectCoords.y2) prevY = rectCoords.y2 - 1;

      drawings[drawingsLen] = rectDrawing.paper.line(prevX, prevY, mouseX, mouseY);
      drawings[drawingsLen++].attr({
        stroke: "black",
        strokeWidth: 1
      });
    }

    prevX = mouseX;
    prevY = mouseY;
  }

  document.body.onmousedown = function() {
    mouseDown = true;
  }

  document.body.onmouseup = function() {
    mouseDown = false;
  }

  // handlers for the buttons of the module
  btnEraseAll.on('click',function() {
    for (var i = 0; i < drawingsLen; i++) {
      drawings[i].remove();
    }
    drawingsLen = 0;
  });

  btnEraseLast
    .mousedown(function() {
      // making a continuous function for erasing the drawings
      interval = setInterval(eraseDrawing, 50);
    })
    .mouseup(function() {
      clearInterval(interval);
    });
}

function eraseDrawing () {
  // if mouse is down and there are drawings left, erase the last
  if (!mouseDown) return;
  if (drawingsLen === 0) return;
  drawings[drawingsLen - 1].remove();
  drawingsLen--;
}

function removeDrawModule() {
  if (btnEraseAll) btnEraseAll.off();
  if (btnEraseLast) btnEraseLast.off();
  window.onresize = document.onmousemove = document.body.onmousedown = document.body.onmouseup = null;
}

// exports
drawingModule = {
  init: initDrawModule,
  remove: removeDrawModule
};

})(Snap);