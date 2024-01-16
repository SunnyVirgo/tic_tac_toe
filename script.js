const restartBtn = document.querySelector('.restartBtn')
const winningStatus = document.querySelector('.winningStatus')
const playerTurn = document.querySelector('.playerTurn')
const boxes = Array.from(document.getElementsByClassName('box'))
const timerText = document.getElementsByClassName('timer')
const PLAYER_YOU = 'X'
const  PLAYER_COMPUTER= 'O'

const players = [PLAYER_YOU,PLAYER_COMPUTER]

let spaces = Array(9).fill(null)
let currentPlayer = players[Math.floor(Math.random()*players.length)]

const winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]    
]
function startGame(player){

    if (player === PLAYER_YOU) {
       humanPlayer(player)
    } else {
        for (let index = 0; index < boxes.length; index++) {
            const element = boxes[index];
            element.style.pointerEvents='none'
        }
        setTimeout(() =>{
            computerTurn(player)
        },2000)
    }
    
    
    playerTurn.innerText = currentPlayer === PLAYER_YOU ? 'Your Turn' : `Computer's Turn`
}

function humanPlayer(player){
    if(player === PLAYER_YOU){
        for (let index = 0; index < boxes.length; index++) {
            const box = document.getElementById(boxes[index].id);
    
            box.addEventListener('click', function(e){
                boxClicked(e)
            })
        }
    }else{
        for (let index = 0; index < boxes.length; index++) {
            const element = boxes[index];
            element.style.pointerEvents='none'
        }
    }
    
}



function boxClicked(e){
    const id = e.target.id
    const box = document.getElementById(id)
    let content = box.innerText

    if(content === ""){
        if(spaces[id] == null){
            spaces[id] = currentPlayer

            box.innerText = currentPlayer

            if(playerWins()){
                winningStatus.innerText =  currentPlayer === PLAYER_YOU ? 'You Win!' : `You Loose!`
                let winningBlocks = playerWins()
                winningBlocks.map(boxId=>boxes[boxId].style.backgroundColor = 'rgb(126, 123, 103')
    
                setTimeout(() => {
                    restartGame()
                }, 5000);
                
               }
               if(!spaces.includes(null) && playerWins() == false){
                winningStatus.innerText = `Draw!`
                setTimeout(() => {
                    restartGame()
                }, 5000);
               }

            currentPlayer = currentPlayer == PLAYER_YOU ? PLAYER_COMPUTER :PLAYER_YOU

            for (let index = 0; index < boxes.length; index++) {
                const element = boxes[index];
                element.style.pointerEvents='none'
            }
    
            playerTurn.innerText = currentPlayer === PLAYER_YOU ? 'Your Turn' : `Computer's Turn`
    
    
            setTimeout(() =>{
                computerTurn(currentPlayer)
            },2000)
        }  
    }
  
   
}
function computerTurn(player){
    if(player === PLAYER_COMPUTER){
        if(!playerWins()){
            var emptyBoxes = boxes.filter(box=> box.innerText==="")
            if(emptyBoxes.length > 0){
              randomBox = emptyBoxes[Math.floor(Math.random()*emptyBoxes.length)]
             const id = randomBox.id
             if(spaces[id] === null){
                 spaces[id] = currentPlayer
         
                 randomBox.innerText = currentPlayer
         
                        if(playerWins()){
                            winningStatus.innerText =  currentPlayer === PLAYER_YOU ? 'You Won!' : `You Loose!`
                            let winningBlocks = playerWins()
                            winningBlocks.map(boxId=>boxes[boxId].style.backgroundColor = 'rgb(126, 123, 103')
                
                            setTimeout(() => {
                                restartGame()
                            }, 5000);
                            
                            }
                            if(!spaces.includes(null) && playerWins() == false){
                            winningStatus.innerText = `Draw!`
                            setTimeout(() => {
                                restartGame()
                            }, 5000);
                            }
         
                 currentPlayer = currentPlayer == PLAYER_COMPUTER ? PLAYER_YOU : PLAYER_COMPUTER
         
                 playerTurn.innerText = currentPlayer === PLAYER_YOU ? 'Your Turn' : `Computer's Turn`

                 humanPlayer(currentPlayer)
         
                 for (let index = 0; index < boxes.length; index++) {
                     const element = boxes[index];
                     element.style.pointerEvents='auto'
                 }
         
             }
            }
        }
    }
}


function restartGame(){
    for (let index = 0; index < boxes.length; index++) {
        const boxxx = boxes[index]
        const element = boxes[index].id;
        let box = document.getElementById(element)
        box.innerText=""
        spaces.fill(null)
        box.style.backgroundColor='transparent'
        boxxx.style.pointerEvents='auto'
        winningStatus.innerText = ""  
    }
    currentPlayer = players[Math.floor(Math.random()*players.length)]
    startGame(currentPlayer)
}
restartBtn.addEventListener('click', function() {
    restartGame()
})

function playerWins(){
    for (let index = 0; index < winningPattern.length; index++) {
        const element = winningPattern[index];

        let [a,b,c] = element

        if(spaces[a] !== null && spaces[a] === spaces[b] && spaces[a] === spaces[c]){
            return [a,b,c]
        }
    }
    return false
}
startGame(currentPlayer)
