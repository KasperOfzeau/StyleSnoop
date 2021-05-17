fontsDiv = document.querySelector('.fonts');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "getContent", data: "get data"}, function(response) {
        dataReceived(response.data);
    });
  });


function dataReceived(fonts) {
    console.log(fonts);
     for (var i = 0; i < fonts.length; i++) { 
        listItem = document.createElement('li');
        listItem.innerText = fonts[i];
        fontsDiv.appendChild(listItem);
    }
}