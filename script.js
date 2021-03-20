const levels = {
  easy: 8,
  medium: 5,
  hard: 3
};

var currentLevel;

var time;
let score = 0;
let speed = 0;
let isPlaying;

var x,y;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const highscore = document.querySelector('#hscore');
const yourscore = document.querySelector('#yscore');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const btn=document.querySelector('#play');
count=document.querySelector('#site');

function countn() {
//https://api.countapi.xyz/create?namespace=Word&key=tapassahu&value=0
//https://api.countapi.xyz/get/Word/tapassahu
//https://api.countapi.xyz/update/Word/tapassahu/?amount=1
return fetch('https://api.countapi.xyz/update/Word/tapassahu/?amount=1')
.then(res=>res.json())
.then(data=>count.innerHTML=data.value)
}

function getcount(){
  return fetch('https://api.countapi.xyz/get/Word/tapassahu')
  .then(res => res.json())
  .then(data => count.innerHTML=data.value)
}

function randomWord(){
  return fetch('https://random-words-api.vercel.app/word')
  .then(response => response.json())
  .then(data => currentWord.innerHTML=data[0].word);
}

// Initialize Game
function init() {
scoreDisplay.innerHTML="0";
wordInput.value="";
level();
 checkCookie();
  showWord();
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  x = setInterval(countdown, 1000);
  // Check game status
  y = setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel;
    showWord();
    wordInput.value = '';
    score++;
    if(score>parseInt(highscore.innerText))
    highscore.innerHTML=score;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

function showWord() {
  randomWord();
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  console.log("countdown");
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
    clearInterval(x);
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  console.log("check");
  if (!isPlaying && time === 0) {
    clearInterval(y);
    message.innerHTML = 'Game Over!!!';
    btn.innerHTML='Play Again';
    score = -1;
    setCookie("highscore", highscore.innerText, 365);
  }
}

btn.addEventListener('click',function(){
  if(this.innerText=='Play'||this.innerText=='Play Again'){
    console.log("hello");
    time=currentLevel;
    message.innerHTML='';
      init();
      btn.innerHTML="Playing..."
  }
})

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("highscore");
  console.log(user+"happy");
  if (user != "") {
    highscore.innerHTML=user;
  } else {
    if (user != "" && user != null && parseInt(user)<score) {
      setCookie("highscore", score, 365);
      highscore.innerHTML=score;
    }
  }
  var user1 = getCookie("yourscore");
  console.log(user+"happy");
  if (user1 != "") {
    yourscore.innerHTML=user1+" wpm";
  } else {
    if (user1 != "" && user1 != null) {
      setCookie("yourscore", speed, 365);
      yourscore.innerHTML=speed+" wpm";
    }
  }
  var user2 = getCookie("access");
  console.log(user+"access");
  if (user2 != "") {
    getcount();
  } else{
      setCookie("access", "hello", 365);
      countn();
    }
  
}

function level() {  
  if(document.getElementById('option1').checked) { 
    currentLevel=levels.easy;
  } 
  else if(document.getElementById('option2').checked) { 
    currentLevel=levels.medium;
  } 
  else if(document.getElementById('option3').checked) { 
      currentLevel=levels.hard;
  } 
  time=currentLevel;
  seconds.innerHTML=time;
  console.log("currentlevel = "+currentLevel);
} 
//--------------------------------------------------------------------------------------

const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

const wordCounter = (str) => {
    let response = str.split(" ").length;
    console.log(response);
    return response;
}

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct){ 
    quoteInputElement.disabled=true;
      console.log("working");
   let date = new Date();
    endTime = date.getTime();
    let totalTime=((endTime-startTime)/1000);
    let totalStr = quoteDisplayElement.innerText;
      console.log(totalStr);
    let wordCount = wordCounter(totalStr);
    speed = Math.round((wordCount/totalTime)*60);
    let finalMsg = "Your typing speed is "+speed+" words per minute .";
    timerElement.innerHTML = finalMsg;
    setCookie("yourscore",speed,365);
    yourscore.innerHTML=speed+" wpm";
    correct=false;
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  quoteInputElement.disabled=false;
  timerElement.innerHTML="Calculating your speed...";
  console.log("happy");
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  console.log(quoteDisplayElement.innerText);
  quoteInputElement.value = null
  let date = new Date();
  startTime = date.getTime();
}

//--------------------------------------------------------------------------------

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


//-----------------------------------------------------------------------
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
  return false;
  }
  if(e.ctrlKey){
  return false;}
  if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
  return false;
  }
  }

  $(document).bind("contextmenu",function(e) {
    e.preventDefault();
   });
   
   $(document).keydown(function(e){
       if(e.which === 123){
          return false;
       }
   });