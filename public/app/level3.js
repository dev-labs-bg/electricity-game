// snap textfields
var ampSigns;
var helpCounter;

function initLvl3 () {
         s=Snap(".level3 .resistance");
    
         $(".level3").show();
            
         Snap.load("app/scheme3.svg",function(data){
                  s.append(s.group(data,textAmpMeter));
         });
        
         mouseDown=false;
         ampSigns=[]; drawings=[];
         drawingsLen=0; helpCounter=0;
    
         initTextFieldsLvl3();
         handlersBtnsLvl3();
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
    
         labelTextarea=s.text(125,400,"Поле за писане");
         labelTextarea.attr({"font-size": 20, fill:"rgb(38, 166, 154)", id: "labelTextarea"});
    
         labelDrawingField=s.text(750,310,"Поле за рисуване");
         labelDrawingField.attr({"font-size": 20, fill:"rgb(38, 166, 154)", id: "labelDrawingField"});
    
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
    
         buttonEmptyText.parent().css({top:374, left:430});
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

function eraseDrawing () {
         // if mouse is down and there are drawings left, erase the last
         if (mouseDown==false) return ;
         if (drawingsLen==0) return ;
         drawings[drawingsLen-1].remove();
         drawingsLen--;
}

function removeLvl3 () {
         removeBtn(buttonHelp); removeBtn(buttonEmptyText);
         removeBtn(buttonEmptyDrawings); removeBtn(buttonEraseDrawing);
         removeBtn(buttonCheck);
         textArea.css({top:-1000, left:-1000});
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level3").hide();
         document.onmousemove=document.body.onmousedown=document.body.onmouseup=null;
}