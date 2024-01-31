let playBtn = document.querySelector('.play-btn')
let playBoard = document.querySelector('.play-board')
let wordArray = ['bananpaj', 'glasögon', 'lingonsylt', 'trädgårdsredskap', 'vitmögelost', 'ansiktslyft', 'blåbär']
let correctWord = ''
let count = 0
let allowedLetters = 'abcdefghijklmnopqrstuvwxyzåäö'
let pressedKeys = ''
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
    console.log('count: ' + count)
    if(count === correctWord.length) {
        playBtn.classList.remove('hide')
    }
}

function hang() {
    switch(errors) {
        case 1: ground.style.opacity = '1'
        break;
        case 2: scaffold.style.opacity = '1'
        break;
        case 3: head.style.opacity = '1'
        break;
        case 4: body.style.opacity = '1'
        break;
        case 5: arms.style.opacity = '1'
        break;
        case 6: legs.style.opacity = '1'
        break;
        default: ''
    }
}

function pressedKey(event) {
    let keyPressed = event.key
    if(correctWord.includes(keyPressed)) {
        if(pressedKeys.includes(keyPressed)) return
        for (let i = 0; i < correctWord.length; i++) {
            if(correctWord.charAt(i) === keyPressed) {
                playBoard.children[i].innerText = keyPressed 
                count++
            }
        }
        pressedKeys += keyPressed
        checkForWin()
    } else {
        if(allowedLetters.includes(keyPressed)) {
            if(pressedKeys.includes(keyPressed)) return
            letterBox.innerText += keyPressed
            errors ++;
            pressedKeys += keyPressed
            hang()
        }
    }
}

function listenForInput() {
    document.addEventListener('keydown', pressedKey)
}

function resetGame() {
    pressedKeys = ''
    ground.style.opacity = '0'
    scaffold.style.opacity = '0'
    head.style.opacity = '0'
    body.style.opacity = '0'
    arms.style.opacity = '0'
    legs.style.opacity = '0'
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