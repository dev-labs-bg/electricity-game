// snap textfields
var ampSigns=[];
function initLvl3 () {
         s=Snap(".level3 .resistance");
    
         $(".level3").show();
            
         // text and attributes for svg textboxes
         textAmpMeter=s.text(772,188,"3 A");
         textAmpMeter.attr({"font-size":20, id:"textAmpMeter"});
         textArea.css({top:410, left:125, width:500});
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
    
         Snap.load("app/scheme3.svg",function(data){
                  s.append(s.group(data,textAmpMeter));
         });
    
         // makes handlers and css atrributes for the buttons made with materialize
         buttonStatement.parent().css({top:5, left: 600});
         buttonStatement.on('click',function() {
                           message('В тази част от електрическа верига трябва да откриеш големината на тока, минаващ през трите уреда! Известно е, че тостера е с 40 Ω съпротивление, микровълновата с 20 Ω съпротивление, а хладилника - с 30 Ω съпротивление. Всеки уред има екранно пояснение, където пише и съпротивлението му. За улеснение има текстово поле под веригата за записки и поле за рисуване. Успех!');
                           });
         buttonEmptyText.parent().css({top:374, left:430});
         buttonEmptyText.on('click',function() {
                           textArea.val("");
                           });
         buttonCheck.parent().css({top:50, left:800});
         buttonCheck.on('click',function() {
                       var text="";
                       if ($('#ans_toaster').val()=="") text+="Не си написал отговор за тостера. ";
                       else if ($('#ans_toaster').val()=="1") {
                               text+="Точно така, през тостера минава ток с големина 1 A. ";
                               $('#ans_toaster').prop('disabled',true);
                               }
                       else text+="Имаш грешка за микровълновата. ";
                       if ($('#ans_microwave').val()=="") text+="Не си написал отговор за микровълновата. ";
                       else if ($('#ans_microwave').val()=="1") {
                               text+="Точно така, през микровълновата минава ток с големина 1 A. ";
                               $('#ans_microwave').prop('disabled',true);
                               }
                       else text+="Имаш грешка за микровълновата. ";
                       if ($('#ans_fridge').val()=="") text+="Не си написал отговор за хладилника. ";
                       else if ($('#ans_fridge').val()=="2") {
                               text+="Точно така, през хладилника минава ток с големина 2 A. ";
                               $('#ans_fridge').prop('disabled',true);
                               }
                       else text+="Имаш грешка за хладилника. ";
                       message(text);
                       });
}

function removeLvl3 () {
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level3").hide();
}