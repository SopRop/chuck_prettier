// for every reload of the page
window.onload = function() {
    // hide/display html what we need
    document.querySelector('#remember').style.display = "none";
    document.querySelector('#rememberName').style.display = "none";
    document.querySelector('#paste').style.display = "none";
    document.querySelector('#pasteName').style.display = "none";
    document.querySelector('#loader-joke').style.display = "none";
    document.querySelector('#loader-joke-name').style.display = "none";
    if(Array.isArray(jokesArray) && jokesArray.length) {
        document.querySelector('#delete').style.display = "";
    } else {
        document.querySelector('#delete').style.display = "none";
    }
  };

// click on button "what"
function getRandomJoke() {
    document.querySelector('#loader-joke').style.display = "";
    // get data from api
    fetch(`http://api.icndb.com/jokes/random`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // display data from api in html
        document.querySelector('#joke').classList.add("message-body");
        document.querySelector('#joke').innerHTML = data.value.joke;
        // hide/display html what we need
        if (data.type === "success") {
            document.querySelector('#remember').style.display = "";
            document.querySelector('#paste').style.display = "";
            document.querySelector('#loader-joke').style.display = "none";
        }
    })
}

// click on button "new name"
function getNewNameInfo() {
    document.querySelector('#loader-joke-name').style.display = "";
    // get input from user to use in next function
    let firstName = document.querySelector('#inputFirstName').value;
    let lastName = document.querySelector('#inputLastName').value;
    getJokeDifferentName(firstName, lastName);
}

// fetch new joke with input first name and last name
function getJokeDifferentName(firstName, lastName) {
    // get data from api
    fetch(`http://api.icndb.com/jokes/random?firstName=${firstName}&amp&lastName=${lastName}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // display data from api in html
        document.querySelector('#joke-name').innerHTML = data.value.joke;
        document.querySelector('#joke-name').classList.add("message-body");
        // hide/display html what we need
        if (data.type === "success") {
            document.querySelector('#loader-joke-name').style.display = "none";
            document.querySelector('#rememberName').style.display = "";
            document.querySelector('#pasteName').style.display = "";
        }
    })
}


const jokesUL = document.querySelector('#local-storage');

// check if local storage alreay exists
let jokesArray = localStorage.getItem('jokes') ? JSON.parse(localStorage.getItem('jokes')) : [];

// for being able to use all the data later
localStorage.setItem('jokes', JSON.stringify(jokesArray));
const jokeData = JSON.parse(localStorage.getItem('jokes'));

// create a li element pour jokes UL (text of el as parameter)
const liMaker = (text) => {
    const li = document.createElement('li');
    li.classList.add("notification");
    li.textContent = text;
    jokesUL.appendChild(li);
}

// click on "save joke" button
function addJokesList() {
    document.querySelector('#delete').style.display = "";
    // add title to the array
    jokesArray.push(document.querySelector('#joke').innerHTML);
    // add every input in local storage
    localStorage.setItem('jokes', JSON.stringify(jokesArray));
    // create li (with joke from api data in parameter)
    liMaker(document.querySelector('#joke').innerHTML);
}

// click on "save joke" button (for name)
function addJokesNameList() {
    document.querySelector('#delete').style.display = "";
    // add title to the array
    jokesArray.push(document.querySelector('#joke-name').innerHTML);
    // add every input in local storage
    localStorage.setItem('jokes', JSON.stringify(jokesArray));
    // create li (with joke from api data in parameter)
    liMaker(document.querySelector('#joke-name').innerHTML);
}

function pasteJoke() {    
  var text = document.querySelector('#joke');  
  var range = document.createRange();  
  range.selectNode(text);  
  window.getSelection().addRange(range);  

  try {  
    // Now that we've selected the anchor text, execute the copy command  
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy email command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  
  // Remove the selections 
  window.getSelection().removeAllRanges();  
};

function pasteJokeName() {    
    var text = document.querySelector('#joke-name');  
    var range = document.createRange();  
    range.selectNode(text);  
    window.getSelection().addRange(range);  
  
    try {  
      // Now that we've selected the anchor text, execute the copy command  
      var successful = document.execCommand('copy');  
      var msg = successful ? 'successful' : 'unsuccessful';  
      console.log('Copy email command was ' + msg);  
    } catch(err) {  
      console.log('Oops, unable to copy');  
    }  
    // Remove the selections 
    window.getSelection().removeAllRanges();  
  };

// loop through local storage array and display all info with the li maker
jokeData.forEach(item => {
    liMaker(item);
});

// click on "clear" button
function clearLocalStorage() {
    // clear local storage
    localStorage.clear();
    document.querySelector('#delete').style.display = "none";
    // clear every child from the ul
    while (jokesUL.firstChild) {
        jokesUL.removeChild(jokesUL.firstChild);
    }

}
