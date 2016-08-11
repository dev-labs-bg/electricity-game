// bulb and switches objects and components
var bulbs=[5],bulbsComp=[5],switches=[8],switchesComp=[8];
var stateSwitches=[8];
// coordinatates of the light-bulbs in the electrical circuit
var origCoord=[5];
var selName1,selName2;
// flags if the animations have finished
var flag1,flag2;

function initLvl2 () {
         // load snap for level1
         s=Snap(".level2 .lamps");
    
         $(".level2").show();
    
         // default value for arrays and variables
         for (var i=0; i<8; i++) {
             stateSwitches[i]=0;
             }
         flag1=flag2=0;
    
         // loading objects from svgs for level 2
         Snap.load("app/scheme2.svg",function(data) {
                  for (var i=1; i<=5; i++) {
                      bulbs[i-1]=data.select(String("#light-bulb"+String(i)));
                      origCoord[i-1]=[bulbs[i-1].getBBox().x,bulbs[i-1].getBBox().y];
                      }
                  for (var i=1; i<=8; i++) {
                      selName1=String("#switchOn"+String(i)); selName2=String("#switchOff"+String(i));
                      switchesComp[i-1]=[data.select(selName1),data.select(selName2)];
                      switches[i-1]=data.select(String("#switch-on"+String(i)));
                      }
                  s.append(data.select("#scheme2-final"));
                  for (var i=0; i<8; i++) {
                      t = new Snap.Matrix();
                      t.translate(switches[i].getBBox().x,switches[i].getBBox().y);
                      switches[i].animate({transform: t},0);
                      switchesComp[i][0].attr({fill: "white"});
                      }
                  loadLighteningBulbs(0);
                  });
}

function loadLighteningBulbs (index)  {
         // function for making the light-bulbs into components
         if (index==5) {
            workLvl2();
            return ;
            }
         Snap.load("app/lightening-bulb.svg",function(data) {
                  bulbsComp[index]=[data.selectAll("#Combined-Shape"),data.select("#gWire"),data.select("#wire")]; bulbs[index]=s.group(bulbsComp[index][0],bulbsComp[index][1],data.select("#bulb-light"));
                  s.append(bulbs[index]);
                  bulbsComp[index][0].attr({opacity:0});
                  bulbsComp[index][2].attr({fill:"grey"});
                  loadLighteningBulbs(index+1);
                  });
}

function workLvl2 () {
         for (var i=0; i<5; i++) {
             t = new Snap.Matrix();
             t.translate(origCoord[i][0]-bulbs[i].getBBox().x-18,origCoord[i][1]-bulbs[i].getBBox().y);
             bulbs[i].transform(t);
             }
         for (var i=0; i<8; i++) {
             // adds click handlers for the switches
             switches[i].click(mirrorX);
             }
}

function mirrorX () {
         if ((flag1!=0)||(flag2!=0)) return ;
         var index;
         for (var i=0; i<8; i++) {
             if (switches[i]==this) {
                index=i;
                break;
                }
             }
         t = new Snap.Matrix();
         if (stateSwitches[index]==0) {
            t.translate(switches[index].getBBox().x2,switches[index].getBBox().y);
            t.scale(-1, 1); flag1++;
            switchesComp[index][1].animate({fill: "green"},300,mina.linear,function() {flag1=0});
            }
         else { t.translate(switches[index].getBBox().x,switches[index].getBBox().y);
                t.scale(1, 1); flag1++;
                switchesComp[index][1].animate({fill: "red"},300,mina.linear,function() {flag1=0}); }
         flag2++;
         switches[index].animate({transform: t},300,mina.linear,function() {flag2=0});
         stateSwitches[index]++; stateSwitches[index]%=2;
}

function removeLvl2 () {
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level2").hide();
}