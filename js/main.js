
var saveContent = function(content){
  var charCount = content.innerText.replace(/\n/g, '').length;
  var wordCount = content.textContent.replace(/^\s+|\s+$/g, '').split(/\s+/).length;

  localStorage.setItem("TextuousContent", content.innerHTML);
  localStorage.setItem("TextuousContentSavedAt", (new Date).toLocaleTimeString());
  localStorage.setItem("TextuousContentCharCount", charCount);
  localStorage.setItem("TextuousContentWordCount", wordCount);
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

var resetContent = function(container){
  localStorage.removeItem("TextuousContent");
  container.innerHTML = '<h1>Welcome To Textuous</h1>' +
    '<p>Textuous is simple clean writing space, where you can get down what\'s ' +
    'important without all the fancy stuff getting in the way.</p>' +
    '<p>To get started just delete this text and replace it with what ever you ' +
    'want. What you type here will live in your browser until you decide to ' +
    'delete it. You can come back anytime to continue writing.</p>' +
    '<p>You also have the option of downloading your text as a \'.txt\' file after ' +
    'you\'re finished!</p>';
};
var resetContentSavedAt = function(container){
  localStorage.removeItem("TextuousContentSavedAt");
  container.textContent = "00:00";
};
var resetContentCharCount = function(container){
  localStorage.removeItem("TextuousContentCharCount");
  container.textContent = 37;
};
var resetContentWordCount = function(container){
  localStorage.removeItem("TextuousContentWordCount");
  container.textContent = 5;
};
var resetTheme = function(container){
  localStorage.removeItem("TextuousTheme");
  document.documentElement.id = '';
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
  var textareaContent = document.getElementById('textarea');
  var savedAt = document.getElementById('saved-at')
  var charCount = document.getElementById('character-count');
  var wordCount = document.getElementById('word-count');
  var iconGarbage = document.getElementById('icon-garbage');
  var iconWand = document.getElementById('icon-wand');
  var downloadLink = document.getElementById('download-link');
  var fileNameInput= document.getElementById('file-name');

  if (localStorage.getItem("TextuousTheme") && localStorage.getItem("TextuousTheme") == 'theme-dark') {
    document.documentElement.id = 'theme-dark';
  };

  if (localStorage.getItem("TextuousContent")){
    displayContent(textarea);
    displayContentSavedAt(savedAt);
    displayContentCharCount(charCount);
    displayContentWordCount(wordCount);
  };

  fileNameInput.addEventListener('keyup', function(e){
    var name = e.target.value + '.txt';
    downloadLink.setAttribute('download', name);
  });

  downloadLink.addEventListener('click', function(e){
    var text = textareaContent.textContent.replace(/  /g, '');
    this.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  });

  iconWand.addEventListener('click', function(){
    setTheme();
  });

  iconGarbage.addEventListener('click', function(){
    resetContent(textarea);
    resetContentSavedAt(savedAt);
    resetContentCharCount(charCount);
    resetContentWordCount(wordCount);
  });

  textareaContent.addEventListener("keyup", function(){
    saveContent(textarea);
    displayContentSavedAt(savedAt);
    displayContentCharCount(charCount);
    displayContentWordCount(wordCount);
  });
};
