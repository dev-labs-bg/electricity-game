function initLvl3 () {
         s=Snap(".level3 .resistance");
    
         $(".level3").show();
    
         Snap.load("app/scheme3.svg",function(data){
                  s.append(data);
         });
    
         // text and attributes for svg textboxes
         textAmpMeter=s.text(700,195,"3 A");
         textAmpMeter.attr({"font-size":20, id:"textAmpMeter"});
    
         // makes handlers and css atrributes for the buttons made with materialize
         buttonStatement.parent().css({top:5, left: 600});
         buttonStatement.on('click',function() {
                           message('В тази част от електрическа верига трябва да откриеш големината на тока, минаващ през трите уреда! Известно е, че тостера е с 40 Ω съпротивление, микровълновата с 20 Ω съпротивление, а хладилника - с 30 Ω съпротивление. Всеки уред има екранно пояснение, където пише и съпротивлението му. Успех!');
                           });
}

function removeLvl3 () {
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level3").hide();
}