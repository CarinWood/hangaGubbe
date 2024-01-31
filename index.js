let playBtn = document.querySelector('.play-btn')
let playBoard = document.querySelector('.play-board')
let wordArray = ['bananpaj', 'glasögon', 'lingonsylt', 'trädgårdsredskap', 'vitmögelost', 'ansiktslyft', 'blåbär']
let correctWord = ''
let count = 0
let allowedLetters = 'abcdefghijklmnopqrstuvwxyzåäö'
let letterBox = document.querySelector('.used-letters')
let errors = 0
let ground
let scaffold
let head
let body
let arms
let legs

document.addEventListener('DOMContentLoaded', function () {
    var svgObjekt = document.getElementById("svgfile");
    var svgInnehall = svgObjekt.contentDocument;
    ground = svgInnehall.getElementById("ground")
    ground.style.opacity = '0'
    scaffold = svgInnehall.getElementById("scaffold");
    scaffold.style.opacity = '0'
    head = svgInnehall.getElementById("head")
    head.style.opacity = '0'
    body = svgInnehall.getElementById("body")
    body.style.opacity = '0'
    arms = svgInnehall.getElementById("arms")
    arms.style.opacity = '0'
    legs = svgInnehall.getElementById("legs")
    legs.style.opacity = '0'
});

function setWord() {
    let num = Math.floor((Math.random() * 7))
    correctWord = wordArray[num]
    console.log(correctWord)
}

function setTiles() {
    for (let i = 0; i < correctWord.length; i++) {
        let tile = document.createElement('p')
        tile.classList.add('tile')
        playBoard.appendChild(tile)        
    }
}

function checkForWin() {
    if(count === correctWord.length) {
        playBtn.classList.remove('hide')
    }
}

function hang() {
    if(errors === 1) {
        ground.style.opacity = 1;
    }
}

function pressedKey(event) {
    let keyPressed = event.key
    if(correctWord.includes(keyPressed)) {
        for (let i = 0; i < correctWord.length; i++) {
            if(correctWord.charAt(i) === keyPressed) {
                playBoard.children[i].innerText = keyPressed 
                count++
            }
        }
        checkForWin()
    } else {
        if(allowedLetters.includes(keyPressed)) {
            letterBox.innerText += keyPressed
            errors ++;
            hang()
        }
    }
}

function listenForInput() {
    document.addEventListener('keydown', pressedKey)
}

function resetGame() {
    errors = 0
    letterBox.innerText = ''
    correctWord = ''
    playBoard.innerHTML = ''
    count = 0;
    document.removeEventListener('keydown', pressedKey)
}


function startGame() {
    resetGame()
    playBtn.classList.add('hide')
    setWord()
    setTiles()
    listenForInput()
}


playBtn.addEventListener('click', startGame)