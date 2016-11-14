(function lvl3 (message, removeBtn, drawingModule) {
// snap textfields
var ampSigns;
var helpCounter;
// snap object for the drawing field
var drawingField;
    
initLvl3 = function () {
         s=Snap(".level3 .resistance");
    
         $(".level3").show();
            
         Snap.load("app/scheme3.svg",function(data){
                  s.append(s.group(data,textAmpMeter));
         });
    
         ampSigns=[]; helpCounter=0;
    
         initTextFieldsLvl3();
         handlersBtnsLvl3();

         // makes the rectangle for the drawing field
         drawingField = Snap(".level3 .draw-note-wrapper svg").rect(0, 0, 500, 250);
         drawingField.attr({
          fill: "white",
          stroke: "black"
         });
         drawingModule.init(drawingField);
}

function initTextFieldsLvl3 () {
         // text and attributes for svg textboxes
         textAmpMeter=s.text(772,188,"3 A");
         textAmpMeter.attr({"font-size": 20, id: "textAmpMeter"});
    
         textArea.val("");
         textArea.css({top: 410, left: 125, width: 500});
    
         for (var i=0; i<3; i++) {
             ampSigns[i]=s.text(1220,80+i*70,"A");
             ampSigns[i].attr({"font-size": 25, "font-weight": "bold", id: "ampSign"});
             }
    
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
         buttonStatement.parent().css({top:5, left: 600});
         buttonStatement.on('click',function() {
                           message('В тази част от електрическа верига трябва да откриеш големината на тока, минаващ през трите уреда! Известно е, че тостера е с 40 Ω съпротивление, микровълновата с 20 Ω съпротивление, а хладилника - с 30 Ω съпротивление. Всеки уред има екранно пояснение, където пише и съпротивлението му. За улеснение има текстово поле под веригата за записки и поле за рисуване. Успех!');
                           });
    
         buttonEmptyText.parent().css({top:374, left:429});
         buttonEmptyText.on('click',function() {
                           textArea.val("");
                           });    
         buttonCheck.parent().css({top:50, left:800});
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
         buttonHelp.parent().css({top:50, left:680});
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
         removeBtn(buttonHelp); removeBtn(buttonEmptyText);
         removeBtn(buttonCheck);
         textArea.css({top:-1000, left:-1000});
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level3").hide();
}
})(message, removeBtn, drawingModule);