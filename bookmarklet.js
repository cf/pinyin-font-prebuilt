(function(){
  var lastTime = 0;
  var updateFrequency = 500;
  var pinyinFontName = "CarterZHPYSans";
  var cssDefFont = "@font-face { font-family: \""+pinyinFontName+"\"; src: local(\""+pinyinFontName+"\"), url(\"https://raw.githubusercontent.com/cf/pinyin-font-prebuilt/master/fonts/"+pinyinFontName+".woff2\") format(\"woff2\"), url(\"https://raw.githubusercontent.com/cf/pinyin-font-prebuilt/master/fonts/"+pinyinFontName+".woff\") format(\"woff\"); font-display: swap; }";

  function appendCSSDef(cssDef) {
    var newStyle = document.createElement("style");
    newStyle.appendChild(document.createTextNode(cssDef));
    document.head.appendChild(newStyle);
  }
  function injectFontAllElem(rootElem, injFontFamily) {
    var elemList = [rootElem];
    var utLength = 1;
    var curInd = 0;
    var i = 0;
    var l = 0;
    var elem = null;
    var elemFontFamily = "";
    var elemFontFamilyLen = 0;
    var injFontFamilyLen = injFontFamily.length;
    var injFontFamilyComma = injFontFamily+",";
    var injFontFamilyCommaLen = injFontFamilyComma.length;
    if(!rootElem) {
      return;
    }
    while(curInd<utLength) {
      elem = elemList[curInd++];
      elemFontFamily = window.getComputedStyle(elem).fontFamily;
      elemFontFamilyLen = elemFontFamily.length;
      if(
        (elemFontFamilyLen<injFontFamilyLen) ||
        (elemFontFamilyLen===injFontFamilyLen && elemFontFamily !== injFontFamily) ||
        elemFontFamily.substring(0,injFontFamilyCommaLen)!==injFontFamilyComma
      ){
        elem.style.fontFamily = elemFontFamilyLen === 0 ? injFontFamily : injFontFamilyComma+elemFontFamily;
      }
  
      if(elem.children) {
        for(i=0,l=~~(elem.children.length || 0);i<l;i++) {
          elemList[utLength++] = elem.children[i];
        }
      }
    }
  }
  function injectAnim(pageTime) {
    window.requestAnimationFrame(injectAnim);
    if((pageTime-lastTime)>=updateFrequency) {
      lastTime = pageTime;
      injectFontAllElem(document.body, "\""+pinyinFontName+"\"");
    }
  }
  function runStart() {
    appendCSSDef(cssDefFont);
    setTimeout(function(){
      injectFontAllElem(document.body, "\""+pinyinFontName+"\"");
      window.requestAnimationFrame(injectAnim);
    }, 500);
  }
  runStart();
})();