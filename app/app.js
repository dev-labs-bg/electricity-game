var s=Snap(1200,600);
Snap.load("scheme1.svg",function rand (scheme) {
         var bulb=scheme.select("#light-bulb");
         var amp=scheme.select("#ampere-meter");
         var ampA=scheme.select("#A");
         var thing=s.group(amp,ampA);
         var t = new Snap.Matrix();
         t.translate(100,85);
         bulb.transform(t);
         //bulb.attr({fill: "yellow"});
         var origTransformBulb,origTransformThing;
         bulb.drag(function (dx, dy, posx, posy) {
                   var curTransform=Snap.parseTransformString(origTransformBulb)[0];
                   this.attr({transform: origTransformBulb + (origTransformBulb ? "T" : "t") + [dx, dy]}); //console.log(curTransform);
                   if ((curTransform[1]+dx)*(curTransform[1]+dx)+(curTransform[2]+dy)*(curTransform[2]+dy)<=2000) line1.attr({stroke:"white"});
                   else line1.attr({stroke:"black"});
                   if ((Math.abs(curTransform[1]+dx)<3)&&
                       (Math.abs(curTransform[2]+dy)<3)) alert("Bravo!"), this.undrag();
                   }, function () {
                      origTransformBulb = this.transform().local;
                   });
         thing.transform(t);
         thing.drag(function (dx, dy, posx, posy) {
                    var curTransform=Snap.parseTransformString(origTransformThing)[0];
                    this.attr({transform: origTransformThing + (origTransformThing ? "T" : "t") + [dx, dy]}); //console.log(curTransform);
                    if ((curTransform[1]+dx)*(curTransform[1]+dx)+(curTransform[2]+dy)*(curTransform[2]+dy)<=2000) line2.attr({stroke:"white"});
                    else line2.attr({stroke:"black"});
                    if ((Math.abs(curTransform[1]+dx)<3)&&
                        (Math.abs(curTransform[2]+dy)<3)) alert("Bravo!"), this.undrag();
                    }, function () {
                       origTransformThing = this.transform().local;
                    });
         s.append(scheme);
         });
var line1=s.line(318.8,79,348.2,79);
line1.attr({stroke:"black",strokeWidth:4});
var line2=s.line(39,166,40,272);
line2.attr({stroke:"black",strokeWidth:4});