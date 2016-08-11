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
function removeBtn (btn) {
         // function for removing handlers of button and making him disappear from the screen
         btn.parent().css({top:-1000, left:-1000});
         btn.off();
}

// s contains the drawing surface of Snap
var s;
// buttons
var buttonReset,buttonElCur,buttonRestart,buttonCheck,buttonHelp,buttonStatement;
// input box for level1
var inputLvl1;

$(document).ready(function() {
                 // finding html for buttons of level 1
                 buttonReset=$('#reset'); buttonElCur=$('#on');
                 buttonRestart=$('#restart'); buttonCheck=$('#check');
                 buttonHelp=$('#help'); buttonStatement=$("#statement");
                 // finding html for input box for level1
                 inputLvl1=$(".input-field");
                 // the menu
                 $(".button-collapse").sideNav();
                 $(".button-collapse").css({top:0, left:0});
    
                 $(".level1").hide(); $(".level2").hide();
});

function menu (level) {
         // function managing levels of the electricity-game
         removeLvl1(); removeLvl2();
         if (level==1) initLvl1();
         if (level==2) initLvl2();
}