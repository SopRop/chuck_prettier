// RELOAD
window.onload = function() {
    // hide/display html we need
    document.querySelector('#remember').style.display = "none";
    document.querySelector('#remember-name').style.display = "none";
    document.querySelector('#paste').style.display = "none";
    document.querySelector('#paste-name').style.display = "none";
    document.querySelector('#loader-joke').style.display = "none";
    document.querySelector('#loader-joke-name').style.display = "none";

    if(Array.isArray(jokesArray) && jokesArray.length) {
        document.querySelector('#delete').style.display = "";
    } else {
        document.querySelector('#delete').style.display = "none";
    }
    // loop through local storage array and display all info with the li maker
    jokeData.forEach(item => {
        liMaker(item);
    });
  };


// CLICK 'what'
function getRandomJoke() {
    document.querySelector('#loader-joke').style.display = "";
    document.querySelector('#remember').style.display = "none";
    document.querySelector('#paste').style.display = "none";
    document.querySelector('#joke').innerHTML = "";
    document.querySelector('#joke').classList.remove("message-body", "blockquote");
    // get data from api
    fetch(`https://api.icndb.com/jokes/random`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // display data from api in html
        // hide/display html we need
        if (data.type === "success") {
            setTimeout(function() {
                document.querySelector('#loader-joke').style.display = "none";
            }, 350);
            setTimeout(function() {
                document.querySelector('#joke').innerHTML = data.value.joke;
                document.querySelector('#joke').classList.add("message-body", "blockquote");
                document.querySelector('#remember').style.display = "";
                document.querySelector('#paste').style.display = "";
            }, 400);
        }
    })
}


// CLICK 'powerful'
function getNewNameInfo() {
    document.querySelector('#loader-joke-name').style.display = "";
    document.querySelector('#remember-name').style.display = "none";
    document.querySelector('#paste-name').style.display = "none";
    document.querySelector('#joke-name').innerHTML = "";
    document.querySelector('#joke-name').classList.remove("message-body", "blockquote");
    // get input from user to use in next function
    let firstName = document.querySelector('#input-first-name').value;
    let lastName = document.querySelector('#input-last-name').value;
    getJokeDifferentName(firstName, lastName);
}

// fetch new joke with input first name and last name
function getJokeDifferentName(firstName, lastName) {
    // get data from api
    fetch(`https://api.icndb.com/jokes/random?firstName=${firstName}&amp&lastName=${lastName}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // display data from api in html
        // hide/display html we need
        if (data.type === "success") {
            setTimeout(function() {
                document.querySelector('#loader-joke-name').style.display = "none";
            }, 350);
            setTimeout(function() {
                document.querySelector('#joke-name').innerHTML = data.value.joke;
                document.querySelector('#joke-name').classList.add("message-body", "blockquote");
                document.querySelector('#remember-name').style.display = "";
                document.querySelector('#paste-name').style.display = "";
            }, 400);
        }
    })
}


// LOCAL STORAGE
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


// CLICK 'save'
function addJokesList(joke) {
    document.querySelector('#delete').style.display = "";
    txt = document.querySelector(`${joke}`).innerHTML;
    // add title to the array
    jokesArray.push(txt);
    // add every input in local storage
    localStorage.setItem('jokes', JSON.stringify(jokesArray));
    // create li (with joke from api data in parameter)
    liMaker(txt);
}


// CLICK 'paste'
function pasteJoke(joke) {
    let icon;
    let successful;
    const text = document.querySelector(`${joke}`);
    const range = document.createRange();
    range.selectNode(text);  
    window.getSelection().addRange(range);
    try {
    // Now that we've selected the anchor text, execute the copy command
    if (text.id === 'joke') {
        icon = document.querySelector('#copy-button-j');
        successful = document.execCommand('copy');
    } else if (text.id === 'joke-name') {
        icon = document.querySelector('#copy-button-jn');
        successful = document.execCommand('copy');
    }
    let msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy command was ' + msg);
    if (successful) {
        icon.classList.remove("fa-files-o");
        icon.classList.add("fa-check", "has-text-success", "fade");
        setTimeout(function() {
            icon.classList.remove("fa-check", "has-text-success", "fade");
            icon.classList.add("fa-files-o");
        }, 2000);
    } else if (!successful) {
        icon.classList.remove("fa-files-o");
        icon.classList.add("fa-close", "has-text-danger", "fade");
        setTimeout(function() {
            icon.classList.remove("fa-close", "has-text-danger", "fade");
            icon.classList.add("fa-files-o");
        }, 2000);
    }
  } catch(err) {
    console.log('Oops, unable to copy');
    icon.classList.remove("fa-files-o");
    icon.classList.add("fa-close", "has-text-danger", "fade");
    setTimeout(function() {
        icon.classList.remove("fa-close", "has-text-danger", "fade");
        icon.classList.add("fa-files-o");
    }, 2000);
  }
  // Remove the selections
  window.getSelection().removeAllRanges();
};


// CLICK 'clear'
function clearLocalStorage() {
    // clear local storage
    localStorage.clear();
    document.querySelector('#delete').style.display = "none";
    // clear every child from the ul
    while (jokesUL.firstChild) {
        jokesUL.removeChild(jokesUL.firstChild);
    }
}


// CLICK 'toggle'
const body = document.querySelector('body').classList;
const title = document.querySelector('#site-title').classList;
const mood = document.querySelector('#mood-icon').classList;
const punchlines = ['Chuck Norris doesn\'t use day mode...<br>3, 2, 1...', 'Chuck Norris has night vision...<br>3, 2, 1...',
                    'What are you doing?!<br>3, 2, 1...', 'Are you scared of the dark?<br>3, 2, 1...',
                    'Do you need your teddy bear?<br>3, 2, 1...'];
const punch = document.querySelector('#day-mode');

function nightMode() {
    body.remove('white');
    body.add('black');
    title.remove('white');
    title.add('black');
    mood.remove('fa-moon-o')
    mood.add('fa-circle-thin')
}

function changeMood() {
    if (body.value === 'black') {
        body.remove('black');
        body.add('white');
        title.remove('black');
        title.add('white');
        mood.remove('fa-circle-thin')
        mood.add('fa-moon-o')
        punch.innerHTML = punchlines[Math.floor(Math.random() * punchlines.length)];
        setTimeout(function() {
            nightMode();
        }, 5000);
    } else {
        nightMode();
    }
}