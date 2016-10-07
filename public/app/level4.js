(function lvl4 (message, removeBtn, eraseDrawing) {
var shortStatementLvl4,wattSign;
initLvl4 = function () {
         s=Snap(".level4 .power");
    
         $(".level4").show();
            
         Snap.load("app/scheme4.svg",function(data){
                  s.append(data);
         });
    
         mouseDown=false; drawings=[];
         drawingsLen=0; helpCounter=0;
    
         shortStatementLvl4=s.text(160,210,"Уреда с най-голяма мощност е:");
         shortStatementLvl4.attr({"font-size":20, fill:"black", id:"shortStmentLvl4"});
         wattSign=s.text(475,310,"W");
         wattSign.attr({"font-size": 25, "font-weight": "bold", fill:"black", id:"wattSign"});
    
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
    
         labelTextarea=s.text(750,50,"Поле за писане");
         labelTextarea.attr({"font-size": 20, fill:"rgb(38, 166, 154)", id: "labelTextarea"});
    
         labelDrawingField=s.text(750,310,"Поле за рисуване");
         labelDrawingField.attr({"font-size": 20, fill:"rgb(38, 166, 154)", id: "labelDrawingField"});
    
         radioBtns.css({top:220, left:160});
    
         handlersBtnsLvl4();
         // makes the rectangle for the drawing field
         rectDrawing=s.rect(750,320,500,250);
         rectDrawing.attr({fill:"white",stroke:"black"});
    
         document.onmousemove = function(data){
                 mouseX = data.pageX;
                 mouseY = data.pageY;
                 if (mouseDown==false) {
                    prevX=mouseX; prevY=mouseY;
                    return ;
                    }
                 if ((mouseX>750)&&(mouseX<1250)&&(mouseY>320)&&(mouseY<570)) {
                    if (prevX<750) prevX=751;
                    else if (prevX>1250) prevX=1249;
                    if (prevY<320) prevY=321;
                    else if (prevY>570) prevY=569;
                    drawings[drawingsLen]=s.line(prevX,prevY,mouseX,mouseY);
                    drawings[drawingsLen++].attr({stroke:"black", strokeWidth:1});
                    }
                 prevX=mouseX; prevY=mouseY;
                 }
         document.body.onmousedown = function() {
                mouseDown=true;
                }
         document.body.onmouseup = function() {
                mouseDown=false;
                }
}

function handlersBtnsLvl4 () {
         // makes handlers and css atrributes for the buttons made with materialize
         buttonStatement.parent().css({top:5, left: 600});
         buttonStatement.on('click',function() {
                           message('В тази част от електрическа верига трябва да откриеш кой от уредите ще има най-голяма мощност и колко е тя. Напрежението от батерията е 50 V. Както преди, тостера е с 40 Ω съпротивление, микровълновата с 20 Ω съпротивление, а хладилника - с 30 Ω съпротивление. Блендерът има 10 Ω съпротивление. Отново всеки уред има екранно пояснение и със съпротивлението му. Успех в намирането на уреда с най-голямата мощност!');
                           });
    
         buttonEmptyText.parent().css({top:24, left:1055});
         buttonEmptyText.on('click',function() {
                           textArea.val("");
                           });
    
         buttonEmptyDrawings.parent().css({top:283.5, left:1010});
         buttonEmptyDrawings.on('click',function() {
                               for (var i=0; i<drawingsLen; i++) {
                                   drawings[i].remove();
                                   }
                               drawingsLen=0;
                               });
    
         buttonEraseDrawing.parent().css({top:570, left:1018});
         buttonEraseDrawing.mousedown(function() {
                                     // making a continuous function for erasing the drawings
                                     interval=setInterval(eraseDrawing,50);
                                     }).mouseup(function() {
                                               clearInterval(interval);
                                               });
    
         buttonHelp.parent().css({top:100, left:620});
         buttonHelp.on('click',function() {
                      message("Има няколко формули за мощността. P=I*I*R е основната. От закона на Ом следват и още две: P=U*U/R и P=I*U. С една от тези формули задачата може да се реши много лесно и бързо!");
                      });
         buttonCheck.parent().css({top:500, left:620});
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
         removeBtn(buttonHelp); removeBtn(buttonEmptyText);
         removeBtn(buttonEmptyDrawings); removeBtn(buttonEraseDrawing);
         removeBtn(buttonCheck);
         textArea.css({top:-1000, left:-1000});
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level4").hide();
}
})(message,removeBtn,eraseDrawing);