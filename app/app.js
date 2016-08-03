function hitTest (obj1, obj2) {
         // check if the boundaries of the two objects intersect
         if ((obj1.getBBox().x>obj2.getBBox().x2)||(obj1.getBBox().y>obj2.getBBox().y2)||
             (obj1.getBBox().x2<obj2.getBBox().x)||(obj1.getBBox().y2<obj2.getBBox().y)) return false;
         return true;
}
var s=Snap("100%","100%");
// these are the objects that will be able to be dragged
var bulbOrig,bulb,ampMeter,voltMeter,fridge,blender,toaster,microwave,battery,light,bulbWire,batteryComp;
// states of the needed objects for the electric circuit
var bulbReady=0,ampMeterReady=0,batteryReady=0,electricalCur=0;
// coordinates of the supposed place for the bulb and curCoord - for the new initial place
var prevCoord,curCoord;
// prev is array where the old position of the objects is saved
var prev=[],origTransform=[];
// object for making some object under wires, line1, line2 and line3
var groupBottom,wires;
// array containing all objects
var things;
Snap.load("scheme1.svg",function(data) {
         wires=data.selectAll("#Path-2");
         bulbOrig=s.group(data.select("#light-bulb"),data.select("#light-bulb"));
         ampMeter=s.group(data.select("#Rectangle-3"),data.select("#Rectangle-4"), data.selectAll("#circles"),data.select("#ampere-meter-path"),data.select("#ampere-meter"),data.select("#A"),data.select("#Line"));
         groupBottom=s.group(ampMeter,line1,line2,line3,wires);
         batteryComp=[data.selectAll("#Rectangle-bat"),data.selectAll("#Rectangle-2")];
         battery=s.group(batteryComp[0],batteryComp[1],data.select("#Group-11"));
         prevCoord=[bulbOrig.getBBox().x,bulbOrig.getBBox().y];
         groupBottom=s.group(data,line1,line2,line3,wires);
         s.append(groupBottom);
         bulbOrig.remove();
         Snap.load("scheme4.svg",function(data) {
                  // the object is groupped with itself otherwise it cannot leave the boundary of scheme4.svg
                  toaster=s.group(data.select("#bread-toaster"),data.select("#bread-toaster"));
                  microwave=s.group(data.select("#microwave"),data.select("#microwave"));
                  fridge=s.group(data.select("#fridge"),data.select("#fridge"));
                  blender=s.group(data.selectAll("#blender"),data.selectAll("#blender"));
                  groupBottom=s.group(toaster,microwave,fridge,blender,line1,line2,line3,wires);
                  s.append(groupBottom);
                  Snap.load("voltmeter.svg",function(data) {
                           voltMeter=s.group(data.select("#Page-1"),data.select("#Page-1"));
                           s.append(voltMeter);
                           Snap.load("lightening-bulb2.svg",function(data) {
                                    light=data.selectAll("#Combined-Shape");
                                    bulbWire=data.select("#wire");
                                    bulb=s.group(light,bulbWire,data.select("#bulb-light"));
                                    groupBottom=s.group(bulb,line1,line2,line3,wires);
                                    s.append(groupBottom);
                                    light.attr({opacity:0});
                                    bulbWire.attr({fill:"grey"});
                                    curCoord=[bulb.getBBox().x,bulb.getBBox().y];
                                    things=[bulb,ampMeter,voltMeter,fridge,blender,toaster,microwave,buttonReset,battery];
                                    work();
                           });
                  });
         });
});
function hitCheck (ind, curTransform, obj, dx, dy) {
                  // function to check if obj hits with some of the other objects
                  obj.attr({transform: origTransform[ind] + (origTransform[ind] ? "T" : "t") + [dx, dy]});
                  for (i=0; i<things.length; i++) {
                      if (obj==things[i]) continue;
                      if (hitTest(things[i],obj)==1) {
                         obj.attr({transform: origTransform[ind] + (origTransform[ind] ? "T" : "t") + [prev[ind][0], prev[ind][1]]});
                         return true;
                         }
                      }
                  prev[ind]=[dx,dy];
                  return false;
}
function work () {
         for (i=0; i<things.length; i++) {
             things[i].undrag();
             }
         // checks if the light-bulb is in the right place
         if (bulbReady==0) {
            line1.attr({opacity:1});
            t = new Snap.Matrix();
            t.translate(prevCoord[0]-curCoord[0]+437,prevCoord[1]-curCoord[1]+116);
            bulb.transform(t);
            bulb.drag(function(dx, dy, posx, posy) {
                     var curTransform=Snap.parseTransformString(origTransform[0])[0];
                     if (hitCheck(0,curTransform,this,dx,dy)==1) return ;
                     // checks if the bulb is near the supposed place and makes a hole in the wire
                     if ((prevCoord[0]-bulb.getBBox().x)*(prevCoord[0]-bulb.getBBox().x)+(prevCoord[1]-bulb.getBBox().y)*(prevCoord[1]-bulb.getBBox().y)<=2000) line1.animate({opacity:0},200);
                     else line1.animate({opacity:1},200);
                     // checks if the bulb is in the right place and removes the drag handlers
                     //console.log(Math.abs(prevCoord[0]-bulb.getBBox().x));
                     if ((Math.abs(prevCoord[0]-bulb.getBBox().x)<3)&&
                         (Math.abs(prevCoord[1]-bulb.getBBox().y)<3)) line1.attr({opacity:0}), alert('Bravo'), bulbReady++, this.undrag();
                     },function() {
                     origTransform[0] = this.transform().local;
                     });
            }
         // checks if the amperе-meter is in the right place
         if (ampMeterReady==0) {
            line2.attr({opacity:1});
            t = new Snap.Matrix();
            t.translate(871,-48);
            ampMeter.transform(t);
            ampMeter.drag(function (dx, dy, posx, posy) {
                         //analogously with the bulb handler
                         var curTransform=Snap.parseTransformString(origTransform[1])[0];
                         if (hitCheck(1,curTransform,this,dx,dy)==1) return ;
                         if ((curTransform[1]+dx)*(curTransform[1]+dx)+(curTransform[2]+dy)*(curTransform[2]+dy)<=2000) line2.animate({opacity:0},200);
                         else line2.animate({opacity:1},200);
                         if ((Math.abs(curTransform[1]+dx)<3)&&
                             (Math.abs(curTransform[2]+dy)<3)) alert("Bravo!"), ampMeterReady++, this.undrag();
                         },function() {
                         origTransform[1] = this.transform().local;
                         });
            }
         // checks if the battery is in the right place
         if (batteryReady==0) {
            line3.attr({opacity:1});
            t = new Snap.Matrix();
            t.translate(717,118);
            battery.transform(t);
            battery.drag(function (dx, dy, posx, posy) {
                        var curTransform=Snap.parseTransformString(origTransform[2])[0];
                        if (hitCheck(2,curTransform,this,dx,dy)==1) return ;
                        if ((curTransform[1]+dx)*(curTransform[1]+dx)+(curTransform[2]+dy)*(curTransform[2]+dy)<=4000) line3.animate({opacity:0},200);
                        else line3.animate({opacity:1},200);
                        if ((Math.abs(curTransform[1]+dx)<6)&&
                            (Math.abs(curTransform[2]+dy)<6)) alert("Bravo!"), batteryReady++, this.undrag();
                        },function() {
                        origTransform[2] = this.transform().local;
                        });
            }
         t = new Snap.Matrix();
         t.translate(1000,-322);
         // for all other objects it is checked if they will hit other objects when dragged
         toaster.transform(t);
         toaster.drag(function (dx, dy, posx, posy) {
                     var curTransform=Snap.parseTransformString(origTransform[3])[0];
                     if (hitCheck(3,curTransform,this,dx,dy)==1) return ;
                     },function() {
                     origTransform[3] = this.transform().local;
                     });
         t = new Snap.Matrix();
         t.translate(721,274);
         microwave.transform(t);
         microwave.drag(function (dx, dy, posx, posy) {
                       var curTransform=Snap.parseTransformString(origTransform[4])[0];
                       if (hitCheck(4,curTransform,this,dx,dy)==1) return ;
                       },function() {
                       origTransform[4] = this.transform().local;
                       });
         t = new Snap.Matrix();
         t.translate(794,7);
         fridge.transform(t);
         fridge.drag(function (dx, dy, posx, posy) {
                    var curTransform=Snap.parseTransformString(origTransform[5])[0];
                    if (hitCheck(5,curTransform,this,dx,dy)==1) return ;
                    },function() {
                    origTransform[5] = this.transform().local;
                    });
         t = new Snap.Matrix();
         t.translate(425,7);
         blender.transform(t);
         blender.drag(function (dx, dy, posx, posy) {
                     var curTransform=Snap.parseTransformString(origTransform[6])[0];
                     if (hitCheck(6,curTransform,this,dx,dy)==1) return ;
                     },function() {
                     origTransform[6] = this.transform().local;
                     });
         t = new Snap.Matrix();
         t.translate(731,397);
         voltMeter.transform(t);
         voltMeter.drag(function (dx, dy, posx, posy) {
                       var curTransform=Snap.parseTransformString(origTransform[7])[0];
                       if (hitCheck(7,curTransform,this,dx,dy)==1) return ;
                       },function() {
                       origTransform[7] = this.transform().local;
                       });
}

var line1=s.line(318.8,79,348.2,79);
line1.attr({stroke:"black", strokeWidth:4});
var line2=s.line(40,166,40,272);
line2.attr({stroke:"black", strokeWidth:4});
var line3=s.line(292,360,372,360);
line3.attr({stroke:"black", strokeWidth:4});

// makes horizontal lines for the 3x3 grid
var line4=s.line(698,100,1122,100);
line4.attr({stroke:"black", strokeWidth:4});
var line5=s.line(700,240,1122,240);
line5.attr({stroke:"black", strokeWidth:4});
var line6=s.line(700,380,1122,380);
line6.attr({stroke:"black", strokeWidth:4});
var line7=s.line(698,520,1122,520);
line7.attr({stroke:"black", strokeWidth:4});

// makes vertical lines for the 3x3 grid
var line8=s.line(700,100,700,520);
line8.attr({stroke:"black", strokeWidth:4});
var line9=s.line(840,100,840,520);
line9.attr({stroke:"black", strokeWidth:4});
var line10=s.line(980,100,980,520);
line10.attr({stroke:"black", strokeWidth:4});
var line11=s.line(1120,100,1120,520);
line11.attr({stroke:"black", strokeWidth:4});

// makes a reset button
var rect1=s.rect(860,400,100,100);
var text1=s.text(890,452,"reset");
var buttonReset=s.group(rect1,text1);
rect1.attr({stroke:"black", strokeWidth:1, fill:"white"});
text1.attr({"font-size":20, "id": "reset"});
buttonReset.node.onclick = function () {
           work();
}
// makes a button to start the electrical circuit
var rect2=s.rect(400,400,100,100);
var text2=s.text(436,452,"tok");
var buttonElCur=s.group(rect2,text2);
rect2.attr({stroke:"black", strokeWidth:1, fill:"white"});
text2.attr({"font-size":20, "id": "tok"});
// flag shows if the restart button can be used
var flag=0;
buttonElCur.node.onclick = function () {
            if (batteryReady==0) {
               alert('No battery!');
               return ;
               }
            if (bulbReady==0) {
               flag++;
               batteryComp[0].animate({fill:"red"},1500);
               batteryComp[1].animate({fill:"red"},1500);
               for (i=0; i<things.length; i++) {
                   things[i].undrag();
                   }
               /* future feature:
               rect3.attr({opacity:1});
               text3.attr({opacity:1});
               */
               return ;
               }
            if (ampMeterReady==0) return ;
            for (i=0; i<things.length; i++) {
                things[i].undrag();
                }
            light.animate({opacity:1},1500);
            bulbWire.animate({fill:"orangered"},1500);
}
// makes a restart button
var rect3=s.rect(180,400,100,100);
var text3=s.text(205,452,"restart");
var buttonRestart=s.group(rect3,text3);
rect3.attr({stroke:"black", strokeWidth:1, fill:"white"});
text3.attr({"font-size":20, "id": "restart"});
rect3.attr({opacity:0});
text3.attr({opacity:0});
/* future feature:
buttonRestart.node.onclick = function () {
              if (flag==0) return ;
              bulbReady=batteryReady=ampMeterReady=0;
              rect3.attr({opacity:0});
              text3.attr({opacity:0});
              flag=0;
              batteryComp[0].attr({fill:"#C5E1A5"});
              batteryComp[1].attr({fill:"#DEDEDE"});
              work();
}*/