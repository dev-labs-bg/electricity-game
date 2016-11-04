(function drawingModule (removeBtn) {
// drawings is array containing the lines of the drawing and len - its length
var drawings,drawingsLen;
// this variables are for storing mouse position and if the mouse is down
var mouseX,mouseY,prevX,prevY,mouseDown;
// rectangle for drawing
var rectDrawing;
var interval;
    
initDrawModule = function (drawingField) {
                 drawings=[]; drawingsLen=0;
                 mouseDown=false;
    
                 rectDrawing=drawingField;
                 
                 document.onmousemove = function (data) {
                        mouseX = data.pageX;
                        mouseY = data.pageY;
                        if (mouseDown==false) {
                           prevX=mouseX; prevY=mouseY;
                           return ;
                           }
                        if ((mouseX>rectDrawing.getBBox().x)&&(mouseX<rectDrawing.getBBox().x2)&&
                            (mouseY>rectDrawing.getBBox().y)&&(mouseY<rectDrawing.getBBox().y2)) {
                           if (prevX<rectDrawing.getBBox().x) prevX=rectDrawing.getBBox().x+1;
                           else if (prevX>rectDrawing.getBBox().x2) prevX=rectDrawing.getBBox().x2-1;
                           if (prevY<rectDrawing.getBBox().y) prevY=rectDrawing.getBBox().y+1;
                           else if (prevY>rectDrawing.getBBox().y2) prevY=rectDrawing.getBBox().y2-1;
                           drawings[drawingsLen]=s.line(prevX,prevY,mouseX,mouseY);
                           drawings[drawingsLen++].attr({stroke:"black", strokeWidth:1});
                           }
                        prevX=mouseX; prevY=mouseY;
                        }
                 document.body.onmousedown = function() {
                         mouseDown=true;
                         }
                 document.body.onmouseup = function() {
                        mouseDown=false;
                        }
                 
                 // handlers for the buttons of the module
                 buttonEmptyDrawings.parent().css({top:rectDrawing.getBBox().y-$(".btn-wrapperEmptyDrawings").innerHeight(),
                                                   left:rectDrawing.getBBox().x2-$(".btn-wrapperEmptyDrawings").innerWidth()});
                 buttonEmptyDrawings.on('click',function() {
                                       for (var i=0; i<drawingsLen; i++) {
                                           drawings[i].remove();
                                           }
                                       drawingsLen=0;
                                       });
                 buttonEraseDrawing.parent().css({top:rectDrawing.getBBox().y2,
                                                  left:rectDrawing.getBBox().x2-$(".btn-wrapperEraseDrawing").innerWidth()});
                 //console.log(buttonEraseDrawing.css("height"));
                 buttonEraseDrawing.mousedown(function() {
                                             // making a continuous function for erasing the drawings
                                             interval=setInterval(eraseDrawing,50);
                                             }).mouseup(function() {
                                                       clearInterval(interval);
                                                       });
}

function eraseDrawing () {
         // if mouse is down and there are drawings left, erase the last
         if (mouseDown==false) return ;
         if (drawingsLen==0) return ;
         drawings[drawingsLen-1].remove();
         drawingsLen--;
}

removeDrawModule = function () {
                   removeBtn(buttonEmptyDrawings); removeBtn(buttonEraseDrawing);
                   document.onmousemove=document.body.onmousedown=document.body.onmouseup=null;
}
})(removeBtn);