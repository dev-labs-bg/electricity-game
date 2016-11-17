(function lvl3 (message, showBtn, hideBtn, drawingModule) {
// snap textfields
var helpCounter;

var buttonClearNotes, notesArea;
$(document).ready(function() {
  buttonClearNotes = $(".level3 .clear-text-notes");
  notesArea = $(".level3 .textarea");
});

initLvl3 = function () {
         s=Snap(".level3 .resistance");
    
         $(".level3").show();
            
         Snap.load("app/scheme3.svg",function(data){
                  s.append(s.group(data,textAmpMeter));
         });
    
         helpCounter=0;
    
         initTextFieldsLvl3();
         handlersBtnsLvl3();

         // makes the rectangle for the drawing field
         drawingModule.init(".level3 .draw-note-wrapper", [0, 0, 500, 250]);
}

function initTextFieldsLvl3 () {
         // text and attributes for svg textboxes
         textAmpMeter=s.text(772,188,"3 A");
         textAmpMeter.attr({"font-size": 20, id: "textAmpMeter"});
    
         notesArea.val("");
         notesArea.trigger('autoresize');
    
         // make input boxes undisabled and without text
         $("#ans_toaster").prop('disabled',false);
         $("#ans_toaster").val("");
         $("#label_toaster").removeClass("active");
    
         $("#ans_microwave").prop('disabled',false);
         $("#ans_microwave").val("");
         $("#label_microwave").removeClass("active");
    
         $("#ans_fridge").prop('disabled',false);
         $("#ans_fridge").val("");
         $("#label_fridge").removeClass("active");
}

function handlersBtnsLvl3 () {
         // makes handlers and css atrributes for the buttons made with materialize
         buttonStatement.on('click',function() {
                           message('В тази част от електрическа верига трябва да откриеш големината на тока, минаващ през трите уреда! Известно е, че тостера е с 40 Ω съпротивление, микровълновата с 20 Ω съпротивление, а хладилника - с 30 Ω съпротивление. Всеки уред има екранно пояснение, където пише и съпротивлението му. За улеснение има текстово поле под веригата за записки и поле за рисуване. Успех!');
                           });

         buttonClearNotes.on('click',function() {
                           notesArea.val("");
                           notesArea.trigger('autoresize');
                           });

         showBtn(buttonCheck);
         buttonCheck.on('click',function() {
                       // check the text in the input boxes i.e. the answer boxes
                       var text="",flag=0;
                       if ($('#ans_toaster').val()=="") text+="Не си написал отговор за тостера. ";
                       else if ($('#ans_toaster').val()=="1") {
                               text+="Точно така, през тостера минава ток с големина 1 A. "; flag++;
                               $('#ans_toaster').prop('disabled',true);
                               }
                       else text+="Имаш грешка за микровълновата. ";
                       if ($('#ans_microwave').val()=="") text+="Не си написал отговор за микровълновата. ";
                       else if ($('#ans_microwave').val()=="1") {
                               text+="Точно така, през микровълновата минава ток с големина 1 A. "; flag++;
                               $('#ans_microwave').prop('disabled',true);
                               }
                       else text+="Имаш грешка за микровълновата. ";
                       if ($('#ans_fridge').val()=="") text+="Не си написал отговор за хладилника. ";
                       else if ($('#ans_fridge').val()=="2") {
                               text+="Точно така, през хладилника минава ток с големина 2 A. "; flag++;
                               $('#ans_fridge').prop('disabled',true);
                               }
                       else text+="Имаш грешка за хладилника. ";
                       if (flag==3) text+="Браво, всичко си сметнал вярно!";
                       message(text);
                       });

         showBtn(buttonHelp);
         buttonHelp.on('click',function() {
                      helpCounter++;
                      if (helpCounter>4) helpCounter=4;
                      if (helpCounter==1) message("Пробвай да намериш еквивалентното съпротивление. След това можеш да откриеш напрежението на батерията (това е само част от веригата без изобразена батерия).");
                      if (helpCounter==2) message("През успоредно свързани части, напрежението е едно и също.");
                      if (helpCounter==3) message("През последователно свързани елементи, токът е един и същ.");
                      if (helpCounter==4) message("Eeee, стига толкова съвети :P!");
                      });
}

removeLvl3 = function () {
         drawingModule.remove();

         hideBtn(buttonHelp);
         buttonHelp.off();

         hideBtn(buttonCheck);
         buttonCheck.off();

         buttonClearNotes.off();
         buttonStatement.off();

         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level3").hide();
}
})(message, showBtn, hideBtn, drawingModule);