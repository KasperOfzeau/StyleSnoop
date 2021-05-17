fontsDiv = document.querySelector('.fonts');
colorsDiv = document.querySelector('.colors');
loadingDivs = document.querySelectorAll('.loading');
copyTextDiv = document.querySelector('.copyText');

// REQUEST FOR STYLE DATA
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "getContent", data: "get data"}, function(response) {
        displayFonts(response.dataFonts);
        displayColors(response.dataColors);
        loadingDivs.forEach(function(item) {
            item.remove();
          });
    });
  });

// DISPLAY ALL FONTS
function displayFonts(fonts) {
     for (var i = 0; i < fonts.length; i++) { 
        listItem = document.createElement('li');
        listItem.innerText = fonts[i];
        fontsDiv.appendChild(listItem);
    }
}

// DISPLAY ALL COLOR CODES
function displayColors(colors) {
    for (var i = 0; i < colors.length; i++) { 
       listItem = document.createElement('li');
       listItem.innerText = colors[i];
       listItem.style.setProperty('--color', colors[i]);
       listItem.addEventListener("click", copy);
       colorsDiv.appendChild(listItem);
   }
}

// COPY COLOR CODE TO CLIPBOARD
function copy(e) {
    const el = document.createElement('textarea');
    el.value = e.target.innerText;;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    copyTextDiv.innerText = "Color code copied!"
    setTimeout(function(){copyTextDiv.innerText = ""}, 3000);
  }