/* global ScrollMagic, Chart*/
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
  
  var characters = [];
  
  // Fetching character data from server.js
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
  })
  
  fetch('/search-comic').then(resp => resp.json()).then((data) => {
    
    var comic = [];
    for(var i = 0; i < 5; i++) {
     comic.push(data[i]);
    }
    
    for(var i = 0; i < comic.length; i++) {
      var img = document.createElement('img');
      img.className = "comicFrame";
      img.setAttribute('src', comic[i].thumbnail.path + ".jpg");
      document.getElementById('fiveComics').appendChild(img);
    }
    
    for(var i = 0; i < comic.length; i++) {
      var h2 = document.createElement('h2');
      h2.className = "comicFrame";
      h2.innerHTML = comic[i].title;
      document.getElementById('fiveComicName').appendChild(h2);
    }
  })
  
  fetch('/search-char').then(resp => resp.json()).then((data) => {
    var charName = [];
    var charAppearance = [];
    
    for(var i = 0; i < 5; i++) {
      charName.push(data[i].name);
      charAppearance.push(data[i].comics.available);
    }
    
    console.log(charAppearance);
    
    // My beautiful chart
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: charName,
            datasets: [{
                label: '# of Votes',
                data: charAppearance,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  })
});