function initLvl4 () {
         s=Snap(".level4 .power");
    
         $(".level4").show();
            
         Snap.load("app/scheme4.svg",function(data){
                  s.append(data);
         });
    
         // makes handlers and css atrributes for the buttons made with materialize
         buttonStatement.parent().css({top:5, left: 600});
         buttonStatement.on('click',function() {
                           message('В тази част от електрическа верига трябва да откриеш кой от уредите ще има най-голяма мощност и колко е тя. Както преди тостера е с 40 Ω съпротивление, микровълновата с 20 Ω съпротивление, а хладилника - с 30 Ω съпротивление. Блендерът има 10 Ω съпротивление. Отново всеки уред има екранно пояснение и със съпротивлението му. Успех в намирането на уреда с най-голямата мощност!');
                           });
}

function removeLvl4 () {
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level4").hide();
}