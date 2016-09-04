function initLvl3 () {
         s=Snap(".level3 .resistance");
    
         $(".level3").show();
    
         // text and attributes for svg textboxes
         textAmpMeter=s.text(772,188,"3 A");
         textAmpMeter.attr({"font-size":20, id:"textAmpMeter"});
         textArea.css({top:410, left:125, width:500});
    
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
}

function removeLvl3 () {
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level3").hide();
}