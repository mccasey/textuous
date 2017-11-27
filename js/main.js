
var getCharCount = function(content){
  return content.innerText.replace(/\n+/g, '').length;
}
var getWordCount = function(content){
  return (content.innerText.replace(/\n$/, '').split(/\n+|\s+/).length - 1);
}

var saveContent = function(content){
  localStorage.setItem("TextuousContent", content.innerHTML);
  localStorage.setItem("TextuousContentSavedAt", (new Date).toLocaleTimeString());
  localStorage.setItem("TextuousContentCharCount", getCharCount(content));
  localStorage.setItem("TextuousContentWordCount", getWordCount(content));
}

var displayContent = function(container){
  container.innerHTML = localStorage.getItem("TextuousContent");
};
var displayContentSavedAt = function(container){
  container.textContent = localStorage.getItem("TextuousContentSavedAt");
};
var displayContentCharCount = function(container){
  container.textContent = localStorage.getItem("TextuousContentCharCount");
};
var displayContentWordCount = function(container){
  container.textContent = localStorage.getItem("TextuousContentWordCount");
};


var resetTextuous = function(){
  localStorage.removeItem("TextuousContent");
  localStorage.removeItem("TextuousContentSavedAt");
  localStorage.removeItem("TextuousContentCharCount");
  localStorage.removeItem("TextuousContentWordCount");
  localStorage.removeItem("TextuousTheme");
};

var setTheme = function(){
  if (localStorage.getItem("TextuousTheme") == 'theme-dark') {
    document.documentElement.id = '';
    localStorage.setItem("TextuousTheme", '')
  } else {
    document.documentElement.id = 'theme-dark';
    localStorage.setItem("TextuousTheme", 'theme-dark')
  };
};

window.onload = function(){
  var Textuous = function(){
    var textareaContent = document.getElementById('textarea');
    var savedAt = document.getElementById('saved-at')
    var charCount = document.getElementById('character-count');
    var wordCount = document.getElementById('word-count');
    var iconGarbage = document.getElementById('icon-garbage');
    var iconWand = document.getElementById('icon-wand');
    var downloadLink = document.getElementById('download-link');
    var fileNameInput= document.getElementById('file-name');

    var defaultContent = '<h1>Welcome To Textuous</h1>' +
    '<p>Textuous is a simple clean writing space, where you can get down the ' +
    'important stuff without all the fancy stuff getting in the way.</p>' +
    '<p>To get started just delete this text and replace it with what ever you ' +
    'want. What you type here will live in your browser until you decide to ' +
    'delete it. You can come back anytime to continue writing.</p>' +
    '<p>You also have the option of downloading your text as a \'.txt\' file after ' +
    'you\'re finished!</p>';


    if (localStorage.getItem("TextuousTheme") && localStorage.getItem("TextuousTheme") == 'theme-dark') {
      document.documentElement.id = 'theme-dark';
    };

    if (localStorage.getItem("TextuousContent")){
      displayContent(textareaContent);
      displayContentSavedAt(savedAt);
      displayContentCharCount(charCount);
      displayContentWordCount(wordCount);
    } else {
      textareaContent.innerHTML = defaultContent;
      charCount.textContent = getCharCount(textareaContent);
      wordCount.textContent = getWordCount(textareaContent);
      savedAt.textContent = '00:00';
    };

    fileNameInput.addEventListener('keyup', function(e){
      var name = e.target.value + '.txt';
      downloadLink.setAttribute('download', name);
    });

    downloadLink.addEventListener('click', function(e){
      this.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textareaContent.innerText);
    });

    iconWand.addEventListener('click', function(){
      setTheme();
    });

    iconGarbage.addEventListener('click', function(){
      resetTextuous();
      textareaContent.innerHTML = defaultContent;
      charCount.textContent = getCharCount(textareaContent);
      wordCount.textContent = getWordCount(textareaContent);
      savedAt.textContent = '00:00';
      document.documentElement.id = '';
    });

    textareaContent.addEventListener("keyup", function(){
      saveContent(textarea);
      displayContentSavedAt(savedAt);
      displayContentCharCount(charCount);
      displayContentWordCount(wordCount);
    });
  }

  Textuous();
};
