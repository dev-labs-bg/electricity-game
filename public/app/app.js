function hitTest (obj1, obj2) {
         // check if the boundaries of the two objects intersect
         if ((obj1.getBBox().x>obj2.getBBox().x2)||(obj1.getBBox().y>obj2.getBBox().y2)||
             (obj1.getBBox().x2<obj2.getBBox().x)||(obj1.getBBox().y2<obj2.getBBox().y)) return false;
         return true;
}
function hitTestBtn (obj1, obj2) {
         // analogously with hitTest but for obj1 - button (not Snap object) and obj2 - Snap object
         if ((obj1.position().left>obj2.getBBox().x2)||(obj1.position().top>obj2.getBBox().y2)||
             (obj1.position().left+obj1.innerWidth()<obj2.getBBox().x)||(obj1.position().top+obj1.innerHeight()<obj2.getBBox().y)) {
            return false;
            }
         return true;
}

function message (text) {
         // function opening modal with message: text
         $("#pText").text(text);
         $(".modal").openModal();
}

// TODO: deprecate me in favour of hideBtn/showBtn
function removeBtn (btn) {
         // function for removing handlers of button and making him disappear from the screen
         btn.parent().css({top:-1000, left:-1000});
         btn.off();
}

function hideBtn(btn) {
    btn.parent().addClass("hide");
}

function showBtn(btn) {
    btn.parent().removeClass("hide");
}

function blink (light, wireColor) {
         // animation for the blinking of the light of the light bulb
    
         // rgb(255,69,0) - orangered color
         if (wireColor.attr("fill")!="rgb(255, 69, 0)") {
            if ((light!=undefined)&&(light!=null)) turnOff(light,wireColor,0);
            return ;
            }
         light.animate({opacity:0.5},200,mina.linear,function() {
                      light.animate({opacity:1},200);
                      });
         setTimeout(function(){ blink(light,wireColor);},450);
}

function turnOn (light, wireColor, time, func) {
         // makes animation for the light-bulb to flash
         light.animate({opacity:1},time*1.5,func);
         wireColor.animate({fill:"orangered"},time);
}
function turnOff (light, wireColor, time, func) {
         // makes animation for the light-bulb to stop flashing
         light.animate({opacity:0},time);
         wireColor.animate({fill:"grey"},time);
}

// s contains the drawing surface of Snap
var s;
// buttons for lvl1
var buttonReset,buttonElCur,buttonRestart;

// buttons for all levels;
var buttonCheck,buttonStatement,buttonHelp;
// input box for level1, textfield for ampere meter and text area for level3(and 4)
var inputLvl1,textAmpMeter;
// radio buttons group for level4
var radioBtns;

// variables storing the init and remove functions of the levels
var initLvl1,removeLvl1,initLvl2,removeLvl2,initLvl3,removeLvl3,initLvl4,removeLvl4;

// global storage for drawing module
var drawingModule;

$(document).ready(function() {
                 // finding html for buttons of level 1
                 buttonReset=$('#reset'); 
                 buttonElCur=$('#on');
                 buttonRestart=$('#restart'); 
                 buttonCheck=$('#check');
                 buttonHelp=$('#help'); 
                 buttonStatement=$("#statement");
                
                 // finding html for input box for level1
                 inputLvl1=$("#inputLvl1");
    
                 // finding html for radio buttons for level4
                 radioBtns=$("#radioButtons");
    
                 // the menu
                 $(".button-collapse").sideNav();
                 $(".button-collapse").css({top:0, left:0});
    
                 $(".level1").hide(); $(".level2").hide();
                 $(".level3").hide(); $(".level4").hide();

                 // render note components from templates
                 // Note: this can be done for each level individually as part of component logic
                 var noteWrappers = $(".user-notes .note-wrapper");
                 var noteTemplate = $("#note-component");
                 var drawNoteWrappers = $(".user-notes .draw-note-wrapper");
                 var drawNoteTemplate = $("#draw-note-component");

                 noteWrappers.each(function(i, wrapper) {
                    $(wrapper).html(noteTemplate.html());
                 });
                 drawNoteWrappers.each(function(i, wrapper) {
                    $(wrapper).html(drawNoteTemplate.html());
                 });
});

function menu (level) {
         // show container if hidden
         $(".container").removeClass("hide");

         // function managing levels of the electricity-game
         removeLvl1();
         removeLvl2();
         removeLvl3();
         removeLvl4();
    
         if (level==1) initLvl1();
         if (level==2) initLvl2();
         if (level==3) initLvl3();
         if (level==4) initLvl4();
    
         $('.button-collapse').sideNav('hide');
}