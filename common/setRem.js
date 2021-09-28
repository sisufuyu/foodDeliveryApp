(function(){
    var docEl = document.documentElement;
    function setRemUnit(){
        //set rem
        var rem = docEl.clientWidth / 18.75;
        docEl.style.fontSize = rem + "px";
    }
    setRemUnit();
    window.addEventListener("resize",setRemUnit);
})();