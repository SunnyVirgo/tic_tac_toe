const restartBtn = document.querySelector('.restartBtn')
const winningStatus = document.querySelector('.winningStatus')
const playerTurn = document.querySelector('.playerTurn')
const boxes = Array.from(document.getElementsByClassName('box'))
const player_x = "X"
const player_o = "O"

let spaces = Array(9).fill(null)

console.log(spaces)

let currentPlayer = player_x

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

function startGame(){
    
    for (let index = 0; index < boxes.length; index++) {
        const box = document.getElementById(boxes[index].id);

        box.addEventListener('click', function(e){
            boxClicked(e)
        })
    }
    playerTurn.innerText = `Player ${currentPlayer}'s turn`
}



function boxClicked(e){
    const id = e.target.id
    const box = document.getElementById(id)
    let content = box.innerText

    if(content === ""){
        if(spaces[id] == null){
            spaces[id] = currentPlayer
        }
        box.innerText = currentPlayer
        if(playerWins()){
            winningStatus.innerText = `Player ${currentPlayer} has won!`
            let winningBlocks = playerWins()
            winningBlocks.map(boxId=>boxes[boxId].style.backgroundColor = 'white')

            setTimeout(() => {
                restartGame()
                winningStatus.innerText = ""
            }, 5000);
            
           }
           if(!spaces.includes(null) && playerWins() == false){
            winningStatus.innerText = `Draw!`
            setTimeout(() => {
                restartGame()
                winningStatus.innerText = ""
            }, 5000);
           }
        currentPlayer = currentPlayer == player_x ? player_o : player_x
        playerTurn.innerText = `Player ${currentPlayer}'s turn`
        computerTurn()
       
    }
  
   
}
function computerTurn(){
    boxClicked().Math.random()
}

function restartGame(){
    for (let index = 0; index < boxes.length; index++) {
        const element = boxes[index].id;
        let box = document.getElementById(element)
        box.innerText=""
        spaces.fill(null)
        currentPlayer = player_x
        box.style.backgroundColor='transparent'
        
    }
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
startGame()
