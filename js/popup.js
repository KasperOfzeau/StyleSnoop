fontsDiv = document.querySelector('.fonts');
colorsDiv = document.querySelector('.colors');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "getContent", data: "get data"}, function(response) {
        displayFonts(response.dataFonts);
        displayColors(response.dataColors);
    });
  });


function displayFonts(fonts) {
     for (var i = 0; i < fonts.length; i++) { 
        listItem = document.createElement('li');
        listItem.innerText = fonts[i];
        fontsDiv.appendChild(listItem);
    }
}

function displayColors(colors) {
    for (var i = 0; i < colors.length; i++) { 
       listItem = document.createElement('li');
       listItem.innerText = colors[i];
       listItem.style.setProperty('--color', colors[i]);
       colorsDiv.appendChild(listItem);
   }
}