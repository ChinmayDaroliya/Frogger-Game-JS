const TimeLeft = document.querySelector('#time-left')
const Result = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsright = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsright = document.querySelectorAll('.car-right')

let currentIndex = 76
let width = 9
let timerId
let outComeId
let currentTime = 20

function moveFrog(e){
    squares[currentIndex].classList.remove('frog')

    switch(e.key){
        case 'ArrowLeft':
            if(currentIndex % width !== 0) currentIndex -= 1
            break    
        
        case 'ArrowRight':
            if(currentIndex % width < width -1 ) currentIndex += 1
            break

        case 'ArrowUp':
            if(currentIndex - width > 0)currentIndex -= width
            break

        case 'ArrowDown':
            if(currentIndex + width < 80)currentIndex += width
            break    
    }
    squares[currentIndex].classList.add('frog')
}


function autoMove(){
    currentTime--
    TimeLeft.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsright.forEach(logright => moveLogRight(logright))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsright.forEach(carright => MoveCarRight(carright))
}

function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break

        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
         
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')   
            break

        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
            
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break    
    }
}

function moveLogRight(logright){
    switch(true){

    case logright.classList.contains('l3') :
        logright.classList.remove('l3')
        logright.classList.add('l2')
        break

    case logright.classList.contains('l2') :
        logright.classList.remove('l2')
        logright.classList.add('l1')
        break

    case logright.classList.contains('l1') :
        logright.classList.remove('l1')
        logright.classList.add('l5')
        break

    case logright.classList.contains('l5') :
        logright.classList.remove('l5')
        logright.classList.add('l4')
        break

    case logright.classList.contains('l4') :
        logright.classList.remove('l4')
        logright.classList.add('l3')
        break

    }
}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break

    }
}

function MoveCarRight(carright){
    switch(true){
        case carright.classList.contains('c3'):
            carright.classList.remove('c3')
            carright.classList.add('c2')
            break
        case carright.classList.contains('c2'):
            carright.classList.remove('c2')
            carright.classList.add('c1')
            break
        case carright.classList.contains('c1'):
            carright.classList.remove('c1')
            carright.classList.add('c3')
            break
    }
}

function checkOutComes(){
    Lose()
    Win()
}

function Lose(){
    if(
        squares[currentIndex].classList.contains('c2')||
    squares[currentIndex].classList.contains('l4')||
    squares[currentIndex].classList.contains('l5')||
    currentTime<=0
    ){
        Result.textContent = 'You Lose'
        clearInterval(timerId)
        clearInterval(outComeId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup',moveFrog)
    }
}

function Win(){
    if(
        squares[currentIndex].classList.contains('ending-block')
    ){
        Result.textContent = "You Win!"
        clearInterval(timerId)
        clearInterval(outComeId)
        outComeId = null
        timerId = null
        document.removeEventListener('keyup',moveFrog)
    }
}

startPauseButton.addEventListener('click' ,()=>{
    if(timerId){
        clearInterval(timerId)
        clearInterval(outComeId)
        document.removeEventListener('keyup',moveFrog)
        outComeId = null
        timerId = null
    }else{
        timerId = setInterval(autoMove,1000)
        outComeId = setInterval(checkOutComes,50)
        document.addEventListener('keyup',moveFrog)
    }
})


