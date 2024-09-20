const levelTxt = document.getElementById('levelTxt')
const highTxt = document.getElementById('highScore')
const key = document.querySelector('.key')
let gameSeq = []
let userSeq = []
let highScore = [] // Consider changing to just one value
const btns = ['red', 'green', 'blue', 'yellow']

let level = 0
let score = 0
let started = false

document.addEventListener('keypress', startGame)
key.addEventListener('click', startGame)

function startGame() {
    if (!started) {
        started = true
        levelUp()
    }
}

function gameFlash(btn) {
    btn.classList.add('gameFlash')
    setTimeout(() => {
        btn.classList.remove('gameFlash')
    }, 250)
}

function userFlash(btn) {
    btn.classList.add('userFlash')
    setTimeout(() => {
        btn.classList.remove('userFlash')
    }, 250)
}

function levelUp() {
    userSeq = []
    level++
    levelTxt.innerText = `Level: ${level}`
    let rand = Math.floor(Math.random() * 4)
    let randColor = btns[rand]
    let btn = document.querySelector(`.${randColor}`)
    gameFlash(btn)
    gameSeq.push(randColor)
}

let allBtns = document.querySelectorAll('.btn')

function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000)
            score++
        }
    } else {
        highScore.push(score)
        console.log(highScore)
        levelTxt.innerText = 'Game Over. Press any key to reset, Score: ' + score.toString()

        // Update high score display
        highTxt.innerText = highScore.reduce((acc, el) => el > acc ? el : acc).toString()

        // Toggle game event listeners
        toggleEventListeners(false)
    }
}

function reset() {
    started = false
    level = 0
    score = 0
    userSeq = []
    gameSeq = []
    levelTxt.innerText = 'Press any key to start'

    // Reset button display (if applicable)
    // btnContainer.style.display = 'none'

    setTimeout(() => {
        // Uncomment this if btnContainer is in use
        // btnContainer.style.display = 'flex' 
    }, 500)

    // Toggle game event listeners back on
    toggleEventListeners(true)
}

function clickBtn() {
    userFlash(this)
    let userBtn = this.id
    userSeq.push(userBtn)
    checkSeq(userSeq.length - 1)
}

for (let btn of allBtns) {
    btn.addEventListener('click', clickBtn)
}

function toggleEventListeners(enable) {
    if (enable) {
        document.addEventListener('keypress', startGame)
        key.addEventListener('click', startGame)
    } else {
        document.removeEventListener('keypress', startGame)
        document.addEventListener('keypress', reset)
        key.removeEventListener('click', startGame)
        key.addEventListener('click', reset)
    }
}
