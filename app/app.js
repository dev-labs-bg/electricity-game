function hitTest (obj1, obj2) {
         if ((obj1.getBBox().x>obj2.getBBox().x2)||(obj1.getBBox().y>obj2.getBBox().y2)||
             (obj1.getBBox().x2<obj2.getBBox().x)||(obj1.getBBox().y2<obj2.getBBox().y)) return false;
         return true;
}
var s=Snap("100%","100%");
var bulb,ampMeter,voltMeter,fridge,blender,toaster,microwave;
var prev=[],origTransform=[];
var things;
Snap.load("scheme1.svg",function(data) {
         bulb=s.group(data.select("#light-bulb"),data.select("#light-bulb"));
         ampMeter=s.group(data.select("#ampere-meter"),data.select("#A"));
         s.append(data);
         Snap.load("scheme4.svg",function(data) {
                  toaster=s.group(data.select("#bread-toaster"),data.select("#bread-toaster"));
                  microwave=s.group(data.select("#microwave"),data.select("#microwave"));
                  fridge=s.group(data.select("#fridge"),data.select("#fridge"));
                  blender=s.group(data.select("#blender"),data.select("#blender"));
                  s.append(toaster); s.append(microwave); s.append(fridge); s.append(blender);
                  Snap.load("voltmeter.svg",function(data) {
                           voltMeter=s.group(data.select("#voltmeter"),data.select("#voltmeter"));
                           things = [bulb,ampMeter,voltMeter,fridge,blender,toaster,microwave,button];
                           s.append(voltMeter);
                           work();
                  });
         });
});
function hitCheck (ind, curTransform, obj, dx, dy) {
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
         t = new Snap.Matrix();
         t.translate(430,105);
         bulb.transform(t);
         bulb.drag(function(dx, dy, posx, posy) {
                  var curTransform=Snap.parseTransformString(origTransform[0])[0];
                  if (hitCheck(0,curTransform,this,dx,dy)==1) return ;
                  if ((curTransform[1]+dx)*(curTransform[1]+dx)+(curTransform[2]+dy)*(curTransform[2]+dy)<=2000) line1.attr({stroke:"white"});
                  else line1.attr({stroke:"black"});
                  if ((Math.abs(curTransform[1]+dx)<3)&&
                     (Math.abs(curTransform[2]+dy)<3)) alert("Bravo!"), this.undrag();
                  },function() {
                  origTransform[0] = this.transform().local;
                  });
         t = new Snap.Matrix();
         t.translate(841,-60);
         ampMeter.transform(t);
         ampMeter.drag(function (dx, dy, posx, posy) {
                      var curTransform=Snap.parseTransformString(origTransform[1])[0];
                      if (hitCheck(1,curTransform,this,dx,dy)==1) return ;
                      if ((curTransform[1]+dx)*(curTransform[1]+dx)+(curTransform[2]+dy)*(curTransform[2]+dy)<=2000) line2.attr({stroke:"white"});
                      else line2.attr({stroke:"black"});
                      if ((Math.abs(curTransform[1]+dx)<3)&&
                          (Math.abs(curTransform[2]+dy)<3)) alert("Bravo!"), this.undrag();
                      },function() {
                      origTransform[1] = this.transform().local;
                      });
         t = new Snap.Matrix();
         t.translate(630,-368);
         toaster.transform(t);
         toaster.drag(function (dx, dy, posx, posy) {
                     var curTransform=Snap.parseTransformString(origTransform[2])[0];
                     if (hitCheck(2,curTransform,this,dx,dy)==1) return ;
                     },function() {
                     origTransform[2] = this.transform().local;
                     });
         t = new Snap.Matrix();
         t.translate(388,207);
         microwave.transform(t);
         microwave.drag(function (dx, dy, posx, posy) {
                       var curTransform=Snap.parseTransformString(origTransform[3])[0];
                       if (hitCheck(3,curTransform,this,dx,dy)==1) return ;
                       },function() {
                       origTransform[3] = this.transform().local;
                       });
         t = new Snap.Matrix();
         t.translate(764,-22);
         fridge.transform(t);
         fridge.drag(function (dx, dy, posx, posy) {
                    var curTransform=Snap.parseTransformString(origTransform[4])[0];
                    if (hitCheck(4,curTransform,this,dx,dy)==1) return ;
                    },function() {
                    origTransform[4] = this.transform().local;
                    });
         t = new Snap.Matrix();
         t.translate(377,-22);
         blender.transform(t);
         blender.drag(function (dx, dy, posx, posy) {
                     var curTransform=Snap.parseTransformString(origTransform[5])[0];
                     if (hitCheck(5,curTransform,this,dx,dy)==1) return ;
                     },function() {
                     origTransform[5] = this.transform().local;
                     });
         t = new Snap.Matrix();
         t.translate(720,347);
         voltMeter.transform(t);
         voltMeter.drag(function (dx, dy, posx, posy) {
                       var curTransform=Snap.parseTransformString(origTransform[6])[0];
                       if (hitCheck(6,curTransform,this,dx,dy)==1) return ;
                       },function() {
                       origTransform[6] = this.transform().local;
                       });
}
var line1=s.line(318.8,79,348.2,79);
line1.attr({stroke:"black", strokeWidth:4});
var line2=s.line(40,166,40,272);
line2.attr({stroke:"black", strokeWidth:4});

var line3=s.line(698,100,1062,100);
line3.attr({stroke:"black", strokeWidth:4});
var line4=s.line(700,220,1060,220);
line4.attr({stroke:"black", strokeWidth:4});
var line5=s.line(700,340,1060,340);
line5.attr({stroke:"black", strokeWidth:4});
var line6=s.line(698,460,1062,460);
line6.attr({stroke:"black", strokeWidth:4});

var line7=s.line(700,100,700,460);
line7.attr({stroke:"black", strokeWidth:4});
var line8=s.line(820,100,820,460);
line8.attr({stroke:"black", strokeWidth:4});
var line9=s.line(940,100,940,460);
line9.attr({stroke:"black", strokeWidth:4});
var line10=s.line(1060,100,1060,460);
line10.attr({stroke:"black", strokeWidth:4});

var button=s.rect(830,350,100,100);
button.attr({stroke:"black", strokeWidth:1, fill:"white"});
button.node.onclick = function () {
       work();
}