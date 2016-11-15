(function lvl4 (message, removeBtn, showBtn, hideBtn, drawingModule) {
var shortStatementLvl4;
var drawingField;
    
initLvl4 = function () {
         s=Snap(".level4 .power");
    
         $(".level4").show();
            
         Snap.load("app/scheme4.svg",function(data){
                  s.append(data);
         });
    
         helpCounter=0;
    
         shortStatementLvl4=s.text(160,210,"Уреда с най-голяма мощност е:");
         shortStatementLvl4.attr({"font-size":20, fill:"black", id:"shortStmentLvl4"});
    
         $('#test1').prop('disabled',false); $('#test2').prop('disabled',false);
         $('#test3').prop('disabled',false); $('#test4').prop('disabled',false);
         $('#test1').prop('checked',false); $('#test2').prop('checked',false);
         $('#test3').prop('checked',false); $('#test4').prop('checked',false);
    
         // make input boxes undisabled and without text
         $("#ans_lvl4").prop('disabled',false);
         $("#ans_lvl4").val("");
         $("#label_lvl4").removeClass("active");
    
         textArea.val("");
         textArea.css({top: 60, left: 750, width: 500});
    
         radioBtns.css({top:220, left:160});
    
         handlersBtnsLvl4();
         
         // makes the rectangle for the drawing field
         drawingField = Snap(".level4 .draw-note-wrapper svg").rect(0, 0, 500, 250);
         drawingField.attr({
          fill: "white",
          stroke: "black"
         });
         drawingModule.init(drawingField);
}

function handlersBtnsLvl4 () {
         // makes handlers and css atrributes for the buttons made with materialize
         buttonStatement.on('click',function() {
                           message('В тази част от електрическа верига трябва да откриеш кой от уредите ще има най-голяма мощност и колко е тя. Напрежението от батерията е 50 V. Както преди, тостера е с 40 Ω съпротивление, микровълновата с 20 Ω съпротивление, а хладилника - с 30 Ω съпротивление. Блендерът има 10 Ω съпротивление. Отново всеки уред има екранно пояснение и със съпротивлението му. Успех в намирането на уреда с най-голямата мощност!');
                           });
    
         buttonEmptyText.parent().css({top:24, left:1054});
         buttonEmptyText.on('click',function() {
                           textArea.val("");
                           });
         
         showBtn(buttonHelp);
         buttonHelp.on('click',function() {
                      message("Има няколко формули за мощността. P=I*I*R е основната. От закона на Ом следват и още две: P=U*U/R и P=I*U. С една от тези формули задачата може да се реши много лесно и бързо!");
                      });

         showBtn(buttonCheck);
         buttonCheck.on('click',function() {
                       if ($('#ans_lvl4').val()=="") message("Не си написал колко е мощността!");
                       else if ($("#ans_lvl4").val()!="40") message("Имаш грешка при определяне на мощността.");
                       else { $('#ans_lvl4').prop('disabled',true);
                              if ($('#test3').prop('checked')==false) message("Мощността е правилна, ама не е на този уред.");
                              else { message("Точно така, най-голяма е мощността на тостера и тя е 40 W.");
                                     $('#test1').prop('disabled',true); $('#test2').prop('disabled',true);
                                     $('#test3').prop('disabled',true); $('#test4').prop('disabled',true); } }
                       });
}

removeLvl4 = function () {
         drawingModule.remove();
         hideBtn(buttonHelp);
         buttonHelp.off();
         hideBtn(buttonCheck);
         buttonCheck.off();
         buttonStatement.off();
         removeBtn(buttonEmptyText);
         textArea.css({top:-1000, left:-1000});
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level4").hide();
}
})(message, removeBtn, showBtn, hideBtn, drawingModule);