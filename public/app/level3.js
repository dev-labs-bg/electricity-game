function initLvl3 () {
         s=Snap(".level3 .resistance");
    
         $(".level3").show();
    
         Snap.load("app/scheme3.svg",function(data){
                  s.append(data);
         });
}

function removeLvl3 () {
         if ((s!==undefined)&&(s!==null)) s.clear();
         $(".level3").hide();
}