(function lvl1 (hitTest, hitTestBtn, message, removeBtn, blink, turnOn, turnOff) {
// these are the objects that will be able to be dragged and some of their components
var bulbOrig,bulb,ampMeter,voltMeter,fridge,blender,toaster,microwave,battery,light,bulbWire,batteryComp,bulbWireColor;
// snap textfields
var formula,voltSign,hintObj;
// states of the needed objects for the electric circuit
var bulbReady,ampMeterReady,batteryReady,electricalCur;
// coordinates of the supposed place for the bulb and curCoord - for the new initial place
var prevCoord,curCoord;
// prev is array where the old position of the objects is saved
var prev,origTransform;
// object for making some object under wires, lines[0], lines[1] and lines[2]
var groupBottom,wires,lines;
// things - array containing all objects and buttons - array containing all buttons
var things,buttons;
// flag1 shows if the restart button can be used, flag2 if the battery will blow and flag3 - if the reset button can be used
var flag1,flag2,flag3;
// variables for removing timeOuts
var timeOutBlow,timeOutLight;

initLvl1 = function () {
         // load snap for level1
         s=Snap(".level1 .circuit");
    
         $(".level1").show();
    
         // default values for variables
         bulbReady=0,ampMeterReady=0,batteryReady=0,electricalCur=0;
         flag1=0; flag2=0; flag3=0;
         prev=[]; origTransform=[]; lines=[];
    
         initTextFieldsLvl1();
         makeSvgLinesLvl1();
         loadSvgsLvl1();
         handlersBtnsLvl1();
}

function initTextFieldsLvl1 () {
         // text and attributes for svg textboxes
         textAmpMeter=s.text(25,195,"2 A");
         textAmpMeter.attr({"font-size":20, id:"textAmpMeter"});
    
         formula=s.text(640,230,"Закон на Ом: I=U/R => U=R.I=(6 Ω)*(2 A)=");
         formula.attr({"font-size": 25, "font-weight": "bold", id: "formula"});
         formula.attr({opacity: 0});
    
         voltSign=s.text(1250,230,"V");
         voltSign.attr({"font-size": 25, "font-weight": "bold", id: "voltSign"});
         voltSign.attr({opacity:0});
    
         hintObj=s.text(330,215,"Студено!");
         hintObj.attr({"font-size": 25, id: "objPosition", "text-anchor": "middle"});
         hintObj.attr({opacity:0});
         
         // make input box undisabled and without text
         $("#ans").prop('disabled',false);
         $("#ans").val("");
         $("#label").removeClass("active");
    
         // hides the input box
         inputLvl1.css({top: -1000, left: -1000});
}
    
function makeSvgLinesLvl1 () {
         // lines for the holes in the wires
         lines[0]=s.line(318.8,79,348.2,79);
         lines[0].attr({stroke:"black", strokeWidth:4});
         lines[1]=s.line(40,166,40,272);
         lines[1].attr({stroke:"black", strokeWidth:4});
         lines[2]=s.line(292,360,372,360);
         lines[2].attr({stroke:"black", strokeWidth:4});

         // makes horizontal lines for the 3x3 grid
         lines[3]=s.line(698,100,1122,100);
         lines[3].attr({stroke:"black", strokeWidth:4});
         lines[4]=s.line(700,240,1122,240);
         lines[4].attr({stroke:"black", strokeWidth:4});
         lines[5]=s.line(700,380,1122,380);
         lines[5].attr({stroke:"black", strokeWidth:4});
         lines[6]=s.line(698,520,1122,520);
         lines[6].attr({stroke:"black", strokeWidth:4});

         // makes vertical lines for the 3x3 grid
         lines[7]=s.line(700,100,700,520);
         lines[7].attr({stroke:"black", strokeWidth:4});
         lines[8]=s.line(840,100,840,520);
         lines[8].attr({stroke:"black", strokeWidth:4});
         lines[9]=s.line(980,100,980,520);
         lines[9].attr({stroke:"black", strokeWidth:4});
         lines[10]=s.line(1120,100,1120,520);
         lines[10].attr({stroke:"black", strokeWidth:4});
}

function loadSvgsLvl1 () {
         // loading objects from svgs for level 1
         Snap.load("app/scheme1_1.svg",function(data) {
                  wires=data.selectAll("#Path-2");
                  bulbOrig=data.select("#light-bulb");
                  ampMeter=s.group(data.select("#Rectangle-3"),data.select("#Rectangle-4"),  data.selectAll("#circles"),data.select("#ampere-meter-path"),data.select("#ampere-meter"),data.select("#A"),data.select("#Line"),textAmpMeter);
                  groupBottom=s.group(ampMeter,lines[0],lines[1],lines[2],wires);
                  batteryComp=[data.selectAll("#Rectangle-bat"),data.select("#label"),data.selectAll("#Rectangle-2")];
                  battery=s.group(batteryComp[0],batteryComp[1],batteryComp[2],data.select("#Group-11"));
                  prevCoord=[bulbOrig.getBBox().x,bulbOrig.getBBox().y];
                  groupBottom=s.group(data,lines[0],lines[1],lines[2],wires);
                  s.append(groupBottom);
                  bulbOrig.remove();
                  Snap.load("app/scheme1_2.svg",function(data) {
                          toaster=data.select("#bread-toaster");
                          microwave=data.select("#microwave");
                          fridge=data.select("#fridge");
                          blender=data.select("#blender");
                          groupBottom=s.group(toaster,microwave,fridge,blender,lines[0],lines[1],lines[2],wires);
                          s.append(groupBottom);
                          Snap.load("app/voltmeter.svg",function(data) {
                                   voltMeter=data.select("#Page-1");
                                   s.append(voltMeter);
                                   Snap.load("app/lightening-bulb.svg",function(data) {
                                            light=data.selectAll("#Combined-Shape");
                                            bulbWire=data.select("#gWire"); bulbWireColor=data.select("#wire");
                                            bulb=s.group(light,bulbWire,data.select("#bulb-light"));
                                            groupBottom=s.group(bulb,lines[0],lines[1],lines[2],wires);
                                            s.append(bulb);
                                            light.attr({opacity:0});
                                            bulbWireColor.attr({fill:"grey"});
                                            curCoord=[bulb.getBBox().x,bulb.getBBox().y];
                                            things=[bulb,ampMeter,battery,toaster,microwave,fridge,blender,voltMeter];
                                            buttons=[buttonReset.parent(),buttonElCur.parent(),buttonStatement.parent()];
                                            workLvl1();
                                   });
                          });
                  });
         });
}

function handlersBtnsLvl1 () {
         // makes handlers and css atrributes for the buttons made with materialize
         buttonReset.parent().css({top: 400, left: 860});
         buttonReset.on('click',function(){
                       workLvl1();
                       });

         buttonElCur.parent().css({top: 400, left: 500});
         buttonElCur.on('click',function() {
                       // validation for the electirical circuit
                       if (batteryReady==0) {
                          message('Батерията не е поставена във веригата и ток не може да протече!');
                          return ;
                          }
                       if (bulbReady==0) {
                          if (flag2!=0) return 0;
                          flag2++;
                          batteryComp[0].animate({fill:"red"},1500);
                          batteryComp[1].animate({fill:"red"},1500);
                          batteryComp[2].animate({fill:"red"},1500);
                          for (i=0; i<things.length; i++) {
                              things[i].undrag();
                              }
                          timeOutBlow = setTimeout(function() {
                                                  $("#canvas").css({left: battery.getBBox().x-$("#canvas").innerWidth()/2+ (Math.random()*100)%30, top: battery.getBBox().y-$("#canvas").innerHeight()+20+(Math.random()*100)%30});
                                                  message('Упс, това е неприятно. :( Батерията беше свързана без консуматор (на електричен ток). Тогава се казва, че е свързана на късо. Отделя се голям заряд и батерията изгаря дори понякога може да се взриви. Рестартирай нивото с бутона РЕСТАРТ.');
                                                  buttonRestart.parent().css({top: 400, left: 55});
                                                  flag1++;
                                                  },1600);
                          return ;
                          }
                       if (ampMeterReady==0) {
                          if (bulbWireColor.attr("fill")!="rgb(255, 69, 0)") {
                             turnOn(light,bulbWireColor,1500);
                             timeOutLight = setTimeout(function() {
                                                      // starts the looping blink animation
                                                      blink(light,bulbWireColor);
                                                      },1600);
                             }
                          message('Почти си готов :). Трябва само още едно нещо да се включи във веригата, за да може да решиш задачата.');
                          return ;
                          }
                       flag3++;
                       electricCurrent();
                       });

         buttonRestart.parent().css({top: -1000, left: -1000});
         buttonRestart.on('click',function() {
                         if (flag1==0) return ;
                         bulbReady=batteryReady=ampMeterReady=0;
                         flag1=0; flag2=0;
                         batteryComp[2].attr({fill:"#C5E1A5"});
                         batteryComp[1].attr({fill:"#FFFFFF"});
                         batteryComp[0].attr({fill:"#DEDEDE"});
                         $("#canvas").css({top: -2000, left: -2000});
                         buttonRestart.parent().css({top: -1000, left: -1000});                
                         workLvl1();
                         });

         buttonCheck.parent().css({top:-1000, left: -1000});
         buttonCheck.on('click',function() {
                       if ($("#ans").val()==="12") {
                          $("#ans").prop('disabled',true);
                          message('Браво :)! Батерията е с 12 V напрежение.');
                          removeBtn(buttonHelp);
                          removeBtn($(this));
                          }
                       else { if ($("#ans").val()==="") message('Не си написал отговора.');
                              else message('Имаш грешка. Пробвай пак.'); }
                       });

         buttonHelp.parent().css({top:-1000, left: -1000});
         buttonHelp.on('click',function() {
                      formula.attr({opacity: 1});
                      removeBtn($(this));
                      });

         buttonStatement.parent().css({top:5, left: 600});
         buttonStatement.on('click',function() {
                           message('Имаш на разположение уредите в мрежата. Целта е да съставиш електрическа верига с някои от предметите, така че да откриеш неизвестното напрежение на батерията. Това, което знаеш е, че лампата е с 6 Ω съпротивление. Когато отидеш до някой уред излиза екранно пояснение какво е наименованието му. Можеш да влачиш всички уреди и ако си хванал правилен, то когато минеш с него близо до мястото, което трябва да заеме във веригата, ще се отвори отвор, където трябва да го поставиш. Когато уреда е поставен както трябва, ще излезе съобщение и повече няма да можеш да го влачиш. Успех!');
                           });
};

function hitCheck (ind, curTransform, obj, dx, dy) {
                  // function to check if obj hits with some of the other objects
                  obj.attr({transform: origTransform[ind] + (origTransform[ind] ? "T" : "t") + [dx, dy]});
                  for (var i=0; i<things.length; i++) {
                      if (obj==things[i]) continue;
                      if (hitTest(things[i],obj)==1) {
                         obj.attr({transform: origTransform[ind] + (origTransform[ind] ? "T" : "t") + [prev[ind][0], prev[ind][1]]});
                         return true;
                         }
                      }
                  for (var i=0; i<buttons.length; i++) {
                      if (hitTestBtn(buttons[i],obj)==1) {
                         obj.attr({transform: origTransform[ind] + (origTransform[ind] ? "T" : "t") + [prev[ind][0], prev[ind][1]]});
                         return true;
                         }
                      }
                  prev[ind]=[dx,dy];
                  return false;
}

function findIndex (obj) {
         // find the index of obj in the array things
         for (var i=3; i<things.length; i++) {
             if (things[i]==obj) return i;
             }
}

function changeColText (finx, finy, curx, cury, distRed, distOrange) {
         // change colour of the central text field according to the distance from the object and its right place
         var dist=(finx-curx)*(finx-curx)+(finy-cury)*(finy-cury);
         if (dist<=distRed) {
            hintObj.attr({text:"Горещо!"});
            hintObj.animate({opacity:1, fill:"red"},100);
            return ;
            }
         if (dist<=distOrange) {
            hintObj.attr({text:"Топло!"});
            hintObj.animate({opacity:1, fill:"orange"},100);
            return ;
            }
         hintObj.attr({text:"Студено!"});
         hintObj.animate({opacity:1, fill:"blue"},100);
}

function workLvl1 () {
         // if flag3 is 1, then all the light bulb, the ampere meter and the battery are on the right place and this function won't be excuted
         if (flag3!=0) return ;
          
         // the below lines are for resetting
         for (var i=0; i<things.length; i++) {
             things[i].undrag();
             }
         hintObj.attr({opacity:0});
             
         // checks if the light-bulb is in the right place
         if (bulbReady==0) {
            lines[0].attr({opacity:1});
            t = new Snap.Matrix();
            t.translate(prevCoord[0]-curCoord[0]+437,prevCoord[1]-curCoord[1]+116);
            bulb.transform(t);
            bulb.drag(function(dx, dy, posx, posy) {
                     var curTransform=Snap.parseTransformString(origTransform[0])[0];
                     if (hitCheck(0,curTransform,this,dx,dy)==1) return ;
                     // change colour of central text field
                     changeColText(prevCoord[0],prevCoord[1],bulb.getBBox().x,bulb.getBBox().y,6000,18000);
                
                     // checks if the bulb is near the supposed place and makes a hole in the wire
                     if ((prevCoord[0]-bulb.getBBox().x)*(prevCoord[0]-bulb.getBBox().x)+(prevCoord[1]-bulb.getBBox().y)*(prevCoord[1]-bulb.getBBox().y)<=6000) lines[0].attr({opacity:0});
                     else lines[0].attr({opacity:1});
                     // checks if the bulb is in the right place and removes the drag handlers
                     if ((Math.abs(prevCoord[0]-bulb.getBBox().x)<3)&&
                         (Math.abs(prevCoord[1]-bulb.getBBox().y)<3)) {
                        lines[0].attr({opacity:0}); message('Супер! :) Лампата е наместена на мястото си.');
                        hintObj.stop(); hintObj.attr({opacity:0});
                        bulbReady++; this.undrag();
                        }
                     },function() {
                     origTransform[0] = this.transform().local;
                     },function() {
                     if (lines[0].attr("opacity")==0) {
                        t = new Snap.Matrix();
                        t.translate(prevCoord[0]-curCoord[0],prevCoord[1]-curCoord[1]);
                        bulb.transform(t);
                        message('Супер! :) Лампата е наместена на мястото си.');
                        hintObj.stop(); hintObj.attr({opacity:0});
                        bulbReady++; this.undrag();
                        }
                     });
            }

         // checks if the amperе-meter is in the right place
         textAmpMeter.attr({opacity:0});
         if (ampMeterReady==0) {
            lines[1].attr({opacity:1});
            t = new Snap.Matrix();
            t.translate(871,-48);
            ampMeter.transform(t);
            ampMeter.drag(function (dx, dy, posx, posy) {
                         //analogously with the bulb handler
                         var curTransform=Snap.parseTransformString(origTransform[1])[0];
                         if (hitCheck(1,curTransform,this,dx,dy)==1) return ;
                         changeColText(0,0,curTransform[1]+dx,curTransform[2]+dy,8000,32000);
                         if ((curTransform[1]+dx)*(curTransform[1]+dx)+(curTransform[2]+dy)*(curTransform[2]+dy)<=8000) lines[1].attr({opacity:0});
                         else lines[1].attr({opacity:1});
                         if ((Math.abs(curTransform[1]+dx)<3)&&
                             (Math.abs(curTransform[2]+dy)<3)) {
                            message("Амперметърът е сложен, където трябва.");
                            hintObj.stop(); hintObj.attr({opacity:0});
                            ampMeterReady++, this.undrag();
                            }
                         },function() {
                         origTransform[1] = this.transform().local;
                         },function() {
                         if (lines[1].attr("opacity")==0) {
                            t = new Snap.Matrix();
                            t.translate(0,0);
                            ampMeter.transform(t);
                            message("Амперметърът е сложен, където трябва.");
                            hintObj.stop(); hintObj.attr({opacity:0});
                            ampMeterReady++, this.undrag();
                            }
                         });
            }

         // checks if the battery is in the right place
         if (batteryReady==0) {
            lines[2].attr({opacity:1});
            t = new Snap.Matrix();
            t.translate(717,118);
            battery.transform(t);
            battery.drag(function (dx, dy, posx, posy) {
                        //analogously with the bulb handler
                        var curTransform=Snap.parseTransformString(origTransform[2])[0];
                        if (hitCheck(2,curTransform,this,dx,dy)==1) return ;
                        changeColText(0,0,curTransform[1]+dx,curTransform[2]+dy,8000,24000);
                        if ((curTransform[1]+dx)*(curTransform[1]+dx)+(curTransform[2]+dy)*(curTransform[2]+dy)<=8000) lines[2].attr({opacity:0});
                        else lines[2].attr({opacity:1});
                        if ((Math.abs(curTransform[1]+dx)<3)&&
                            (Math.abs(curTransform[2]+dy)<30)) {
                           message("Най-важната част на веригата (батерията) е на правилното място. Браво!");
                           hintObj.stop(); hintObj.attr({opacity:0});
                           batteryReady++, this.undrag();
                           }
                        },function() {
                        origTransform[2] = this.transform().local;
                        },function() {
                        if (lines[2].attr("opacity")==0) {
                           t = new Snap.Matrix();
                           t.translate(0,0);
                           battery.transform(t);
                           message("Най-важната част на веригата (батерията) е на правилното място. Браво!");
                           hintObj.stop(); hintObj.attr({opacity:0});
                           batteryReady++, this.undrag();
                           }
                        });
            }

         // for all other objects it is checked if they will hit other objects when dragged
         for (var i=3; i<things.length; i++) {
             t = new Snap.Matrix();
             if (i==3) t.translate(1000,120);
             else if (i==4) t.translate(721,274);
             else if (i==5) t.translate(870,260);
             else if (i==6) t.translate(425,7);
             else t.translate(731,232);
             things[i].transform(t);
             things[i].drag(function (dx, dy, posx, posy) {
                           var index=findIndex(this);
                           curTransform=Snap.parseTransformString(origTransform[index])[0];
                           if (hitCheck(index,curTransform,this,dx,dy)==1) return ;
                           hintObj.attr({text:"Студено!"});
                           hintObj.animate({opacity:1, fill:"blue"},100);
                           },function() {
                           var index=findIndex(this);
                           origTransform[index] = this.transform().local;
                           });
             }
}

function electricCurrent () {
         // next stage of the level when all the light bulb, the ampere meter and the battery are on the right place
         for (var i=0; i<things.length; i++) {
             things[i].undrag();
             }
         if (bulbWireColor.attr("fill")!="rgb(255, 69, 0)") {
            // if the lamp isn't bright, than made it bright
            turnOn(light,bulbWireColor,1500);
            timeOutLight = setTimeout(function(){
                                     // show textboxes and buttons after finishing animation
                                     textAmpMeter.attr({opacity: 1});
                                     voltSign.attr({opacity: 1});
                                     inputLvl1.css({top: 183, left: 1115});
                                     buttonCheck.parent().css({top: 300, left: 1050});
                                     buttonHelp.parent().css({top: 300, left: 800});

                                     // starts the looping blink animation
                                     blink(light,bulbWireColor);
                                     },1600);
            }
         else { // if the lamp is already bright, than show the necessary text fields and buttons
                textAmpMeter.attr({opacity: 1});
                voltSign.attr({opacity: 1});
                inputLvl1.css({top: 183, left: 1115});
                buttonCheck.parent().css({top: 300, left: 1050});
                buttonHelp.parent().css({top: 300, left: 800}); }

         // removing the 3x3 grid
         for (var i=3; i<lines.length; i++) {
             lines[i].remove();
             }

         // removing all objects except the light bulb, the ampere meter and the battery
         for (var i=0; i<things.length; i++) {
             if ((things[i]==bulb)||(things[i]==ampMeter)||(things[i]==battery)) continue;
             things[i].remove();
             }
         // removing unnecessary buttons
         removeBtn(buttonReset);
         removeBtn(buttonRestart);
         removeBtn(buttonElCur);
}

removeLvl1 = function () {
         $("#canvas").css({top: -2000, left: -2000}); removeBtn(buttonHelp);
         if ((light!==undefined)&&(light!==null)) light.remove();
         if ((timeOutBlow!==undefined)&&(timeOutBlow!==null)) clearTimeout(timeOutBlow);
         if ((timeOutLight!==undefined)&&(timeOutLight!==null)) clearTimeout(timeOutLight);
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level1").hide();
}
})(hitTest,hitTestBtn,message,removeBtn,blink,turnOn,turnOff);