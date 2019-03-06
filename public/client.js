/* global ScrollMagic */
// client-side JS

document.addEventListener("DOMContentLoaded", () => {
  
  var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave'
      }
  });
  
  var slides = document.querySelectorAll("section.panel");
  
  for(var i = 0; i < slides.length; i++) {
    
    new ScrollMagic.Scene({
      triggerElement: slides[i]
    })
    
    .setPin(slides[i])
    .addTo(controller)
  }
  
  fetch('/search-char').then(resp => resp.json()).then((data) => {
    
    var char = [];
    
    for(var i = 0; i < 5; i++) {
      char.push(data[i]);
    }
    
    for(var i = 0; i < char.length; i++) {
      var img = document.createElement('img');
      img.className = "charFrame";
      img.setAttribute('src', char[i].thumbnail.path + '.jpg');
      document.getElementById('fiveChars').appendChild(img);
    }
    
    for(var i = 0; i < char.length; i++) {
      var h2 = document.createElement('h2');
      h2.className = "charFrame";
      h2.innerHTML = char[i].name;
      document.getElementById('fiveCharsName').appendChild(h2);
    }
    
    console.log(char[0]);
  })
});