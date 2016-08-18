// bulb and switches objects and components
var bulbs=[5],bulbsComp=[5],switches=[8],switchesComp=[8];
var stateSwitches=[8];
// coordinatates of the light-bulbs in the electrical circuit
var origCoord=[5];
var selName1,selName2;
// flags if the animations have finished
var flag1,flag2;
// making adjecent matrix a for the graph with the points connecting wire
var a=[8];
// array used for the dfs function and an array if electrical current passes through a point
var used=[8],electricalCurrent=[8];

function initLvl2 () {
         // load snap for level1
         s=Snap(".level2 .lamps");
    
         $(".level2").show();
    
         // default value for arrays and variables
         for (var i=0; i<8; i++) {
             stateSwitches[i]=0;
             }
         flag1=flag2=0;
    
         // setting matrix with initial values
         for (var i=0; i<8; i++) {
             a[i]=[0,0,0,0,0,0,0,0];
             }
         // points connecting wire without a switch have an edge
         a[3][5]=a[5][3]=1;
         a[3][4]=a[4][3]=1;
         a[1][2]=1;
    
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
         // function for mirror flipping a switch
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
         // changing state of the current switch
         stateSwitches[index]++; stateSwitches[index]%=2;
        
         // adding or removing edges according to the pressed switch
         if (index==0) a[2][4]=a[4][2]=stateSwitches[index];
         else if ((index==1)||(index==5)) {
                 if (stateSwitches[index]==1) val=1;
                 else val=-1;
                 a[5][6]+=val;
                 }
         else if (index==2) a[4][7]=stateSwitches[index];
         else if (index==3) a[2][3]=stateSwitches[index];
         else if (index==4) a[1][5]=stateSwitches[index];
         else if (index==6) a[6][7]=stateSwitches[index];
         else a[0][1]=a[1][0]=stateSwitches[index];
    
         // setting initial values to used and electricalCurrent
         for (var i=0; i<8; i++) {
             used[i]=[0,0,0,0,0,0,0,0]; electricalCurrent[i]=0;
             }
         // making dfs to find through whick points may pass electrical current in the circuit
         dfs(0);
    
         // if through the points connecting wire with light bulb passes electrical current and the switch is on, than the light bulb should turn on, otherwise - off
         if ((electricalCurrent[1]==1)&&(electricalCurrent[5]==1)&&(stateSwitches[4]==1)) turnOn(bulbsComp[0][0],bulbsComp[0][2],250,blink.bind(this,bulbsComp[0][0],bulbsComp[0][2]));
         else turnOff(bulbsComp[0][0],bulbsComp[0][2],250);
         if ((electricalCurrent[2]==1)&&(electricalCurrent[3]==1)&&(stateSwitches[3]==1)) turnOn(bulbsComp[1][0],bulbsComp[1][2],250,blink.bind(this,bulbsComp[1][0],bulbsComp[1][2]));
         else turnOff(bulbsComp[1][0],bulbsComp[1][2],250);
         if ((electricalCurrent[2]==1)&&(electricalCurrent[4]==1)&&(stateSwitches[0]==1)) turnOn(bulbsComp[2][0],bulbsComp[2][2],250,blink.bind(this,bulbsComp[2][0],bulbsComp[2][2]));
         else turnOff(bulbsComp[2][0],bulbsComp[2][2],250);
         if ((electricalCurrent[4]==1)&&(electricalCurrent[7]==1)&&(stateSwitches[2]==1)) turnOn(bulbsComp[3][0],bulbsComp[3][2],250,blink.bind(this,bulbsComp[3][0],bulbsComp[3][2]));
         else turnOff(bulbsComp[3][0],bulbsComp[3][2],250);
         // this light bulb is special because if through the wire without light bulb passes electrical current because of the 0 resistance, electrical current won't pass through the light bulb
         if ((electricalCurrent[3]==1)&&(electricalCurrent[6]==1)&&(stateSwitches[1]==1)&&(stateSwitches[5]==0)) turnOn(bulbsComp[4][0],bulbsComp[4][2],250,blink.bind(this,bulbsComp[4][0],bulbsComp[4][2]));
         else turnOff(bulbsComp[4][0],bulbsComp[4][2],250);
}

function dfs (vr) {
         if (vr==7) {
            // if there is a path to the battery than there is electrical current in the circuit
            electricalCurrent[7]=1; return ;
            }
         for (var i=0; i<8; i++) {
             if (a[vr][i]==0) continue;
             if (used[vr][i]==0) {
                used[vr][i]=1;
                dfs(i);
                }
             // if electrical current passes through point i than is may pass through current point
             if (electricalCurrent[i]==1) electricalCurrent[vr]=1;
             }
}

function removeLvl2 () {
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level2").hide();
}